import { describe, it, expect } from 'vitest';
import AqumangaWebsite from './aquamangaWebsite';

describe('AqumangaWebsite', () => {
  describe('getMangaOnRead', () => {
    it('should extract manga title and chapter number from the document', () => {
      // Mock document structure
      const mockDocument = {
        querySelector: (selector: string) => {
          if (selector === '#chapter-heading') {
            return { innerText: 'Cultivation Chat Group - Chapter 295' };
          }
          return null;
        }
      } as unknown as Document;

      const aqumanga = new AqumangaWebsite();
      const result = aqumanga.getMangaOnRead(mockDocument);
      expect(result.title).toBe('Cultivation Chat Group');
      expect(result.chapNumber).toBe('295');
    });
  });
});
