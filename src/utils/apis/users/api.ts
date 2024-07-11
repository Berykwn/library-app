import { Response } from "@/utils/types/api";
import axiosWithConfig, { setAxiosConfig } from "../../axiosWithConfig";
import { UserProfile } from "./type";

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);

    const response = await axiosWithConfig.get<Response<UserProfile>>("/users");
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (profile: Partial<UserProfile>) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);

    const response = await axiosWithConfig.put<Response<UserProfile>>(
      "/users",
      profile
    );

    return response.data.payload;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);

    const response = await axiosWithConfig.delete("/users");
    console.log("delete user", response)
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
