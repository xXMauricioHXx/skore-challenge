import { inject, injectable } from 'tsyringe';
import { del, httpStatus, schema } from '@/shared/decorators';
import { DeleteContent } from '@/domain/usecases/delete-content';
import { Controller, HttpRequest } from '@/presentation/http/ports';
import { deleteSchema } from '@/presentation/http/controllers/delete-content/delete-content.schema';
import { AssertAdminAuthenticationMiddleware } from '@/presentation/http/middlewares/assert-admin-authentication';

@injectable()
@del('/content/:id', [AssertAdminAuthenticationMiddleware])
export class DeleteContentController extends Controller {
  constructor(
    @inject('DeleteContent')
    private readonly deleteContentUseCase: DeleteContent
  ) {
    super();
  }

  @httpStatus(204)
  @schema(deleteSchema)
  async handle(req: HttpRequest): Promise<void> {
    const { id } = req.params as DeleteContentController.Request;

    await this.deleteContentUseCase.execute(id);
  }

  exception(error: Error): Error {
    return error;
  }
}

export namespace DeleteContentController {
  export type Request = {
    id: number;
  };
}
