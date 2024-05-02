import { users } from "../common/users";
import { socials } from "../common/socials";

import { httpCall } from "../api/HttpClient";
import User from "../types/User";
import Task from "../types/Task";

import { errorToast, successToast } from "../main";

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
    errorToast("Could not fetch tasks. Please try again.");
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
    errorToast("Could not fetch user. Please try again.");
  }
};

const updateUser = async (
  username: string,
  description: string,
  imageBase64: string
) => {
  try {
    const data = await httpCall<User>({
      url: import.meta.env.VITE_API_URL + "/me/update",
      method: "POST",
      body: {
        username,
        description,
        imageBase64,
      },
    });
    successToast("User updated successfully");
    return data;
  } catch (error) {
    console.error(error);
    errorToast("Could not update user. Please try again.");
  }
};

export {
  getUsers,
  getUserById,
  getUserSocials,
  getUser,
  updateUser,
  getUserTasks,
};
