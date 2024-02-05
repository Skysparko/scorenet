import axios from "axios";
import { AppError } from "../errors/app-error";
import { store } from "../store";
import Router from "next/router";
export const BASEURL = process.env.APP_URL;
const appAxios = axios.create({
  baseURL: BASEURL + "/admin",
});
appAxios.interceptors.request.use((conf) => {
  const user = store.getState().authSlice.user;
  if (user) {
    conf.headers = {
      ...conf.headers,
      Authorization: `Bearer ${user.tokens?.access_token}`,
    } as any;
  }
  return conf;
});
appAxios.interceptors.response.use(
  (resp) => {
    if (resp.status === 401) {
      Router.replace("/login");
    }
    return resp;
  },
  (err) => {
    if (err?.response?.status === 401) {
      Router.replace("/login");
      throw new AppError(
        401,
        "Your session has expired. Please login to continue..."
      );
    }
    throw err;
  }
);

export const GetPhoto = (photo: string) => {
  return `${BASEURL}/${photo}`;
};
export { appAxios };
