import { inject, injectable } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { ContentRepository } from '@/domain/repositories/content';
import { Content } from '@/infra/repositories/mysql/entities/content';

@injectable()
export class ContentMySQLRepository implements ContentRepository {
  private contentRepository: Repository<Content>;

  constructor(
    @inject('dbConnection') private readonly dbConnection: DataSource
  ) {
    this.contentRepository = this.dbConnection.getRepository(Content);
  }

  async create(
    data: ContentRepository.CreateParams
  ): Promise<ContentRepository.Model> {
    const content = new Content();
    content.name = data.name;
    content.description = data.description;
    content.type = data.type;

    return this.contentRepository.save(content);
  }

  async findAll(): Promise<ContentRepository.Model[]> {
    const contents = await this.contentRepository.find({
      relations: {
        userContentViews: true,
      },
    });

    return contents.map(content => {
      return {
        id: content.id,
        name: content.name,
        description: content.description,
        type: content.type,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
        views: content.userContentViews.length,
      };
    });
  }

  async findById(id: number): Promise<ContentRepository.Model | null> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: {
        userContentViews: true,
      },
    });

    if (content) {
      return {
        id: content.id,
        name: content.name,
        description: content.description,
        type: content.type,
        createdAt: content.createdAt,
        updatedAt: content.updatedAt,
        views: content.userContentViews.length,
      };
    }

    return null;
  }

  async update(
    id: number,
    data: Partial<ContentRepository.Model>
  ): Promise<ContentRepository.Model> {
    await this.contentRepository.update(id, data);

    return this.findById(id) as Promise<Content>;
  }

  async deleteById(id: number): Promise<void> {
    await this.contentRepository.delete(id);
  }
}
