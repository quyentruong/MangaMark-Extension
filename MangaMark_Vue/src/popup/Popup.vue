<script setup lang="js">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import logWithTimestamp from '../js/utils/logWithTimestamp'
import getCurrentTab from '../js/utils/getCurrentTab'

const id = ref('')
const api = ref('')
const currentTab = ref(null)

function openOption() {
  chrome.storage.sync.set({ TAB_ID: currentTab.value.id })
  chrome.runtime
    .openOptionsPage()
    .then(() => {
      window.close()
    })
    .catch((err) => {
      logWithTimestamp(err)
    })
}

function saveLogin() {
  chrome.storage.sync.set({ ID: id.value, API: api.value })
  window.close()
  chrome.tabs.update(currentTab.value.id, { active: true }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
  })
  chrome.tabs.reload(currentTab.value.id)
}

onMounted(async () => {
  chrome.storage.sync.get(['ID', 'API'], (result) => {
    id.value = result.ID || ''
    api.value = result.API || ''
  })
  currentTab.value = await getCurrentTab()
})
</script>

<template>
  <main>
    <h1>Manga Mark</h1>
    <span id="option" @click="openOption"><img width="26" src="icons/gear.png" /></span>
    <div id="login">
      <label for="id">ID</label>
      <input type="text" id="id" name="id" placeholder="Your ID" v-model="id" />

      <label for="api">API Key</label>
      <input type="text" id="api" name="api" placeholder="Your API Key" v-model="api" />
      <input @click="saveLogin" id="save" type="button" value="Save" />
    </div>
  </main>
</template>

<style></style>
