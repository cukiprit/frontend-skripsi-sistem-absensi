<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";
</script>

<template>
  <header>
    <!-- <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    <NavbarComponent />
  </header>

  <div class="container mx-auto p-4">
    <RouterView />
  </div>
</template>
