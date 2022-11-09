import { inject, injectable } from 'tsyringe';
import { ContentViewService } from '@/domain/services/content-view';
import { ContentViewRepository } from '@/domain/repositories/content-view';

@injectable()
export class ContentViewServiceProvider implements ContentViewService {
  constructor(
    @inject('ContentViewRepository')
    private readonly contentViewRepository: ContentViewRepository
  ) {}

  async checkUseAlreadyViewContent(
    contentId: number,
    userId: number
  ): Promise<boolean> {
    const contentView = await this.contentViewRepository.findById(
      contentId,
      userId
    );

    return !!contentView;
  }

  async registerView(contentId: number, userId: number): Promise<void> {
    await this.contentViewRepository.create({ contentId, userId });
  }
}
