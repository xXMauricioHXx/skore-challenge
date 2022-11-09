import { inject, injectable } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { ContentViewRepository } from '@/domain/repositories/content-view';
import { UserContentView } from '@/infra/repositories/mysql/entities/user-content-view';

@injectable()
export class ContentViewMySQLRepository implements ContentViewRepository {
  private contentViewRepository: Repository<UserContentView>;

  constructor(
    @inject('dbConnection') private readonly dbConnection: DataSource
  ) {
    this.contentViewRepository =
      this.dbConnection.getRepository(UserContentView);
  }

  async create(
    data: ContentViewRepository.CreateParams
  ): Promise<ContentViewRepository.Model> {
    const contentView = new UserContentView();
    contentView.userId = data.userId;
    contentView.contentId = data.contentId;

    return this.contentViewRepository.save(contentView);
  }

  async findById(
    contentId: number,
    userId: number
  ): Promise<ContentViewRepository.Model | null> {
    const contentView = new UserContentView();
    contentView.userId = userId;
    contentView.contentId = contentId;

    return this.contentViewRepository.findOneBy(contentView);
  }
}
