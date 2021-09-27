import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Start from "../views/Start.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/start",
    name: "Start",
    component: Start,
  },
  {
    //This route can probably be deleted if we go the component route
    path: "/Datavalidation",
    name: "Datavalidation",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Datavalidation.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
