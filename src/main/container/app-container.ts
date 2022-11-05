import { TSyringeContainer } from '@/adapters';
import { TypeOrmConnection } from '@/adapters/typeorm-connection/typeorm-connection';

export class AppContainer extends TSyringeContainer {
  loadProviders(): Record<string, any> {
    return {};
  }

  async loadConfigs(): Promise<Record<string, any>> {
    const typeOrmConnection = new TypeOrmConnection();
    return {
      dbConnection: await typeOrmConnection.getConnection(),
    };
  }
}
