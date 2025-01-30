import {
  ProductCollection,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";
import { Like } from "./like";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productAuthor: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productVolume: number;
  productDesc?: string;
  productImages: string[];
  productLikes: number;
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
  like?: Like;
}

export interface ProductInQuery {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
}
