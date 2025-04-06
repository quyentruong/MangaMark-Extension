<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import getCurrentTab from '../js/utils/getCurrentTab'
import toDataString from '../js/utils/toDataString'
import { packageName } from '../js/global'

document.title = packageName + ' - Account'
const id = ref('')
const api = ref('')
const showPassword = ref(false)
const currentTab: Ref<any> = ref(null)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
  console.log(showPassword.value)
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
  chrome.storage.sync.get(['ID', 'API'], (result) => {
    id.value = toDataString(result.ID)
    api.value = toDataString(result.API)
  })

  currentTab.value = await getCurrentTab()
})
</script>

<template>
  <div class="container">
    <div class="field">
      <label class="label">ID</label>
      <div class="control">
        <input
          title="Enter Your ID"
          class="input is-rounded"
          type="text"
          placeholder="Your ID"
          v-model="id"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">API Key</label>
      <div class="control has-icons-right">
        <input
          title="Enter Your API Key"
          class="input is-rounded"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Your API Key"
          v-model="api"
        />
        <span
          :title="showPassword ? 'Hide Password' : 'Show Password'"
          :class="showPassword ? 'cross' : ''"
          class="icon is-small is-right cursor-pointe"
          @click="togglePasswordVisibility"
          style="pointer-events: all; cursor: pointer"
        >
          👁️
        </span>
      </div>
    </div>

    <div class="field is-grouped is-justify-content-center">
      <div class="control">
        <button title="Press to save login information" @click="saveLogin" class="button is-link">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cross {
  color: red !important;
  text-decoration-line: line-through;
  text-decoration-style: wavy;
}
</style>
