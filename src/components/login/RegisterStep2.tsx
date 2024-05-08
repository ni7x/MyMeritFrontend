import { FormEvent } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";
import Loading from "../Loading";

const RegisterStep2 = ({
  register,
  errors,
  onSubmit,
  isLoading,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues> | undefined;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <AuthSubTitle>Step 2 - verify your email</AuthSubTitle>
      <AuthForm handleSubmit={onSubmit}>
        <CustomInput
          id="code"
          type="text"
          placeholder="Code"
          register={register}
          error={errors?.code?.message}
        />
        <p className="m-0 text-xs opacity-70">
          Please put here verification code sent to your email.
        </p>
        <AuthSubmit>{isLoading ? <Loading /> : "Next"}</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep2;
