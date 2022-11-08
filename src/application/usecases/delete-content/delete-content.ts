import { inject, injectable } from 'tsyringe';
import { ContentService } from '@/domain/services/content';
import { DeleteContent } from '@/domain/usecases/delete-content';

@injectable()
export class DeleteContentUseCase implements DeleteContent {
  constructor(
    @inject('ContentService') private readonly contentService: ContentService
  ) {}

  async execute(id: number): Promise<void> {
    await this.contentService.deleteContent(id);
  }
}
