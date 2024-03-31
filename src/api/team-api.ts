import { IResponse } from "@/types/common.type";
import * as BaseApi from "./base-api";
import {
  ICreateTeamPayload,
  ITeam,
  IUpdateTeamPayload,
} from "@/types/team.type";
class TeamApiService {
  private url = (api: string) => `teams/${api}`;
  /**
   * create new
   * @param team
   * @returns Team
   */
  public async create(payload: ICreateTeamPayload,
    headers:any): Promise<IResponse<ITeam>> {
    let fd = new FormData();

    for (let key in payload as ICreateTeamPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._post(this.url("create"), fd,headers);
  }

  /**
   * Get all Team
   * @returns List of Teams
   */
  public async getAll(
    headers:any): Promise<IResponse<ITeam>> {
    return BaseApi._get(this.url(""),null,headers);
  }

  /**
   * Get Team
   * @params id
   * @returns Team
   */
  public async get(id: string,
    headers:any): Promise<IResponse<ITeam>> {
    return BaseApi._get(this.url(id),null,headers);
  }

  /**
   * update
   * @param Team
   * @returns Team
   */
  public async update(
    payload: IUpdateTeamPayload,
    id: string,
    headers:any
  ): Promise<IResponse<ITeam>> {
    let fd = new FormData();

    for (let key in payload as IUpdateTeamPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._put(this.url(`${id}`), fd,headers);
  }

  /**
   * Delete Team
   * @param id Team id
   * @returns void
   */
  public async delete(id: string,
    headers:any): Promise<void> {
    return BaseApi._delete(this.url(`${id}`),null,headers);
  }
}
const TeamApi = new TeamApiService();
export default TeamApi;
