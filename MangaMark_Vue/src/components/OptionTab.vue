<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue'
import { listWebsites, packageName } from '../js/global'
import '../assets/css/bulma.min.css'
import DumpsterFireIcon from '../assets/icons/dumpster-fire.svg'
import TrashClockIcon from '../assets/icons/trash-clock.svg'
import UserSlashIcon from '../assets/icons/user-slash.svg'
import GoogleIcon from '../assets/icons/google.svg'
import getCurrentTab from '../js/utils/getCurrentTab'
import { CachedValue } from 'webext-storage-cache'
import Swal from 'sweetalert2'
import debounce from '../js/utils/debounce'

const selectedPosition = ref('top_left')
const websites: Ref<string[]> = ref([])
const currentTab: Ref<any> = ref(null)
const selectedInterval = ref(5)
const selectedWebsite = ref('')
const selectedScrollPercent = ref(1)
// const googleSrc = ref('')
// const googleDisableSrc = ref('')
const autoScrollEnabled = ref(false)

const positions = [
  { text: 'Top Left', value: 'top_left' },
  { text: 'Top Center', value: 'top_center' },
  { text: 'Top Right', value: 'top_right' },
  { text: 'Left Center', value: 'left_center' },
  { text: 'Center', value: 'ccenter' },
  { text: 'Right Center', value: 'right_center' },
  { text: 'Bottom Left', value: 'bottom_left' },
  { text: 'Bottom Center', value: 'bottom_center' },
  { text: 'Bottom Right', value: 'bottom_right' },
]

document.title = packageName + ' - Options'
onMounted(async () => {
  chrome.storage.sync.get(
    ['POSITION', 'INTERVAL', 'AutoScrollEnabled', 'ScrollPercent'],
    (result) => {
      selectedPosition.value = result.POSITION || 'top_left'
      selectedInterval.value = result.INTERVAL || 5
      autoScrollEnabled.value = result.AutoScrollEnabled || false
      selectedScrollPercent.value = result.ScrollPercent || 1
    },
  )
  currentTab.value = await getCurrentTab()
  websites.value = listWebsites
  selectedWebsite.value =
    websites.value.find((website) => !website.includes('dead')) || websites.value[0]
  // googleSrc.value = chrome.runtime.getURL('icons/google.png')
  // googleDisableSrc.value = chrome.runtime.getURL('icons/google-disable.png')
})

watch(selectedPosition, (newPosition) => {
  selectedPosition.value = newPosition
})

watch(autoScrollEnabled, (newValue) => {
  chrome.storage.sync.set({ AutoScrollEnabled: newValue })
})

const debouncedSetScrollPercent = debounce((newValue: number): void => {
  chrome.storage.sync.set({ ScrollPercent: newValue })
}, 300)

watch(selectedScrollPercent, (newValue) => {
  debouncedSetScrollPercent(newValue)
})

function googleSearch() {
  if (selectedWebsite.value.includes('dead')) {
    return
  }
  window.open(
    'https://www.google.com/search?q=' + selectedWebsite.value.replace(/\(.*?\)/g, '').trim(),
    '_blank',
  )
  // chrome.tabs.create({ url: 'https://www.google.com/search?q=' + selectedWebsite.value })
}

function clearCache() {
  Swal.fire({
    title: 'Are you sure?',
    html: "Clear all cache.<br>You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const cacheApi = new CachedValue('MangaApi')
      await cacheApi.delete()
    }
  })
}

function getDomainFromUrl(url: string): string {
  const parsedUrl = new URL(url)
  return `${parsedUrl.protocol}//${parsedUrl.hostname}`
}

function clearCMangaLogin() {
  Swal.fire({
    title: 'Are you sure?',
    html: "Clear CManga login.<br>You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await chrome.storage.sync.remove('CMangaLogin')
      chrome.cookies.remove(
        {
          url: getDomainFromUrl(currentTab.value.url),
          name: 'PHPSESSID',
        },
        () => {
          console.log('Removed PHPSESSID cookie')
        },
      )
      chrome.cookies.remove(
        {
          url: getDomainFromUrl(currentTab.value.url),
          name: 'login_email',
        },
        () => {
          console.log('Removed login_email cookie')
        },
      )
      chrome.cookies.remove(
        {
          url: getDomainFromUrl(currentTab.value.url),
          name: 'login_password',
        },
        () => {
          console.log('Removed login_password cookie')
        },
      )
    }
  })
}

function clearAll() {
  Swal.fire({
    title: 'Are you sure?',
    html: "Clear all cache and settings.<br>You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const cacheApi = new CachedValue('MangaApi')
      await cacheApi.delete()
      await chrome.storage.sync.clear()
      window.close()
    }
  })
}

function saveOption() {
  chrome.runtime.sendMessage({ command: 'resetAlarm' })

  chrome.storage.sync.set({ POSITION: selectedPosition.value, INTERVAL: selectedInterval.value })
  chrome.tabs.update(currentTab.value.id, { active: true }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
  })
  chrome.tabs.reload(currentTab.value.id).then(() => {
    window.close()
  })
}
</script>

<template>
  <main>
    <div class="columns" style="display: flex">
      <div class="column">
        <!-- First Column -->
        <div class="field">
          <label class="label">Badge Position</label>
          <div class="control">
            <div class="select is-rounded">
              <select v-model="selectedPosition" class="is-hovered">
                <template v-for="position in positions" :key="position.value">
                  <option :value="position.value">{{ position.text }}</option>
                </template>
              </select>
            </div>
          </div>
        </div>
        <!-- Separator -->
        <div class="field">
          <label class="label">Support Websites: {{ websites.length }}</label>
          <div class="control">
            <div class="select is-rounded">
              <select v-model="selectedWebsite" class="is-hovered">
                <template v-for="website in websites" :key="website">
                  <option :value="website">{{ website }}</option>
                </template>
              </select>
            </div>
          </div>
        </div>
        <!-- End First Column -->
      </div>
      <div class="column">
        <!-- Second Column -->
        <div class="field">
          <label class="label">Auto Save</label>
          <div class="control has-icons-right">
            <input
              class="input is-rounded"
              v-model="selectedInterval"
              type="number"
              min="0.1"
              max="10"
              step="0.01"
            />
            <span class="icon is-small is-right">m</span>
          </div>
          <label>{{ (selectedInterval * 60).toFixed(1) }} seconds</label>
        </div>
        <!-- Separator -->
        <div class="field pt-3">
          <div class="control">
            <span title="Google Search">
              <GoogleIcon
                @click="googleSearch"
                :class="selectedWebsite.includes('dead') ? 'inactive' : 'active'"
              />
            </span>
          </div>
        </div>
        <!-- End Second Column -->
      </div>
    </div>

    <div class="field">
      <div class="control" style="gap: 10px; display: flex">
        <input
          type="range"
          v-model="selectedScrollPercent"
          step="0.05"
          min="0.05"
          max="5"
          style="width: 240px"
        />
        <span>{{ selectedScrollPercent }}%</span>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="autoScrollEnabled" />
          Automatically scrolling
        </label>
      </div>
    </div>

    <div class="buttons button-group">
      <button
        class="button is-link svg-icon is-outlined icon-stack"
        @click="clearCMangaLogin"
        title="Clear CManga Login"
      >
        <span class="icon">
          <UserSlashIcon />
        </span>
        <span
          >Clear<br />
          CManga</span
        >
      </button>
      <button
        class="button is-link svg-icon is-outlined icon-stack"
        @click="clearCache"
        title="Clear Cache"
      >
        <span class="icon">
          <TrashClockIcon />
        </span>
        <span>Clear Cache</span>
      </button>
      <button
        class="button is-link svg-icon is-outlined icon-stack"
        @click="clearAll"
        title="Clear All"
      >
        <span class="icon">
          <DumpsterFireIcon />
        </span>
        <span>Clear All</span>
      </button>
    </div>

    <div class="field is-grouped is-justify-content-center">
      <div class="control">
        <button title="Press to save option settings" @click="saveOption" class="button is-link">
          Save
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.icon-stack {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  text-align: center; /* Center text */
  width: 100px; /* Set a fixed width */
  height: 90px; /* Set a fixed height */
  white-space: initial; /* Allow text to wrap */
}
.svg-icon {
  fill: red; /* Change the color */
  cursor: pointer;
}
.svg-icon:hover {
  fill: darkred; /* Change color on hover */
}
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.active {
  width: 32px;
  height: 32px;
  cursor: pointer;
  fill: blue;
}

.active:hover {
  fill: darkblue;
}

.inactive {
  width: 32px;
  height: 32px;
  cursor: not-allowed;
  fill: gray;
}
</style>
