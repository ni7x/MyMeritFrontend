import React, { useRef } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ProfilePicture = ({
  register,
  preview,
  setPreview,
}: {
  register: UseFormRegister<FieldValues>;
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const [imageBase64, setImageBase64] = useState<string>("");

  const { ref: registerRef, ...rest } = register("image");

  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;

    // make base64 from file
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
        setImageBase64(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <label className="pb-2">Profile picture</label>

      <input type="hidden" name="imageBase64" value={imageBase64} />

      <input
        className="hidden"
        type="file"
        {...rest}
        onChange={handleUploadedFile}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
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
  );
};

export default ProfilePicture;
