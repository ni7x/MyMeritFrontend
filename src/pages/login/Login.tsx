import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import Input from "../../components/login/Input";
import Divider from "../../components/login/Divider";
import OAuthLogin from "../../components/login/OAuthLogin";

import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;

    signIn({ email, password });
  };

  return (
    <div className="login-box">
      <h1>Welcome back!</h1>
      <form onSubmit={onSubmit}>
        <Input type="text" id="email" name="email" placeholder="email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />

        <a className="forgot-password" href="#">
          forgot password?
        </a>

        <button type="submit">Log In</button>
      </form>
      <Divider>or</Divider>
      <OAuthLogin />

      <p className="signup-link">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
