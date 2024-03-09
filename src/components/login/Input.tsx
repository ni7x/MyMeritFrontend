import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, FormEvent } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  value?: string;
  id?: string;
}

const Input = ({
  type,
  placeholder,
  name,
  onChange,
  value,
  id,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  let processedType = type;
  if (type == "password") {
    processedType = showPassword ? "text" : "password";
  }

  return (
    <div className="relative">
      <input
        className="bg-main-bg-input bg-[#44444f] rounded border-none p-4 text-sm text-white box-border w-full font-semibold focus-visible:border-none focus-visible:outline-none"
        type={processedType}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        id={id}
      />
      {type == "password" && (
        <FontAwesomeIcon
          className="absolute top-0 bottom-0 right-4 m-auto w-5 h-auto text-main-lighter"
          icon={showPassword ? faEyeSlash : faEye}
          onClick={handleShowPassword}
        />
      )}
    </div>
  );
};

export default Input;
