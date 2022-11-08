import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { HttpRequest } from '@/presentation/http/ports';
import { NotFoundError } from '@/presentation/http/exceptions';
import { UpdateContent } from '@/domain/usecases/update-content';
import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';
import { UpdateContentController } from '@/presentation/http/controllers/update-content/update-content';

const setup = () => {
  const updateContentUseCase = createMock<UpdateContent>();

  return {
    sut: new UpdateContentController(updateContentUseCase),
    dependencies: {
      updateContentUseCase,
    },
  };
};

describe('UpdateContentController', () => {
  describe('#handle', () => {
    it('should update content by id with success', async () => {
      const now = new Date();
      const request = {
        params: {
          id: 1,
        },
        body: {
          name: 'Test',
        },
      } as HttpRequest;
      const content = {
        id: 1,
        name: 'Test',
        description: 'Test',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
      };

      const { sut, dependencies } = setup();

      dependencies.updateContentUseCase.execute = jest
        .fn()
        .mockResolvedValue(content);

      const result = await sut.handle(request);

      expect(result.data).toEqual({
        id: content.id,
        name: content.name,
        description: content.description,
        type: content.type,
        created_at: content.createdAt.toISOString(),
        updated_at: content.updatedAt.toISOString(),
      });
    });
  });
  describe('#exception', () => {
    it('should return not bad request error when error is instance of InvalidContentTypeError', () => {
      const { sut } = setup();

      const result = sut.exception(new InvalidContentTypeError());

      expect(result).toEqual(
        new NotFoundError(
          'INVALID_CONTENT_TYPE',
          'The provided content type does not match with accepted contents.'
        )
      );
    });
  });
});
