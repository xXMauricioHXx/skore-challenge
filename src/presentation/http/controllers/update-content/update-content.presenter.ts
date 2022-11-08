import { UpdateContent } from '@/domain/usecases/update-content';
import { UpdateContentController } from '@/presentation/http/controllers/update-content/update-content';

export class UpdateContentPresenter {
  static toJSON(data: UpdateContent.Result): UpdateContentController.Response {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      created_at: data.createdAt.toISOString(),
      updated_at: data.updatedAt.toISOString(),
    };
  }
}
