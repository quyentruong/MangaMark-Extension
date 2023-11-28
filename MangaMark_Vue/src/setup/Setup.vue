<script setup lang="ts">
import { packageName } from '../js/global'
import '../assets/css/bulma.min.css'
import Swal from 'sweetalert2'

document.title = packageName + ' - Setup'
function setup() {
  chrome.permissions
    .request({
      origins: ['<all_urls>'],
    })
    .then((result) => {
      if (result) {
        window.close()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Permission denied',
          text: 'You need to allow permission to use this extension.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        })
      }
    })
}
</script>
<template>
  <main class="container has-background-light" style="width: 600px">
    <div class="content is-normal">
      <h1>{{ packageName }} Setup</h1>
      <p>Click the button below to setup {{ packageName }}. Click Allow when prompted.</p>
      <div class="is-justify-content-center" style="display: flex">
        <button class="button is-link is-rounded" @click="setup">SETUP {{ packageName }}</button>
      </div>
    </div>
  </main>
</template>
