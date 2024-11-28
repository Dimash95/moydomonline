<template>
  <div class="container">
    <button @click="handleClick">Создать</button>
    <div class="filter-container">
      <!-- Поле поиска -->
      <input
        type="text"
        :value="search"
        @input="updateSearch"
        placeholder="Поиск (№ заявки, название)"
      />

      <!-- Селект для выбора дома -->
      <select :value="selectedPremise" @change="updatePremise">
        <option value="">Все дома</option>
        <option
          v-for="premise in premises"
          :key="premise.id"
          :value="premise.id"
        >
          {{ premise.address }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["updateSearch", "updatePremise", "openCreateModal"],
  data() {
    return {
      search: "",
      premises: [], // Список домов
      selectedPremise: "", // Выбранный дом
    };
  },
  methods: {
    updateSearch(event) {
      this.search = event.target.value;
      this.$emit("updateSearch", this.search); // Вызываем обновление поиска
    },

    updatePremise(event) {
      this.selectedPremise = event.target.value;
      this.$emit("updatePremise", event.target.value); // Вызываем обновление выбранного дома
    },

    handleClick() {
      this.$emit("openCreateModal");
    },

    async fetchPremises() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://dev.moydomonline.ru/api/geo/v2.0/user-premises/",
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
        this.premises = response.data?.results.map(premise => ({
          id: premise.id,
          address: premise.address,
        }));
      } catch (error) {
        console.error("Ошибка загрузки домов:", error);
      }
    },
  },

  created() {
    this.fetchPremises(); // Загрузка домов при создании компонента
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

input,
select {
  padding: 10px;
  background-color: #f7f8fa;
  border: none;
  border-bottom: 1px solid #cccccc;
  width: 45%;
  font-size: 16px;
}

button {
  justify-items: end;
  align-self: end;
  margin-right: 0;
  padding: 8px 20px;
  width: 100px;
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #389e0d;
}
</style>
