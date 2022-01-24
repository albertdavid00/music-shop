import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from './shoppingcart.slice'

export default configureStore({
  reducer: { 
      shoppingCartReducer
  },
})