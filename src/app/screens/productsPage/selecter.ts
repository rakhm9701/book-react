import { createSelector } from "reselect";
import { AppRootsState, ProductPageState } from "../../../lib/types/screen";

export const retrieveShop = createSelector(
  (state: AppRootsState) => state.productsPage,
  (ProductPage: ProductPageState) => ProductPage.shop
);

export const retrieveChosenProduct = createSelector(
  (state: AppRootsState) => state.productsPage,
  (ProductsPage: ProductPageState) => ProductsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  (state: AppRootsState) => state.productsPage,
  (ProductPage: ProductPageState) => ProductPage.products
);
