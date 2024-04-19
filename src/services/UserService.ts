import { users } from "../common/users";
import { socials } from "../common/socials";

import { httpCall } from "../api/HttpClient";
import User from "../types/User";

const getUsers = () => {
  return users;
};

const getUserById = (userId: string) => {
  return getUsers()[0];
};

const getUserSocials = (userId: string) => {
  return socials;
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
  imageUrl: string
) => {
  return httpCall<User>({
    url: import.meta.env.VITE_API_URL + "/me/update/",
    method: "POST",
    body: {
      username,
      description,
      imageUrl,
    },
  });
};

export { getUsers, getUserById, getUserSocials, getUser, updateUser };
