export const getLastNonEmptyTextUrl = (url: string): string => {
  const lastText = url.split('/').filter((text) => text !== '').pop();
  if (lastText) {
    return lastText;
  } else {
    const nonEmptyText = url.split('/').find((text) => text !== '');
    if (nonEmptyText) {
      return nonEmptyText;
    } else {
      throw new Error('URL is empty');
    }
  }
};
