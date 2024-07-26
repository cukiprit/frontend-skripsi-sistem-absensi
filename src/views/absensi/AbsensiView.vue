<script setup>
import { exportAsExcel, getAbsensi } from "@/services/api-absensi";
import { computed, onMounted, ref } from "vue";
import absensi from "@/stores/absensi";
import { useAuthStore } from "@/stores/auth";

const store = absensi();
const auth = useAuthStore();

const update = ref(true);
const error = ref(null);
const loading = ref(true);

const filterName = ref("");
const filterDate = ref("");

const filteredAbsensi = computed(() => {
  return store.absensi.filter((item) => {
    const matchesName = filterName.value
      ? item.nama.toLowerCase().includes(filterName.value.toLowerCase())
      : true;
    const matchesDate = filterDate.value
      ? item.tanggal_absensi === filterDate.value
      : true;
    return matchesName && matchesDate;
  });
});

const fetchAbsensi = async () => {
  try {
    const data = await getAbsensi();
    console.log("Fetched Mahasiswa List:", data);

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
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-3">Absensi</h1>

    <div v-if="auth.token" class="mx-auto">
      <button @click="exportData" class="btn btn-primary mb-3">
        Export data
      </button>
    </div>

    <div class="mx-auto my-5">
      <h3 class="text-xl font-bold">Filter Data</h3>

      <div class="flex space-x-5">
        <div class="form-control w-full">
          <div class="label">
            <span class="label-text"> Anggota </span>
          </div>
          <input
            type="text"
            placeholder="Nama Anggota"
            class="input input-bordered rounded-md w-full"
            v-model="filterName"
          />
        </div>
        <div class="form-control w-full">
          <div class="label">
            <span class="label-text"> Tanggal Absensi </span>
          </div>
          <input
            type="date"
            class="input input-bordered rounded-md w-full"
            v-model="filterDate"
          />
        </div>
      </div>
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
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(absensi, index) in filteredAbsensi" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ absensi.nama }}</td>
            <td>{{ absensi.id_mahasiswa }}</td>
            <td>{{ absensi.tanggal_absensi }}</td>
            <td>{{ absensi.jam_absensi }}</td>
            <td>
              <select :disabled="update" class="select select-bordered w-full">
                <option value="hadir">Hadir</option>
                <option value="tidak hadir">Tidak Hadir</option>
              </select>
            </td>
            <!-- <td>
              <div class="flex space-x-4">
                <button class="btn btn-warning" @click="update = !update">
                  Update
                </button>
                <button v-show="!update" class="btn btn-success">Update</button>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
