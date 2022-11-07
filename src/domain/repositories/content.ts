import { ContentType } from '@/domain/entities/content';

export namespace ContentRepository {
  export type Model = {
    id: number;
    name: string;
    description: string;
    type: ContentType;
    createdAt: Date;
    updatedAt: Date;
  };

  export type CreateParams = {
    name: string;
    description: string;
    type: ContentType;
  };
}

export interface ContentRepository {
  create(
    data: ContentRepository.CreateParams
  ): Promise<ContentRepository.Model>;

  findAll(): Promise<ContentRepository.Model[]>;
}
