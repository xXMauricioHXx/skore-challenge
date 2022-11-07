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

  create(
    data: ContentRepository.CreateParams
  ): Promise<ContentRepository.Model> {
    const payment = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ContentRepository.Model;

    this.contents.push(payment);
    return Promise.resolve(payment);
  }
}
