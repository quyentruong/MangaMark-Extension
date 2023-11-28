import logWithTimestamp from '../js/utils/logWithTimestamp'
import requestPermission from '../js/utils/requestPermission'

chrome.runtime.onInstalled.addListener(async () => {
  // Open setup page, if mozilla and permission is not granted
  // const isMozilla = chrome.runtime.getURL('').startsWith('moz');
  requestPermission()
})

function isFirefoxAndroid() {
  return navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Android')
}

if (!isFirefoxAndroid()) {
  chrome.commands.onCommand.addListener(function (command) {
    if (command === 'update_chapter') {
      sendMessageToClient('Update chapter')
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id as number, { command: 'updateChapter' })
      })
    }
  })
}

const alarmPeriodName = 'periodAlarm'
/**
 * Starts the alarm with a defined specified period in minutes.
 *
 */
function startAlarm() {
  chrome.alarms.get(alarmPeriodName, async (alarm) => {
    if (alarm) {
      sendMessageToClient('Alarm already exists')
      logWithTimestamp('Alarm already exists')
    } else {
      chrome.storage.sync.get(['INTERVAL'], (result) => {
        const periodInMinutes = result.INTERVAL === undefined ? 5 : parseFloat(result.INTERVAL)
        sendMessageToClient('Start alarm with periodInMinutes: ' + periodInMinutes)
        logWithTimestamp('Start alarm with periodInMinutes: ' + periodInMinutes)
        chrome.alarms.create(alarmPeriodName, {
          periodInMinutes: periodInMinutes,
        })
      })
    }
  })
}

/**
 * Stops the alarm.
 *
 * @return {Promise<void>} A Promise that resolves after the alarm is cleared.
 */
async function stopAlarm() {
  sendMessageToClient('Stop alarm')
  logWithTimestamp('Stop alarm')
  return await chrome.alarms.clear(alarmPeriodName)
}

/**
 * Resets the alarm.
 *
 * @return {Promise<void>} A Promise that resolves when the alarm is reset.
 */
async function resetAlarm(): Promise<void> {
  if (await stopAlarm()) {
    sendMessageToClient('Alarm reset')
    logWithTimestamp('Alarm cleared')
    startAlarm()
  } else {
    sendMessageToClient('Could not clear alarm')
    logWithTimestamp('Could not clear alarm')
  }
}

function sendMessageToClient(message: string) {
  if (!isFirefoxAndroid) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id as number, { command: 'receiveMessage', message: message })
    })
  }
}

// Add a listener for the `alarms` event in the `chrome` object
chrome.alarms.onAlarm.addListener(function (alarm) {
  // Check if the alarm is the one we created
  if (alarm.name === alarmPeriodName) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      // Check if there are no active tabs
      if (!tabs || tabs.length === 0) {
        return
      }
      // Log a message with a timestamp
      logWithTimestamp('Send command to update chapter')

      // Stop the alarm
      await stopAlarm()

      // Send a message to the active tab with a command
      chrome.tabs.sendMessage(tabs[0].id as number, { command: 'updateChapter' })
    })
  }
})

// Register a listener for messages sent from the extension's runtime
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // Check if the received message has the command 'startAlarm'
  if (message.command === 'startAlarm') {
    // Send a response to the sender indicating success
    sendResponse({ success: true })

    // Call the startAlarm function
    startAlarm()
  }

  // Check if the received message has the command 'resetAlarm'
  if (message.command === 'resetAlarm') {
    // Send a response to the sender indicating success
    sendResponse({ success: true })

    // Await the resetAlarm function
    await resetAlarm()
  }
})
