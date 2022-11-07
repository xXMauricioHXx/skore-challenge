import { TSyringeContainer } from '@/adapters';
import { ContentServiceProvider } from '@/infra/services/content/content';
import { ContentInMemoryRepository } from '@/infra/repositories/in-memory/content';
import { TypeOrmConnection } from '@/adapters/typeorm-connection/typeorm-connection';
import { CreateContentUseCase } from '@/application/usecases/create-content/create-content';
import { FindAllContentUseCase } from '@/application/usecases/find-all-content/find-all-content';
import { FindContentByIdUseCase } from '@/application/usecases/find-content-by-id/find-content-by-id';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      CreateContent: CreateContentUseCase,
      FindAllContent: FindAllContentUseCase,
      FindContentById: FindContentByIdUseCase,
      ContentService: ContentServiceProvider,
      ContentRepository: ContentInMemoryRepository,
    };
  }

  async loadConfigs(): Promise<Record<string, any>> {
    const typeOrmConnection = new TypeOrmConnection();
    return {
      dbConnection: await typeOrmConnection.getConnection(),
    };
  }
}
