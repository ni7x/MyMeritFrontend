import { FormEvent } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

import Input from "../../components/login/Input";
import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "./AuthSubmit";

const RegisterStep1 = ({
  register,
  errors,
  email,
  setEmail,
  onSubmit,
}: {
  register: UseFormRegister<{ email: string }>;
  errors: FieldErrors<FieldValues> | undefined;
  email?: string;
  setEmail?: (email: string) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  return (
    <>
      <AuthSubTitle>Step 1 - set your email</AuthSubTitle>
      <AuthForm handleSubmit={onSubmit}>
        <div className={`relative ${errors?.email && "mb-4"}`}>
          <input
            type="text"
            placeholder="email"
            {...register("email")}
            className="bg-main-bg-input bg-[#44444f] rounded border-none p-4 text-sm text-white box-border w-full font-semibold focus-visible:border-none focus-visible:outline-none"
          />

          {errors?.email && (
            <p className="text-[#ff4d4f] text-xs absolute top-full left-0">
              {errors?.email.message}
            </p>
          )}
        </div>
        <AuthSubmit>Next</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep1;
