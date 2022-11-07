import { inject, injectable } from 'tsyringe';
import { CodedError } from '@/shared/coded-error';
import { ContentType } from '@/domain/entities/content';
import { httpStatus, post, schema } from '@/shared/decorators';
import { CreateContent } from '@/domain/usecases/create-content';
import { BadRequest } from '@/presentation/http/exceptions/bad-request';
import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';
import { createContentSchema } from '@/presentation/http/controllers/create-content/create-content.schema';
import { CreateContentPresentation } from '@/presentation/http/controllers/create-content/create-content.presentation';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/http/ports';

@injectable()
@post('/content')
export class CreateContentController extends Controller {
  constructor(
    @inject('CreateContent')
    private readonly createContentUseCase: CreateContent
  ) {
    super();
  }

  @httpStatus(201)
  @schema(createContentSchema)
  async handle(
    req: HttpRequest
  ): Promise<HttpResponse<CreateContentController.Response>> {
    const data = req.body as CreateContentController.Request;

    const createdPayment = await this.createContentUseCase.execute(
      CreateContentPresentation.toUseCase(data)
    );

    return {
      data: CreateContentPresentation.toJSON(createdPayment),
    };
  }

  exception(error: Error): Error {
    if (error instanceof CodedError) {
      const { code, message } = error;

      if (error instanceof InvalidContentTypeError) {
        return new BadRequest(code, message);
      }
    }

    return error;
  }
}

export namespace CreateContentController {
  export type Response = {
    id: string;
    name: string;
    description: string;
    type: ContentType;
    created_at: string;
    updated_at: string;
  };

  export type Request = {
    name: string;
    description: string;
    type: string;
  };
}
