import { ExpressServer } from '@/adapters';
import { Module } from '@/main/modules/module';
import { CreateContentController } from '@/presentation/http/controllers/create-content/create-content';
import { DeleteContentController } from '@/presentation/http/controllers/delete-content/delete-content';
import { UpdateContentController } from '@/presentation/http/controllers/update-content/update-content';
import { FindAllContentController } from '@/presentation/http/controllers/find-all-content/find-all-content';
import { FindContentByIdController } from '@/presentation/http/controllers/find-content-by-id/find-content-by-id';

export class HttpServer extends ExpressServer implements Module {
  protected loadControllers(): Function[] {
    return [
      CreateContentController,
      FindAllContentController,
      FindContentByIdController,
      DeleteContentController,
      UpdateContentController,
    ];
  }
}
