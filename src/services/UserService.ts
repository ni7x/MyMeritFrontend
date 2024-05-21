import { users } from "../common/users";
import { socials } from "../common/socials";

import { HttpResponse, httpCall } from "../api/HttpClient";
import User from "../types/User";
import Task from "../models/TaskPreview";
import RankingUserDTO from "../models/dtos/RankingUserDTO";

const getUsers = () => {
  return users;
};

const getUserById = () => {
  return getUsers()[0];
};

const getUserSocials = () => {
  return socials;
};

const getUserTasks = async () => {
  try {
    const data = await httpCall<Task[]>({
      url: import.meta.env.VITE_API_URL + "/me/mytasks",
      method: "GET",
    });
    // successToast("Tasks fetched successfully");

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getUser = async () => {
  const data = await httpCall<User>({
    url: import.meta.env.VITE_API_URL + "/me",
    method: "GET",
  });

  return data;
};

const updateUser = async (
  username: string,
  description: string,
  imageBase64: string
) => {
  return await httpCall<HttpResponse<null>>({
    url: import.meta.env.VITE_API_URL + "/me/update",
    method: "POST",
    body: {
      username,
      description,
      imageBase64,
    },
  });
};

const getRanking = async (dataRange: "week" | "month" | "year") => {
  try {
    const data = await httpCall<RankingUserDTO[]>({
      url: import.meta.env.VITE_API_URL + "/ranking/" + dataRange + "ly",
      method: "GET",
    });
    // successToast("Tasks fetched successfully");

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  getUsers,
  getUserById,
  getUserSocials,
  getUser,
  updateUser,
  getUserTasks,
  getRanking
};
