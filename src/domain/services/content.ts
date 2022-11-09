import { Content } from '@/domain/entities/content';
import { ContentRepository } from '@/domain/repositories/content';

export namespace ContentService {
  export type CreateResult = ContentRepository.Model;
  export type FindAllResult = Array<
    ContentRepository.Model & { views: number }
  >;
  export type FindByIdResult = ContentRepository.Model & { views: number };
  export type UpdateResult = ContentRepository.Model;
}

export interface ContentService {
  createContent(data: Content): Promise<ContentService.CreateResult>;
  findAllContent(): Promise<ContentService.FindAllResult>;
  findContentById(id: number): Promise<ContentService.FindByIdResult | null>;
  deleteContent(id: number): Promise<void>;
  updateContent(
    id: number,
    data: Content
  ): Promise<ContentService.UpdateResult>;
}
