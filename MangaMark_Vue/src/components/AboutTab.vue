<script setup lang="ts">
import pkg from '../../package.json'

document.title = pkg.displayName + ' - About'
</script>
<template>
  <div class="container">
    <h5 class="title is-5">{{ pkg.displayName }} v{{ pkg.version }}</h5>
    <a
      class="button is-link"
      href="https://github.com/quyentruong/MangaMark-Extension/blob/main/MangaMark_Vue/CHANGELOG.md"
      target="_blank"
      >Changelog</a
    >

    <p class="has-text-grey">{{ pkg.copyright }}</p>
  </div>
</template>
