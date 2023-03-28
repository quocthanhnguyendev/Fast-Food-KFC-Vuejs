<template>
  <div class="Products-Container">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-3 bg-danger p-3 text-light"
          style="min-height: 500px"
        >
          <div class="Search w-100 p-2 bg-light mb-3">
            <input
              type="text"
              name=""
              id="SearchInput"
              v-model="searchText"
              @focusin="FocusInHandleChange()"
              @focusout="FocusOutHandleChange()"
              placeholder="Tìm kiếm món ăn tại đây"
            />
            <i
              class="fa-solid fa-magnifying-glass text-danger"
              id="SearchIcon"
              ref="iconSearch"
            ></i>
          </div>

          <hr />

          <div class="Category mt-2">
            <div class="Category-Title-Shop">Danh Mục Món Ăn</div>
            <ul>
              <li
                v-for="item in Categories"
                :key="item.id"
                @click="
                  () => {
                    CategoryHandleClick(item.id);
                    PageNumberHandleClick(1);
                  }
                "
                :class="categoryActive == item.id && 'Active-Leftsite'"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>

        <div
          class="col-lg-9 d-flex flex-column justify-content-between"
          style="min-height: 500px"
        >
          <div>
            <div class="Nav-Layout-Sort bg-light p-2">
              <div>
                <span>
                  <i
                    @click="!isLayout && SwitchLayoutHandleClick()"
                    :class="
                      'fas fa-grip-horizontal ' + (isLayout && 'Active-Layout')
                    "
                    id="IconGrids"
                  ></i>
                </span>
                <span>
                  <i
                    @click="isLayout && SwitchLayoutHandleClick()"
                    :class="
                      'fa-solid fa-list ' + (!isLayout && 'Active-Layout')
                    "
                    id="IconLists"
                  ></i>
                </span>
              </div>

              <div>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  ref="SelectInput"
                  @change="SortProductsHandleClick()"
                >
                  <option selected value="1" disabled>Sắp xếp theo giá</option>
                  <option value="2">Giá thấp đến cao</option>
                  <option value="3">Giá cao đến thấp</option>
                </select>
              </div>
            </div>

            <div
              :class="(!isLayout && 'mt-3') + ' row'"
              v-if="!getProductsLoading"
            >
              <div
                v-for="item in getProducts"
                :key="item.name"
                :class="isLayout ? 'col-lg-4 mt-3' : 'col-lg-12'"
              >
                <div :class="'border-0 ' + (isLayout ? 'card' : 'row')">
                  <img
                    :class="
                      isLayout
                        ? item.quatity < 1
                          ? 'card-img-top Image-Light-Dark'
                          : 'card-img-top'
                        : item.quatity < 1
                        ? 'col-lg-4 Image-Light-Dark'
                        : 'col-lg-4'
                    "
                    :src="'/images/' + item.image"
                    alt="Card image"
                  />

                  <div
                    :class="
                      isLayout
                        ? 'card-body p-0 pt-3'
                        : 'col-lg-8 d-flex justify-content-around flex-column'
                    "
                  >
                    <router-link
                      :to="{ name: 'Product', params: { id: item.id } }"
                      class="Link-Uncss"
                    >
                      <h4 class="card-title Product-Name">
                        <b :class="item.quatity < 1 && 'text-muted'">{{
                          item.name
                        }}</b>
                      </h4>
                    </router-link>

                    <span
                      v-show="!isLayout"
                      :class="item.quatity < 1 ? 'text-muted' : 'card-text'"
                    >
                      {{ item.desc }}
                    </span>

                    <span
                      v-show="!isLayout"
                      :class="item.quatity < 1 ? 'text-muted' : 'card-text'"
                    >
                      Số lượng: {{ item.quatity }}
                    </span>

                    <h5 class="card-text text-danger">
                      <b :class="item.quatity < 1 && 'text-muted'">{{
                        FormatCurrency(item.price)
                      }}</b>
                    </h5>

                    <span
                      v-show="isLayout"
                      :class="item.quatity < 1 ? 'text-muted' : 'card-text'"
                    >
                      Số lượng: {{ item.quatity }}
                    </span>

                    <button
                      @click="AddToCart(item)"
                      :disabled="item.quatity < 1"
                      :class="
                        item.quatity < 1
                          ? ' btn btn-secondary w-100 mt-2'
                          : 'btn btn-danger w-100 mt-2'
                      "
                    >
                      {{ item.quatity < 1 ? "Sản phẩm hết hàng" : "Giỏ hàng" }}
                    </button>
                  </div>
                </div>
                <hr v-show="!isLayout" />
              </div>
            </div>

            <div
              style="min-height: 400px"
              v-else
              class="d-flex h-100 justify-content-center align-items-center"
            >
              <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div
            class="Page-Number d-flex justify-content-center p-4"
            v-if="getNumberPageProducts > 1"
          >
            <div class="Control-Page">
              <button
                @click="FirstLastPageHandleClick('first')"
                class="btn btn-danger"
              >
                Trang đầu
              </button>

              <button
                @click="PreviosNextHandleClick('previos')"
                v-if="currentPage > 1"
                class="btn btn-danger"
              >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <div class="Number-List">
              <div
                v-for="number in getNumberPageProducts"
                :class="
                  this.currentPage == number
                    ? 'btn btn-danger'
                    : ' btn text-danger'
                "
                :key="number"
                @click="PageNumberHandleClick(number)"
              >
                {{ number }}
              </div>
            </div>
            <div class="Control-Page">
              <button
                @click="PreviosNextHandleClick('next')"
                v-if="currentPage < getNumberPageProducts"
                class="btn btn-danger"
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>
              <button
                @click="FirstLastPageHandleClick('last')"
                class="btn btn-danger"
              >
                Trang cuối
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCategories } from "../API/CategoriesRequest";
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import FormatCurrency from "../Core/FormatCurrency";

export default {
  name: "ShopPage",
  data() {
    return {
      isLayout: true,
      Products: [],
      Categories: [],
      categoryActive: 1,
      currentPage: 1,
      searchText: "",
    };
  },

  computed: {
    ...mapGetters([
      "getProducts",
      "getProductsLoading",
      "getNumberPageProducts",
    ]),
  },
  async created() {
    // Get Products
    this.$store.dispatch("SetProductsAPI");
    this.Products = this.getAllProducts;

    // Get Category
    const CategoriesAxios = await GetCategories();
    this.Categories = CategoriesAxios.data;
  },

  methods: {
    // Search Icon
    FocusInHandleChange() {
      this.$refs.iconSearch.style.display = "none";
    },
    FocusOutHandleChange() {
      this.$refs.iconSearch.style.display = "block";
    },

    // Switch Layout
    SwitchLayoutHandleClick() {
      this.isLayout = !this.isLayout;
      console.log(this.isLayout);
    },

    // Category
    CategoryHandleClick(id) {
      this.categoryActive = id;

      this.$store.dispatch("CategoryFood", {
        categoryId: id,
        data: this.Products,
      });
    },

    // Number Page
    PageNumberHandleClick(number) {
      this.currentPage = number;
      this.$store.dispatch("PageNumber", { currentPage: this.currentPage });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // Previos and Next Page
    PreviosNextHandleClick(element) {
      if (element == "previos") {
        this.currentPage -= 1;
        this.$store.dispatch("PageNumber", { currentPage: this.currentPage });
      } else {
        this.currentPage += 1;
        this.$store.dispatch("PageNumber", { currentPage: this.currentPage });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    FirstLastPageHandleClick(element) {
      if (element == "first") {
        this.currentPage = 1;
        this.$store.dispatch("PageNumber", { currentPage: this.currentPage });
      } else {
        this.currentPage = this.getNumberPageProducts;
        this.$store.dispatch("PageNumber", { currentPage: this.currentPage });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    // Search
    SearchProductsHandleChange() {
      if (this.searchText != "") {
        this.$store.dispatch("SearchProducts", { searchText: this.searchText });
      } else {
        this.CategoryHandleClick(this.categoryActive);
      }
    },

    // Sort
    SortProductsHandleClick() {
      this.CategoryHandleClick(1);
      var type = this.$refs.SelectInput.value;
      this.$store.dispatch("SortProducts", { type: type });
    },

    // Filter Price
    FilterPriceProduct(type) {
      if (type == 1) {
        this.getProducts = this.getProducts.filter(
          (item) => item.price < 50000
        );
      }
      console.log(this.getProducts);
    },

    AddToCart(product) {
      this.$store.dispatch("AddToCart", { product: product });
    },
    FormatCurrency(number) {
      return FormatCurrency(number);
    },
  },

  mounted() {
    const route = useRoute();
    const id = route.params.id;
    if (id != undefined) {
      this.CategoryHandleClick(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  updated() {
    this.SearchProductsHandleChange();
  },
};
</script>

<style>
.Products-Container {
  margin-top: 130px;
  margin-bottom: 50px;
}

.Product-Name {
  font-family: "Oswald", sans-serif;
}

.Search {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.Search > input {
  background: none;
  border: none;
  width: 100%;
}

.Search > input:focus {
  outline: none;
}

#SearchIcon {
  font-size: 25px;
}

.Category > ul {
  padding: 0;
}

.Category > ul > li {
  list-style: none;
  line-height: 40px;
  /* background: blue; */
  padding: 5px;
  padding-left: 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 5px;
}

.Category > ul > li:hover {
  background: white;
  color: rgb(220, 53, 69);
}

.Active-Leftsite {
  background: white;
  color: rgb(220, 53, 69);
}

.Category-Title-Shop {
  font-weight: bold !important;
  padding: 5px 0;
  padding-left: 20px;
}

.Nav-Layout-Sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Nav-Layout-Sort > span {
  margin-left: 10px;
}

.Active-Layout {
  background: rgb(220, 53, 69);
  color: white;
  padding: 5px;
  border-radius: 5px;
}

#IconGrids {
  font-size: 25px;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
}
#IconLists {
  font-size: 25px;
  padding: 5px;
  cursor: pointer;
}

.Number-List {
  margin: 0 5px;
  display: flex;
}

.Number-List > div {
  margin: 0 5px;
}

.Control-Page > button {
  margin: 0 5px;
}

.Image-Products {
  position: relative;
}

.Image-Light-Dark {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

.text-muted {
  color: rgb(159, 165, 170) !important;
}

.Link-Uncss {
  color: inherit;
  text-decoration: none;
}

.Link-Uncss:hover {
  color: red;
}
</style>
