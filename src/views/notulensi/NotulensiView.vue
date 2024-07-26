<script setup>
import { getNotulensi } from "@/services/api-notulensi";
import { onMounted, ref } from "vue";

const notulensi = ref([]);
const error = ref(null);
const loading = ref(true);

const fetchNotulensi = async () => {
  try {
    const data = await getNotulensi();
    console.log(`Fetched Notulensi: ${data}`);

    notulensi.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchNotulensi());
</script>

<template>
  <h1 class="text-3xl font-bold">Notulensi</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="item in notulensi" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ item.judul }}</h2>
        <div class="card-actions justify-end mt-auto">
          <button class="btn btn-primary text-white mt-4">
            Baca Notulensi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
