import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';
import { ContentNotFoundError } from '@/domain/exceptions/content-not-found';
import { FindContentByIdUseCase } from '@/application/usecases/find-content-by-id/find-content-by-id';

const setup = () => {
  const contentService = createMock<ContentService>();

  return {
    sut: new FindContentByIdUseCase(contentService),
    dependencies: {
      contentService,
    },
  };
};

describe('FindContentByIdUseCase', () => {
  describe('#execute', () => {
    it('should return a content by id', async () => {
      const id = 1;
      const now = new Date();
      const content = {
        id,
        name: 'Test',
        description: 'Test description',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
      };

      const { sut, dependencies } = setup();

      dependencies.contentService.findContentById = jest
        .fn()
        .mockResolvedValue(content);

      const result = await sut.execute(id);

      expect(dependencies.contentService.findContentById).toBeCalledWith(id);
      expect(result).toEqual(content);
    });
    it('should throw ContentNotFoundError when content does not exist', async () => {
      const id = 2;
      const { sut, dependencies } = setup();

      dependencies.contentService.findContentById = jest
        .fn()
        .mockResolvedValue(null);

      let error;
      try {
        await sut.execute(id);
      } catch (err) {
        error = err;
      }

      expect(dependencies.contentService.findContentById).toBeCalledWith(id);
      expect(error).toEqual(new ContentNotFoundError());
    });
  });
});
