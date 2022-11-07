import { ContentService } from '@/domain/services/content';

export namespace FindAllContent {
  export type Result = ContentService.FindAllResult;
}

export interface FindAllContent {
  execute(): Promise<FindAllContent.Result>;
}
