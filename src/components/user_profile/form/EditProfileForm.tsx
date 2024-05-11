import React, { useRef, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { updateUser } from "../../../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import User from "src/types/User";
import { successToast } from "../../../main";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../form/CustomInput";

const schema = z.object({
  username: z.string().min(5),
  description: z.string().max(300),
});

type FormValues = z.infer<typeof schema> & { imageBase64?: string };

// type FormValues = {
//   username: string;
//   description: string;
// };

const EditProfileForm = ({
  username,
  description,
  imageBase64,
  className,
  closeForm,
  setUserData,
}: {
  username: string;
  description: string;
  imageBase64: string;
  className?: string;
  closeForm?: () => void;
  setUserData: (data: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { username, description },
    resolver: zodResolver(schema),
  });

  const [preview, setPreview] = useState<string>(imageBase64);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let { username, description } = data;
    if (description == null) description = "";

    const result = await updateUser(username, description, preview);

    if (result && result.success) {
      setUserData((prev: User) => ({
        ...prev,
        username: username,
        description: description,
        imageBase64: preview,
      }));

      successToast("Profile updated successfully");
      if (closeForm) closeForm();
    } else if (result) {
      setError("root", { message: result.message });
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;

    // make base64 from file
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpload = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-4 relative ${className ? className : ""}`}
    >
      {errors?.root?.message && (
        <p className="w-full font-semibold text-sm text-[#b94a48] animate-shake">
          {errors?.root?.message}
        </p>
      )}
      <div className="w-full flex flex-col">
        <label className="pb-2">Profile picture</label>

        <input
          className="hidden"
          type="file"
          ref={inputRef}
          name="image"
          onChange={handleUploadedFile}
        />

        <button
          onClick={onUpload}
          className="group relative hover:opacity-70 transition-opacity duration-200 w-max flex justify-center items-center"
        >
          <div className="w-16 h-16 rounded-full">
            {preview ? (
              <img src={preview} className="w-full h-full rounded-full" />
            ) : (
              <FontAwesomeIcon
                icon={faCircleUser}
                className="w-full h-full text-6xl text-white"
              />
            )}
          </div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="opacity-0 absolute flex group-hover:opacity-100 transition-opacity duration-200 justify-center items-center text-white text-sm"
          />
        </button>
      </div>

      <CustomInput
        id="username"
        label="Username"
        type="text"
        register={register}
        getValues={getValues}
        error={errors.username?.message}
      />

      <CustomInput
        id="description"
        label="Description"
        type="textarea"
        register={register}
        getValues={getValues}
        error={errors.description?.message}
      />

      <button
        type="submit"
        className="p-4 rounded bg-[#06a58f] border-none text-white font-bold text-sm cursor-pointer transition-colors duration-200 ease-linear hover:bg-[#057767]"
      >
        Zapisz
      </button>
    </form>
  );
};

export default EditProfileForm;
