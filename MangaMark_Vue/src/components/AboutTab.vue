<script setup lang="ts">
import { onMounted, ref } from 'vue'
import pkg from '../../package.json'

const showPermissions = ref(false)
document.title = pkg.displayName + ' - About'

onMounted(() => {
  chrome.permissions
    .contains({
      origins: ['<all_urls>'],
    })
    .then((result) => {
      showPermissions.value = result
    })
})

function grantPermissions() {
  chrome.permissions.request({ origins: ['<all_urls>'] }).then((result) => {
    showPermissions.value = result
  })
}
</script>
<template>
  <div class="container">
    <h5 class="title is-5">{{ pkg.displayName }} v{{ pkg.version }}</h5>
    <div class="columns" style="display: flex">
      <div class="column">
        <a
          class="button is-link"
          href="https://github.com/quyentruong/MangaMark-Extension/blob/main/MangaMark_Vue/CHANGELOG.md"
          target="_blank"
          >Changelog</a
        >
      </div>
      <div class="column">
        <button
          class="button is-link"
          :class="showPermissions ? 'hidePermissions' : 'showPermissions'"
          @click="grantPermissions"
        >
          Permissions
        </button>
      </div>
    </div>

    <p class="has-text-grey">{{ pkg.copyright }}</p>
  </div>
</template>
<style scoped>
.showPermissions {
  visibility: visible;
}

.hidePermissions {
  visibility: hidden;
}
</style>
