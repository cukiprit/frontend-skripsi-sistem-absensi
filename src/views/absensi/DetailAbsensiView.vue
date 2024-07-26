<script setup>
import absensi from "@/stores/absensi";
import { ref } from "vue";

const store = absensi();

const loading = ref(true);

const fetchDetailAbsensi = async () => {
  try {
  } catch (err) {}
};
</script>

<template>
  <h1 class="text-2xl font-bold">Detail Absensi</h1>
</template>
