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

const getUser = (): Promise<User> => {
  return httpCall<User>({
    url: import.meta.env.VITE_API_URL + "/me",
    method: "GET",
  });
};

export { getUsers, getUserById, getUserSocials, getUser };
