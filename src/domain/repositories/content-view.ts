import { ContentType } from '@/domain/entities/content';

export namespace ContentViewRepository {
  export type Model = {
    contentId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  };

  export type CreateParams = {
    contentId: number;
    userId: number;
  };
}

export interface ContentViewRepository {
  create(
    data: ContentViewRepository.CreateParams
  ): Promise<ContentViewRepository.Model>;
  findById(
    contentId: number,
    userId: number
  ): Promise<ContentViewRepository.Model | null>;
}
