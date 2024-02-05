import { IGetAllVendorsPayload, IVendorResponse, IVendorsResponse } from "../types/vendor.type";
import * as BaseApi from "./base-api";
class VendorApiService {
  private url = (api: string) => `vendor/${api}`;

  /**
   * Get all vendors
   * @returns List of vendors
   */
  public async getAll(payload:IGetAllVendorsPayload): Promise<IVendorsResponse> {
    return BaseApi._get(this.url(""),payload);
  }

  /**
   * Get vendor
   * @params id
   * @returns vendor
   */
  public async get(id: string): Promise<IVendorResponse> {
    return BaseApi._get(this.url(`detail/${id}`));
  }
}
const VendorApi = new VendorApiService();
export default VendorApi;
