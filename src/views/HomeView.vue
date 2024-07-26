<script setup>
import camera from "@/stores/camera";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { addAbsensi, recognizeFace } from "@/services/api-absensi";

const store = camera();
const video = ref(null);
const canvas = ref(null);
const showCanvas = ref(true);
const toastMessage = ref(null);
const toastType = ref(null);
// let timeInterval = null;

const showToast = (message, type) => {
  toastMessage.value = message;
  toastType.value = type;
  setTimeout(() => {
    toastMessage.value = null;
    toastType.value = null;
  }, 5000);
};

const recognizeFaceData = async (imageData) => {
  try {
    const response = await recognizeFace(imageData);

    const { NIM, Nama, Divisi } = response;
    store.formData.nim = NIM;
    store.formData.name = Nama;
    store.formData.divisi = Divisi;

    showToast("Face recognized successfully", "success");
  } catch (err) {
    console.error(err.message);
    showToast("Error recognizing face", "error");
  }
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await recognizeFaceData(file);
  }
};

const submitAbsensi = async () => {
  const data = {
    id_mahasiswa: store.formData.nim,
    tanggal_absensi: store.formData.dateInput,
    jam_absensi: store.formData.timeInput,
    keterangan: store.formData.status,
  };

  // console.log(data);

  try {
    const response = await addAbsensi(data);

    showToast("Absensi submitted successfully", "success");
  } catch (err) {
    showToast(`Error: ${err.message}`, "error");
    throw new Error(`Error: ${err.message}`);
  }
};

const snap = () => {
  // console.log("Snap function called");
  if (canvas.value && video.value) {
    // console.log("Video and canvas elements are available");
    const context = canvas.value.getContext("2d");
    context.drawImage(
      video.value,
      0,
      0,
      canvas.value.width,
      canvas.value.height
    );
    canvas.value.toBlob(async (blob) => {
      const imageData = new File([blob], "image.jpg", { type: "image/jpeg" });
      await recognizeFaceData(imageData);
      showCanvas.value = false;
    }, "image/jpeg");
  } else {
    console.log("Video or canvas element is not available");
  }
};

// const updateDateTime = () => {
//   const now = new Date();
//   store.setFormData("dateInput", now.toISOString().split("T")[0]);
//   store.setFormData("timeInput", now.toTimeString().split(" ")[0].slice(0, 5));
// };

onMounted(async () => {
  const mediaStream = await store.initCamera();
  if (video.value) {
    video.value.srcObject = mediaStream;
    video.value.play();
  }

  const now = new Date();
  if (!store.formData.dateInput) {
    store.formData.dateInput = now.toISOString().split("T")[0];
  }
  if (!store.formData.timeInput) {
    store.formData.timeInput = now.toTimeString().split(" ")[0].slice(0, 5);
  }
  // updateDateTime();
  // timeInterval = setInterval(updateDateTime, 60000);
});

onBeforeUnmount(() => {
  store.stopCamera();
  store.formData.nim = "";
  store.formData.name = "";
  store.formData.divisi = "";
  canvas.value = null;
  video.value = null;
  // if (timeInterval) {
  //   clearInterval(timeInterval);
  // }
});

watch(
  () => store.mediaStream,
  (newStream) => {
    if (video.value) {
      video.value.srcObject = newStream;
    }
  }
);
</script>

<template>
  <div class="flex flex-col md:flex-row p-5">
    <div class="w-full md:w-1/2 p-2">
      <div class="aspect-w-16 aspect-h-9">
        <div class="flex items-center justify-center">
          <video ref="video" class="w-full h-full"></video>
        </div>

        <canvas
          v-show="canvas != null"
          ref="canvas"
          class="hidden mt-3 w-full h-full"
        ></canvas>

        <input
          type="file"
          accept="image/*"
          class="file-input w-full mt-3"
          @change="handleFileChange"
        />

        <button type="button" class="btn btn-primary w-full mt-3" @click="snap">
          Snap
        </button>
      </div>
    </div>
    <div class="w-full md:w-1/2 p-2">
      <form @submit.prevent class="p-4 rounded-lg shadow-md">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            v-model="store.formData.name"
            class="input input-bordered"
          />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">NIM</span>
          </label>
          <input
            type="text"
            v-model="store.formData.nim"
            class="input input-bordered"
          />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Jabatan</span>
          </label>
          <input
            type="text"
            v-model="store.formData.divisi"
            class="input input-bordered"
          />
        </div>
        <div class="flex space-x-4 mt-4">
          <div class="form-control w-1/2">
            <label class="label">
              <span class="label-text">Tanggal</span>
            </label>
            <input
              type="date"
              v-model="store.formData.dateInput"
              class="input input-bordered"
              readonly
            />
          </div>
          <div class="form-control w-1/2">
            <label class="label">
              <span class="label-text">Waktu</span>
            </label>
            <input
              type="time"
              v-model="store.formData.timeInput"
              class="input input-bordered"
              readonly
            />
          </div>
        </div>

        <div class="form-control mt-4">
          <button type="submit" @click="submitAbsensi" class="btn btn-primary">
            Absen
          </button>
        </div>
      </form>
    </div>
    <div v-if="toastMessage" class="toast toast-top toast-end">
      <div
        class="alert"
        :class="toastType === 'success' ? 'alert-success' : 'alert-error'"
      >
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>
