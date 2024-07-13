import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailMahasiswaView from "../views/mahasiswa/DetailMahasiswaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mahasiswa",
      name: "mahasiswa",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/mahasiswa/MahasiswaView.vue"),
    },
    {
      path: "/mahasiswa/add",
      name: "add-mahasiswa",
      component: () => import("../views/mahasiswa/AddMahasiswaView.vue"),
    },
    {
      path: "/mahasiswa/:nim",
      name: "mahasiswa-detail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/mahasiswa/DetailMahasiswaView.vue"),
    },
    {
      path: "/absensi",
      name: "absensi",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/absensi/AbsensiView.vue"),
    },
    {
      path: "/absensi/:id",
      name: "absensi-detail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/absensi/DetailAbsensiView.vue"),
    },
  ],
});

export default router;
