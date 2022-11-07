import { createMock } from 'ts-auto-mock';
import { HttpRequest } from '@/presentation/http/ports';
import { FindContentById } from '@/domain/usecases/find-content-by-id';
import { FindContentByIdController } from '@/presentation/http/controllers/find-content-by-id/find-content-by-id';
import { ContentType } from '@/domain/entities/content';

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
      });
    });
  });
});
