import { Content, ContentType } from '@/domain/entities/content';
import { ContentServiceProvider } from '@/infra/services/content/content';
import { ContentInMemoryRepository } from '@/infra/repositories/in-memory/content';

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
  describe('#findContentById', () => {
    it('should return content by id', async () => {
      const id = 1;
      const { sut } = setup();

      const result = await sut.findContentById(id);

      expect(result).toEqual({
        id: 1,
        name: 'test',
        description: 'Teste',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
      });
    });
    it('should return null when content is not found', async () => {
      const id = 2;
      const { sut } = setup();

      const result = await sut.findContentById(id);

      expect(result).toEqual(null);
    });
  });
  describe('#deleteContent', () => {
    it('should delete content by id', async () => {
      const id = 1;
      const { sut } = setup();

      await sut.deleteContent(id);
      const result = await sut.findAllContent();

      expect(result.length).toEqual(0);
    });
  });
});
