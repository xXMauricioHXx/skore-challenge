import { createMock } from 'ts-auto-mock';
import { ContentType } from '@/domain/entities/content';
import { FindAllContent } from '@/domain/usecases/find-all-content';
import { FindAllContentController } from '@/presentation/http/controllers/find-all-content/find-all-content';

const setup = () => {
  const findAllContentUseCase = createMock<FindAllContent>();

  return {
    sut: new FindAllContentController(findAllContentUseCase),
    dependencies: {
      findAllContentUseCase,
    },
  };
};

describe('FindAllContentController', () => {
  describe('#handle', () => {
    it('should list all contents with success', async () => {
      const now = new Date();
      const contents = [
        {
          id: 1,
          name: 'Test',
          description: 'Test',
          type: ContentType.IMAGE,
          createdAt: now,
          updatedAt: now,
          views: 1,
        },
      ];
      const [content] = contents;

      const { sut, dependencies } = setup();

      dependencies.findAllContentUseCase.execute = jest
        .fn()
        .mockResolvedValue(contents);

      const result = await sut.handle();

      expect(result.data).toEqual([
        {
          id: content.id,
          name: content.name,
          description: content.description,
          type: content.type,
          created_at: content.createdAt.toISOString(),
          updated_at: content.updatedAt.toISOString(),
          views: 1,
        },
      ]);
      expect(dependencies.findAllContentUseCase.execute).toBeCalled();
    });
  });
});
