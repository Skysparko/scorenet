import { ICreateSubCategoryPayload, IGetAllSubCategoriesPayload, IGetSubCategoryPayload, ISubCategoriesResponse, ISubCategoryResponse, IUpdateSubCategoryPayload } from "../types/sub-category.types";
import * as BaseApi from "./base-api";
class SubCategoryApiService {
  private url = (api: string) => `sub-category/${api}`;
  /**
   * create new
   * @param subCategory
   * @returns sub-Category
   */
  public async create(
    payload: ICreateSubCategoryPayload
  ): Promise<ISubCategoryResponse> {
    return BaseApi._post(this.url(""), payload);
  }

  /**
   * Get all sub-categories
   * @returns List of sub-categories
   */
  public async getAll(payload:IGetAllSubCategoriesPayload): Promise<ISubCategoriesResponse> {
    return BaseApi._get(this.url(""),payload);
  }

  /**
   * Get sub-category
   * @params id
   * @returns sub-category
   */
  public async get(id: string): Promise<ISubCategoryResponse> {
    return BaseApi._get(this.url("detail/"+id));
  }

  /**
   * update
   * @param subCategory
   * @returns sub-category
   */
  public async update(
    payload: IUpdateSubCategoryPayload,
    id: string
  ): Promise<ISubCategoryResponse> {
    return BaseApi._patch(this.url(`${id}`), payload);
  }

  /**
   * Delete sub-category
   * @param id sub-category id
   * @returns void
   */
  public async delete(id: string): Promise<void> {
    return BaseApi._delete(this.url(`${id}`));
  }
}
const SubCategoryApi = new SubCategoryApiService();
export default SubCategoryApi;
