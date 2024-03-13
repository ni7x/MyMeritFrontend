import { users } from "../common/users";
import { socials } from "../common/socials";

const getUsers = () => {
  return users;
};

const getUserById = (userId: string) => {
  return getUsers()[0];
};

const getUserSocials = (userId: string) => {
  return socials;
};

export { getUsers, getUserById, getUserSocials };
