import {
    IAuth,
    IUpdatePasswordPayload,
    IUser,
} from "../types/user.type";
import * as BaseApi from "./base-api";

class AuthApiService {
    private url = (action: string) => "auth/" + action;

    /**
     * Login user
     * @param userEmail
     * @param password
     * @returns Token
     */
    public async login(userEmail: string, password: string): Promise<IAuth> {
        return BaseApi._post(this.url("signin"), {
            userEmail,
            password,
        });
    }

    /**
     * update password
     * @returns
     */

    public async updatePassword(payload: IUpdatePasswordPayload): Promise<void> {
        return BaseApi._patch(this.url("password"), payload);
    }
}
const AuthApi = new AuthApiService();
export default AuthApi;
