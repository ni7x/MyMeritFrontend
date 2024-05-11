import { users } from "../common/users";
import { socials } from "../common/socials";

import { HttpResponse, httpCall } from "../api/HttpClient";
import User from "../types/User";
import Task from "../types/Task";

const getUsers = () => {
  return users;
};

const getUserById = (userId: string) => {
  return getUsers()[0];
};

const getUserSocials = (userId: string) => {
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
  }
};

const getUser = async () => {
  try {
    const data = await httpCall<User>({
      url: import.meta.env.VITE_API_URL + "/me",
      method: "GET",
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (
  username: string,
  description: string,
  imageBase64: string
) => {
  try {
    return await httpCall<HttpResponse<any>>({
      url: import.meta.env.VITE_API_URL + "/me/update",
      method: "POST",
      body: {
        username,
        description,
        imageBase64,
      },
    });
  } catch (error) {}
};

export {
  getUsers,
  getUserById,
  getUserSocials,
  getUser,
  updateUser,
  getUserTasks,
};
