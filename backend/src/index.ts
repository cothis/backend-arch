import { App } from './app';
import { env } from './env';

try {
  const app = new App();
  const port = env.app.port;

  app.createExpressServer(port);
} catch (err) {
  console.error(err);
}
