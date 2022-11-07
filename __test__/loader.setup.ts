import { AppContainer } from '../src/main/container/app-container';
import { HttpServer } from '../src/main/modules/http/http-server';

beforeAll(done => {
  const container = new AppContainer().container;
  const httpServer = HttpServer.getInstance(container);

  httpServer.start();
  done();
});

afterAll(done => {
  const server = HttpServer.getInstance().getServer();
  server.close();
  done();
});
