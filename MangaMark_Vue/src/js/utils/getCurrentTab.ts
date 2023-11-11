/**
 * Retrieves the currently active tab in the Chrome browser.
 *
 * @returns {Promise<chrome.tabs.Tab | undefined>} The currently active tab, or undefined if no tab is active.
 */
export default async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
  let queryOptions: chrome.tabs.QueryInfo = { active: true, lastFocusedWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}
