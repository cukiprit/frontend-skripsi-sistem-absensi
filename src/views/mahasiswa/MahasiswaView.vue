<script setup>
import { RouterLink } from "vue-router";
import { getMahasiswa } from "@/services/api";
import { onBeforeUnmount, onMounted, ref } from "vue";

const mahasiswaList = ref([]);
const error = ref(null);
const loading = ref(true);

const fetchMahasiswa = async () => {
  try {
    const data = await getMahasiswa();
    mahasiswaList.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onBeforeUnmount(() => {
  loading.value = true;
});

onMounted(() => fetchMahasiswa());
</script>

<template>
  <div>
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
      <!-- <span>{{ error }}</span> -->
    </div>

    <h1 class="text-3xl font-bold mb-3">Absensi</h1>

    <div class="mx-auto">
      <RouterLink class="btn btn-primary mb-3" to="/mahasiswa/add"
        >Tambah anggota</RouterLink
      >
    </div>

    <div v-if="loading" class="text-center">Loading...</div>

    <div v-else-if="mahasiswaList" class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>NIM</th>
            <th>Divisi</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mahasiswa, index) in mahasiswaList" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ mahasiswa.NIM }}</td>
            <td>{{ mahasiswa.Nama }}</td>
            <td>{{ mahasiswa.Divisi }}</td>
            <td>
              <div class="btn btn-primary">
                <RouterLink :to="`/mahasiswa/${mahasiswa.NIM}`">
                  Details
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
