import { ExpressServer } from '@/adapters';
import { Module } from '@/main/modules/module';

export class HttpServer extends ExpressServer implements Module {
  protected loadControllers(): Function[] {
    return [];
  }
}
