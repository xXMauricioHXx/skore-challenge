import { ContentType } from '@/domain/entities/content';
import { CreateContent } from '@/domain/usecases/create-content';
import { CreateContentController } from '@/presentation/http/controllers/create-content/create-content';

export class CreateContentPresentation {
  static toJSON(data: CreateContent.Result): CreateContentController.Response {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      created_at: data.createdAt.toISOString(),
      updated_at: data.updatedAt.toISOString(),
    };
  }

  static toUseCase(
    data: CreateContentController.Request
  ): CreateContent.Params {
    return {
      description: data.description,
      name: data.name,
      type: data.type as ContentType,
    };
  }
}
