import { IGetAllProductsPayload, IProductResponse, IProductsResponse } from "../types/product.type";
import * as BaseApi from "./base-api";
class ProductApiService {
  private url = (api: string) => `product/${api}`;

  /**
   * Get all products
   * @returns List of products
   */
  public async getAll(payload:IGetAllProductsPayload): Promise<IProductsResponse> {
    return BaseApi._get(this.url(""),payload);
  }

  /**
   * Get product
   * @params id
   * @returns product
   */
  public async get(id: string): Promise<IProductResponse> {
    return BaseApi._get(this.url(`${id}`));
  }
}
const ProductApi = new ProductApiService();
export default ProductApi;
