import { ContentType } from '@/domain/entities/content';

export namespace ContentRepository {
  export type Model = {
    id: number;
    name: string;
    description: string;
    type: ContentType;
    views?: number;
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
  findById(id: number): Promise<ContentRepository.Model | null>;
  deleteById(id: number): Promise<void>;
  update(
    id: number,
    data: Partial<ContentRepository.Model>
  ): Promise<ContentRepository.Model>;
}
