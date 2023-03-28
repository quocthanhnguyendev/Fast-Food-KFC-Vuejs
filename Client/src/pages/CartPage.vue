<template>
  <div class="Cart-Container">
    <div class="container">
      <div class="row">
        <!-- Product Cart -->
        <div class="col-lg-9 p-0 Cart-Site">
          <div class="Cart-Title d-flex">
            <h2><span class="text-danger">GIỎ HÀNG</span> CỦA TÔI</h2>

            <span>{{ getNumberProductsCart }} món ăn</span>
          </div>

          <div v-if="getProductsCart.length > 0">
            <div
              class="product"
              v-for="item in getProductsCart"
              :key="item.name"
            >
              <div
                class="row d-flex justify-content-center align-items-center text-center"
              >
                <div class="col-lg-2">
                  <img :src="'/images/' + item.image" class="w-100" alt="" />
                </div>
                <div class="col-lg-3">
                  <h5 class="Product-Name">{{ item.name }}</h5>
                </div>
                <div class="col-lg-2 text-danger">
                  <h5 class="Product-Price">
                    {{ FormatCurrency(item.price) }}
                  </h5>
                </div>
                <div class="col-lg-3">
                  <div class="Quatity" style="width: 100%">
                    <button class="btn btn-danger" @click="NumberMinus(item)">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="Quatity-Input">{{ item.number }}</span>

                    <button
                      :disabled="item.quatity == 0"
                      class="btn btn-danger"
                      @click="NumberPlus(item)"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="col-lg-2">
                  <button
                    class="btn btn-danger"
                    @click="RemoveProductHandleClick(item)"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <hr style="margin: 5% 0" />
            </div>
          </div>

          <div
            v-else
            class="h-100 d-flex align-items-center justify-content-center"
          >
            <span>Hiện tại không có sản phẩm nào trong giỏ hàng</span>
          </div>
        </div>
        <div class="col-lg-3 p-0 bg-danger text-light">
          <div class="Payment-Title text-light">
            <h2>HOÁ ĐƠN</h2>
          </div>

          <div class="d-flex justify-content-end">
            <hr class="p-0 m-0 w-75 text-light" />
          </div>

          <div class="p-4">
            <div class="d-flex Order-Content justify-content-between mt-3">
              <h5>Tổng số lượng món ăn:</h5>
              <h5>{{ getSumNumberInCart }}</h5>
            </div>

            <div class="d-flex Order-Content justify-content-between mt-3">
              <h5>Tổng tiền:</h5>
              <h5>{{ FormatCurrency(getTotalCart) }}</h5>
            </div>

            <div class="mt-3">
              <button
                :disabled="getProductsCart.length < 1"
                class="btn btn-light w-100 text-danger"
              >
                THANH TOÁN
              </button>
              <button
                :disabled="getProductsCart.length < 1"
                class="btn btn-light w-100 text-danger mt-2"
                @click="DetroyCartHandleClick()"
              >
                HUỶ GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormatCurrency from "../Core/FormatCurrency";

export default {
  name: "CartPage",

  data() {
    return {
      Products: [],
    };
  },

  computed: {
    ...mapGetters([
      "getProductsCart",
      "getNumberProductsCart",
      "getTotalCart",
      "getSumNumberInCart",
    ]),
  },

  methods: {
    ...mapActions(["RemoveOneCart"]),

    RemoveProductHandleClick(product) {
      this.$store.dispatch("RemoveOneCart", { product });
    },

    NumberPlus(product) {
      this.$store.dispatch("AddToCart", { product: product });
    },

    NumberMinus(product) {
      this.$store.dispatch("RemoveOneCart", { product });
    },

    DetroyCartHandleClick() {
      this.$store.dispatch("DetroyCart");
    },

    FormatCurrency(number) {
      return FormatCurrency(number);
    },
  },
};
</script>

<style>
.Cart-Container {
  margin-top: 130px;
  margin-bottom: 50px;
}

.Cart-Site {
  height: 600px;
  overflow-y: auto;
}

.Cart-Site::-webkit-scrollbar {
  display: none;
}

.Cart-Title {
  padding: 20px;
  background: rgba(0, 0, 0, 0.05);
  justify-content: space-between;
  align-items: center;
}

.Cart-Title > h2 {
  font-family: "Oswald", sans-serif;
}

.Cart-Title > span {
  font-family: "Oswald", sans-serif;
}

.product {
  margin: 5% 0;
}

.Product-Name {
  font-family: "Oswald", sans-serif;
}

.Product-Price {
  font-weight: bold;
}

.Quatity {
  display: grid;
  grid-template-columns: 50px auto 50px;
  background: rgba(0, 0, 0, 0.05);
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 10px;
}

.Quatity-Input {
  width: 100%;
  background: none;
  border: none;
  text-align: center;
}

.Quatity-Input:focus {
  outline: none;
}

.Payment-Title {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 20px;
  font-family: "Oswald", sans-serif;
}

.Order-Content {
  font-family: "Oswald", sans-serif;
}
</style>
