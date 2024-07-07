import axiosWithConfig from "../../axiosWithConfig";
import { Response, PayloadPagination } from "../../types/api";
import { Book } from "./type";

export const getBooks = async (sortQuery: string, page: number = 1, limit: number) => {
  try {
    const url = `/books?sort=${sortQuery}&page=${page}&limit=${limit}`;

    const response = await axiosWithConfig.get(url);

    return response.data as Response<PayloadPagination<Book[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getBookById = async (id: string) => {
  try {
    const url = `/books/${id}`;

    const response = await axiosWithConfig.get(url);

    return response.data as Response<Book>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
