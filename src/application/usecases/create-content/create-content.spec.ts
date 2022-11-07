import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { CreateContentUseCase } from './create-content';
import { ContentService } from '@/domain/services/content';
import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';

const setup = () => {
  const contentService = createMock<ContentService>();

  return {
    sut: new CreateContentUseCase(contentService),
    dependencies: {
      contentService,
    },
  };
};

describe('CreateContentUseCase', () => {
  describe('#execute', () => {
    it('should create content with success', async () => {
      const data = {
        name: 'test',
        description: 'Test',
        type: ContentType.IMAGE,
      };
      const content = {
        id: 1,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { sut, dependencies } = setup();

      dependencies.contentService.createContent = jest
        .fn()
        .mockResolvedValue(content);

      const result = await sut.execute(data);

      expect(result).toEqual(content);
      expect(dependencies.contentService.createContent).toBeCalledWith(data);
    });
    it('should throw InvalidContentTypeError when content type is invalid', async () => {
      const data = {
        name: 'test',
        description: 'Test',
        type: 'test' as ContentType,
      };
      const { sut, dependencies } = setup();

      let error;
      try {
        await sut.execute(data);
      } catch (err) {
        error = err;
      }

      expect(error).toEqual(new InvalidContentTypeError());
      expect(dependencies.contentService.createContent).toHaveBeenCalledTimes(
        0
      );
    });
  });
});
