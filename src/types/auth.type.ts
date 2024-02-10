import { IUser } from "./user.type";

export interface IAuth {
  token: string | null;
  detail:IUser | null;
}

export interface IRegisterUserPayload {
  name: string;
  mobile_no: string;
  password: string;
  email: string;
  city: string;
  image:string
}

export interface ILoginUserPayload {
  mobile_no: string;
  password: string;
}

export interface IOtpVerifyPayload {
  mobile_no: string;
  otp: string;
}

export interface IUpdatePasswordPayload {
  old_password: string;
  new_password: string;
}
