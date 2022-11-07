import { inject, injectable } from 'tsyringe';
import { ContentService } from '@/domain/services/content';
import { FindAllContent } from '@/domain/usecases/find-all-content';

@injectable()
export class FindAllContentUseCase implements FindAllContent {
  constructor(
    @inject('ContentService') private readonly contentService: ContentService
  ) {}

  execute(): Promise<FindAllContent.Result> {
    return this.contentService.findAllContent();
  }
}
