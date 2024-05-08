import { FormEvent } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";
import Loading from "../Loading";

const RegisterStep1 = ({
  register,
  errors,
  onSubmit,
  isLoading,
}: {
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <AuthSubTitle>Step 1 - set your email</AuthSubTitle>
      <AuthForm handleSubmit={onSubmit}>
        <CustomInput
          id="email"
          type="text"
          placeholder="Email"
          register={register}
          error={errors?.email?.message}
        />
        <p className="m-0 text-xs opacity-70">
          We will send you verification code to this email.
        </p>
        {/* <>
          {errors?.root?.message && (
            <p className="w-full font-semibold text-[0.8rem] text-[#b94a48]">
              {errors?.root?.message}
            </p>
          )}
        </> */}
        <AuthSubmit>{isLoading ? <Loading /> : "Next"}</AuthSubmit>
      </AuthForm>
      <p className=" text-center text-sm mt-4 font-semibold">
        Have an account?{" "}
        <a
          className="text-[#06a58f]"
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
