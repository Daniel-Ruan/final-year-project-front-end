import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from './router';
import axios from 'axios'

import { useStyleStore } from "./stores/style.js";
import { darkModeKey, styleKey } from "./config";

import "./css/main.css";
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
import Datepicker from 'vue3-datepicker'

axios.defaults.baseURL = 'http://localhost:1337/api'
/* Init Pinia */
const pinia = createPinia();
const app = createApp(App)
/* Create Vue app */


/* Init Pinia stores */

const styleStore = useStyleStore(pinia);


/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "P1908332-FYP";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});

app.use(router, vue3PhotoPreview, Datepicker)
app.use(pinia)
app.mount("#app");