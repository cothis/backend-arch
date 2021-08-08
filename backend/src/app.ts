import 'reflect-metadata';
import express from 'express';
import { createDatabaseConnection } from './loaders/database';
import morgan from 'morgan';
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from 'routing-controllers';
import { routingControllerOptions } from './loaders/routing-config';
import { Container } from 'typedi';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setDatabase();
    this.setMiddlerwares();
  }

  private async setDatabase(): Promise<void> {
    try {
      await createDatabaseConnection();
    } catch (err) {
      console.error(err);
    }
  }

  private setMiddlerwares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'));
  }

  public async createExpressServer(port: number): Promise<void> {
    try {
      routingUseContainer(Container);
      useExpressServer(this.app, routingControllerOptions);

      this.app.listen(port, () => {
        console.info(`Server is running on http://localhost:${port}`);
      });
    } catch (err) {
      console.error(err);
    }
  }
}
