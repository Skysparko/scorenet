import { ICategoriesResponse, ICategoryResponse, ICreateCategoryPayload, IGetAllCategoriesPayload, IUpdateCategoryPayload } from "../types/category.type";
  import * as BaseApi from "./base-api";
  class CategoryApiService {
    private url = (api: string) => `product-category/${api}`;
    /**
     * create new
     * @param category
     * @returns Category
     */
    public async create(payload: ICreateCategoryPayload): Promise<ICategoryResponse> {
      let fd = new FormData();
      for (let key in payload as any) {
        fd.append(key, (payload as any)[key]);
      }
      return BaseApi._post(this.url(""), fd);
    }
  
    /**
     * Get all categories
     * @returns List of categories
     */
    public async getAll(payload:IGetAllCategoriesPayload): Promise<ICategoriesResponse> {
      return BaseApi._get(this.url(""),payload);
    }
  
    /**
     * Get category
     * @params id
     * @returns category
     */
    public async get(id:string): Promise<ICategoryResponse> {
      return BaseApi._get(this.url(id));
    }
  
    /**
     * update
     * @param category
     * @returns category
     */
    public async update(payload: IUpdateCategoryPayload,id:string): Promise<ICategoryResponse> {
      return BaseApi._patch(this.url(`${id}`), payload);
    }
  
    /**
     * Delete category
     * @param id category id
     * @returns void
     */
    public async delete(id: string): Promise<void> {
      return BaseApi._delete(this.url(`${id}`));
    }
  }
  const CategoryApi = new CategoryApiService();
  export default CategoryApi;
  