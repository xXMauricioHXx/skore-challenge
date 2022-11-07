import { inject, injectable } from 'tsyringe';
import { Content } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';
import { ContentRepository } from '@/domain/repositories/content';

@injectable()
export class ContentServiceProvider implements ContentService {
  constructor(
    @inject('ContentRepository')
    private readonly contentRepository: ContentRepository
  ) {}

  async createContent(data: Content): Promise<ContentService.CreateResult> {
    return await this.contentRepository.create({
      description: data.description,
      name: data.name,
      type: data.type,
    });
  }
}
