import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { httpCall } from "../../api/HttpClient";

import RegisterStep1 from "../../components/login/RegisterStep1";
import RegisterStep2 from "../../components/login/RegisterStep2";
import RegisterStep3 from "../../components/login/RegisterStep3";

import { useAuth } from "../../hooks/useAuth";
import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { code } from "@uiw/react-md-editor/commands";

import { errorToast, successToast } from "../../main";

const schema1 = z.object({
  email: z.string().email(),
});

const schema3 = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  password2: z.string().min(5),
});

type FormFields1 = z.infer<typeof schema1>;
type FormFields3 = z.infer<typeof schema3>;

const Register = () => {
  const { signUp } = useAuth();
  const [activeStep, setActiveStep] = useState<number>(1);

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setError: setError1,
    formState: { errors: errors1, isSubmiting: isSubmiting1 },
  } = useForm<FormFields1>({
    resolver: zodResolver(schema1),
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setError: setError3,
    formState: { errors: errors3, isSubmiting: isSubmiting3 },
  } = useForm<FormFields3>({
    resolver: zodResolver(schema3),
  });

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);
      if (response.success) {
        successToast("Code sent to email");
        setActiveStep(2);
      } else {
        errorToast(response.message);
      }
    },
    onError: async (response: string) => {
      setIsLoading(false);
      // setIsError({ type: "SignIn", message: response });
      errorToast("Could not send code. Please try again.");
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
      setIsLoading(true);
    },
    onSuccess: async (response: any) => {
      setIsLoading(false);
      if (response.success) {
        console.log("zweryfikowano kod");
        successToast("Code verified");
        setActiveStep(3);
      } else {
        errorToast(response.message);
      }
    },
    onError: async (response: string) => {
      errorToast("Could not verify code. Please try again.");
      setIsLoading(false);
      // setIsError({ type: "SignIn", message: response });
    },
  });

  const onSubmit1 = (data) => {
    verifyEmailMutation.mutate(data);
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
    <RegisterStep1
      register={register1}
      errors={errors1}
      email={email}
      setEmail={setEmail}
      onSubmit={handleSubmit1(onSubmit1)}
    />
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
