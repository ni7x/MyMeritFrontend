import { FormEvent } from "react";

import Input from "../../components/login/Input";
import AuthSubTitle from "./AuthSubTitle";
import AuthForm from "./AuthForm";
import AuthSubmit from "./AuthSubmit";

const RegisterStep3 = ({
  username,
  setUsername,
  password1,
  setPassword1,
  password2,
  setPassword2,
  onSubmit,
}: {
  username: string;
  setUsername: (username: string) => void;
  password1: string;
  setPassword1: (password1: string) => void;
  password2: string;
  setPassword2: (password2: string) => void;
  onSubmit: (e: FormEvent) => void;
}) => {
  return (
    <>
      <AuthSubTitle>Step 3 - fill your data</AuthSubTitle>
      <AuthForm handleSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
        />
        <Input
          type="password"
          placeholder="password"
          name="password1"
          onChange={(e) => setPassword1(e.currentTarget.value)}
          value={password1}
        />
        <Input
          type="password"
          placeholder="repeat password"
          name="password2"
          onChange={(e) => setPassword2(e.currentTarget.value)}
          value={password2}
        />

        <AuthSubmit>Register</AuthSubmit>
      </AuthForm>
    </>
  );
};

export default RegisterStep3;
