import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { connectionSource } from './ormconfig';
import { env } from '@/main/env';
import logger from '@/logger';

export class TypeOrmConnection {
  private appDataSource: DataSource;

  constructor() {
    this.appDataSource = connectionSource;
  }

  async getConnection(): Promise<DataSource> {
    logger.info(`Database connected in host:${env.dbHost}`);
    return await this.appDataSource.initialize();
  }
}
