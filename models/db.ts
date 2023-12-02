import { CosmosClient } from "@azure/cosmos";
import config from '../config';

const client = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
});

const database = client.database(config.databaseId);

export { database };