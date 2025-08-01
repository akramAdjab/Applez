import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  cart: (localStorage.getItem("cart") &&
    JSON.parse(localStorage.getItem("cart"))) || {
    _id: crypto.randomUUID(),
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    totalQuantity: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      // Find existing product with same _id and matching variant options
      const existingProductIndex = state.cart.items.findIndex(
        (item) =>
          item._id === product._id &&
          JSON.stringify(item.variantOptions) ===
            JSON.stringify(product.variantOptions)
      );

      const quantity = product.quantity || 1;
      const itemPrice = product.price || 0;
      const itemTotal = itemPrice * quantity;

      if (existingProductIndex !== -1) {
        // If product exists with same variant options, increment quantity and update totals
        state.cart.items[existingProductIndex].quantity += quantity;
        state.cart.items[existingProductIndex].itemTotal =
          state.cart.items[existingProductIndex].price *
          state.cart.items[existingProductIndex].quantity;
      } else {
        // If product doesn't exist or has different variant options, add it to cart
        state.cart.items.push({
          ...product,
          quantity,
          price: itemPrice,
          itemTotal,
        });
      }

      // Calculate cart totals
      state.cart.subtotal = state.cart.items.reduce(
        (sum, item) => sum + item.itemTotal,
        0
      );
      state.cart.totalQuantity = state.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.cart.total = state.cart.subtotal + state.cart.shipping;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateCartItem(state, action) {
      const { _id, variantOptions, quantity } = action.payload;

      // Find product index matching id and variant options
      const productIndex = state.cart.items.findIndex(
        (item) =>
          item._id === _id &&
          JSON.stringify(item.variantOptions) === JSON.stringify(variantOptions)
      );

      if (productIndex !== -1) {
        // Update item quantity and recalculate item total
        state.cart.items[productIndex].quantity = quantity;
        state.cart.items[productIndex].itemTotal =
          state.cart.items[productIndex].price * quantity;

        // Recalculate cart totals
        state.cart.subtotal = state.cart.items.reduce(
          (sum, item) => sum + item.itemTotal,
          0
        );
        state.cart.totalQuantity = state.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.cart.total = state.cart.subtotal + state.cart.shipping;

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeFromCart(state, action) {
      const { _id, variantOptions } = action.payload;

      // Find product index matching id and variant options
      const productIndex = state.cart.items.findIndex(
        (item) =>
          item._id === _id &&
          JSON.stringify(item.variantOptions) === JSON.stringify(variantOptions)
      );

      if (productIndex !== -1) {
        // Remove item from cart
        state.cart.items.splice(productIndex, 1);

        // Recalculate cart totals
        state.cart.subtotal = state.cart.items.reduce(
          (sum, item) => sum + item.itemTotal,
          0
        );
        state.cart.totalQuantity = state.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.cart.total = state.cart.subtotal + state.cart.shipping;

        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    showHideCart(state, action) {
      state.showCart = action.payload;
    },
  },
});

export const {
  updateCartId,
  showHideCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
