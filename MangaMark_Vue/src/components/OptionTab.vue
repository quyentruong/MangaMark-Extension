<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue'
import { listWebsites, packageName } from '../js/global'
import '../assets/css/bulma.min.css'
import getCurrentTab from '../js/utils/getCurrentTab'
import { CachedValue } from 'webext-storage-cache'
import Swal from 'sweetalert2'

const selectedPosition = ref('top_left')
const websites: Ref<string[]> = ref([])
const currentTab: Ref<any> = ref(null)
const selectedInterval = ref(5)
const selectedWebsite = ref('nettruyen')
const googleSrc = ref('')
const trashSrc = ref('')
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
  chrome.storage.sync.get(['POSITION', 'INTERVAL'], (result) => {
    selectedPosition.value = result.POSITION || 'top_left'
    selectedInterval.value = result.INTERVAL || 5
  })
  currentTab.value = await getCurrentTab()
  websites.value = listWebsites
  googleSrc.value = chrome.runtime.getURL('icons/google.png')
  trashSrc.value = chrome.runtime.getURL('icons/trash.png')
})

watch(selectedPosition, (newPosition) => {
  selectedPosition.value = newPosition
})

function googleSearch() {
  chrome.tabs.create({ url: 'https://www.google.com/search?q=' + selectedWebsite.value })
}

function clearCache() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
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
      chrome.storage.sync.clear()
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
        <!-- Separator -->
        <div class="field">
          <label class="label">Clear Cache</label>
          <div class="control pl-5">
            <img @click="clearCache" width="32" :src="trashSrc" style="cursor: pointer" />
          </div>
        </div>
        <!-- End First Column -->
      </div>
      <div class="column">
        <!-- Second Column -->
        <div class="field">
          <label class="label">Auto Save</label>
          <div class="control">
            <input
              style="width: 90px"
              class="input is-rounded"
              v-model="selectedInterval"
              type="number"
              min="0.1"
              max="10"
              step="0.01"
            />
          </div>
          <label>{{ (selectedInterval * 60).toFixed(1) }} seconds</label>
        </div>
        <!-- Separator -->
        <div class="field pt-3">
          <div class="control">
            <img @click="googleSearch" width="32" :src="googleSrc" style="cursor: pointer" />
          </div>
        </div>
        <!-- Separator -->
        <div class="field">
          <label class="label">Clear All</label>
          <div class="control pl-5">
            <img @click="clearAll" width="32" :src="trashSrc" style="cursor: pointer" />
          </div>
        </div>
        <!-- End Second Column -->
      </div>
    </div>

    <div class="field is-grouped is-justify-content-center">
      <div class="control">
        <button @click="saveOption" class="button is-link">Save</button>
      </div>
    </div>
  </main>
</template>

<style></style>
