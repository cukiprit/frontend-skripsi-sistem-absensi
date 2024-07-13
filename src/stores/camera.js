import { defineStore } from "pinia";

const camera = defineStore("camera", {
  state: () => ({
    mediaStream: null,
    formData: {
      name: "",
      nim: "",
      divisi: "",
      dateInput: null,
      timeInput: null,
      status: "hadir",
    },
    mahasiswa: [],
  }),
  actions: {
    async initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.mediaStream = mediaStream;
        return mediaStream;
      } catch (err) {
        throw err.message;
      }
    },
    stopCamera() {
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((track) => track.stop());
        this.mediaStream = null;
      }
    },
    setFormData(field, value) {
      this.formData[field] = value;
    },
  },
});

export default camera;
