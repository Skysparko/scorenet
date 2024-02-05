import showError from "../utils/show-error";
import { AppError } from "./app-error";
import { message } from "antd";

export function HandleError(
  error: AppError | any,
  showPopup: boolean = true
): any {
  switch (error.status) {
    case 400:
      console.log("error: " + error);
      if (error?.data) {
        if (typeof error.data.message === "string") {
          message.error({
            content: error.data.message,
          });
        } else {
          const errorsArray = [];
          const errors = new BadRequestException(error.data.message);
          const parsedErrors = errors.getParsed();
          for (const error in parsedErrors) {
            errorsArray.push(errors.getError(error));
          }
          if (showPopup) {
            message.error({
              content: showError(errorsArray),
            });
          }
        }
      } else {
        return {
          errors: ["Unknow error."],
          fieldErrors: [],
        };
      }
      break;
    case 401:
      break;
    default:
      if (showPopup) {
        message.error({
          //   title: "Error",
          content: error?.data?.message ?? "An error has occured.",
        });
      }
      return {
        errors: [error?.data?.message ?? "Unknow error occured."],
        fieldsErrors: [],
      };
  }
}

export class BadRequestException extends Error {
  data?: { property?: string; message: string[] }[];
  constructor(responseData: any, message: string = "Bad request") {
    super(message);
    this.data = responseData;
  }

  getError(fieldName: string): string {
    const error = this.data?.find((e) => e.property === fieldName);
    return error?.message?.join(", ") || "";
  }

  getParsed(): { [key: string]: string } {
    const parsed: { [key: string]: string } = {};
    this.data?.forEach((e) => {
      parsed[e.property || ""] = e.message.join(", ");
    });
    console.log(parsed);
    return parsed;
  }
}
