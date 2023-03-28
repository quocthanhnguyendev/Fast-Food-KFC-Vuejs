<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/">
        <img src="/images/KFC_logo.svg.png" width="70" alt="" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page"
              >Trang Chủ</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/shop" class="nav-link" aria-current="page"
              >Thực Đơn</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link" aria-current="page"
              >Giới Thiệu</router-link
            >
          </li>
        </ul>
        <router-link to="/cart"
          ><div class="btn btn-danger Btn-Cart">
            <!-- <i class="fas fa-hamburger text-light fa-3x"></i> -->
            <i class="fa-solid fa-bag-shopping fa-3x"></i>
            <span class="badges text-danger bg-light">{{
              getNumberProductsCart
            }}</span>
          </div></router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavbarComponent",
  computed: {
    ...mapGetters(["getNumberProductsCart"]),
  },
};
</script>

<style>
.Btn-Cart {
  position: relative;
}

.badges {
  position: absolute;
  right: 25%;
  left: 25%;
  font-size: 12px;
  max-width: 50px;
  bottom: 10px;
  font-weight: bold;
  border-radius: 5px;
}
</style>
