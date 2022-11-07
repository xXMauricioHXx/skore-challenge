import { ExpressServer } from '@/adapters';
import { Module } from '@/main/modules/module';
import { CreateContentController } from '@/presentation/http/controllers/create-content/create-content';

export class HttpServer extends ExpressServer implements Module {
  protected loadControllers(): Function[] {
    return [CreateContentController];
  }
}
