
import { IResponse } from "@/types/common.type";
import * as BaseApi from "./base-api";
import { ICreatePlayerPayload, IPlayer, IUpdatePlayerPayload } from "@/types/player.type";
class PlayerApiService {
  private url = (api: string) => `players/${api}`;
  /**
   * create new
   * @param Player
   * @returns Player
   */
  public async create(payload: ICreatePlayerPayload): Promise<IResponse<IPlayer>> {
    return BaseApi._post(this.url("register"), payload);
  } 

  /**
   * Get all Player
   * @returns List of Players
   */
  public async getAll(): Promise<IResponse<IPlayer>> {
    return BaseApi._get(this.url(""));
  }

  /**
   * Get Player
   * @params id
   * @returns Player
   */
  public async get(id:string): Promise<IResponse<IPlayer>> {
    return BaseApi._get(this.url(id));
  }

  /**
   * update
   * @param Player
   * @returns Player
   */
  public async update(payload: IUpdatePlayerPayload,id:string): Promise<IResponse<IPlayer>>{
    return BaseApi._patch(this.url(`${id}`), payload);
  }

  /**
   * Delete Player
   * @param id Player id
   * @returns void
   */
  public async delete(id: string): Promise<void> {
    return BaseApi._delete(this.url(`${id}`));
  }
}
const PlayerApi = new PlayerApiService();
export default PlayerApi;
