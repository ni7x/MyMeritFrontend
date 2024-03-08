import { useState, ChangeEvent, FormEvent } from "react";

import Input from "../../components/login/Input";
import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "./AuthSubmit";

const RegisterStep2 = ({
  code,
  setCode,
  onSubmit,
}: {
  code: string;
  setCode: (code: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <AuthSubTitle>Step 2 - verify your email</AuthSubTitle>
      <AuthForm handleSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <AuthSubmit>Next</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep2;
