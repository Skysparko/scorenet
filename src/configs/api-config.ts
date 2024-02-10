import axios from "axios";
import { store } from "@/store";
// const user = store.getState().auth.user;
export const BASEURL = process.env.APP_URL;
const appAxios = axios.create({
  baseURL: BASEURL ?? "http://13.127.169.169:8000/api/v1/",
  // headers:{
  //   Authorization:  `Bearer ${user.token}`
  // }
});
// appAxios.interceptors.request.use((conf) => {
//   const user = store.getState().auth.user;
//   if (user) {
//     conf.headers = {
//       ...conf.headers,
//       Authorization: `Bearer ${user.token}`,
//     } as any;
//   }
//   return conf;
// });
// appAxios.interceptors.response.use(
//   (resp) => {
//     if (resp.status === 401) {
//       Router.redirect("/login");
//     }
//     return resp;
//   },
//   (err) => {
//     if (err?.response?.status === 401) {
//       Router.redirect("/login");
//       throw new AppError(
//         401,
//         "Your session has expired. Please login to continue..."
//       );
//     }
//     throw err;
//   }
// );

export const GetPhoto = (photo: string) => {
  return `${BASEURL}/${photo}`;
};
export { appAxios };
