import { createSelector } from "reselect";
import { AppRootsState, HomePageState } from "../../../lib/types/screen";

export const retrieveBestSellers = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.bestSellers
);

export const retrieveKidsBooks = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.kidsBooks
);

export const retrieveNewBooks = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.newBooks
);

export const retrieveTopUsers = createSelector(
  (state: AppRootsState) => state.homePage,
  (HomePage: HomePageState) => HomePage.topUsers
);
