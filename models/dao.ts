import { v4 as uuidv4 } from 'uuid';
import { database } from "./db";

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
        await database.containers.createIfNotExists(containerDef);
    }

    protected constructor() {
        this.id = uuidv4();
    }

    /**
     * Save a new object to the database.
     */
    public async save(): Promise<void> {
        await this.initContainer();
        const container = database.container(this.containerId);
        await container.items.create(this);
    }

    /**
     * Get this object from the database.
     */
    public async get(): Promise<T> {
        const container = database.container(this.containerId);
        const { resource: retrievedItem } = await container.item(this.id, this[this.partitionKeyField]).read();
        return retrievedItem;
    }

    /**
     * Update an object in the database.
     */
    public async update(): Promise<void> {
        const container = database.container(this.containerId);
        await container.item(this.id).replace(this);
    }

    /**
     * Delete an object from the database.
     */
    public async delete(): Promise<void> {
        const container = database.container(this.containerId);
        await container.item(this.id).delete();
    }
}

export { Dao };