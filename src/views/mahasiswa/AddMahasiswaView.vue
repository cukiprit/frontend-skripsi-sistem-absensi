<script setup>
import camera from "@/stores/camera";
import { addMahasiswa } from "@/services/api";

const store = camera();

const submitMahasiswa = async () => {
  const data = {
    NIM: store.formData.nim,
    Nama: store.formData.name,
    Divisi: store.formData.divisi,
  };

  try {
    const response = await addMahasiswa(data);

    console.log(response);
  } catch (err) {
    throw new Error(`Error: ${err.message}`);
  }
};
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold">Add Mahasiswa</h1>

    <form @submit.prevent class="p-6 rounded-lg shadow-lg">
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

      <div class="form-control mt-4">
        <button type="submit" @click="submitMahasiswa" class="btn btn-primary">
          Absen
        </button>
      </div>
    </form>
  </div>
</template>
