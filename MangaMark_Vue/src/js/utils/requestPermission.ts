export default async function requestPermission() {
  const permissionGranted = await chrome.permissions.contains({
    origins: ['<all_urls>'],
  })
  if (!permissionGranted) {
    chrome.tabs.create({
      url: chrome.runtime.getURL('setup.html'),
    }, (tab) => {
      window.close();
    });
  }
}
