import { TSyringeContainer } from '@/adapters';
import { ContentServiceProvider } from '@/infra/services/content/content';
import { ContentMySQLRepository } from '@/infra/repositories/mysql/content';
import { TypeOrmConnection } from '@/adapters/typeorm-connection/typeorm-connection';
import { ContentViewMySQLRepository } from '@/infra/repositories/mysql/content-view';
import { ContentViewServiceProvider } from '@/infra/services/content-view/content-view';
import { CreateContentUseCase } from '@/application/usecases/create-content/create-content';
import { DeleteContentUseCase } from '@/application/usecases/delete-content/delete-content';
import { UpdateContentUseCase } from '@/application/usecases/update-content/update-content';
import { FindAllContentUseCase } from '@/application/usecases/find-all-content/find-all-content';
import { FindContentByIdUseCase } from '@/application/usecases/find-content-by-id/find-content-by-id';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      CreateContent: CreateContentUseCase,
      FindAllContent: FindAllContentUseCase,
      FindContentById: FindContentByIdUseCase,
      DeleteContent: DeleteContentUseCase,
      UpdateContent: UpdateContentUseCase,
      ContentService: ContentServiceProvider,
      ContentViewService: ContentViewServiceProvider,
      ContentRepository: ContentMySQLRepository,
      ContentViewRepository: ContentViewMySQLRepository,
    };
  }

  async loadConfigs(): Promise<Record<string, any>> {
    const typeOrmConnection = new TypeOrmConnection();
    return {
      dbConnection: await typeOrmConnection.getConnection(),
    };
  }
}
