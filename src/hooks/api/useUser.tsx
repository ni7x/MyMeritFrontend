import { useQuery } from "@tanstack/react-query";
// import { httpCall } from "@api/HttpClient";
import { httpCall } from "../../api/HttpClient";
import type { User } from "@types";

export const useGetUsers = () => {
  return useQuery<User>({
    queryFn: () =>
      httpCall<User>({
        url: import.meta.env.VITE_API_URL + "/me",
        method: "GET",
      }),
    queryKey: ["getUsers"],
  });
};
