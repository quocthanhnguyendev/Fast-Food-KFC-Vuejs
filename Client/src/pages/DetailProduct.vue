<template>
  <div class="Detail-Container">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <img
            :src="`/images/${Product.image}`"
            :class="Product.quatity < 1 ? 'Image-Light-Dark w-100' : 'w-100'"
            alt=""
          />
        </div>

        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="w-75">
            <div class="shadow p-3 mb-5 bg-body rounded position-relative">
              <div class="Grid-Red position-absolute">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h2
                :class="Product.quatity < 1 && 'text-muted'"
                class="Detail-Title"
              >
                {{ Product.name }}
              </h2>
              <div
                :class="Product.quatity < 1 && 'text-muted'"
                style="margin: 5px"
              >
                {{ Product.desc }}
              </div>
              <div
                :class="Product.quatity < 1 && 'text-muted'"
                style="margin: 5px"
              >
                Số lượng:
                {{ Product.quatity - NumberInput }}
              </div>

              <div class="Quatity">
                <button
                  :disabled="Product.quatity < 1 || NumberInput <= 0"
                  @click="MinusHandleClick()"
                  :class="
                    Product.quatity < 1
                      ? ' btn btn-secondary'
                      : 'btn btn-danger'
                  "
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input
                  disabled
                  type="text"
                  class="Quatity-Input"
                  v-model="NumberInput"
                />
                <button
                  @click="PlusHandleClick()"
                  :disabled="
                    Product.quatity < 1 || NumberInput >= Product.quatity
                  "
                  :class="
                    Product.quatity < 1
                      ? ' btn btn-secondary'
                      : 'btn btn-danger'
                  "
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <button
                :disabled="Product.quatity < 1"
                :class="
                  Product.quatity < 1
                    ? ' btn btn-secondary w-100 mt-2'
                    : 'btn btn-danger w-100 mt-2'
                "
                @click="AddProductDetailToCart(Product)"
              >
                {{ Product.quatity < 1 ? "Sản phẩm hết hàng" : "Giỏ hàng" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { GetProducts } from "../API/ProductsRequest";
import FormatCurrency from "../Core/FormatCurrency";

export default {
  name: "DetailProductPage",
  data() {
    return {
      Product: [],
      NumberInput: 0,
    };
  },
  async created() {
    const route = useRoute();
    const id = route.params.id;
    const dataProducts = await GetProducts();
    this.Product = dataProducts.data.find((element) => element.id == id);
  },

  methods: {
    AddToCart(product) {
      this.$store.dispatch("AddToCart", { product: product });
    },
    MinusHandleClick() {
      this.NumberInput--;
    },
    PlusHandleClick() {
      this.NumberInput++;
    },
    async AddProductDetailToCart(Product) {
      await this.$store.dispatch("AddDetailProductToCart", {
        product: Product,
        number: this.NumberInput,
      });
      this.$router.push({ name: "Cart" });
    },
    FormatCurrency(number) {
      return FormatCurrency(number);
    },
  },
};
</script>

<style>
.Detail-Container {
  margin-top: 130px;
  margin-bottom: 50px;
}

.Grid-Red {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  top: 0;
  right: 30px;
}

.Grid-Red > div {
  width: 15px;
  height: 40px;
  margin: 5px;
  background: red;
}

.Detail-Title {
  font-family: "Oswald", sans-serif;
  margin-top: 50px;
  margin-bottom: 20px;
}

.Quatity {
  display: grid;
  grid-template-columns: 50px auto 50px;
  background: rgba(0, 0, 0, 0.05);
  margin: 30px auto;
  width: 50%;
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

.Image-Light-Dark {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.text-muted {
  color: rgb(159, 165, 170) !important;
}
</style>
