import {createApp} from 'vue'
import {createPinia} from 'pinia';
import App from './App.vue'
import {router} from './router'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';

createApp(App)
  .use(router)
  .use(PerfectScrollbarPlugin)
  .use(createPinia())
  .use(VueTablerIcons)
  .use(VueApexCharts)
  .use(vuetify)
  .mount('#app')
