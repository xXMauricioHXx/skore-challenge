import { env } from '@/main/env';
import path from 'path';
import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: env.dbClient as any,
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbSchema,
  synchronize: false,
  logging: false,
  entities: [
    path.join(__dirname, '../../infra/repositories/mysql/entities/**/*.ts'),
  ],
  migrations: [path.join(__dirname, '../../../database/migrations/*.ts')],
});
