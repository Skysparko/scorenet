import axios from "axios";

export const BASEURL = process.env.APP_URL ?? "http://localhost:8000";
const appAxios = axios.create({
  baseURL: BASEURL+"/api/v1/" ,
  // headers:{
  //   Authorization:  `Bearer ${state?.auth?.user?.token}`
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

export const getPhoto = (path:string,photo: string) => {
  console.log(`${BASEURL}/${path}/${photo}`)
  return `${BASEURL}/${path}/${photo}`;
};
export { appAxios };
