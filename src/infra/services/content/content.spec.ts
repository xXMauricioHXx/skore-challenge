import { Content, ContentType } from '@/domain/entities/content';
import { ContentRepository } from '@/domain/repositories/content';
import { ContentServiceProvider } from '@/infra/services/content/content';
import { createMock } from 'ts-auto-mock';

const setup = () => {
  const contentRepository = createMock<ContentRepository>();

  return {
    sut: new ContentServiceProvider(contentRepository),
    dependencies: {
      contentRepository,
    },
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
      const now = new Date();
      const contentCreated = {
        id: 1,
        name: 'Test',
        description: 'Test',
        type: ContentType.IMAGE,
        updatedAt: now,
        createdAt: now,
      };

      const content = new Content({
        name: contentCreated.name,
        description: contentCreated.description,
        type: contentCreated.type,
      });

      const { sut, dependencies } = setup();

      dependencies.contentRepository.create = jest
        .fn()
        .mockResolvedValue(contentCreated);

      const result = await sut.createContent(content);

      expect(dependencies.contentRepository.create).toBeCalledWith({
        name: contentCreated.name,
        description: contentCreated.description,
        type: contentCreated.type,
      });
      expect(result).toEqual(contentCreated);
    });
  });
  describe('#findAllContent', () => {
    it('should reutnr all content with success', async () => {
      const contents = [
        {
          id: 1,
          name: 'test',
          description: 'Teste',
          type: ContentType.IMAGE,
          createdAt: now,
          updatedAt: now,
        },
      ];

      const { sut, dependencies } = setup();

      dependencies.contentRepository.findAll = jest
        .fn()
        .mockResolvedValue(contents);

      const result = await sut.findAllContent();

      expect(dependencies.contentRepository.findAll).toBeCalled();
      expect(result).toEqual(contents);
    });
  });
  describe('#findContentById', () => {
    it('should return content by id', async () => {
      const id = 1;
      const content = {
        id: 1,
        name: 'test',
        description: 'Teste',
        type: ContentType.IMAGE,
        createdAt: now,
        updatedAt: now,
        views: 1,
      };
      const { sut, dependencies } = setup();

      dependencies.contentRepository.findById = jest
        .fn()
        .mockResolvedValue(content);

      const result = await sut.findContentById(id);

      expect(dependencies.contentRepository.findById).toBeCalledWith(id);
      expect(result).toEqual(content);
    });
    it('should return null when content is not found', async () => {
      const id = 2;
      const { sut, dependencies } = setup();

      dependencies.contentRepository.findById = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.findContentById(id);

      expect(dependencies.contentRepository.findById).toBeCalledWith(id);
      expect(result).toEqual(null);
    });
  });
  describe('#deleteContent', () => {
    it('should delete content by id', async () => {
      const id = 1;
      const { sut, dependencies } = setup();

      dependencies.contentRepository.deleteById = jest
        .fn()
        .mockResolvedValue(null);

      const result = await sut.deleteContent(id);

      expect(dependencies.contentRepository.deleteById).toBeCalledWith(id);
      expect(result).toBeUndefined();
    });
    describe('#updateContent', () => {
      it('should update content with success', async () => {
        const id = 1;
        const contentUpdated = {
          id: 1,
          name: 'test',
          description: 'Teste',
          type: ContentType.IMAGE,
          createdAt: now,
          updatedAt: now,
        };

        const content = new Content({ name: 'test' });

        const { sut, dependencies } = setup();

        dependencies.contentRepository.update = jest
          .fn()
          .mockResolvedValue(contentUpdated);

        const result = await sut.updateContent(id, content);

        expect(dependencies.contentRepository.update).toBeCalledWith(id, {
          name: 'test',
        });
        expect(result).toEqual(contentUpdated);
      });
    });
  });
});
