import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { ContentService } from '@/domain/services/content';
import { ContentViewService } from '@/domain/services/content-view';
import { ContentNotFoundError } from '@/domain/exceptions/content-not-found';
import { FindContentByIdUseCase } from '@/application/usecases/find-content-by-id/find-content-by-id';

const setup = () => {
  const contentService = createMock<ContentService>();
  const contentViewService = createMock<ContentViewService>();

  return {
    sut: new FindContentByIdUseCase(contentService, contentViewService),
    dependencies: {
      contentService,
      contentViewService,
    },
  };
};

describe('FindContentByIdUseCase', () => {
  describe('#execute', () => {
    it('should return a content by id and register a new view', async () => {
      const id = 1;
      const userId = 1;
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
      dependencies.contentViewService.checkUseAlreadyViewContent = jest
        .fn()
        .mockResolvedValue(false);
      dependencies.contentViewService.registerView = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.execute(id, userId);

      expect(dependencies.contentService.findContentById).toBeCalledWith(id);
      expect(
        dependencies.contentViewService.checkUseAlreadyViewContent
      ).toBeCalledWith(id, userId);
      expect(dependencies.contentViewService.registerView).toBeCalledWith(
        id,
        userId
      );
      expect(result).toEqual(content);
    });
    it('should return a content by id and does not register a new view', async () => {
      const id = 1;
      const userId = 1;
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
      dependencies.contentViewService.checkUseAlreadyViewContent = jest
        .fn()
        .mockResolvedValue(true);

      const result = await sut.execute(id, userId);

      expect(dependencies.contentService.findContentById).toBeCalledWith(id);
      expect(
        dependencies.contentViewService.checkUseAlreadyViewContent
      ).toBeCalledWith(id, userId);
      expect(
        dependencies.contentViewService.registerView
      ).toHaveBeenCalledTimes(0);
      expect(result).toEqual(content);
    });
    it('should throw ContentNotFoundError when content does not exist', async () => {
      const id = 2;
      const userId = 1;
      const { sut, dependencies } = setup();

      dependencies.contentService.findContentById = jest
        .fn()
        .mockResolvedValue(null);

      let error;
      try {
        await sut.execute(id, userId);
      } catch (err) {
        error = err;
      }

      expect(dependencies.contentService.findContentById).toBeCalledWith(id);
      expect(error).toEqual(new ContentNotFoundError());
    });
  });
});
