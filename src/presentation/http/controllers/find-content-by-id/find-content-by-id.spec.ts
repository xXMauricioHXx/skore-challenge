import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { HttpRequest } from '@/presentation/http/ports';
import { NotFoundError } from '@/presentation/http/exceptions';
import { FindContentById } from '@/domain/usecases/find-content-by-id';
import { ContentNotFoundError } from '@/domain/exceptions/content-not-found';
import { FindContentByIdController } from '@/presentation/http/controllers/find-content-by-id/find-content-by-id';
import { User } from '@/domain/entities/user';

const setup = () => {
  const findContentByIdUseCase = createMock<FindContentById>();

  return {
    sut: new FindContentByIdController(findContentByIdUseCase),
    dependencies: {
      findContentByIdUseCase,
    },
  };
};

describe('FindContentByIdController', () => {
  describe('#handle', () => {
    it('should return content by id with success', async () => {
      const now = new Date();
      const request = {
        params: {
          id: 1,
        },
        user: new User({ id: 1 }),
      } as HttpRequest;
      const content = {
        id: 1,
        name: 'Test',
        description: 'Test',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
        views: 1,
      };

      const { sut, dependencies } = setup();

      dependencies.findContentByIdUseCase.execute = jest
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
        views: 1,
      });
    });
  });
  describe('#exception', () => {
    it('should return not found error when error is instance of ContentNotFoundError', () => {
      const { sut } = setup();

      const result = sut.exception(new ContentNotFoundError());

      expect(result).toEqual(
        new NotFoundError(
          'CONTENT_NOT_FOUND',
          'Content does not exist or not found.'
        )
      );
    });
  });
});
