// store/modules/auth.js
import axios from "axios";

const state = {
  errorMessage: "",
};

const mutations = {
  setErrorMessage(state, message) {
    state.errorMessage = message;
  },
};

const actions = {
  async handleLogin({ commit }, form) {
    try {
      const response = await axios.post(
        "https://dev.moydomonline.ru/api/auth/login/",
        form,
      );
      const token = response.data.key;
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", form.username);
      // Clear the error message on successful login
      commit("setErrorMessage", "");
      // Redirect to home page
    } catch (error) {
      // Set the error message when login fails
      commit("setErrorMessage", "Неправильный логин или пароль");
    }
  },
};

const getters = {
  errorMessage(state) {
    return state.errorMessage;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
