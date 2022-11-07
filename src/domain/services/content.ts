import { Content } from '@/domain/entities/content';
import { ContentRepository } from '@/domain/repositories/content';

export namespace ContentService {
  export type CreateResult = ContentRepository.Model;
  export type FindAllResult = ContentRepository.Model[];
  export type FindById = ContentRepository.Model;
}

export interface ContentService {
  createContent(data: Content): Promise<ContentService.CreateResult>;
  findAllContent(): Promise<ContentService.FindAllResult>;
  findContentById(id: number): Promise<ContentService.FindById | null>;
}
