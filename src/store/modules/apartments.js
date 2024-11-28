import axios from "axios";

const state = {
  apartments: [],
};

const mutations = {
  setApartments(state, apartments) {
    state.apartments = apartments;
  },
};

const actions = {
  async fetchApartments({ commit }, premiseId = "") {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://dev.moydomonline.ru/api/geo/v1.0/apartments/?premise_id=${premiseId}`,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );

      const apartments = response.data?.results.map(apartment => ({
        id: apartment.id,
        number: apartment.number,
      }));

      commit("setApartments", apartments);
    } catch (error) {
      console.error("Ошибка загрузки квартир:", error);
    }
  },
};

const getters = {
  apartments(state) {
    return state.apartments;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
