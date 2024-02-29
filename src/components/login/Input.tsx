import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, ChangeEvent } from "react";

import "./input.css";

const Input = ({
  type,
  placeholder,
  name,
  onChange,
  value,
}: {
  type: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  let processedType = type;
  if (type == "password") {
    processedType = showPassword ? "text" : "password";
  }

  return (
    <div className="input-wrapper">
      <input
        type={processedType}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {type == "password" && (
        <FontAwesomeIcon
          className="show-password"
          icon={showPassword ? faEyeSlash : faEye}
          onClick={handleShowPassword}
        />
      )}
    </div>
  );
};

export default Input;
