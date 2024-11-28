<template>
  <p v-if="!appeals.length" class="loading">Loading ...</p>
  <table v-else>
    <thead>
      <tr>
        <th>№</th>
        <th>Создана</th>
        <th>Адрес</th>
        <th>Заявитель</th>
        <th>Описание</th>
        <th>Срок</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="appeal in appeals" :key="appeal.number">
        <td>
          <button @click="handleClick(appeal)">{{ appeal.number }}</button>
        </td>
        <td>{{ formatDate(appeal.created_at) }}</td>
        <td>
          {{ appeal?.premise?.address + " " + appeal?.apartment?.number }}
        </td>
        <td>
          {{
            appeal.applicantLastName +
            " " +
            appeal?.applicantFirstName.slice(0, 1) +
            "." +
            " " +
            appeal?.applicantPatronymicName.slice(0, 1) +
            "."
          }}
        </td>
        <td>
          {{
            appeal.description.length > 30
              ? appeal.description.slice(0, 30) + "..."
              : appeal.description
          }}
        </td>
        <td>
          {{ formatDate(appeal.due_date) }} {{ formatTime(appeal.due_date) }}
        </td>
        <td>{{ appeal.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { formatDate } from "../../helpers/formatDate.js";
import { formatTime } from "../../helpers/formatTime.js";

export default {
  props: {
    appeals: Array,
  },
  methods: {
    formatDate,
    formatTime,
    handleClick(appeal) {
      this.$emit("openEditModal", appeal);
    },
  },
};
</script>

<style scoped>
.loading {
  text-align: center;
  font-size: 24px;
  margin: 100px 0;
}

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

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  width: 70%;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #40a9ff;
  box-shadow: 0 0 6px rgba(24, 144, 255, 0.2);
}

button {
  padding: 8px 20px;
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

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #f0f2f5;
}

th {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  font-weight: bold;
  color: #389e0d;
  max-width: 300px;
}

td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #595959;
}

tr:hover {
  background-color: #f5f5f5;
  max-width: 300px;
}
</style>
