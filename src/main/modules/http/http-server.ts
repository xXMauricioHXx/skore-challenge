import { ExpressServer } from '@/adapters';
import { Module } from '@/main/modules/module';
import { CreateContentController } from '@/presentation/http/controllers/create-content/create-content';
import { FindAllContentController } from '@/presentation/http/controllers/find-all-content/find-all-content';

export class HttpServer extends ExpressServer implements Module {
  protected loadControllers(): Function[] {
    return [CreateContentController, FindAllContentController];
  }
}
