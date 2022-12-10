import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const connectionFactory = (connection: Connection): Connection => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connection.plugin(require('mongoose-autopopulate'));
  return connection;
};

export const mongoConfig = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: process.env.MONGO_URI,
  connectionFactory,
});
