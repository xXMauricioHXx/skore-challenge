import { inject, injectable } from 'tsyringe';
import { put, schema } from '@/shared/decorators';
import { ContentType } from '@/domain/entities/content';
import { BadRequest } from '@/presentation/http/exceptions';
import { UpdateContent } from '@/domain/usecases/update-content';
import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';
import { updateContentSchema } from '@/presentation/http/controllers/update-content/update-content.schema';
import { UpdateContentPresenter } from '@/presentation/http/controllers/update-content/update-content.presenter';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/http/ports';

@injectable()
@put('/content/:id')
export class UpdateContentController extends Controller {
  constructor(
    @inject('UpdateContent')
    private readonly updateContentUseCase: UpdateContent
  ) {
    super();
  }

  @schema(updateContentSchema)
  async handle(
    req: HttpRequest
  ): Promise<HttpResponse<UpdateContentController.Response>> {
    const { id } = req.params;
    const content = await this.updateContentUseCase.execute(
      id,
      req.body as UpdateContentController.Request
    );

    return { data: UpdateContentPresenter.toJSON(content) };
  }

  exception(error: Error): Error {
    if (error instanceof InvalidContentTypeError) {
      const { code, message } = error;
      return new BadRequest(code, message);
    }

    return error;
  }
}

export namespace UpdateContentController {
  export type Request = {
    name?: string;
    description?: string;
    type?: ContentType;
  };

  export type Response = {
    id: number;
    name: string;
    description: string;
    type: ContentType;
    created_at: string;
    updated_at: string;
  };
}
