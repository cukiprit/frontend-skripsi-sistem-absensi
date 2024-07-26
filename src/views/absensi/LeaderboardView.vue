<script setup>
import { leaderboard } from "@/services/api-absensi";
import { onMounted, ref } from "vue";

const leaderboards = ref([]);
const error = ref(null);
const loading = ref(true);

const fetchLeaderboard = async () => {
  try {
    const data = await leaderboard();
    console.log("Fetched Leaderboard List:", data);

    leaderboards.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchLeaderboard());
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-5">Leaderboard</h1>

    <div class="overflow-x-auto">
      <table class="table">
        <tbody>
          <tr v-for="data in leaderboards" :key="data.nama">
            <th class="text-2xl font-bold">{{ data.nama }}</th>
            <td>{{ data.total }}</td>
            <!-- <td>Mahasiswa Terbaik</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
