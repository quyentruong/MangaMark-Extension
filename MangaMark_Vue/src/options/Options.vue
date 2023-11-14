<script setup lang="js">
import { ref, onMounted, watch } from 'vue'
import { listWebsites, packageName, version } from '../js/global'
import '../assets/css/bulma.min.css'

const selectedPosition = ref('top_left')
const websites = ref([])
const tabID = ref(null)
const selectedInterval = ref(5)
const selectedWebsite = ref('nettruyen')
const googleSrc = ref('')
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
onMounted(() => {
  chrome.storage.sync.get(['POSITION', 'TAB_ID', 'INTERVAL'], (result) => {
    selectedPosition.value = result.POSITION || 'top_left'
    tabID.value = result.TAB_ID || null
    selectedInterval.value = result.INTERVAL || 5
  })
  websites.value = listWebsites
  googleSrc.value = chrome.runtime.getURL('icons/google.png')
})

watch(selectedPosition, (newPosition) => {
  selectedPosition.value = newPosition
})

function googleSearch() {
  chrome.tabs.create({ url: 'https://www.google.com/search?q=' + selectedWebsite.value })
}

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
  }
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
        <!-- End Second Column -->
      </div>
    </div>

    <div class="field is-grouped is-justify-content-center">
      <div class="control">
        <button @click="saveOption" class="button is-link">Save</button>
      </div>
    </div>

    <!-- <div class="column">
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
    </div> -->
  </main>
</template>

<style></style>
