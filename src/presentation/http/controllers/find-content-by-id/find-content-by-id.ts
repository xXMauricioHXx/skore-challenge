import { inject, injectable } from 'tsyringe';
import { get, schema } from '@/shared/decorators';
import { ContentType } from '@/domain/entities/content';
import { NotFoundError } from '@/presentation/http/exceptions';
import { FindContentById } from '@/domain/usecases/find-content-by-id';
import { ContentNotFoundError } from '@/domain/exceptions/content-not-found';
import { AuthenticationMiddleware } from '@/presentation/http/middlewares/authentication';
import { findContentByIdSchema } from '@/presentation/http/controllers/find-content-by-id/find-content-by-id.schema';
import { FindContentByIdPresenter } from '@/presentation/http/controllers/find-content-by-id/find-content-by-id.presenter';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/http/ports';

@injectable()
@get('/content/:id', [AuthenticationMiddleware])
export class FindContentByIdController extends Controller {
  constructor(
    @inject('FindContentById')
    private readonly findContentByIdUseCase: FindContentById
  ) {
    super();
  }

  @schema(findContentByIdSchema)
  async handle(
    req: HttpRequest
  ): Promise<HttpResponse<FindContentByIdController.Response>> {
    const { id } = req.params as FindContentByIdController.Request;
    const content = await this.findContentByIdUseCase.execute(id);

    return {
      data: FindContentByIdPresenter.toJSON(content),
    };
  }

  exception(error: Error): Error {
    if (error instanceof ContentNotFoundError) {
      const { code, message } = error;
      return new NotFoundError(code, message);
    }

    return error;
  }
}

export namespace FindContentByIdController {
  export type Response = {
    id: number;
    name: string;
    description: string;
    type: ContentType;
    created_at: string;
    updated_at: string;
  };

  export type Request = {
    id: number;
  };
}
