import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ProfilePicture from "./ProfilePicture";
import { updateUser } from "../../../services/UserService";

type FormValues = {
  username: string;
  description: string;
  imageUrl: string;
};

const EditProfileForm = ({
  username,
  description,
  imageUrl,
  className,
  closeForm,
}: {
  username: string;
  description: string;
  imageUrl: string;
  className?: string;
  closeForm?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username,
      description: description,
      imageUrl: imageUrl,
    },
  });

  const [preview, setPreview] = useState<string>(imageUrl);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let { username, description, imageUrl } = data;
    if (description == null) description = "";
    updateUser(username, description, imageUrl).then(() => {
      console.log("User updated");
      setPreview(imageUrl);
      if (closeForm) closeForm();
    });
  };
  // console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-4 ${className}`}
    >
      <ProfilePicture
        register={register}
        preview={preview}
        setPreview={setPreview}
      />

      <div>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          className="bg-main-bg-input bg-[#44444f] rounded border-none p-4 text-sm text-white box-border w-full font-semibold focus-visible:border-none focus-visible:outline-none"
          {...register("username", { required: true })}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          className="bg-main-bg-input bg-[#44444f] rounded border-none p-4 text-sm text-white box-border w-full font-semibold focus-visible:border-none focus-visible:outline-none"
          {...register("description", { max: 300, maxLength: 100 })}
        />
      </div>

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
