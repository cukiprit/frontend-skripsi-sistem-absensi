<script setup>
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";

const auth = useAuthStore();

onMounted(() => {
  auth.loadToken();
});
</script>

<template>
  <Navbar />
</template>
