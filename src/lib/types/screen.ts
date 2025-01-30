import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootsState {
  homePage: HomePageState;
  productsPage: ProductPageState;
  ordersPage: OrdersPageState;
}

/** HOMEPAGE **/
export interface HomePageState {
  bestSellers: Product[];
  kidsBooks: Product[];
  newBooks: Product[];
  topUsers: Member[];
}

/** PRODUCT PAGE **/
export interface ProductPageState {
  shop: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE **/
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
