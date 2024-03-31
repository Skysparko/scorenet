import { IResponse } from "@/types/common.type";
import * as BaseApi from "./base-api";
import {
  ICreateTournamentPayload,
  ITournament,
  IUpdateTournamentPayload,
} from "@/types/tournament.type";
class TournamentApiService {
  private url = (api: string) => `tournaments/${api}`;
  /**
   * create new
   * @param tournament
   * @returns Tournament
   */
  public async create(
    payload: ICreateTournamentPayload,
    headers: any
  ): Promise<IResponse<ITournament>> {
    let fd = new FormData();

    for (let key in payload as ICreateTournamentPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._post(this.url("create"), fd, headers);
  }

  /**
   * Get all tournament
   * @returns List of tournaments
   */
  public async getAll(headers: any): Promise<IResponse<ITournament>> {
    return BaseApi._get(this.url(""), null, headers);
  }

  /**
   * Get tournament
   * @params id
   * @returns tournament
   */
  public async get(id: string, headers: any): Promise<IResponse<ITournament>> {
    return BaseApi._get(this.url(id), null, headers);
  }

  /**
   * update
   * @param tournament
   * @returns Tournament
   */
  public async update(
    payload: IUpdateTournamentPayload,
    id: string,
    headers: any
  ): Promise<IResponse<ITournament>> {
    let fd = new FormData();

    for (let key in payload as ICreateTournamentPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._put(this.url(`${id}`), fd, headers);
  }

  /**
   * Delete tournament
   * @param id tournament id
   * @returns void
   */
  public async delete(id: string, headers: any): Promise<void> {
    return BaseApi._delete(this.url(`${id}`), null, headers);
  }
}
const TournamentApi = new TournamentApiService();
export default TournamentApi;
