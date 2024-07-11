import axiosWithConfig from "../../axiosWithConfig";
import { Borrow } from "./type";
import { Response, PayloadPagination } from "../../types/api";

export const getBorrows = async (page: number = 1, limit: number) => {
  try {
    const url = `/borrows?page=${page}&limit=${limit}`;
    const response = await axiosWithConfig.get(url);
    return response.data as Response<PayloadPagination<Borrow[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
