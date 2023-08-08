import {getMongoURI} from '@project/util/util-core';
import {ConfigurationInterface} from './configuration.interface';

export const configuration = (): ConfigurationInterface => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoUri: getMongoURI(
    process.env.MONGO_DB_USER,
    process.env.MONGO_DB_PASSWORD,
    process.env.MONGO_DB_HOST,
    process.env.MONGO_DB_PORT,
    process.env.MONGO_DB_NAME
  ),
});
