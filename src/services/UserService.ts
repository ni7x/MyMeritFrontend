import { users } from "../common/users";
import { socials } from "../common/socials";

import { httpCall } from "../api/HttpClient";
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
  return httpCall<Task[]>({
    url: import.meta.env.VITE_API_URL + "/me/mytasks",
    method: "GET",
  });
};

const getUser = async () => {
  return httpCall<User>({
    url: import.meta.env.VITE_API_URL + "/me",
    method: "GET",
  });
};

const updateUser = async (
  username: string,
  description: string,
  imageBase64: string
) => {
  return httpCall<User>({
    url: import.meta.env.VITE_API_URL + "/me/update",
    method: "POST",
    body: {
      username,
      description,
      imageBase64,
    },
  });
};

export {
  getUsers,
  getUserById,
  getUserSocials,
  getUser,
  updateUser,
  getUserTasks,
};
