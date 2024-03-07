import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";
import Input from "../../components/login/Input";
import Divider from "../../components/login/Divider";
import OAuthLogin from "../../components/login/OAuthLogin";

import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    signIn({ email, password });
  };

  return (
    <AuthBox>
      <h1 className="pb-6 m-0 text-base text-center">Welcome back!</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input 
          type="text" 
          id="email" 
          name="email" 
          placeholder="email" 
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />

        <a className=" w-max ml-auto text-white font-bold text-xs" href="#">
          forgot password?
        </a>

        <button className=" p-4 rounded bg-[#06a58f] border-none text-white font-bold text-sm cursor-pointer transition-colors duration-200 ease-linear hover:bg-[#057767]" type="submit">Log In</button>
      </form>
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
