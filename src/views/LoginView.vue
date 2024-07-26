<script setup>
import { login } from "@/services/api-auth";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const auth = useAuthStore();

const error = ref(null);
const loading = ref(false);

const handleLogin = async () => {
  const data = {
    username: auth.nim,
    password: auth.password,
  };

  loading.value = true;

  try {
    const token = await login(data);
    console.log(token);

    auth.saveToken(token);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="card">
      <h1 class="text-3xl font-bold">Login</h1>

      <form @submit.prevent>
        <div class="form-control mb-4">
          <label for="Username" class="label">
            <span class="label">NIM</span>
          </label>
          <input
            type="text"
            placeholder="Masukkan NIM"
            class="input input-bordered w-full"
            v-model="auth.nim"
          />
        </div>

        <div class="form-control mb-4">
          <label for="Username" class="label">
            <span class="label">Password</span>
          </label>
          <input
            type="password"
            placeholder="Masukkan Password"
            class="input input-bordered w-full"
            v-model="auth.password"
          />
        </div>

        <div class="form-control mb-4">
          <button
            type="button"
            @click="handleLogin"
            class="btn btn-primary w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
