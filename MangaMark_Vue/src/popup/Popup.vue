<script setup lang="ts">
import { ref, onMounted } from 'vue'
import getCurrentTab from '../js/utils/getCurrentTab'
import { packageName, version } from '../js/global'
import '../assets/css/bulma.min.css'
import Options from '../options/Options.vue'
import { initMangaApi } from '../js/types/manga'

const id = ref('')
const api = ref('')
const currentTab = ref(null)
const gearSrc = ref('')
const switchOption = ref(false)

document.title = packageName + ' - Popup'

function openOption() {
  switchOption.value = !switchOption.value
}

function saveLogin() {
  chrome.storage.sync.set({ ID: id.value, API: api.value })

  chrome.tabs.update(currentTab.value.id, { active: true }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError)
    }
  })
  chrome.tabs.reload(currentTab.value.id).then(() => {
    window.close()
  })
}

onMounted(async () => {
  chrome.storage.sync.get(['ID', 'API', 'isFailLogin'], (result) => {
    id.value = result.ID || ''
    api.value = result.API || ''
    switchOption.value = id.value === '' || api.value === '' || result.isFailLogin
    console.log(result.isFailLogin)
  })

  currentTab.value = await getCurrentTab()
  gearSrc.value = chrome.runtime.getURL('icons/gear.png')
})
</script>

<template>
  <main class="has-background-light py-3 px-3" style="width: 380px">
    <div class="container">
      <div style="display: flex; justify-content: space-between">
        <h2 class="subtitle">{{ packageName }} v{{ version }}</h2>
        <span @click="openOption" style="margin-left: auto; cursor: pointer"
          ><img width="26" :src="gearSrc"
        /></span>
      </div>
      <template v-if="switchOption">
        <div class="field">
          <label class="label">ID</label>
          <div class="control">
            <input class="input is-rounded" type="text" placeholder="Your ID" v-model="id" />
          </div>
        </div>

        <div class="field">
          <label class="label">API Key</label>
          <div class="control">
            <input class="input is-rounded" type="text" placeholder="Your API Key" v-model="api" />
          </div>
        </div>

        <div class="field is-grouped is-justify-content-center">
          <div class="control">
            <button @click="saveLogin" class="button is-link">Save</button>
          </div>
        </div>
      </template>
      <template v-else>
        <Options />
      </template>
    </div>
  </main>
</template>

<style>
/* #login-form {
  width: 200px;
} */
</style>
