import { ContentService } from '@/domain/services/content';

export namespace FindContentById {
  export type Result = ContentService.FindById;
}

export interface FindContentById {
  execute(id: number): Promise<FindContentById.Result>;
}
