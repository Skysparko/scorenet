import {
  ILoginUserPayload,
  IOtpVerifyPayload,
  IRegisterUserPayload,
  IUpdatePasswordPayload,
  IUpdateUserPayload,
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
    console.log("fd", fd);
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
   * otp-verify
   * @param IOtpVerifyPayload
//    * @returns Token
   */
  public async otpVerify(
    payload: IOtpVerifyPayload
  ): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("otp-verify"), payload);
  }

  /**
   * update password
   * @param IUpdatePasswordPayload
//    * @returns Token
   */
  public async updatePassword(
    payload: IUpdatePasswordPayload
  ): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("update-password"), payload);
  }

  /**
   * Update user
   * @param IUpdateUserPayload
//    * @returns Token
   */
  public async updateUser(
    payload: IUpdateUserPayload
  ): Promise<IResponse<IUser>> {
    return BaseApi._put(this.url("update"), payload);
  }
}
const AuthApi = new AuthApiService();
export default AuthApi;
