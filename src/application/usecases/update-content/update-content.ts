import { inject, injectable } from 'tsyringe';
import { Content } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';
import { UpdateContent } from '@/domain/usecases/update-content';

@injectable()
export class UpdateContentUseCase implements UpdateContent {
  constructor(
    @inject('ContentService') private readonly contentService: ContentService
  ) {}

  execute(
    id: number,
    data: UpdateContent.Params
  ): Promise<UpdateContent.Result> {
    const content = new Content(data);

    if (data.type) {
      content.assertValidContentType();
    }

    return this.contentService.updateContent(id, content);
  }
}
