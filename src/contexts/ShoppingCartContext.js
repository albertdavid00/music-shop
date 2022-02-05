// import React, { useContext, useState } from "react";

// const ShoppingCartContext = React.createContext();

// export function useShoppingCart() {
//     return useContext(ShoppingCartContext);
// }

// export function ShoppingCartProvider({ children }) {
//   const [shoppingCart, setShoppingCart] = useState([]);
  
//   const addItemToCart = (item) => {
//     const itemExists = shoppingCart.find((it) => it.id === item.id);
//     if (itemExists) {
//       const newShoppingCart = shoppingCart.map((it) =>
//         it.id === item.id ? { ...itemExists, qty: itemExists.qty + 1 } : it
//       );
//       setShoppingCart(newShoppingCart);
//     } else {
//       const newShoppingCart = [...shoppingCart, { ...item, qty: 1 }];
//       setShoppingCart(newShoppingCart);
//     }
//   }
//   const value = {
//       shoppingCart,
//       addItemToCart
//   }
//   return (
//       <ShoppingCartContext.Provider value={value}>
//           {children}
//       </ShoppingCartContext.Provider>
//   )
// }
