import { Content, ContentType } from '@/domain/entities/content';
import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';
import { ContentService } from '@/domain/services/content';
import { createMock } from 'ts-auto-mock';
import { UpdateContentUseCase } from './update-content';

const setup = () => {
  const contentService = createMock<ContentService>();

  return {
    sut: new UpdateContentUseCase(contentService),
    dependencies: {
      contentService,
    },
  };
};

describe('UpdateContentUseCase', () => {
  describe('#execute', () => {
    it('should update content with success', async () => {
      const id = 1;
      const now = new Date();
      const data = {
        name: 'Test',
      };
      const content = {
        id,
        ...data,
        description: 'Test',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
      };
      const { sut, dependencies } = setup();

      dependencies.contentService.updateContent = jest
        .fn()
        .mockResolvedValue(content);

      const result = await sut.execute(id, data);

      expect(dependencies.contentService.updateContent).toBeCalledWith(
        id,
        new Content(data)
      );
      expect(result).toEqual(content);
    });
    it('should throw InvalidContentTypeError when content type is invalid', async () => {
      const id = 1;
      const data = {
        type: 'Test' as ContentType,
      };

      const { sut } = setup();

      let error;
      try {
        await sut.execute(id, data);
      } catch (err) {
        error = err;
      }

      expect(error).toEqual(new InvalidContentTypeError());
    });
  });
});
