import { IModuleResponse } from "../types/module.type";
import * as BaseApi from "./base-api";
class ModuleApiService {
  private url = () => `modules`;

  /**
   * Fetch all modules
   * @returns List of modules
   */
  public async getAll(): Promise<IModuleResponse> {
    return BaseApi._get(this.url());
  }
}
const ModuleApi = new ModuleApiService();
export default ModuleApi;