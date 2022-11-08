import { createMock } from 'ts-auto-mock';
import { HttpRequest } from '@/presentation/http/ports';
import { DeleteContent } from '@/domain/usecases/delete-content';
import { DeleteContentController } from '@/presentation/http/controllers/delete-content/delete-content';

const setup = () => {
  const deleteContentUseCase = createMock<DeleteContent>();

  return {
    sut: new DeleteContentController(deleteContentUseCase),
    dependencies: {
      deleteContentUseCase,
    },
  };
};

describe('FindAllCoDeleteContentControllerntentController', () => {
  describe('#handle', () => {
    it('should delete content by id with success', async () => {
      const { sut, dependencies } = setup();
      const request = {
        params: {
          id: 1,
        },
      } as HttpRequest;

      dependencies.deleteContentUseCase.execute = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.handle(request);

      expect(result).toBeUndefined();
      expect(dependencies.deleteContentUseCase.execute).toBeCalledWith(
        request.params.id
      );
    });
  });
});
