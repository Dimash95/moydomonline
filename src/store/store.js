import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import appeals from "./modules/appeals";
import premises from "./modules/premises";
import apartments from "./modules/apartments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    appeals,
    premises,
    apartments,
  },
});
