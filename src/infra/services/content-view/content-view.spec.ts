import { ContentViewRepository } from '@/domain/repositories/content-view';
import { ContentViewServiceProvider } from '@/infra/services/content-view/content-view';
import { createMock } from 'ts-auto-mock';

const setup = () => {
  const contentViewRepository = createMock<ContentViewRepository>();

  return {
    sut: new ContentViewServiceProvider(contentViewRepository),
    dependencies: {
      contentViewRepository,
    },
  };
};

describe('ContentViewServiceProvider', () => {
  describe('#checkUseAlreadyViewContent', () => {
    it('should should return true when user already view content', async () => {
      const userId = 1;
      const contentId = 1;
      const now = new Date();
      const contentView = {
        contentId,
        userId,
        createdAt: now,
        updatedAt: now,
      };

      const { sut, dependencies } = setup();

      dependencies.contentViewRepository.findById = jest
        .fn()
        .mockResolvedValue(contentView);

      const result = await sut.checkUseAlreadyViewContent(contentId, userId);

      expect(dependencies.contentViewRepository.findById).toBeCalledWith(
        contentId,
        userId
      );
      expect(result).toEqual(true);
    });
    it('should should return false when user does not view content', async () => {
      const userId = 1;
      const contentId = 1;

      const { sut, dependencies } = setup();

      dependencies.contentViewRepository.findById = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.checkUseAlreadyViewContent(contentId, userId);

      expect(dependencies.contentViewRepository.findById).toBeCalledWith(
        contentId,
        userId
      );
      expect(result).toEqual(false);
    });
  });
  describe('#registerView', () => {
    it('should register a new view', async () => {
      const contentId = 1;
      const userId = 1;

      const { sut, dependencies } = setup();

      dependencies.contentViewRepository.create = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.registerView(contentId, userId);

      expect(dependencies.contentViewRepository.create).toBeCalledWith({
        contentId,
        userId,
      });
      expect(result).toBeUndefined();
    });
  });
});
