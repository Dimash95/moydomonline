<template>
  <div class="login-page">
    <div class="login-form">
      <h2>Авторизация</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Логин или телефон</label>
          <div>
            <img src="/svg/phone.png" alt="phone" width="20" height="20" />
            <input
              type="text"
              id="username"
              v-model="form.username"
              placeholder="+7"
            />
          </div>
        </div>
        <div class="form-group">
          <div>
            <img src="/svg/password.png" alt="phone" width="20" height="20" />
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              placeholder="Пароль"
            />
            <img
              :src="passwordVisible ? '/svg/eye.png' : '/svg/closed-eye.png'"
              alt="phone"
              width="20"
              height="20"
              @click="togglePasswordVisibility"
            />
          </div>
        </div>
        <button type="submit">Войти</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      passwordVisible: false,
    };
  },
  computed: {
    ...mapState("auth", ["errorMessage"]),
  },
  methods: {
    ...mapActions("auth", ["handleLogin"]),
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    async login() {
      await this.handleLogin(this.form);
      this.$router.push("/");
    },
  },
  mounted() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/img/background.jpeg");
  background-position: center;

  .login-form {
    position: relative;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 400px;
    padding-top: 100px;

    h2 {
      position: absolute;
      top: -20px;
      width: 400px;
      height: 50px;
      background-color: #4caf50;
      text-align: center;
      padding-top: 25px;
      border-radius: 10px;
      color: #fff;
      font-size: 24px;
      font-weight: bold;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .form-group {
      margin-bottom: 20px;

      div {
        display: flex;
        align-items: center;
        border-bottom: 1px solid grey;
      }

      label {
        display: block;
        margin-bottom: 8px;
        padding-left: 40px;
        color: #4caf50;
        font-size: 14px;
      }

      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border: none;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;
      }
    }

    button {
      align-self: center;
      width: 30%;
      padding: 12px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #45a049;
      }
    }

    .error-message {
      color: #ff4d4f;
      font-size: 14px;
      text-align: center;
      margin-top: 15px;
    }
  }
}
</style>
