import { describe, it, expect } from 'vitest';
import getDocumentFromURL from './helper';

describe('Mangatoon', async () => {
  describe('Test domain', async () => {
    it('throws an error with status 403', async () => {
      try {
        const url = 'https://h5.mangatoon.mobi/';
        await getDocumentFromURL(url);

      } catch (error) {
        expect(error.message).toBe('Resource was not loaded. Status: 403');
      }
    })
  })
});
