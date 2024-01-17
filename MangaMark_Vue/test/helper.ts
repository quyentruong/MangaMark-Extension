import { JSDOM } from 'jsdom';
export default async function getDocumentFromURL(url: string): Promise<Document> {
  const { window } = await JSDOM.fromURL(url);
  const { document } = window;
  return document;
}
