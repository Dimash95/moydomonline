<template>
  <div class="home-page">
    <FilterBar
      @updateSearch="updateSearch"
      @updatePremise="updatePremise"
      @openCreateModal="openCreateModal"
    />

    <AppealsTable :appeals="appeals" @openEditModal="openEditModal" />

    <div class="controls">
      <div class="left-controls">
        <RecordsInfo
          :currentPage="currentPage"
          :pageSize="localPageSize || 10"
          :total="totalAppeals"
        />
        <PageSizeDropdown
          :pageSizes="pageSizes"
          :pageSize="localPageSize"
          @changePageSize="updatePageSize"
        />
      </div>

      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :pageSize="localPageSize"
        @changePage="changePage"
      />
    </div>

    <CreateAppealModal
      v-if="createModalVisible"
      @close="createModalVisible = false"
    />

    <EditAppealModal
      v-if="editModalVisible"
      :appeal="editAppealData"
      @close="editModalVisible = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AppealsTable from "./AppealsTable.vue";
import CreateAppealModal from "./modal/CreateAppealModal.vue";
import EditAppealModal from "./modal/EditAppealModal.vue";
import FilterBar from "../../components/FilterBar.vue";
import Pagination from "../../components/Pagination.vue";
import PageSizeDropdown from "../../components/PageSizeDropdown.vue";
import RecordsInfo from "../../components/RecordsInfo.vue";

export default {
  components: {
    AppealsTable,
    FilterBar,
    Pagination,
    PageSizeDropdown,
    CreateAppealModal,
    EditAppealModal,
    RecordsInfo,
  },
  data() {
    return {
      createModalVisible: false,
      editModalVisible: false,
      editAppealData: {},
      pageSizes: [5, 10, 25, 50],
      localPageSize: this.pageSize,
    };
  },
  computed: {
    ...mapState("appeals", [
      "appeals",
      "totalAppeals",
      "currentPage",
      "pageSize",
    ]),
    ...mapGetters("appeals", ["totalPages"]),
  },
  watch: {
    pageSize(newPageSize) {
      this.localPageSize = newPageSize;
    },
  },
  methods: {
    ...mapActions("appeals", ["fetchAppeals", "updateAppeal"]),
    changePage(page) {
      this.$store.commit("appeals/setCurrentPage", page);
      this.fetchAppeals();
    },
    updateSearch(search) {
      this.$store.commit("appeals/setSearch", search);
      this.$store.commit("appeals/setCurrentPage", 1);
      this.fetchAppeals();
    },
    updatePageSize(newPageSize) {
      this.localPageSize = newPageSize;
      this.$store.commit("appeals/setPageSize", newPageSize);
      this.$store.commit("appeals/setCurrentPage", 1);
      this.fetchAppeals();
    },
    updatePremise(selectedPremise) {
      this.$store.commit("appeals/setSelectedPremise", selectedPremise);
      this.fetchAppeals();
    },
    openCreateModal() {
      this.createModalVisible = true;
    },
    openEditModal(appeal) {
      this.editAppealData = appeal;
      this.editModalVisible = true;
    },
  },
  created() {
    this.fetchAppeals();
  },
  mounted() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.home-page {
  padding: 20px;
  background-color: #f7f8fa;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  color: #4a4a4a;
  margin-bottom: 20px;
}

.controls {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-controls {
  display: flex;
  gap: 10px;
}
</style>
