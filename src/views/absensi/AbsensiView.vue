<script setup>
import { RouterLink } from "vue-router";
import { exportAsExcel, getAbsensi } from "@/services/api";
import { onMounted, ref } from "vue";
import absensi from "@/stores/absensi";
import { formatDateString } from "@/utils/formatDateString";

const store = absensi();

const error = ref(null);
const loading = ref(true);

const fetchAbsensi = async () => {
  try {
    const data = await getAbsensi();
    console.log("Fetched Mahasiswa List:", data);

    // const formattedData = data.map((item) => ({
    //   ...item,
    //   tanggal_absensi: formatDateString(item.tanggal_absensi),
    // }));

    store.absensi = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const exportData = async () => {
  try {
    const response = await exportAsExcel();
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "absensi.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => fetchAbsensi());
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

    <h1 class="text-2xl font-bold mb-3">Absensi</h1>

    <div class="mx-auto">
      <button @click="exportData" class="btn btn-primary mb-3">
        Export data
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Nama</th>
            <th>NIM</th>
            <th>Tanggal Absensi</th>
            <th>Waktu Absensi</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(absensi, index) in store.absensi" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ absensi.nama }}</td>
            <td>{{ absensi.id_mahasiswa }}</td>
            <td>{{ absensi.tanggal_absensi }}</td>
            <td>{{ absensi.jam_absensi }}</td>
            <td>{{ absensi.keterangan }}</td>
            <td>
              <div class="btn btn-primary">
                <RouterLink :to="`/absensi/${absensi.id_absensi}`">
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
