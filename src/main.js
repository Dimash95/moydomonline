import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import "./index.css";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
