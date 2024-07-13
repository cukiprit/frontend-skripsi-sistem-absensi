import { defineStore } from "pinia";

const theme = defineStore("themes", {
  state: () => ({
    theme: "dracula",
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dracula" ? "corporate" : "dracula";
      document.documentElement.setAttribute("data-theme", this.theme);
    },
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  },
});

export default theme;
