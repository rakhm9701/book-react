import { createSelector } from "reselect";
import { AppRootsState, OrdersPageState } from "../../../lib/types/screen";

export const retrievePausedOrders = createSelector(
  (state: AppRootsState) => state.ordersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.pausedOrders
);

export const retrieveProcessOrders = createSelector(
  (state: AppRootsState) => state.ordersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
  (state: AppRootsState) => state.ordersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.finishedOrders
);
