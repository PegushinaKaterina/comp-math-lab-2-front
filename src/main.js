import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/UI";
import { createRouter, createWebHistory } from "vue-router";
import EquationPage from "@/EquationPage.vue";
import MainPage from "@/MainPage.vue";
import SystemPage from "@/SystemPage.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/equation",
      name: "equation",
      component: EquationPage,
    },
    {
      path: "",
      name: "main",
      component: MainPage,
    },
    {
      path: "/system",
      name: "system",
      component: SystemPage,
    },
  ],
});



const app = createApp(App).use(router);

components.forEach((component) => {
  app.component(component.name, component);
});
app.mount("#app");
