import React, { useState, useEffect } from "react";
// import z from 'zod';
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

import User from "../types/User.ts";
// import Company from '../models/Company.tsx';
// import { JwtEncodedUser } from '../types';
import { httpCall } from "../api/HttpClient.ts";
import { getUser } from "../services/UserService.ts";

import { errorToast, successToast } from "../main";

// type UserSignIn = Partial<z.infer<typeof UserModel>>;
// type UserSignUp = Partial<z.infer<typeof UserModel> & { passwordRepeat: string }>;

type CookieUser = JwtEncodedUser | undefined;

type JwtDecodedToken = {
  sub: string;
  iat: number;
  exp: number;
  role: string;
};

type JwtEncodedUser = {
  decodedTokenInfo: JwtDecodedToken;
  accessToken: string;
  isCompany: boolean;
};

type UserSignIn = {
  email: string;
  password: string;
};

type UserSignUp = {
  username: string;
  email: string;
  password: string;
  code: string;
};

type Error = {
  type: "SignIn" | "SignUp" | "SignInCompany";
  message: string;
};

type AuthContext = {
  user: CookieUser;
  userData: User;
  accessToken: string | null;
  isAuthenticated: () => boolean;
  isAuthenticatedCompany: () => boolean;
  signIn: ({ email, password }: UserSignIn) => boolean;
  signInWithToken: (token: string) => void;
  signUp: ({ username, email, password, code }: UserSignUp) => boolean;
  signOut: () => void;
  isLoading: boolean;
  isError?: Error;
};

const getUserFromCookie = () => {
  const cookies = new Cookies();
  return cookies.get("user");
};

const useAuthProvider = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState<CookieUser>(getUserFromCookie());
  const [userData, setUserData] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | undefined>(undefined);
  const cookies = new Cookies();

  const isAuthenticated = (): boolean => {
    const isTokenExpired = () => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return user?.decodedTokenInfo.exp
        ? currentTimestamp >= user.decodedTokenInfo.exp
        : true;
    };

    return user != undefined && !isTokenExpired();
  };

  const isAuthenticatedCompany = () => {
    return user ? user.isCompany : false;
  };

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: UserSignIn) => {
      const data = await httpCall<any[]>({
        url: import.meta.env.VITE_ROUTE_AUTH_LOGIN,
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      });

      return data;
    },
    onMutate: async () => {
      setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);

      if (response.success) {
        console.log("zalogowano", response.data.token);
        successToast("Logged in successfully");
        const decodedToken = jwtDecode<JwtDecodedToken>(response.data.token);
        const userInfo = {
          decodedTokenInfo: decodedToken,
          accessToken: response.data.token,
          isCompany: decodedToken.role.toUpperCase() !== "USER",
        };
        setUser(userInfo);
        cookies.set("user", userInfo);
        navigation("/");
      } else {
        setIsError({ type: "SignIn", message: response.message });
        errorToast(response.message);
      }
    },
    onError: async (response: string) => {
      console.log(response);
      setIsLoading(false);
      setIsError({ type: "SignIn", message: response });
      errorToast("Could not log in. Please try again.");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ username, email, password, code }: UserSignUp) => {
      const data = await httpCall<any[]>({
        url: import.meta.env.VITE_ROUTE_AUTH_REGISTER,
        method: "POST",
        body: {
          username: username,
          email: email,
          password: password,
          code: code,
          // TODO
          // password2: password2,
        },
      });

      return data;
    },
    onMutate: async () => {
      setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);
      if (response.success) {
        console.log("zarejestrowano");
        successToast("Registered successfully");
        navigation("/login");
      } else {
        navigation("/register");
        setIsError({ type: "SignUp", message: response.message });
        errorToast("Could not register. Please try again.");
      }
    },
    onError: async (response: string) => {
      setIsLoading(false);
      setIsError({ type: "SignUp", message: response });
      errorToast("Could not register. Please try again.");
    },
  });

  const signInWithToken = async (token: string) => {
    try {
      const decodedToken = jwtDecode<JwtDecodedToken>(token);
      const userInfo = { decodedTokenInfo: decodedToken, accessToken: token };
      setUser(userInfo);
      cookies.set("user", userInfo, { path: "/" });
      const userData = await getUser();
      setUserData(userData);
      successToast("Logged in successfully");
      navigation("/");
    } catch (e) {
      console.error(e);
      errorToast("Could not log in. Please try again.");
    }
  };

  useEffect(() => {
    if (cookies.get("user")) {
      setUser(cookies.get("user"));
      getUser().then((userData) => {
        setUserData(userData);
      });
    }
  }, []);

  const signIn = ({ email, password }: UserSignIn) => {
    signInMutation.mutate({ email, password });
    return signInMutation.isSuccess;
  };

  const signUp = ({ username, email, password, code }: UserSignUp) => {
    signUpMutation.mutate({ username, email, password, code });
    return signUpMutation.isSuccess;
  };

  const signOut = () => {
    cookies.remove("user");
    setUser(undefined);
    window.location.reload();
  };

  return {
    user,
    userData,
    accessToken: user ? user.accessToken : null,
    isAuthenticated,
    isAuthenticatedCompany,
    signIn,
    signInWithToken,
    signUp,
    signOut,
    isLoading,
    isError,
  };
};

const AuthContext = React.createContext({} as AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
