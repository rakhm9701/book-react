import { createSelector } from "reselect";
import { AppRootsState, HomePageState } from "../../../lib/types/screen";

export const retrieveBestSellers = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.bestSellers
);

export const retrieveNewDishes = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.newDishes
);

export const retrieveTopUsers = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.topUsers
);
