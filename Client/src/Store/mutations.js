export default {
  SET_PRODUCTS_API(state, { type, data }) {
    switch (type) {
      case "PRODUCTS_LOADING":
        state.PRODUCTS_LOADING = true;
        break;

      case "PRODUCTS_SUCCESS":
        state.Products = data;
        state.ProductsAPI = data;
        state.PRODUCTS_LOADING = false;
        break;
    }
  },

  SET_PRODUCTS_BY_CATEGORY(state, { categoryId }) {
    if (categoryId == 1) {
      state.Products = state.ProductsAPI;
    } else {
      state.Products = state.ProductsAPI.filter(
        (item) => item.category == categoryId
      );
    }
  },

  SET_PRODUCTS_PAGE_START_END(state, { currentPage }) {
    state.ProductsPageStart = (currentPage - 1) * state.ProductsLimit;
    state.ProductsPageEnd = state.ProductsPageStart + state.ProductsLimit;
  },

  FILTER_PRODUCTS(state, { searchText }) {
    state.Products = state.ProductsAPI.filter((product) =>
      product.name
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
    );
    if (state.Products) {
      state.Products = state.ProductsAPI.filter((product) =>
        product.name
          .trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      );
    } else {
      state.Products = state.ProductsAPI;
    }
  },

  SORT_PRODUCTS(state, { type }) {
    if (type == "2") {
      state.Products.sort((a, b) => a.price - b.price);
    } else {
      state.Products.sort((a, b) => b.price - a.price);
    }
  },

  ADD_TO_CART(state, { product }) {
    if (product.quatity > 0) {
      if (state.Cart.filter((item) => item.id == product.id).length > 0) {
        for (let index = 0; index < state.Cart.length; index++) {
          if (state.Cart[index].id == product.id) {
            state.Cart[index].number += 1;
            // state.Cart[index].quatity -= 1;
            for (let index = 0; index < state.Products.length; index++) {
              if (state.Products[index].id == product.id) {
                state.Products[index].quatity -= 1;
              }
            }
          }
        }
      } else {
        product.number = 1;
        state.Cart.push(product);
        for (let index = 0; index < state.Products.length; index++) {
          if (state.Products[index].id == product.id) {
            state.Products[index].quatity -= 1;
          }
        }
      }
    }
  },

  REMOVE_ONE_CART(state, { product }) {
    // console.log(product);
    var productRemove = state.Cart.find((element) => element.id == product.id);
    if (productRemove.number > 1) {
      for (let index = 0; index < state.Cart.length; index++) {
        if (state.Cart[index].id == productRemove.id) {
          state.Cart[index].number -= 1;
          state.Cart[index].quatity += 1;
          // for (let index = 0; index < state.Products.length; index++) {
          //   if (state.Products[index].id == productRemove.id) {
          //     state.Products[index].quatity += 1;
          //   }
          // }
        }
      }
    } else {
      for (let index = 0; index < state.Products.length; index++) {
        if (state.Products[index].id == product.id) {
          state.Products[index].quatity += 1;
        }
      }
      state.Cart = state.Cart.filter((element) => element.id != product.id);
    }
  },

  ADD_DETAIL_PRODUCT_TO_CART(state, { product, number }) {
    if (product.quatity > 0) {
      if (state.Cart.filter((item) => item.id == product.id).length > 0) {
        for (let index = 0; index < state.Cart.length; index++) {
          if (state.Cart[index].id == product.id) {
            state.Cart[index].number = state.Cart[index].number + number;
            for (let index = 0; index < state.Products.length; index++) {
              if (state.Products[index].id == product.id) {
                state.Products[index].quatity =
                  state.Products[index].quatity - number;
              }
            }
          }
        }
      } else {
        product.number = number;
        product.quatity = product.quatity - number;
        state.Cart.push(product);

        for (let index = 0; index < state.Products.length; index++) {
          if (state.Products[index].id == product.id) {
            state.Products[index].quatity =
              state.Products[index].quatity - number;
          }
        }
      }
    }
  },

  DETROY_CART(state) {
    // for (let i = 0; i < state.Cart.length; i++) {
    //   for (let index = 0; index < state.Products.length; index++) {
    //     if (state.Products[index].id == state.Cart[i].id) {
    //       // state.Products[index].quatity =
    //       //   state.Products[index].quatity + state.Cart[index].number;
    //     }
    //   }
    // }
    state.Cart = [];
  },
};
