import { FormEvent } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

import AuthForm from "./AuthForm";
import AuthSubmit from "../form/CustomSubmit";
import CustomInput from "../form/CustomInput";
import Loading from "../Loading";

const RegisterStep2 = ({
  register,
  errors,
  onSubmit,
  getValues,
  isLoading,
}: {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues> | undefined;
  onSubmit: (e: FormEvent) => void;
  getValues: any;
  isLoading: boolean;
}) => {
  return (
    <>
      {/* <AuthSubTitle>Step 2 - verify your email</AuthSubTitle> */}
      <AuthForm handleSubmit={onSubmit}>
        <CustomInput
          id="code"
          type="text"
          // placeholder="Code"
          label="Verification code"
          register={register}
          getValues={getValues}
          error={errors?.code?.message}
        />
        <p className="m-0 text-xs opacity-70">
          Please put here verification code sent to your email.
        </p>
        <AuthSubmit>{isLoading ? <Loading /> : "Verify"}</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep2;
