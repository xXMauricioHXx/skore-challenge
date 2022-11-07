import { ExpressServer } from '@/adapters';
import { DependencyContainer } from 'tsyringe';
import { Module } from '@/main/modules/module';

export class HttpServer extends ExpressServer implements Module {
  private static instance: HttpServer;

  public static getInstance(container?: DependencyContainer): HttpServer {
    if (!HttpServer.instance) {
      HttpServer.instance = new HttpServer();
    }

    if (container) {
      HttpServer.instance.container = container;
    }

    return HttpServer.instance;
  }

  protected loadControllers(): Function[] {
    return [];
  }
}
