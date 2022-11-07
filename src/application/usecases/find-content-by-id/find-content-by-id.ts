import { inject, injectable } from 'tsyringe';
import { ContentService } from '@/domain/services/content';
import { FindContentById } from '@/domain/usecases/find-content-by-id';
import { ContentNotFoundError } from '@/domain/exceptions/content-not-found';

@injectable()
export class FindContentByIdUseCase implements FindContentById {
  constructor(
    @inject('ContentService') private readonly contentService: ContentService
  ) {}

  async execute(id: number): Promise<FindContentById.Result> {
    const content = await this.contentService.findContentById(id);

    if (!content) {
      throw new ContentNotFoundError();
    }

    return content;
  }
}
