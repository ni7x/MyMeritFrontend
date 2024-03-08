import { FormEvent } from "react";

import Input from "../../components/login/Input";
import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "./AuthSubmit";

const RegisterStep1 = ({
  email,
  setEmail,
  onSubmit,
}: {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <AuthSubTitle>Step 1 - set your email</AuthSubTitle>
      <AuthForm handleSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <AuthSubmit>Next</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep1;
