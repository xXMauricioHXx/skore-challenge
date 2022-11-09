export interface ContentViewService {
  checkUseAlreadyViewContent(
    contentId: number,
    userId: number
  ): Promise<boolean>;

  registerView(contentId: number, userId: number): Promise<void>;
}
