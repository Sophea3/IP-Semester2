import './assets/main.css'
import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'
import { apolloClient } from './apollo/client'

// =========================
// Create Vue App
// =========================
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

// =========================
// Plugins
// =========================
app.use(createPinia())
app.use(router)

// =========================
// Mount App
// =========================
app.mount('#app')