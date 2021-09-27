import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../public/style/global.scss";

createApp(App).use(router).mount("#app");
