import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";

const initialState: ProductPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "porductPage",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
