import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInQuery } from "../../lib/types/product";
import { Like } from "../../lib/types/like";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  // getProducts
  public async getProducts(input: ProductInQuery): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("getProducts:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProducts:", err);
      throw err;
    }
  }

  // getProduct
  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }

  // getLikes
  public async getlikes(productId: string): Promise<Like> {
    try {
      const url = `${this.path}/like/${productId}`;
      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (err) {
      console.log("Error, getLikes:", err);
      throw err;
    }
  }
}

export default ProductService;
