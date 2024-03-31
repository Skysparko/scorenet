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
  public async create(payload: ICreateTeamPayload): Promise<IResponse<ITeam>> {
    let fd = new FormData();

    for (let key in payload as ICreateTeamPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._post(this.url("create"), fd);
  }

  /**
   * Get all Team
   * @returns List of Teams
   */
  public async getAll(): Promise<IResponse<ITeam>> {
    return BaseApi._get(this.url(""));
  }

  /**
   * Get Team
   * @params id
   * @returns Team
   */
  public async get(id: string): Promise<IResponse<ITeam>> {
    return BaseApi._get(this.url(id));
  }

  /**
   * update
   * @param Team
   * @returns Team
   */
  public async update(
    payload: IUpdateTeamPayload,
    id: string
  ): Promise<IResponse<ITeam>> {
    let fd = new FormData();

    for (let key in payload as IUpdateTeamPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._put(this.url(`${id}`), fd);
  }

  /**
   * Delete Team
   * @param id Team id
   * @returns void
   */
  public async delete(id: string): Promise<void> {
    return BaseApi._delete(this.url(`${id}`));
  }
}
const TeamApi = new TeamApiService();
export default TeamApi;
