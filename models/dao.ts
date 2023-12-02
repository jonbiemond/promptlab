import { v4 as uuidv4 } from 'uuid';
import { CosmosClient } from '@azure/cosmos';
import config from '../config';

const client = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
});

const database = client.database(config.databaseId);

abstract class Dao<T> {
    [key: string]: any;
    public id: string;
    protected abstract get containerId(): string;
    protected abstract get partitionKeyField(): string;
    protected abstract uniqueKeyField(): string;

    private async initContainer(): Promise<void> {
        type ContainerDef = {
            id: string;
            partitionKey: {
                paths: string[];
            };
            uniqueKeyPolicy?: {
                uniqueKeys: {
                    paths: string[];
                }[];
            };
        };

        const containerDef: ContainerDef = {
            id: this.containerId,
            partitionKey: {
                paths: [`/${this.partitionKeyField}`]
            }
        };
        if (this.uniqueKeyField) {
            containerDef['uniqueKeyPolicy'] = {
                uniqueKeys: [
                    {
                        paths: [`/${this.uniqueKeyField()}`]
                    }
                ]
            }
        }
        const responseContainer = await database.containers.createIfNotExists(containerDef);
        const container =  responseContainer.container;
        console.log(`Container Created ${this.containerId}`);
    }

    protected constructor() {
        this.id = uuidv4();
    }

    public async save(): Promise<void> {
        await this.initContainer();
        const container = database.container(this.containerId);
        await container.items.create(this);
    }

    public async get(): Promise<T> {
        const container = database.container(this.containerId);
        const { resource: retrievedItem } = await container.item(this.id, this[this.partitionKeyField]).read();
        return retrievedItem;
    }

    public async update(): Promise<void> {
        const container = database.container(this.containerId);
        await container.item(this.id).replace(this);
    }
}

export { Dao };