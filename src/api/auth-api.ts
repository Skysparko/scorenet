import {
  ILoginUserPayload,
  IOtpVerifyPayload,
  IRegisterUserPayload,
  IUpdatePasswordPayload,
} from "@/types/auth.type";
import * as BaseApi from "./base-api";
import { IResponse } from "@/types/common.type";
import { IUser } from "@/types/user.type";

class AuthApiService {
  private url = (action: string) => "users/" + action;

  /**
   * Register user
   * @param IRegisterUserPayload
//    * @returns Token
   */
  public async register(
    payload: IRegisterUserPayload
  ): Promise<IResponse<IUser>> {
    let fd = new FormData();
    for (let key in payload as IRegisterUserPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._post(this.url("register"), fd);
  }

  /**
   * Login user
   * @param ILoginUserPayload
//    * @returns Token
   */
  public async login(payload: ILoginUserPayload): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("login"), payload);
  }

  /**
   * Login user
   * @param IOtpVerifyPayload
//    * @returns Token
   */
  public async otpVerify(
    payload: IOtpVerifyPayload
  ): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("otp_verify"), payload);
  }

  /**
   * Login user
   * @param IOtpVerifyPayload
//    * @returns Token
   */
  public async updatePassword(
    payload: IUpdatePasswordPayload
  ): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("update-password"), payload);
  }
}
const AuthApi = new AuthApiService();
export default AuthApi;
