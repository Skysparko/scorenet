import { ICreateRolesPayload, IRoleResponse, IRoles, IRolesResponse } from "../types/role.type";
import * as BaseApi from "./base-api";
class RoleApiService {
  private url = (api: string) => `role-permissions/${api}`;
  /**
   * create role
   * @returns Role Permissions
   */
  public async create(payload: ICreateRolesPayload): Promise<IRoleResponse> {
    return BaseApi._post(this.url(""), payload);
  } 

  /**
   * Get permissions
   * @param role_id
   * @returns Role Permissions
   */
  public async get(id:string): Promise<IRoleResponse> {
    return BaseApi._get(this.url(id));
  }

  /**
   * update permissions
   * @param role_id
   * @returns Role Permissions
   */
  public async update(payload: ICreateRolesPayload, id: string): Promise<IRoleResponse> {
    return BaseApi._patch(this.url(id), payload);
  }

  /**
   * Get all roles
   * @returns List of Role Permissions
   */
  public async getAll(): Promise<IRolesResponse> {
    return BaseApi._get(this.url(""));
  }

  /**
   * Delete role
   * @param role_id
   * @returns void
   */
  public async delete(id: string): Promise<void> {
    return BaseApi._delete(this.url(id));
  }
}
const RoleApi = new RoleApiService();
export default RoleApi;
