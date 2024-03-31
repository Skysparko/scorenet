import { AxiosError, AxiosResponse } from "axios";
import { appAxios } from "../configs/api-config";
import { AppError } from "../errors/app-error";
import qs from "qs";
import { HandleError as showError } from "../errors/handler";
import { toast } from "react-toastify";
import { store } from "@/store";
export const _post = async <T>(api: string, data: any, headers: any = null) => {
  try {
    const state = store.getState()
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.post<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.post<T>(api, data,{
        headers:{
          Authorization:  `Bearer ${state?.auth?.user?.token}`
        }
      });
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      // throw new AppError(response.status, response.statusText, response.data);
      console.log("response: " + response);
      throw "Error: " + response;
    }
  } catch (error) {
    console.log("error: " + error);
    // throw error;
    throw HandleError(error);
    // console.log();
  }
};

export const _put = async <T>(api: string, data: any, headers: any = null) => {
  try {
    let response: AxiosResponse<T, any>;
    const state = store.getState()
    if (headers) {
      response = await appAxios.put<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.put<T>(api, data,{
        headers:{
          Authorization:  `Bearer ${state?.auth?.user?.token}`
        }
      });
    }
    if (response.status === 200) {
      // toast.success(response.data)
      return response.data;
    } else {
      // throw new AppError(response.status, response.statusText, response.data);
      return response.data;
    }
  } catch (error) {
    throw HandleError(error);
    throw error;
  }
};

export const _get = async <T>(
  api: string,
  data: any = null,
  headers: any = null
) => {
  try {
    let url = api;
    const state = store.getState()
    if (data) {
      url += `?${qs.stringify(data, {
        arrayFormat: "repeat",
        skipNulls: true,
      })}`;
    }
    console.log(url);
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.get<T>(url, {
        headers,
      });
    } else {
      console.log('hi')
      response = await appAxios.get<T>(url,{
        headers:{
          Authorization:  `Bearer ${state?.auth?.user?.token}`
        }
      });
    }
    console.log("response: " + response.data)
    if (response.status === 200) {
      return response.data;
    } else {
      // throw new AppError(response.status, response.statusText, response.data);
      return response.data;
    }
  } catch (error) {
    console.log("error: " + error)
    throw HandleError(error);
    throw error;
  }
};

export const _patch = async <T>(
  api: string,
  data: any,
  headers: any = null
) => {
  try {
    let response: AxiosResponse<T, any>;
    const state = store.getState()
    if (headers) {
      response = await appAxios.patch<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.patch<T>(api, data,{
        headers:{
          Authorization:  `Bearer ${state?.auth?.user?.token}`
        }
      });
    }
    if (response.status === 200) {
      return response.data;
    } else {
      // throw new AppError(response.status, response.statusText, response.data);
      console.log("Error: " + response);
      return response.data;
    }
  } catch (error) {
    throw HandleError(error);
    throw error;
  }
};

export const _delete = async <T>(
  api: string,
  data: any = null,
  headers: any = null
) => {
  try {
    let url = api;
    const state = store.getState()
    if (data) {
      url += "?";
      for (let key in data) {
        url = `${url}${key}=${data[key]}&`;
      }
      url = url.substring(0, url.length - 1);
    }
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.delete<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.delete<T>(url,{
        headers:{
          Authorization:  `Bearer ${state?.auth?.user?.token}`
        }
      });
    }
    if (response.status === 200) {
      return response.data;
    } else {
      // throw new AppError(response.status, response.statusText, response.data);
      return response.data;
    }
  } catch (error) {
    // throw HandleError(error);
    throw error;
  }
};

const HandleError = (error: any) => {
  if (error instanceof AxiosError) {
    console.log("errrrr", error);
    if (error.response?.status) {
      const errRes = error.response.data;
      toast.error(errRes.msg);
      // toast.error()
      return errRes
    }
  }
  showError(error);
  return error;
};
