// import {
//   ICreateUserPayload,
//   IUserResponse,
//   IUsersResponse,
//   IUpdateUserPayload,
//   IGetAllUsersPayload,
// } from "../types/user.type";
// import * as BaseApi from "./base-api";
// class UserApiService {
//   private url = (api: string) => `user/${api}`;
//   /**
//    * create new
//    * @param user
//    * @returns User
//    */
//   public async create(payload: ICreateUserPayload): Promise<IUserResponse> {
//     return BaseApi._post(this.url("register"), payload);
//   } 

//   /**
//    * Get all users
//    * @returns List of users
//    */
//   public async getAll(payload:IGetAllUsersPayload): Promise<IUsersResponse> {
//     return BaseApi._get(this.url(""),payload);
//   }

//   /**
//    * Get user
//    * @params id
//    * @returns user
//    */
//   public async get(id:string): Promise<IUserResponse> {
//     return BaseApi._get(this.url(id));
//   }

//   /**
//    * Get current User 
//    * @returns User
//    */
//   public async getCurrent(): Promise<IUserResponse> {
//     return BaseApi._get(this.url(`profile`));
//   }

//   /**
//    * update current user
//    * @param user
//    * @returns User
//    */
//   public async updateCurrent(payload: IUpdateUserPayload): Promise<IUserResponse> {
//     return BaseApi._patch(this.url("profile"), payload);
//   }

//   /**
//    * update
//    * @param user
//    * @returns User
//    */
//   public async update(payload: IUpdateUserPayload,id:string): Promise<IUserResponse> {
//     return BaseApi._patch(this.url(`${id}`), payload);
//   }

//   // /**
//   //  * Delete user
//   //  * @param id user id
//   //  * @returns void
//   //  */
//   // public async delete(id: string): Promise<void> {
//   //   return BaseApi._delete(this.url(`${id}`));
//   // }
// }
// const UserApi = new UserApiService();
// export default UserApi;
