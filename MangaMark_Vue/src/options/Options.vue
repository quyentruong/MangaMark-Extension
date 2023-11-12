<script setup lang="js">
import { ref, onMounted, watch } from 'vue'
import { listWebsites, packageName, version } from '../js/global'
import '../assets/css/options.css'
import '../assets/css/popup.css'

const selectedPosition = ref('top_left')
const websites = ref([])
const tabID = ref(null)
const selectedInterval = ref(5)
document.title = packageName + ' - Options'
onMounted(() => {
  chrome.storage.sync.get(['POSITION', 'TAB_ID', 'INTERVAL'], (result) => {
    selectedPosition.value = result.POSITION || 'top_left'
    tabID.value = result.TAB_ID || null
    selectedInterval.value = result.INTERVAL || 5
  })
  websites.value = listWebsites
})

watch(selectedPosition, (newPosition) => {
  selectedPosition.value = newPosition
})

function saveOption() {
  chrome.runtime.sendMessage({ command: 'resetAlarm' }, (response) => {
    if (response && response.success) {
      window.close()
    }
  })
  // chrome.runtime.sendMessage({ command: 'resetAlarm' })
  chrome.storage.sync.set({ POSITION: selectedPosition.value, INTERVAL: selectedInterval.value })
  // window.close()
  if (tabID.value) {
    chrome.tabs.update(tabID.value, { active: true })
    chrome.tabs.reload(tabID.value)
    window.close()
  }
}
</script>

<template>
  <main>
    <h1>{{ packageName }} v{{ version }}</h1>
    <div class="row">
      <div class="column">
        <h2>Badge Position</h2>
        <label class="container"
          >Top Left
          <input type="radio" v-model="selectedPosition" name="position" value="top_left" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Top Center
          <input type="radio" v-model="selectedPosition" name="position" value="top_center" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Top Right
          <input type="radio" v-model="selectedPosition" name="position" value="top_right" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Left Center
          <input type="radio" v-model="selectedPosition" name="position" value="left_center" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Center
          <input type="radio" v-model="selectedPosition" name="position" value="ccenter" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Right Center
          <input type="radio" v-model="selectedPosition" name="position" value="right_center" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bottom Left
          <input type="radio" v-model="selectedPosition" name="position" value="bottom_left" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bottom Center
          <input type="radio" v-model="selectedPosition" name="position" value="bottom_center" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bottom Right
          <input type="radio" v-model="selectedPosition" name="position" value="bottom_right" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="column">
        <h2>Auto Save Interval</h2>
        <label>
          <input
            v-model="selectedInterval"
            id="interval"
            type="number"
            name="interval"
            min="0.1"
            max="10"
            step="0.01"
          />
          <span style="font-size: medium">minutes</span>
        </label>
        <br />
        <label>{{ (selectedInterval * 60).toFixed(1) }} seconds</label>
      </div>
      <div class="column">
        <h2>
          Support Websites: <span>{{ websites.length }}</span>
        </h2>
        <p style="font-size: medium">
          <a
            v-for="(website, index) in websites"
            :key="index"
            :href="`https://www.google.com/search?q=${website}`"
            target="_blank"
            >{{ website }} <br
          /></a>
        </p>
      </div>
      <input @click="saveOption" id="save" type="button" value="Save" />
    </div>
  </main>
</template>

<style></style>
