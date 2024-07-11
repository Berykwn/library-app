import axiosWithConfig from "../../axiosWithConfig";
import { Response } from "../../../utils/types/api";
import { ILogin, LoginSchema, RegisterSchema } from "@/utils/types/auth";

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post("/login", body);

    return response.data as Response<ILogin>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post("/register", body);
    return response.data as Response<any>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
