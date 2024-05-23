import { User } from "./";
import { HttpResponse } from "../api/HttpClient.ts";

export type CookieUser = {
    decodedTokenInfo: JwtDecodedToken;
    accessToken: string;
    isCompany: boolean;
  };
  
export type JwtDecodedToken = {
    sub: string;
    iat: number;
    exp: number;
    role: string;
};

export type UserSignIn = {
    email: string;
    password: string;
};

export type UserSignUp = {
    username: string;
    email: string;
    password: string;
    code: string;
};

export type AuthError = {
    type: "SignIn" | "SignUp" | "SignInCompany" | "VerifyEmail" | "VerifyCode";
    message: string;
};

export type AuthContextType = {
    user: CookieUser | undefined;
    userData: User | undefined;
    setUserData: (userData: User) => void;
    accessToken: string | null;
    isAuthenticated: () => boolean;
    isAuthenticatedCompany: () => boolean;
    signIn: ({ email, password }: UserSignIn) => boolean;
    signInWithToken: (token: string) => void;
    signUp: ({ username, email, password, code }: UserSignUp) => boolean;
    signOut: () => void;
    verifyEmail: (email: string) => Promise<HttpResponse<[]>>;
    verifyCode: (email: string, code: string) => Promise<HttpResponse<[]>>;
    updateUser: (
        username: string,
        description: string,
        imageBase64: string
    ) => Promise<HttpResponse<null>>;
    isLoading: boolean;
    isError?: AuthError;
};