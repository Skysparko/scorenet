import {SVGProps} from "react";
export interface IResponse<T> {
  success: boolean;
  msg: string;
  data: {
    list: Array<T>;
    path: string;
    detail: T | null;
    bearer_token?: string;
  };
}


export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
}