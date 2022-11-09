import { inject, injectable } from 'tsyringe';
import { get } from '@/shared/decorators';
import { ContentType } from '@/domain/entities/content';
import { Controller, HttpResponse } from '@/presentation/http/ports';
import { FindAllContent } from '@/domain/usecases/find-all-content';
import { AuthenticationMiddleware } from '@/presentation/http/middlewares/authentication';
import { FindAllContentPresenter } from '@/presentation/http/controllers/find-all-content/find-all-content.presenter';

@injectable()
@get('/content', [AuthenticationMiddleware])
export class FindAllContentController extends Controller {
  constructor(
    @inject('FindAllContent')
    private readonly findAllContentUseCase: FindAllContent
  ) {
    super();
  }

  async handle(): Promise<HttpResponse<FindAllContentController.Response>> {
    const contents = await this.findAllContentUseCase.execute();

    return {
      data: FindAllContentPresenter.toJSON(contents),
    };
  }

  exception(error: Error): Error {
    return error;
  }
}

export namespace FindAllContentController {
  type Content = {
    id: number;
    name: string;
    description: string;
    type: ContentType;
    created_at: string;
    updated_at: string;
    views: number;
  };

  export type Response = Content[];
}
