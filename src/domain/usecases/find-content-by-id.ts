import { ContentService } from '@/domain/services/content';

export namespace FindContentById {
  export type Result = ContentService.FindByIdResult;
}

export interface FindContentById {
  execute(id: number, userId: number): Promise<FindContentById.Result>;
}
