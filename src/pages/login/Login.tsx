import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";
import Input from "../../components/login/Input";
import Divider from "../../components/login/Divider";
import OAuthLogin from "../../components/login/OAuthLogin";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/login/AuthForm";
import AuthSubmit from "../../components/login/AuthSubmit";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, isLoading, isError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmiting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const processedPassword = showPassword ? "text" : "password";

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    signIn(data);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <AuthBox>
      <AuthTitle>Welcome back!</AuthTitle>
      <AuthForm handleSubmit={handleSubmit(onSubmit)}>
        <div className={`relative ${errors.email && "mb-4"}`}>
          <input
            type="text"
            id="email"
            placeholder="email"
            className="bg-main-bg-input bg-[#44444f] rounded border-none p-4 text-sm text-white box-border w-full font-semibold focus-visible:border-none focus-visible:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[#ff4d4f] text-xs absolute top-full left-0">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className={`relative ${errors.password && "mb-4"}`}>
          <input
            type={processedPassword}
            id="password"
            placeholder="password"
            className="bg-main-bg-input bg-[#44444f] rounded border-none p-4 text-sm text-white box-border w-full font-semibold focus-visible:border-none focus-visible:outline-none"
            {...register("password")}
          />

          <FontAwesomeIcon
            className="absolute top-0 bottom-0 right-4 m-auto w-5 h-auto text-main-lighter"
            icon={showPassword ? faEyeSlash : faEye}
            onClick={handleShowPassword}
          />

          {errors.password && (
            <p className="text-[#ff4d4f] text-xs absolute top-full left-0">
              {errors.password.message}
            </p>
          )}
        </div>

        <a className=" w-max ml-auto text-white font-bold text-xs" href="#">
          forgot password?
        </a>

        <AuthSubmit>{isLoading ? "Loading.." : "Log In"}</AuthSubmit>
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
