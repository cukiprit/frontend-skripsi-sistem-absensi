<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  deleteMahasiswa,
  getMahasiswaByID,
  updateMahasiswa,
} from "@/services/api";
import camera from "@/stores/camera";

const route = useRoute();
const router = useRouter();
const nim = route.params.nim;

const store = camera();
const update = ref(false);
const error = ref(null);
const loading = ref(true);

const fetchMahasiswaByNIM = async () => {
  try {
    const data = await getMahasiswaByID(nim);
    console.log("Fetched Data:", data);
    store.formData.nim = data.NIM;
    store.formData.name = data.Nama;
    store.formData.divisi = data.Divisi;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const submit = async () => {
  const data = {
    NIM: store.formData.nim,
    Nama: store.formData.name,
    Divisi: store.formData.divisi,
  };

  const nim = store.formData.nim;

  try {
    const response = await updateMahasiswa(nim, data);

    console.log(response);

    update.value = false;
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};

const deleteData = async () => {
  try {
    const data = await deleteMahasiswa(store.formData.nim);

    router.push("/mahasiswa");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

onBeforeUnmount(() => {
  store.formData.name = "";
  store.formData.nim = "";
  store.formData.divisi = "";
  error.value = null;
  loading.value = true;
});

onMounted(() => fetchMahasiswaByNIM());
</script>

<template>
  <div class="container mx-auto px-4">
    <div role="alert" class="alert alert-error shadow-lg" v-if="error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.364 5.636l-12.728 12.728m12.728 0L5.636 5.636m12.728 0L5.636 18.364m0-12.728L18.364 18.364"
        ></path>
      </svg>
      <span>{{ error }}</span>
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <h1 class="text-3xl font-bold">
        {{ store.formData.name }}
      </h1>
      <p>{{ store.formData.nim }}</p>
      <p>{{ store.formData.divisi }}</p>

      <div class="flex space-x-4 my-4">
        <button @click="update = !update" class="btn btn-warning">
          Update
        </button>
        <!-- <button class="btn btn-error">Delete</button> -->
        <!-- Open the modal using ID.showModal() method -->
        <button class="btn btn-error" onclick="my_modal_1.showModal()">
          Hapus
        </button>
      </div>
    </div>

    <form v-if="update" @submit.prevent class="p-6 rounded-lg shadow-lg">
      <h3 class="text-2xl font-bold mb-4">Update Anggota</h3>

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
          readonly
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

      <div class="form-control mt-4">
        <button type="submit" @click="submit" class="btn btn-warning">
          Update
        </button>
      </div>
    </form>

    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hapus Anggota</h3>
        <p class="py-4">Apakah Anda yakin ingin menghapus data anggota ini?</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
            <button @click="deleteData" class="btn btn-error">Hapus</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
