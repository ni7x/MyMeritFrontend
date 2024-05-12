import { useState, FormEvent } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { httpCall } from "../../api/HttpClient";

import RegisterStep1 from "../../components/login/RegisterStep1";
import RegisterStep2 from "../../components/login/RegisterStep2";
import RegisterStep3 from "../../components/login/RegisterStep3";

import { useAuth } from "../../hooks/useAuth";
// import { useVerifyEmail, useVerifyCode } from "../../hooks/api/useUser";
import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { errorToast, successToast } from "../../main";

const schema1 = z.object({
  email: z.string().email(),
});

const schema2 = z.object({
  code: z.number().min(4),
});

const schema3 = z
  .object({
    username: z.string().min(5),
    password: z.string().min(5),
    password2: z.string().min(5),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords must match",
    path: ["password2"],
  });

type FormFields1 = z.infer<typeof schema1>;
type FormFields2 = z.infer<typeof schema2>;
type FormFields3 = z.infer<typeof schema3>;

type RegisterFields = FormFields1 & FormFields2 & FormFields3;

const Register = () => {
  const { signUp, verifyEmail, verifyCode, isLoading, isError } = useAuth();
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
    register: register2,
    handleSubmit: handleSubmit2,
    setError: setError2,
    formState: { errors: errors2, isSubmiting: isSubmiting2 },
  } = useForm<FormFields2>({
    resolver: zodResolver(schema2),
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setError: setError3,
    formState: { errors: errors3, isSubmiting: isSubmiting3 },
  } = useForm<FormFields3>({
    resolver: zodResolver(schema3),
  });

  const [submitData, setSubmitData] = useState<RegisterFields>(
    {} as RegisterFields
  );

  const onSubmit1 = async (data: FormFields1) => {
    const { email } = data;
    // verifyEmailMutation.mutate(email);

    const res = await verifyEmail(email);
    if (res.success) {
      setActiveStep(2);
    } else {
      setError1("root", { message: res.message });
    }

    setSubmitData({ ...submitData, ...data });
  };

  const onSubmit2 = async (data: FormFields2) => {
    const { email } = submitData;
    const { code } = data;

    // verifyCodeMutation.mutate({ email, code });
    const res = await verifyCode(email, code);
    if (res.success) {
      setActiveStep(3);
    } else {
      setError2("root", { message: res.message });
    }

    setSubmitData((prev: RegisterFields) => ({ ...prev, ...data }));
  };

  const onSubmit3 = (data: FormFields3) => {
    const { email, code } = submitData;
    const { username, password, password2 } = data;

    signUp({ username, email, password, code /*TODO, password2 */ });
  };

  let step = (
    <RegisterStep1
      register={register1}
      errors={errors1}
      onSubmit={handleSubmit1(onSubmit1)}
      isLoading={isLoading}
    />
  );
  if (activeStep === 2) {
    step = (
      <RegisterStep2
        register={register2}
        errors={errors2}
        onSubmit={handleSubmit2(onSubmit2)}
        isLoading={isLoading}
      />
    );
  } else if (activeStep === 3) {
    step = (
      <RegisterStep3
        register={register3}
        errors={errors3}
        onSubmit={handleSubmit3(onSubmit3)}
        isLoading={isLoading}
      />
    );
  }

  const errors = { ...errors1, ...errors2, ...errors3 };

  return (
    <AuthBox
      className={`border-[1px] ${
        errors?.root?.message
          ? "border-[#b94a48] animate-shake"
          : "border-secondary-bg-color"
      }`}
    >
      <AuthTitle>Create an account</AuthTitle>
      {step}
      <>
        {errors?.root?.message && (
          <p className="absolute -top-8 left-0 w-full font-semibold text-sm text-[#b94a48] text-center">
            {errors?.root?.message}
          </p>
        )}
      </>
    </AuthBox>
  );
};

export default Register;
