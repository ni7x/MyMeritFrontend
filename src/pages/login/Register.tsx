import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import Input from "../../components/login/Input";
import Divider from "../../components/login/Divider";
import OAuthLogin from "../../components/login/OAuthLogin";

import { useAuth } from "../../hooks/useAuth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [message, setMessage] = useState<boolean | string>(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = (event.target as any).username.value;
    const email = (event.target as any).email.value;
    const password = (event.target as any).password.value;

    if (signUp({ username, email, password })) {
      setMessage("Pomyślnie zarejestrowano. Możesz się teraz zalogować.");
      window.location.href = "/login";
    }
  };

  return (
    <div className="login-box">
      <h1>Create an account</h1>
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="username" name="username" />
        <Input type="text" placeholder="email" name="email" />
        <Input type="password" placeholder="password" name="password" />
        <Input
          type="password"
          placeholder="repeat password"
          name="repeat-password"
        />

        <button type="submit">Register</button>
      </form>

      <p className="signup-link">
        Already have an account?{" "}
        <a
          href="#"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
