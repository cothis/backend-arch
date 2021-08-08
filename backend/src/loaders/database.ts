import { Container } from 'typedi';
import { createConnection, ConnectionOptions, useContainer } from 'typeorm';
import { env } from '../env';

export async function createDatabaseConnection(): Promise<void> {
  try {
    const connectionOptions: ConnectionOptions = {
      type: 'mysql',
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: env.database.name,
      synchronize: env.database.synchronize,
      logging: env.database.logging,
      entities: [`${__dirname}/../entities/*{.ts,.js}`],
    };

    useContainer(Container);
    await createConnection(connectionOptions);
  } catch (err) {
    throw err;
  }
}
