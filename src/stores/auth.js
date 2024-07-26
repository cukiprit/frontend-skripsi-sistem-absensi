import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    nim: "",
    password: "",
    token: null,
  }),
  actions: {
    saveToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    removeToken() {
      this.token = null;
      localStorage.removeItem("token");
    },
    loadToken() {
      this.token = localStorage.getItem("token");
      return this.token;
    },
    login() {
      if (this.username !== "" && this.password !== "") {
        this.token = Buffer.from(
          `${this.username}:${this.password}`,
          "utf-8"
        ).toString("base64");
        this.saveToken();

        return true;
      }
      return false;
    },
    logout() {
      this.token = null;
      this.removeToken();
    },
  },
});
