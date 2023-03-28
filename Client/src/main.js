import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import store from "./Store";

createApp(App).use(router).use(store).mount("#app");

import "bootstrap/dist/js/bootstrap.bundle.min.js";
