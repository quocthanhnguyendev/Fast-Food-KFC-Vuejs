import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/HomePage.vue"),
  },

  {
    path: "/shop",
    name: "Shop",
    component: () => import("../pages/ShopPage.vue"),
  },

  {
    path: "/shop/:id",
    name: "Category",
    component: () => import("../pages/ShopPage.vue"),
  },

  {
    path: "/cart",
    name: "Cart",
    component: () => import("../pages/CartPage.vue"),
  },

  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../pages/DetailProduct.vue"),
  },

  {
    path: "/about",
    name: "About",
    component: () => import("../pages/AboutPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
