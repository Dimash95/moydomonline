import axios from "axios";

const state = {
  appeals: [],
  totalAppeals: 0,
  currentPage: 1,
  pageSize: 10,
  search: "",
  selectedPremise: "",
};

const mutations = {
  setAppeals(state, appeals) {
    state.appeals = appeals;
  },
  setTotalAppeals(state, total) {
    state.totalAppeals = total;
  },
  setPageSize(state, pageSize) {
    state.pageSize = pageSize;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
  setSearch(state, search) {
    state.search = search;
  },
  setSelectedPremise(state, premiseId) {
    state.selectedPremise = premiseId; // Устанавливаем выбранный дом
  },
  updateAppealInState(state, updatedAppeal) {
    const index = state.appeals.findIndex(
      appeal => appeal.id === updatedAppeal.id,
    );
    if (index !== -1) {
      state.appeals.splice(index, 1, updatedAppeal);
    }
  },
  createAppealInState(state, newAppeal) {
    state.appeals.push(newAppeal);
  },
};

const actions = {
  async fetchAppeals({ commit, state }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://dev.moydomonline.ru/api/appeals/v1.0/appeals/",
        {
          headers: { Authorization: `Token ${token}` },
          params: {
            search: state.search,
            page_size: state.pageSize,
            page: state.currentPage,
            premise_id: state.selectedPremise,
          },
        },
      );

      const appeals = response.data.results.map(fetchedAppeal => ({
        id: fetchedAppeal?.id,
        number: fetchedAppeal?.number,
        created_at: fetchedAppeal?.created_at,
        premise: {
          id: fetchedAppeal?.premise?.id,
          address: fetchedAppeal?.premise?.address,
        },
        apartment: {
          id: fetchedAppeal?.apartment?.id,
          number: fetchedAppeal?.apartment?.number,
        },
        applicantLastName: fetchedAppeal?.applicant?.last_name,
        applicantFirstName: fetchedAppeal?.applicant?.first_name,
        applicantPatronymicName: fetchedAppeal?.applicant?.patronymic_name,
        description: fetchedAppeal?.description,
        due_date: fetchedAppeal?.due_date,
        status: fetchedAppeal?.status?.name,
      }));

      commit("setAppeals", appeals);
      commit("setTotalAppeals", response.data.count);
    } catch (error) {
      console.error("Ошибка при загрузке заявок:", error);
    }
  },
  async createAppeal({ commit }, createdAppeal) {
    console.log(createdAppeal);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://dev.moydomonline.ru/api/appeals/v1.0/appeals/",
        createdAppeal,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      commit("createAppealInState", response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async updateAppeal({ commit }, updatedAppeal) {
    try {
      const token = localStorage.getItem("authToken");
      const { id, ...appealData } = updatedAppeal;

      const response = await axios.patch(
        `https://dev.moydomonline.ru/api/appeals/v1.0/appeals/${id}/`,
        appealData,
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      commit("updateAppealInState", response.data);
    } catch (error) {
      console.error("Ошибка обновления заявки:", error);
      throw error;
    }
  },
};

const getters = {
  totalPages: state => Math.ceil(state.totalAppeals / state.pageSize),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
