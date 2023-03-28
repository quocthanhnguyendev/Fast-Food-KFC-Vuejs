export default {
  getProductsLoading(state) {
    return state.PRODUCTS_LOADING;
  },

  getProducts(state) {
    if (state.Products.length > state.ProductsLimit) {
      return state.Products.slice(
        state.ProductsPageStart,
        state.ProductsPageEnd
      );
    } else {
      return state.Products;
    }
  },

  getAllProducts(state) {
    return state.ProductsAPI;
  },

  getProductsLength(state) {
    return state.Products.length;
  },

  getNumberPageProducts(state) {
    return Math.ceil(state.Products.length / state.ProductsLimit);
  },

  getNumberProductsCart(state) {
    return state.Cart.length;
  },

  getProductsCart(state) {
    return state.Cart;
  },

  getTotalCart(state) {
    var total = 0;
    state.Cart.forEach((element) => {
      total += element.price * element.number;
    });
    return total;
  },

  getSumNumberInCart(state) {
    var sumNumber = 0;
    state.Cart.forEach((element) => {
      sumNumber += element.number;
    });
    return sumNumber;
  },
};
