import { CosmosClient } from '@azure/cosmos';
import config from '../config';

const client = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
});

const database = client.database(config.databaseId);

abstract class Dao<T> {
    protected abstract get containerId(): string;

    public async saveToDatabase(): Promise<void> {
        const container = database.container(this.containerId);
        await container.items.create(this);
    }

    public async getFromDatabase(id: string): Promise<T> {
        const container = database.container(this.containerId);
        const { resource: retrievedItem } = await container.item(id).read();
        return retrievedItem;
    }
}

export { Dao };