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

  findAllContent(): Promise<ContentService.FindAllResult> {
    return this.contentRepository.findAll() as Promise<ContentService.FindAllResult>;
  }

  async findContentById(
    id: number
  ): Promise<ContentService.FindByIdResult | null> {
    return this.contentRepository.findById(
      id
    ) as Promise<ContentService.FindByIdResult | null>;
  }

  async deleteContent(id: number): Promise<void> {
    await this.contentRepository.deleteById(id);
  }

  updateContent(
    id: number,
    data: Content
  ): Promise<ContentService.UpdateResult> {
    return this.contentRepository.update(id, {
      ...(data.description && { description: data.description }),
      ...(data.name && { name: data.name }),
      ...(data.type && { type: data.type }),
    });
  }
}
