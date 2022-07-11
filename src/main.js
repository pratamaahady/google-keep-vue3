import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
import router from '@/router'
import components from '@/components'

const app = createApp(App);

// Event Bust
const emitter = mitt();
app.config.globalProperties.emitter = emitter;

// Register Router
app.use(router)

// Register Components
app.use(components)

// Mount on #app
app.mount('#app')