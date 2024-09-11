import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart
const initialState = {
  items: [], // Array of product items in the cart
  totalQuantity: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of all the items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, price, name } = action.payload;

      // Check if the item already exists in the cart
      const existingProduct = state.items.find(item => item.productId === productId);

      if (existingProduct) {
        // If it exists, just update the quantity
        existingProduct.quantity += quantity;
        existingProduct.totalPrice += price * quantity;
      } else {
        // If it doesn't exist, add it to the cart
        state.items.push({
          productId,
          name,
          quantity,
          price,
          totalPrice: price * quantity,
        });
      }

      // Update total quantity and total price of the cart
      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;

      const existingProduct = state.items.find(item => item.productId === productId);

      if (existingProduct) {
        // Subtract from total cart quantity and price
        state.totalQuantity -= existingProduct.quantity;
        state.totalPrice -= existingProduct.totalPrice;

        // Remove the product from the cart
        state.items = state.items.filter(item => item.productId !== productId);
      }
    },
    incrementQuantity: (state, action) => {
      const { productId, price } = action.payload;

      const existingProduct = state.items.find(item => item.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice += price;

        state.totalQuantity += 1;
        state.totalPrice += price;
      }
    },
    decrementQuantity: (state, action) => {
      const { productId, price } = action.payload;

      const existingProduct = state.items.find(item => item.productId === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        existingProduct.totalPrice -= price;

        state.totalQuantity -= 1;
        state.totalPrice -= price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
