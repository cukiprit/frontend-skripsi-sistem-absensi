import { defineStore } from "pinia";

const absensi = defineStore("absensi", {
  state: () => ({
    absensi: [],
    formAbsensi: {},
  }),
});

export default absensi;
