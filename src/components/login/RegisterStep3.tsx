import { FormEvent } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";
import Loading from "../Loading";

const RegisterStep3 = ({
  register,
  errors,
  onSubmit,
  getValues,
  isLoading,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues> | undefined;
  onSubmit: (e: FormEvent) => void;
  getValues: any;
  isLoading: boolean;
}) => {
  return (
    <>
      {/* <AuthSubTitle>Step 3 - fill your data</AuthSubTitle> */}
      <AuthForm handleSubmit={onSubmit}>
        <CustomInput
          id="username"
          type="text"
          // placeholder="Username"
          label="Username"
          register={register}
          getValues={getValues}
          error={errors?.username?.message}
        />
        <CustomInput
          id="password"
          type="password"
          // placeholder="Password"
          label="Password"
          register={register}
          getValues={getValues}
          error={errors?.password?.message}
        />
        <CustomInput
          id="password2"
          type="password"
          // placeholder="Confirm password"
          label="Confirm password"
          register={register}
          getValues={getValues}
          error={errors?.password2?.message}
        />

        <AuthSubmit>{isLoading ? <Loading /> : "Register"}</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep3;
