import { inject, injectable } from 'tsyringe';
import { ContentService } from '@/domain/services/content';
import { ContentViewService } from '@/domain/services/content-view';
import { FindContentById } from '@/domain/usecases/find-content-by-id';
import { ContentNotFoundError } from '@/domain/exceptions/content-not-found';

@injectable()
export class FindContentByIdUseCase implements FindContentById {
  constructor(
    @inject('ContentService') private readonly contentService: ContentService,
    @inject('ContentViewService')
    private readonly contentViewService: ContentViewService
  ) {}

  async execute(id: number, userId: number): Promise<FindContentById.Result> {
    const content = await this.contentService.findContentById(id);

    if (!content) {
      throw new ContentNotFoundError();
    }

    const isViwed = await this.contentViewService.checkUseAlreadyViewContent(
      id,
      userId
    );

    if (!isViwed) {
      await this.contentViewService.registerView(id, userId);

      return {
        ...content,
        views: content.views + 1,
      };
    }

    return content;
  }
}
