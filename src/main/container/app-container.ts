import { TSyringeContainer } from '@/adapters';
import { ContentServiceProvider } from '@/infra/services/content/content';
import { TypeOrmConnection } from '@/adapters/typeorm-connection/typeorm-connection';
import { CreateContentUseCase } from '@/application/usecases/create-content/create-content';
import { ContentInMemoryRepository } from '@/infra/repositories/in-memory/content';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {
      CreateContent: CreateContentUseCase,
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
