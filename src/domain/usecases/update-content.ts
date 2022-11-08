import { ContentType } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';

export namespace UpdateContent {
  export type Params = {
    name?: string;
    description?: string;
    type?: ContentType;
  };

  export type Result = ContentService.UpdateResult;
}

export interface UpdateContent {
  execute(
    id: number,
    data: UpdateContent.Params
  ): Promise<UpdateContent.Result>;
}
