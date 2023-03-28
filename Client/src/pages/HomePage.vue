<template>
  <div class="Home-Container">
    <div class="Banner">
      <img src="/images/combohappy149.webp" alt="" />
    </div>

    <div class="container mt-5 mb-5">
      <div class="Title-List mb-3">
        <h3>MÓN ĂN THỊNH HÀNH</h3>
      </div>

      <div class="row">
        <div
          v-for="item in getTrendingProduct"
          :key="item.name"
          class="col-lg-3"
        >
          <router-link
            :to="{ name: 'Product', params: { id: item.id } }"
            class="Link-Uncss"
          >
            <div v-if="item.trending" class="card border-0">
              <img
                class="card-img-top"
                :src="'/images/' + item.image"
                alt="Card image"
              />
              <div class="card-body p-0 pt-3 pb-3">
                <h4 class="card-title Product-Name">
                  <b>{{ item.name }}</b>
                </h4>
                <h5 class="card-text text-danger">
                  <b>{{ FormatCurrency(item.price) }}</b>
                </h5>
                <p class="card-text">{{ item.desc }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <div
          v-if="
            this.getAllProducts.filter((item) => item.trending == true).length >
            4
          "
          class="text-center p-3"
          @click="DropDownTrendingHandleClick()"
        >
          <i
            v-if="trendingDownStatus"
            style="cursor: pointer"
            class="fa-solid fa-chevron-down fa-2x"
          ></i>
          <i
            v-else
            style="cursor: pointer"
            class="fa-solid fa-chevron-up fa-2x"
          ></i>
        </div>
      </div>
    </div>

    <div class="bg-danger text-light pt-3 pb-3">
      <div class="container mt-5 mb-5">
        <div class="Title-List mb-3 text-end">
          <h3>DANH MỤC MÓN ĂN</h3>
        </div>

        <div class="row">
          <div
            v-for="item in getCategoriesProduct"
            :key="item.id"
            class="col-lg-3 position-relative"
            style="cursor: pointer"
          >
            <router-link :to="{ name: 'Category', params: { id: item.id } }">
              <div
                class="card border-0 mb-4 category"
                @mouseover="CategoryHandleMouseOver(item.id)"
                @mouseout="CategoryHandleMouseOut(item.id)"
              >
                <img
                  class="card-img-top"
                  :src="'/images/' + item.image"
                  alt="Card image"
                />
                <div
                  class="position-absolute text-danger"
                  style="display: none"
                  :id="`TitleCategory${item.id}`"
                >
                  {{ item.name }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div
        v-if="Categories.length > 4"
        class="text-center p-3"
        @click="DropDownCategoryHandleClick()"
      >
        <i
          v-if="!categoryDownStatus"
          style="cursor: pointer"
          class="fa-solid fa-chevron-down fa-2x"
        ></i>
        <i
          v-else
          style="cursor: pointer"
          class="fa-solid fa-chevron-up fa-2x"
        ></i>
      </div>
    </div>

    <div class="container mt-5 mb-5">
      <div class="Title-List mb-3">
        <h3>MÓN ĂN MỚI NHẤT</h3>
      </div>

      <div class="row">
        <div v-for="item in getNewProducts" :key="item.name" class="col-lg-3">
          <router-link
            :to="{ name: 'Product', params: { id: item.id } }"
            class="Link-Uncss"
          >
            <div class="card border-0">
              <img
                class="card-img-top"
                :src="'/images/' + item.image"
                alt="Card image"
              />
              <div class="card-body p-0 pt-3 pb-3">
                <h4 class="card-title Product-Name">
                  <b>{{ item.name }}</b>
                </h4>
                <h5 class="card-text text-danger">
                  <b>{{ FormatCurrency(item.price) }}</b>
                </h5>
                <p class="card-text">{{ item.desc }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <div
          v-if="Categories.length > 4"
          class="text-center p-3"
          @click="DropDownNewProductsHandleClick()"
        >
          <i
            v-if="!newProductsDownStatus"
            style="cursor: pointer"
            class="fa-solid fa-chevron-down fa-2x"
          ></i>
          <i
            v-else
            style="cursor: pointer"
            class="fa-solid fa-chevron-up fa-2x"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCategories } from "../API/CategoriesRequest";
import { mapGetters } from "vuex";
import FormatCurrency from "../Core/FormatCurrency";

export default {
  name: "HomePage",
  data() {
    return {
      Products: [],
      Categories: [],
      trendingProducts: [],

      // Dropdown Status
      trendingDownStatus: false,
      categoryDownStatus: false,
      newProductsDownStatus: false,
    };
  },
  async created() {
    // Get Products
    this.$store.dispatch("SetProductsAPI");
    this.Products = this.getAllProducts;

    // Get Category
    const CategoriesAxios = await GetCategories();
    this.Categories = CategoriesAxios.data.filter((item) => item.id != 1);
  },
  mounted() {
    this.DropDownTrendingHandleClick();
  },
  computed: {
    ...mapGetters(["getAllProducts"]),

    getTrendingProduct() {
      var productTrending = this.getAllProducts.filter(
        (item) => item.trending == true
      );
      if (this.trendingDownStatus) {
        return productTrending.slice(0, 4);
      } else {
        return productTrending;
      }
    },

    getCategoriesProduct() {
      var category = this.Categories;
      if (!this.categoryDownStatus) {
        return category.slice(0, 4);
      } else {
        return category;
      }
    },

    getNewProducts() {
      var NewProducts = this.getAllProducts;
      if (!this.newProductsDownStatus) {
        return NewProducts.sort((a, b) => b.id - a.id).slice(0, 4);
      } else {
        return NewProducts.sort((a, b) => b.id - a.id).slice(0, 8);
      }
    },
  },
  methods: {
    // Dropdown
    DropDownTrendingHandleClick() {
      this.trendingDownStatus = !this.trendingDownStatus;
    },
    DropDownCategoryHandleClick() {
      this.categoryDownStatus = !this.categoryDownStatus;
    },
    DropDownNewProductsHandleClick() {
      this.newProductsDownStatus = !this.newProductsDownStatus;
    },

    // Hover Category
    CategoryHandleMouseOver(id) {
      const TitleCategory = document.getElementById(`TitleCategory${id}`);
      TitleCategory.classList.add("Category-Title");
    },
    CategoryHandleMouseOut(id) {
      const TitleCategory = document.getElementById(`TitleCategory${id}`);
      TitleCategory.classList.remove("Category-Title");
    },
    FormatCurrency(number) {
      return FormatCurrency(number);
    },
  },
};
</script>

<style>
.Home-Container {
  margin-top: 88px;
}

.Banner > img {
  width: 100%;
}

.Product-Name {
  font-family: "Oswald", sans-serif;
}

.Title-List h3 {
  font-family: "Oswald", sans-serif;
}

.category {
  position: relative;
}

.category > img {
  border-radius: 0px;
}

.Category-Title {
  font-size: 20px;
  display: block !important;
  z-index: 100;
  bottom: 0;
  text-align: center;
  width: 100%;
  background: white;
  font-family: "Oswald", sans-serif;
}

.Link-Uncss {
  color: inherit;
  text-decoration: none;
}

.Link-Uncss:hover {
  color: red;
}
</style>
