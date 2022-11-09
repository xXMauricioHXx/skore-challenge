import { FindAllContent } from '@/domain/usecases/find-all-content';
import { FindAllContentController } from '@/presentation/http/controllers/find-all-content/find-all-content';

export class FindAllContentPresenter {
  static toJSON(
    data: FindAllContent.Result
  ): FindAllContentController.Response {
    return data.map(content => ({
      id: content.id,
      name: content.name,
      description: content.description,
      type: content.type,
      created_at: content.createdAt.toISOString(),
      updated_at: content.updatedAt.toISOString(),
      views: content.views,
    }));
  }
}
