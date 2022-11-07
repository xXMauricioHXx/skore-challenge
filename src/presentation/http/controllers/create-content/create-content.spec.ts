import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { CreateContentController } from './create-content';
import { HttpRequest } from '@/presentation/http/ports/http';
import { CreateContent } from '@/domain/usecases/create-content';
import { InvalidContentTypeError } from '@/domain/exceptions/invalid-content-type';
import { BadRequest } from '../../exceptions';

const setup = () => {
  const createContentUseCase = createMock<CreateContent>();

  return {
    sut: new CreateContentController(createContentUseCase),
    dependencies: {
      createContentUseCase,
    },
  };
};

describe('CreateContentController', () => {
  describe('#handle', () => {
    it('should create a new content with success', async () => {
      const now = new Date();
      const request = {
        body: {
          name: 'Test',
          description: 'Tests',
          type: ContentType.IMAGE,
        },
      } as HttpRequest;
      const content = {
        id: 1,
        ...request.body,
        createdAt: now,
        updatedAt: now,
      };

      const { sut, dependencies } = setup();

      dependencies.createContentUseCase.execute = jest
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
      expect(dependencies.createContentUseCase.execute).toBeCalledWith(
        request.body
      );
    });
  });
  describe('#exception', () => {
    it('should return BadRequest error when error is instance of InvalidContentTypeError', () => {
      const { sut } = setup();
      const result = sut.exception(new InvalidContentTypeError());

      expect(result).toEqual(
        new BadRequest(
          'INVALID_CONTENT_TYPE',
          'The provided content type does not match with accepted contents.'
        )
      );
    });
  });
});
