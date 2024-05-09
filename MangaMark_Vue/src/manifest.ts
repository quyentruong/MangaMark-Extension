// @ts-nocheck
import { defineManifest } from '@crxjs/vite-plugin'
import packageData from "../package.json"

export default defineManifest({
  name: packageData.displayName,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.ts'],
    },
  ],

  web_accessible_resources: [
    {
      resources: ['icons/google.png', 'icons/trash.png', 'icons/logo.ico', 'icons/google-disable.png'],
      matches: [],
    },
  ],
  host_permissions: ['<all_urls>'],
  permissions: ['alarms', 'storage', 'activeTab'],
  commands: {
    update_chapter: {
      suggested_key: {
        default: 'Ctrl+Shift+U',
        mac: 'Command+Shift+U',
      },
      description: 'Update chapter',
    },
  }
})
