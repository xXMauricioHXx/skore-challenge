import { inject, injectable } from 'tsyringe';
import { Content } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';
import { CreateContent } from '@/domain/usecases/create-content';

@injectable()
export class CreateContentUseCase implements CreateContent {
  constructor(
    @inject('ContentService')
    private readonly contentService: ContentService
  ) {}

  async execute(data: CreateContent.Params): Promise<CreateContent.Result> {
    const content = new Content(data);
    content.assertValidContentType();

    return this.contentService.createContent(content);
  }
}
