import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";
import Input from "../../components/login/Input";
import Divider from "../../components/login/Divider";
import OAuthLogin from "../../components/login/OAuthLogin";

import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/login/AuthForm";
import AuthSubmit from "../../components/login/AuthSubmit";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");

    signIn({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <AuthBox>
      <AuthTitle>Welcome back!</AuthTitle>
      <AuthForm handleSubmit={onSubmit}>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />

        <a className=" w-max ml-auto text-white font-bold text-xs" href="#">
          forgot password?
        </a>

        <AuthSubmit>Log In</AuthSubmit>
      </AuthForm>
      <Divider>or</Divider>
      <OAuthLogin />

      <p className=" text-center text-sm mt-4 font-semibold">
        Don't have an account?{" "}
        <a
          className="text-[#06a58f]"
          href="#"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </a>
      </p>
    </AuthBox>
  );
};

export default Login;
