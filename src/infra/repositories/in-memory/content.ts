import { injectable } from 'tsyringe';
import { ContentType } from '@/domain/entities/content';
import { ContentRepository } from '@/domain/repositories/content';

@injectable()
export class ContentInMemoryRepository implements ContentRepository {
  private contents: ContentRepository.Model[] = [
    {
      id: 1,
      name: 'test',
      description: 'Teste',
      type: ContentType.IMAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async create(
    data: ContentRepository.CreateParams
  ): Promise<ContentRepository.Model> {
    const latestContent = this.contents[this.contents.length - 1];

    const content = {
      id: latestContent.id + 1,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ContentRepository.Model;

    this.contents.push(content);
    return content;
  }

  async findAll(): Promise<ContentRepository.Model[]> {
    return this.contents;
  }

  async findById(id: number): Promise<ContentRepository.Model | null> {
    return this.contents.find(content => content.id === id) || null;
  }
}
