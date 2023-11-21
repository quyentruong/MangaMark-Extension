<script setup lang="ts">
import { ref } from 'vue'
import { initMangaApi } from '../js/types/manga'
</script>
<template>
  <a class="btn btn-success"
    ><i class="fa fa-heart"></i> <span>{{ initMangaApi?.quantity }}</span></a
  >
</template>
