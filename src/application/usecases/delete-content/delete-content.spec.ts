import { createMock } from 'ts-auto-mock';
import { ContentService } from '@/domain/services/content';
import { DeleteContentUseCase } from '@/application/usecases/delete-content/delete-content';

const setup = () => {
  const contentService = createMock<ContentService>();

  return {
    sut: new DeleteContentUseCase(contentService),
    dependencies: {
      contentService,
    },
  };
};

describe('DeleteContentUseCase', () => {
  describe('#execute', () => {
    it('should delete content by id with success', async () => {
      const id = 1;

      const { sut, dependencies } = setup();

      dependencies.contentService.deleteContent = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.execute(id);

      expect(dependencies.contentService.deleteContent).toBeCalledWith(id);
      expect(result).toBeUndefined();
    });
  });
});
