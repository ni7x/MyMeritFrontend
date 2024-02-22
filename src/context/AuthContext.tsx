import React, { useState, useEffect } from 'react';
// import z from 'zod';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

import User from '../models/User.ts';
// import Company from '../models/Company.tsx';
// import { JwtEncodedUser } from '../types';
import { apiCall } from '../api/ApiClient';

// type UserSignIn = Partial<z.infer<typeof UserModel>>;
// type UserSignUp = Partial<z.infer<typeof UserModel> & { passwordRepeat: string }>;

type JwtEncodedUser = {
    id: string;
    createdAt: Date;
    expiresAt: Date;
}

type UserSignIn = {
  email: string;
  password: string;
}

type Error = {
  type: "SignIn" | "SignUp" | "SignInCompany";
  message: string;
}

type AuthContext = {
//   guestUser: JwtEncodedUser;
  user: JwtEncodedUser;
  isAuthenticated: () => boolean;
//   isAuthenticatedAdmin: () => boolean;
  signIn: ({ email, password }: UserSignIn) => void;
//   signInAdmin: ({ email, password }: UserSignIn) => void;
//   signUp: ({ email, password, passwordRepeat }: UserSignUp) => void;
//   signInWithGoogle: () => void;
  isLoading: boolean;
  isError?: Error;
};

const getUserFromCookie = () => {
  const cookies = new Cookies();
  
  if (cookies.get('user'))
    return cookies.get('user')
  return null;
};

const useAuthProvider = () => {
//   const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | undefined>(undefined);
  const cookies = new Cookies();

  const isAuthenticated = () => {
    return getUserFromCookie() !== null;
  };

  const signInMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: UserSignIn) => {
      const data = await apiCall<any[]>({
        url: import.meta.env.VITE_ROUTE_AUTH_LOGIN,
        method: 'POST',
        body: {
          email: email,
          password: password
        }
      });

      return data;
    },
    onMutate: async () => {
      setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);
    },
    onError: async (response: string) => {
      setIsLoading(false);
      setIsError({type: "SignIn", message: response});
    }
  });
 
  const [user, setUser] = useState<JwtEncodedUser>(getUserFromCookie());

  useEffect(() => {
    if (cookies.get('user')) {
      setUser(cookies.get('user'));
    }
  }, []);

  const signIn = ({ email, password }: UserSignIn) => {
    signInMutation.mutate({ email, password });
    return signInMutation.isSuccess;
  };

  return {
    user,
    isAuthenticated,
    signIn,
    isLoading,
    isError
  };
}

const AuthContext = React.createContext({} as AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };