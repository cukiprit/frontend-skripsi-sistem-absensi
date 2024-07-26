<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const authenticate = computed(() => !!auth.token);

const handleLogout = () => {
  auth.logout();
  router.push("/login");
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
        <li v-if="authenticate">
          <RouterLink to="/mahasiswa">Mahasiswa</RouterLink>
        </li>
        <li>
          <RouterLink to="/absensi">Absensi</RouterLink>
        </li>
        <li>
          <RouterLink to="/absensi/leaderboard">Leaderboard</RouterLink>
        </li>
        <li>
          <RouterLink to="/notulensi">Notulensi</RouterLink>
        </li>
        <li v-if="authenticate">
          <button @click="handleLogout">Logout</button>
        </li>
        <li v-else>
          <RouterLink to="/login">Login</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
