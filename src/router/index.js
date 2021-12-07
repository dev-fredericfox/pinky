import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Start from "../views/Start.vue";
import Predict from "../views/Predict.vue";
import About from "../views/About.vue";
import Imprint from "../views/Imprint.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/imprint",
    name: "Imprint",
    component: Imprint,
  },
  {
    path: "/start",
    name: "Start",
    component: Start,
  },
  {
    path: "/predict",
    name: "Predict",
    component: Predict,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
