import Vue from "vue";
import Router from "vue-router";
import LoginPage from "./pages/LoginPage/Index.vue";
import HomePage from "./pages/HomePage/Index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/login", name: "Login", component: LoginPage },
    { path: "/", name: "Home", component: HomePage },
    { path: "*", redirect: "/login" },
  ],
});
