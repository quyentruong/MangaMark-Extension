import { describe, it, expect } from 'vitest';
import getDocumentFromURL from './helper';


describe('TopTruyen', async () => {
  describe('Test domain', async () => {
    it('throws an error with status 403', async () => {
      try {
        const url = 'https://www.toptruyenhot.co/truyen-tranh/vo-luyen-dinh-phong/chapter-3646/1704340';
        await getDocumentFromURL(url);

      } catch (error) {
        expect(error.message).toBe('Resource was not loaded. Status: 403');
      }
    })
  })
});

describe('DocTruyen3q', async () => {
  describe('Test domain', async () => {
    it('throws an error with status 403', async () => {
      try {
        const url = 'https://doctruyen3qup.com/truyen-tranh/vo-luyen-dinh-phong/chapter-3654/1733188';
        await getDocumentFromURL(url);

      } catch (error) {
        expect(error.message).toBe('Resource was not loaded. Status: 403');
      }
    })
  })
});
