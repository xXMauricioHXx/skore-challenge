import { FindContentById } from '@/domain/usecases/find-content-by-id';
import { FindContentByIdController } from '@/presentation/http/controllers/find-content-by-id/find-content-by-id';

export class FindContentByIdPresenter {
  static toJSON(
    data: FindContentById.Result
  ): FindContentByIdController.Response {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      created_at: data.createdAt.toISOString(),
      updated_at: data.updatedAt.toISOString(),
      views: data.views,
    };
  }
}
