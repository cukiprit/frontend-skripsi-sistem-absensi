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
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-base-100 w-full">
        <div class="flex-none lg:hidden">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
        </div>
        <div class="mx-2 flex-1 px-2">
          <h1 class="text-xl font-bold">SPK</h1>
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal">
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
      </div>
      <RouterView />
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
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
  </div>
</template>
