import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';
import { FindAllContentUseCase } from '@/application/usecases/find-all-content/find-all-content';

const setup = () => {
  const contentService = createMock<ContentService>();
  return {
    sut: new FindAllContentUseCase(contentService),
    dependencies: {
      contentService,
    },
  };
};

describe('FindAllContentUseCase', () => {
  describe('#execute', () => {
    it('should return all contents with success', async () => {
      const now = new Date();
      const contents = [
        {
          id: 1,
          name: 'Test',
          description: 'Test',
          type: ContentType.IMAGE,
          createAt: now,
          updatedAt: now,
        },
      ];

      const { sut, dependencies } = setup();

      dependencies.contentService.findAllContent = jest
        .fn()
        .mockResolvedValue(contents);

      const result = await sut.execute();

      expect(dependencies.contentService.findAllContent).toBeCalled();
      expect(result).toEqual(contents);
    });
  });
});
