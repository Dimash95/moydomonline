<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      <div class="head">
        <h2>
          Заявка № {{ appeal.number }} (от {{ formatDate(appeal.created_at) }})
        </h2>
        <span>{{ appeal.status }}</span>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Дом</label>
          <select
            :value="selectedPremiseId"
            @change="event => updatePremise(event.target.value)"
          >
            <option :value="selectedPremiseId">
              {{ appeal.premise.address }}
            </option>
            <option
              v-for="premise in premises"
              :key="premise.id"
              :value="premise.id"
            >
              {{ premise.address }}
            </option>
          </select>
          <span v-if="errors.premise_id" class="error">{{
            errors.premise_id
          }}</span>
        </div>
        <div class="form-group">
          <label>Квартира</label>
          <select :value="selectedApartmentId" @change="updateApartment">
            <option :value="selectedApartmentId">
              {{ appeal.apartment.number }}
            </option>
            <option
              v-for="apartment in apartments"
              :key="apartment.id"
              :value="apartment.id"
            >
              {{ apartment.number }}
            </option>
          </select>
          <span v-if="errors.apartment_id" class="error">{{
            errors.apartment_id
          }}</span>
        </div>
        <div class="form-group">
          <label>Срок</label>
          <div class="due_date">
            <input
              type="date"
              :value="formatDateTwo(appeal.due_date)"
              @input="updateDueDate"
            />
            <input
              type="time"
              :value="formatTime(appeal.due_date)"
              @input="updateTime"
            />
          </div>
          <span v-if="errors.due_date" class="error">{{
            errors.due_date
          }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Фамилия</label>
          <input
            type="text"
            :value="form.applicant.last_name"
            @input="updateLastName"
            placeholder="Фамилия"
          />
          <span v-if="errors.last_name" class="error">{{
            errors.last_name
          }}</span>
        </div>
        <div class="form-group">
          <label>Имя</label>
          <input
            type="text"
            :value="form.applicant.first_name"
            @input="updateFirstName"
            placeholder="Имя"
          />
          <span v-if="errors.first_name" class="error">{{
            errors.first_name
          }}</span>
        </div>
        <div class="form-group">
          <label>Отчество</label>
          <input
            type="text"
            :value="form.applicant.patronymic_name"
            @input="updatePatronymic"
            placeholder="Отчество"
          />
        </div>
        <div class="form-group">
          <label>Телефон</label>
          <input
            type="text"
            :value="form.applicant.username"
            placeholder="Телефон"
          />
          <span v-if="errors.username" class="error">{{
            errors.username
          }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group full-width">
          <label>Описание заявки</label>
          <textarea
            :value="appeal.description"
            @input="updateDescription"
            placeholder="Описание заявки"
          ></textarea>
        </div>
      </div>

      <div class="modal-buttons">
        <button @click="submitUpdate">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { formatDate } from "../../../helpers/formatDate.js";
import { formatDateTwo } from "../../../helpers/formatDateTwo.js";
import { formatTime } from "../../../helpers/formatTime.js";

export default {
  name: "EditAppealModal",
  props: {
    appeal: Object,
  },
  data() {
    return {
      selectedPremiseId: this.appeal.premise.id,
      selectedApartmentId: this.appeal.apartment.id,
      form: {
        id: this.appeal.id,
        number: this.appeal.number,
        premise_id: this.appeal.premise.id,
        apartment_id: this.appeal.apartment.id,
        created_at: this.appeal.created_at,
        applicant: {
          last_name: this.appeal.applicantLastName,
          first_name: this.appeal.applicantFirstName,
          patronymic_name: this.appeal.applicantPatronymicName,
          username: "",
        },
        description: this.appeal.description,
        due_date: this.appeal.due_date,
        status: this.appeal.status,
      },
      errors: {},
    };
  },
  computed: {
    ...mapState("premises", ["premises"]),
    ...mapState("apartments", ["apartments"]),
  },
  methods: {
    ...mapActions(["fetchAppeals"]),
    formatDate,
    formatDateTwo,
    formatTime,
    closeModal() {
      this.$emit("close");
    },
    ...mapActions("premises", ["fetchPremises"]),
    ...mapActions("apartments", ["fetchApartments"]),
    ...mapActions("appeals", ["fetchAppeals", "updateAppeal"]),
    updateLastName(event) {
      this.form.applicant.last_name = event.target.value;
    },
    updateFirstName(event) {
      this.form.applicant.first_name = event.target.value;
    },
    updatePatronymic(event) {
      this.form.applicant.patronymic_name = event.target.value;
    },
    updateDescription(event) {
      this.form.description = event.target.value;
    },
    updatePremise(premiseId) {
      this.form.premise_id = premiseId;
      this.selectedPremiseId = premiseId;
      this.fetchApartments(premiseId);
    },
    updateApartment(event) {
      this.form.apartment_id = event.target.value;
    },
    updateDueDate(event) {
      const inputDate = event.target.value;
      const localDate = new Date(inputDate);
      const offset = -localDate.getTimezoneOffset(); // Смещение временной зоны в минутах
      const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(
        2,
        "0",
      );
      const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, "0");
      const offsetSign = offset >= 0 ? "+" : "-";
      this.form.due_date = `${localDate
        .toISOString()
        .substring(0, 19)}${offsetSign}${offsetHours}:${offsetMinutes}`;
    },
    updateTime(event) {
      const time = event.target.value;
      const currentDueDate = this.form.due_date
        ? this.form.due_date.split("T")[0]
        : new Date().toISOString().split("T")[0];
      this.form.due_date = `${currentDueDate}T${time}:00Z`;
    },
    validateForm() {
      this.errors = {};

      if (!this.form.applicant.last_name.trim()) {
        this.errors.last_name = "Фамилия обязательна";
      }

      if (!this.form.applicant.first_name.trim()) {
        this.errors.first_name = "Имя обязательно";
      }

      const phonePattern = /^\+?[1-9]\d{1,14}$/;
      if (!phonePattern.test(this.form.applicant.username)) {
        this.errors.username = "Введите корректный номер телефона (10 цифр)";
      }

      if (!this.form.description.trim()) {
        this.errors.description = "Описание обязательно";
      }

      if (!this.form.due_date) {
        this.errors.due_date = "Дата обязательна";
      }

      if (!this.form.premise_id) {
        this.errors.premise_id = "Выберите помещение";
      }

      if (!this.form.apartment_id) {
        this.errors.apartment_id = "Выберите квартиру";
      }

      return Object.keys(this.errors).length === 0;
    },
    async submitUpdate() {
      if (this.validateForm()) {
        try {
          await this.updateAppeal(this.form);
          await this.fetchAppeals();
          this.closeModal();
        } catch (error) {
          console.error("Ошибка редактирования заявки:", error);
        }
      } else {
        console.log("Ошибки валидации:", this.errors);
      }
    },
  },
  created() {
    this.fetchPremises();
    const username = localStorage.getItem("username");
    this.form.applicant.username = username;
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 600px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 24px;

  .head {
    display: flex;
    justify-content: space-between;
  }
}

h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group.full-width {
  flex: 100%;
}

label {
  font-size: 12px;
  color: #50b053;
}

input,
textarea,
select {
  padding: 8px;
  border-radius: 8px;
  border: none;
  border-bottom: 1px solid #cccc;
  font-size: 14px;
  width: 100%;
}

textarea {
  height: 80px;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #40a9ff;
  box-shadow: 0 0 6px rgba(24, 144, 255, 0.2);
}

.due_date {
  display: flex;
  border: none;
  border-bottom: 1px solid #cccc;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 8px 20px;
  background-color: #52c41a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #389e0d;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
