import * as dotenv from 'dotenv';
import { EnvValidator } from '@/main/env/validator';

dotenv.config();

const props = {
  httpPort: parseInt(process.env.HTTP_PORT || '3000', 10),
  httpBodyLimit: process.env.HTTP_BODY_LIMIT || '10kb',
  dbHost: process.env.DB_HOST || 'localhost',
  dbClient: process.env.DB_CLIENT || 'mysql2',
  dbPort: parseInt(process.env.DB_PORT || '3306', 10),
  dbUsername: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || 'root',
  dbSchema: process.env.DB_SCHEMA || 'skore_challenge',
  jwtSecret: process.env.JWT_SECRET || 'secret',
};

export const env = new EnvValidator(props);
