import logWithTimestamp from '../js/utils/logWithTimestamp'

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install' || details.reason == 'update') {
    chrome.permissions.request(
      {
        origins: ['http://*/*', 'https://*/*'],
      }
    )
  }
})

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
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id as number, { command: 'receiveMessage', message: message })
  })
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
