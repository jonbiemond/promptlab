import { CosmosClient } from '@azure/cosmos';
import config from '../config';

const client = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
});

const database = client.database(config.databaseId);

class Dao {
    public async saveToDatabase(): Promise<void> {
        const container = database.container(config.containerId);
        const { resource: createdItem } = await container.items.create(this);
    }

    public async getFromDatabase(id: string): Promise<any> {
        const container = database.container(config.containerId);
        const { resource: retrievedItem } = await container.item(id).read();
        return retrievedItem;
    }
}

export { Dao };