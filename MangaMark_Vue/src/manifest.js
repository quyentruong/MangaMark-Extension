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
  options_page: 'options.html',

  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.js'],
      css: ['css/positions.css', 'css/contentScript.css'],
    },
  ],

  web_accessible_resources: [
    {
      resources: ['css/positions.css', 'css/contentScript.css', 'css/options.css', 'css/popup.css', 'icons/gear.png'],
      matches: [],
    },
  ],
  host_permissions: ["http://*/*", "https://*/*"],
  permissions: ['alarms', 'storage', 'activeTab'],
  update_url: "https://raw.githubusercontent.com/quyentruong/MangaMark-Extension/main/updates.xml"
})
