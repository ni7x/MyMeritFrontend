import React, { useState, useEffect } from "react";
// import z from 'zod';
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

import User from "../models/User.ts";
// import Company from '../models/Company.tsx';
// import { JwtEncodedUser } from '../types';
import { httpCall } from "../api/HttpClient.ts";

// type UserSignIn = Partial<z.infer<typeof UserModel>>;
// type UserSignUp = Partial<z.infer<typeof UserModel> & { passwordRepeat: string }>;

type CookieUser = JwtEncodedUser | undefined;

type JwtDecodedToken = {
  sub: string;
  iat: number;
  exp: number;
};

type JwtEncodedUser = {
  decodedTokenInfo: JwtDecodedToken;
  accessToken: string;
  //TODO
  //isCompany: boolean;
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
  isAuthenticated: () => boolean;
  // isAuthenticatedCompany: () => boolean;
  signIn: ({ email, password }: UserSignIn) => boolean;
  signInWithToken: (token: string) => void;
  signUp: ({ username, email, password, code }: UserSignUp) => boolean;
  signOut: () => void;
  //TODO: Add Google Auth
  //   signInWithGoogle: () => void;
  //TODO Add GitHub Auth
  //   signInWithGitHub: () => void;
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

  //TODO
  // const isAuthenticatedCompany = () => {
  //   return user.isCompany;
  // };

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
        signInWithToken(response.data.token);
      } else {
        setIsError({ type: "SignIn", message: response.message });
      }
    },
    onError: async (response: string) => {
      setIsLoading(false);
      setIsError({ type: "SignIn", message: response });
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
        navigation("/login");
      } else {
        navigation("/register");
      }
    },
    onError: async (response: string) => {
      setIsLoading(false);
      setIsError({ type: "SignUp", message: response });
    },
  });

  const signInWithToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<JwtDecodedToken>(token);
      const userInfo = { decodedTokenInfo: decodedToken, accessToken: token };
      setUser(userInfo);
      cookies.set("user", userInfo, { path: "/" });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (cookies.get("user")) {
      setUser(cookies.get("user"));
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
    accessToken: user ? user.accessToken : null,
    isAuthenticated,
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
