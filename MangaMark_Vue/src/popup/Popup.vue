<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { packageName } from '../js/global'
import '../assets/css/bulma.min.css'
import OptionTab from '../components/OptionTab.vue'
import AccountTab from '../components/AccountTab.vue'
import AboutTab from '../components/AboutTab.vue'
import requestPermission from '../js/utils/requestPermission'

const activeTab = ref(0)
const tabs = [
  { label: 'Account', component: AccountTab, icon: '🔑' },
  { label: 'Option', component: OptionTab, icon: '⚙️' },
  { label: 'About', component: AboutTab, icon: '👨🏻‍💻' },
]

document.title = packageName + ' - Popup'

onMounted(async () => {
  chrome.storage.sync.get(['ID', 'API', 'isFailLogin'], (result) => {
    activeTab.value =
      Object.keys(result).length === 0 ||
      result.ID === '' ||
      result.API === '' ||
      result.isFailLogin
        ? 0
        : 1
  })
  requestPermission()
})
</script>

<template>
  <main class="has-background-light py-3 px-3" style="width: 380px">
    <div class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': activeTab === index }">
          <a @click="activeTab = index">{{ tab.icon }} {{ tab.label }}</a>
        </li>
      </ul>
    </div>
    <component :is="tabs[activeTab].component"></component>
  </main>
</template>

<style>
/* #login-form {
  width: 200px;
} */
</style>
