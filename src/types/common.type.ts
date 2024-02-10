export interface IResponse<T> {
  success: boolean;
  msg: string;
  data: {
    list: Array<T>;
    path: string;
    detail: T | null;
    bearerToken?: string;
  };
}
