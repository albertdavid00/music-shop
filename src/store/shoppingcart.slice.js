import { createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    shoppingCartItems: [],
  },
  reducers: {
    addToShoppingCart: (state, action) => {
      const item = action.payload;
      const itemExists = state.shoppingCartItems.find(
        (it) => it.id === item.id
      );
      if (itemExists) {
        const newShoppingCart = state.shoppingCartItems.map((it) =>
          it.id === item.id ? { ...itemExists, qty: itemExists.qty + 1 } : it
        );
        state.shoppingCartItems = newShoppingCart;
      } else {
        const newShoppingCart = [
          ...state.shoppingCartItems,
          { ...item, qty: 1 },
        ];
        state.shoppingCartItems = newShoppingCart;
      }
    },
    removeFromShoppingCart: (state, action) => {
      const item = action.payload;
      const itemExists = state.shoppingCartItems.find(
        (it) => it.id === item.id
      );
      if (itemExists) {
        if (item.qty === 1) {
          const newShoppingCart = state.shoppingCartItems.filter((cartItem) => {
            return item.id !== cartItem.id;
          });
          state.shoppingCartItems = newShoppingCart;
        } else {
          const newShoppingCart = state.shoppingCartItems.map((it) =>
            it.id === item.id ? { ...item, qty: item.qty - 1 } : it
          );
          state.shoppingCartItems = newShoppingCart;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToShoppingCart, removeFromShoppingCart } =
  shoppingCartSlice.actions;
export const shoppingCartSelector = (state) => {
  return state.shoppingCartReducer.shoppingCartItems;
};

export default shoppingCartSlice.reducer;
