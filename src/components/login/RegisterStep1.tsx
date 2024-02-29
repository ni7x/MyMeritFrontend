import { FormEvent } from "react";

import Input from "../../components/login/Input";

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
      <h2>Step 1 - set your email</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button type="submit">Next</button>
      </form>
    </>
  );
};

export default RegisterStep1;
