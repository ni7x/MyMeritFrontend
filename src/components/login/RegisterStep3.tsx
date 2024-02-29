import { FormEvent } from "react";

import Input from "../../components/login/Input";

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
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <h2>Step 3 - fill your data</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input
          type="password"
          placeholder="password"
          name="password1"
          onChange={(e) => setPassword1(e.target.value)}
          value={password1}
        />
        <Input
          type="password"
          placeholder="repeat password"
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
        />

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterStep3;
