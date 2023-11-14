import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

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
  // options_ui: {
  //   page: 'options.html',
  //   open_in_tab: false,
  // },
  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.js'],
    },
  ],

  web_accessible_resources: [
    {
      resources: ['icons/gear.png', 'icons/google.png', 'icons/logo.ico'],
      matches: [],
    },
  ],
  host_permissions: ['http://*/*', 'https://*/*'],
  permissions: ['alarms', 'storage', 'activeTab'],
})
