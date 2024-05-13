import { FormEvent } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthForm from "./AuthForm";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";
import Loading from "../Loading";

const RegisterStep1 = ({
  register,
  errors,
  onSubmit,
  getValues,
  isLoading,
}: {
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  onSubmit: (e: FormEvent) => void;
  getValues: any;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <AuthSubTitle>Step 1 - set your email</AuthSubTitle> */}
      <AuthForm handleSubmit={onSubmit}>
        <CustomInput
          id="email"
          type="text"
          // placeholder="Email"
          label="Email"
          getValues={getValues}
          register={register}
          error={errors?.email?.message}
        />
        <p className="m-0 text-xs opacity-70">
          We will send you verification code to this email.
        </p>
        <AuthSubmit>{isLoading ? <Loading /> : "Send code"}</AuthSubmit>
      </AuthForm>
      <p className=" text-center text-sm mt-4 font-semibold">
        Have an account?{" "}
        <a
          className="text-success-color"
          href="#"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </a>
      </p>
    </>
  );
};

export default RegisterStep1;
