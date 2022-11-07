import { ContentType } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';

export namespace CreateContent {
  export type Params = {
    name: string;
    description: string;
    type: ContentType;
  };
  export type Result = ContentService.CreateResult;
}

export interface CreateContent {
  execute(data: CreateContent.Params): Promise<CreateContent.Result>;
}
