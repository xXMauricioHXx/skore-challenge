export interface DeleteContent {
  execute(id: number): Promise<void>;
}
