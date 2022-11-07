import { Content, ContentType } from '@/domain/entities/content';
import { ContentInMemoryRepository } from '@/infra/repositories/in-memory/content';
import { ContentServiceProvider } from './content';

const setup = () => {
  const contentRepository = new ContentInMemoryRepository();

  return {
    sut: new ContentServiceProvider(contentRepository),
  };
};

describe('ContentServiceProvider', () => {
  const now = new Date();

  beforeEach(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => now);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#createContent', () => {
    it('should create new content', async () => {
      const content = new Content({
        name: 'Test',
        description: 'Test',
        type: ContentType.IMAGE,
      });

      const { sut } = setup();

      const result = await sut.createContent(content);

      expect(result).toEqual({
        id: 2,
        name: 'Test',
        description: 'Test',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
      });
    });
  });
  describe('#findAllContent', () => {
    it('should reutnr all content with success', async () => {
      const { sut } = setup();

      const result = await sut.findAllContent();

      expect(result.length).toEqual(1);
      expect(result).toEqual([
        {
          id: 1,
          name: 'test',
          description: 'Teste',
          type: ContentType.IMAGE,
          createdAt: now,
          updatedAt: now,
        },
      ]);
    });
  });
});
