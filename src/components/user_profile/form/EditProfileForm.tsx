import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ProfilePicture from "./ProfilePicture";
import { updateUser } from "../../../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type FormValues = {
  username: string;
  description: string;
};

const EditProfileForm = ({
  username,
  description,
  imageBase64,
  className,
  closeForm,
}: {
  username: string;
  description: string;
  imageBase64: string;
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
    },
  });

  const [preview, setPreview] = useState<string>(imageBase64);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let { username, description } = data;
    if (description == null) description = "";
    updateUser(username, description, preview).then(() => {
      if (closeForm) closeForm();
    });
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
      className={`flex flex-col gap-4 ${className}`}
    >
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
