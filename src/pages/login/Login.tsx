import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";
// import Input from "../../components/login/Input";
import Divider from "../../components/login/Divider";
import OAuthLogin from "../../components/login/OAuthLogin";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/login/AuthForm";
import AuthSubmit from "../../components/form/AuthSubmit";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loading from "../../components/Loading";
import CustomInput from "../../components/form/CustomInput";

const schema = z.object({
  email: z.string().nonempty("Required"),
  password: z.string().nonempty("Required"),
});

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//   email: string;
//   password: string;
// };

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, isLoading, isError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
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
      <AuthTitle className="pb-4">Welcome back!</AuthTitle>
      <AuthForm handleSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          id="email"
          type="text"
          label="Email"
          // placeholder="email"
          register={register}
          getValues={getValues}
          error={errors.email && errors.email.message}
        />

        <CustomInput
          id="password"
          type={processedPassword}
          label="Password"
          // placeholder="password"
          register={register}
          getValues={getValues}
          error={errors.password && errors.password.message}
        />

        <a className=" w-max ml-auto text-white font-bold text-xs" href="#">
          forgot password?
        </a>

        <AuthSubmit>{isLoading ? <Loading /> : "Log In"}</AuthSubmit>
      </AuthForm>
      <Divider>or</Divider>
      <OAuthLogin />

      <p className=" text-center text-sm mt-4 font-semibold">
        Don't have an account?{" "}
        <a
          className="text-success-color"
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
