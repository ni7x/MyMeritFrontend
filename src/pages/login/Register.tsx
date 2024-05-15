import { useState } from "react";

import RegisterStep1 from "../../components/login/RegisterStep1";
import RegisterStep2 from "../../components/login/RegisterStep2";
import RegisterStep3 from "../../components/login/RegisterStep3";

import { useAuth } from "../../hooks/useAuth";
import AuthBox from "../../components/login/AuthBox";
import AuthTitle from "../../components/login/AuthTitle";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema1 = z.object({
  email: z.string().email(),
});

const schema2 = z.object({
  code: z
    .string()
    .min(4)
    .refine(
      (v) => {
        let n = Number(v);
        return !isNaN(n) && v?.length > 0;
      },
      { message: "Invalid number" }
    ),
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
    getValues: getValues1,
    formState: { errors: errors1 },
  } = useForm<FormFields1>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema1),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setError: setError2,
    getValues: getValues2,
    formState: { errors: errors2 },
  } = useForm<FormFields2>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(schema2),
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setError: setError3,
    getValues: getValues3,
    formState: { errors: errors3 },
  } = useForm<FormFields3>({
    defaultValues: {
      username: "",
      password: "",
      password2: "",
    },
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
    const { username, password } = data;

    signUp({ username, email, password, code });
  };

  let step = (
    <RegisterStep1
      register={register1}
      errors={errors1}
      onSubmit={handleSubmit1(onSubmit1)}
      getValues={getValues1}
      isLoading={isLoading}
    />
  );
  if (activeStep === 2) {
    step = (
      <RegisterStep2
        register={register2}
        errors={errors2}
        onSubmit={handleSubmit2(onSubmit2)}
        getValues={getValues2}
        isLoading={isLoading}
      />
    );
  } else if (activeStep === 3) {
    step = (
      <RegisterStep3
        register={register3}
        errors={errors3}
        onSubmit={handleSubmit3(onSubmit3)}
        getValues={getValues3}
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
      <div className="grid grid-cols-3 justify-center items-center gap-1 p-2 mb-2">
        <span
          onClick={() => setActiveStep(1)}
          className={`h-1 ${
            activeStep >= 1
              ? "bg-success-color cursor-pointer"
              : "bg-main-bg-color"
          }`}
        ></span>
        <span
          onClick={() => {
            if (activeStep >= 2) {
              setActiveStep(2);
            }
          }}
          className={`h-1 ${
            activeStep >= 2
              ? "bg-success-color cursor-pointer"
              : "bg-main-bg-color"
          }`}
        ></span>
        <span
          className={`h-1 ${
            activeStep >= 3 ? "bg-success-color" : "bg-main-bg-color"
          }`}
        ></span>
      </div>
      <h2 className="pb-4 m-0 text-sm w-full text-center opacity-70">
        {activeStep == 1 && "Set your email"}
        {activeStep == 2 && "Verify your email"}
        {activeStep == 3 && "Fill your credentials"}
      </h2>
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
