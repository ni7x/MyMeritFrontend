import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { httpCall } from "../../api/HttpClient";

import RegisterStep1 from "../../components/login/RegisterStep1";
import RegisterStep2 from "../../components/login/RegisterStep2";
import RegisterStep3 from "../../components/login/RegisterStep3";

import { useAuth } from "../../hooks/useAuth";
import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";

const Register = () => {
  const { signUp } = useAuth();
  const [activeStep, setActiveStep] = useState<number>(1);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const verifyEmailMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const data = await httpCall<any[]>({
        url: import.meta.env.VITE_ROUTE_AUTH_CODE,
        method: "POST",
        body: {
          email: email,
        },
      });

      return data;
    },
    onMutate: async () => {
      // setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      // setIsLoading(false);
      if (response.success) {
        setActiveStep(2);
      } else {
      }
    },
    onError: async (response: string) => {
      // setIsLoading(false);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const data = await httpCall<any[]>({
        url: import.meta.env.VITE_ROUTE_AUTH_CODE + "?verify=" + code,
        method: "POST",
        body: {
          email: email,
        },
      });

      return data;
    },
    onMutate: async () => {
      // setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      // setIsLoading(false);
      if (response.success) {
        console.log("zweryfikowano kod");
        setActiveStep(3);
      } else {
      }
    },
    onError: async (response: string) => {
      // setIsLoading(false);
      // setIsError({ type: "SignIn", message: response });
    },
  });

  const onSubmit1 = (e: FormEvent) => {
    e.preventDefault();

    verifyEmailMutation.mutate({ email });
  };

  const onSubmit2 = (e: FormEvent) => {
    e.preventDefault();

    verifyCodeMutation.mutate({ email, code });
  };

  const onSubmit3 = (e: FormEvent) => {
    e.preventDefault();

    signUp({ username, email, password, code /*TODO, password2 */ });
  };

  let step = (
    <RegisterStep1 email={email} setEmail={setEmail} onSubmit={onSubmit1} />
  );
  if (activeStep === 2) {
    step = <RegisterStep2 code={code} setCode={setCode} onSubmit={onSubmit2} />;
  } else if (activeStep === 3) {
    step = (
      <RegisterStep3
        username={username}
        setUsername={setUsername}
        password1={password}
        setPassword1={setPassword}
        password2={password2}
        setPassword2={setPassword2}
        onSubmit={onSubmit3}
      />
    );
  }

  return (
    <AuthBox>
      <AuthTitle>Create an account</AuthTitle>
      {step}
    </AuthBox>
  );
};

export default Register;
