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
    payload: IRegisterUserPayload,
    headers:any
  ): Promise<IResponse<IUser>> {
    let fd = new FormData();

    for (let key in payload as IRegisterUserPayload) {
      fd.append(key, (payload as any)[key]);
    }
    console.log("fd", fd);
    return BaseApi._post(this.url("register"), fd,headers);
  }

  /**
   * Login user
   * @param ILoginUserPayload
//    * @returns Token
   */
  public async login(payload: ILoginUserPayload,
    headers:any): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("login"), payload,headers);
  }

  /**
   * otp-verify
   * @param IOtpVerifyPayload
//    * @returns Token
   */
  public async otpVerify(
    payload: IOtpVerifyPayload,
    headers:any
  ): Promise<IResponse<IUser>> {
    return BaseApi._post(this.url("otp-verify"), payload,headers);
  }

  /**
   * update password
   * @param IUpdatePasswordPayload
//    * @returns Token
   */
  public async updatePassword(
    payload: IUpdatePasswordPayload,
    headers:any
  ): Promise<IResponse<IUser>> {
    return BaseApi._patch(this.url("update-password"), payload,headers);
  }

  /**
   * Update user
   * @param IUpdateUserPayload
//    * @returns Token
   */
  public async updateUser(
    payload: IUpdateUserPayload,
    headers:any
  ): Promise<IResponse<IUser>> {
    let fd = new FormData();

    for (let key in payload as IRegisterUserPayload) {
      fd.append(key, (payload as any)[key]);
    }
    return BaseApi._put(this.url("update"), fd,headers);
  }
}
const AuthApi = new AuthApiService();
export default AuthApi;
