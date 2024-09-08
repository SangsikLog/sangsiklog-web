import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import { router } from './router'
import vuetify from './plugins/vuetify'
import '@/scss/style.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app')
