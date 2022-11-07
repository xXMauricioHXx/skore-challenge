import { Content } from '@/domain/entities/content';
import { ContentRepository } from '@/domain/repositories/content';

export namespace ContentService {
  export type CreateResult = ContentRepository.Model;
}

export interface ContentService {
  createContent(data: Content): Promise<ContentService.CreateResult>;
}
