import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Country from "../views/Country.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country/:country",
    name: "Country",
    component: Country,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
