import axios from "axios";

const state = {
  premises: [],
};

const mutations = {
  setPremises(state, premises) {
    state.premises = premises;
  },
};

const actions = {
  async fetchPremises({ commit }, search = "") {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://dev.moydomonline.ru/api/geo/v2.0/user-premises/?search=${search}`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      const premises = response.data?.results.map(premise => ({
        id: premise.id,
        address: premise.address,
      }));


      commit("setPremises", premises);
    } catch (error) {
      console.error("Ошибка загрузки домов:", error);
    }
  },
};

const getters = {
  premises(state) {
    return state.premises;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
