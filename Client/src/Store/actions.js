import { GetProducts, UpdateProducts } from "../API/ProductsRequest";

export default {
  async SetProductsAPI({ commit }) {
    commit("SET_PRODUCTS_API", {
      type: "PRODUCTS_LOADING",
    });
    const productsAxios = await GetProducts();
    commit("SET_PRODUCTS_API", {
      type: "PRODUCTS_SUCCESS",
      data: productsAxios.data,
    });
  },

  CategoryFood({ commit }, payload) {
    commit("SET_PRODUCTS_BY_CATEGORY", payload);
  },

  PageNumber({ commit }, payload) {
    commit("SET_PRODUCTS_PAGE_START_END", payload);
  },

  SearchProducts({ commit }, payload) {
    commit("FILTER_PRODUCTS", payload);
  },

  SortProducts({ commit }, payload) {
    commit("SORT_PRODUCTS", payload);
  },

  async AddToCart({ commit }, { product }) {
    await UpdateProducts({ id: product.id, quatity: product.quatity - 1 });
    await commit("ADD_TO_CART", { product });
  },

  async RemoveOneCart({ commit }, { product }) {
    await UpdateProducts({ id: product.id, quatity: product.quatity + 1 });
    commit("REMOVE_ONE_CART", { product });
  },

  async AddDetailProductToCart({ commit }, { product, number }) {
    await UpdateProducts({ id: product.id, quatity: product.quatity - number });
    commit("ADD_DETAIL_PRODUCT_TO_CART", { product, number });
  },

  async DetroyCart({ commit, state }) {
    await state.Cart.forEach((element) => {
      UpdateProducts({
        id: element.id,
        quatity: element.quatity + element.number,
      });
    });
    commit("DETROY_CART");
  },
};
