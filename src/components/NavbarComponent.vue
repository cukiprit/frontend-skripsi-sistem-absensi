<script setup>
import { RouterLink } from "vue-router";
import theme from "@/stores/theme";
import { computed } from "vue";

const store = theme();

const currentTheme = computed(() =>
  store.theme === "dracula" ? "corporate" : "dracula"
);

const toggleTheme = () => {
  store.toggleTheme();
};
</script>

<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <RouterLink to="/">
        <p class="btn btn-ghost text-xl">Sistem Absensi</p>
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/mahasiswa">Mahasiswa</RouterLink>
        </li>
        <li>
          <RouterLink to="/absensi">Absensi</RouterLink>
        </li>
      </ul>
      <button @click="toggleTheme" type="button" class="btn btn-secondary">
        {{ currentTheme }}
      </button>
    </div>
  </nav>
</template>
