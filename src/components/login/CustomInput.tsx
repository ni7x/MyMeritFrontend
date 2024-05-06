import { UseFormRegister, FieldValues } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  error: any;
}

const CustomInput = ({
  id,
  label,
  placeholder,
  type,
  register,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className={`relative ${error ? "animate-shake" : ""}`}>
      {label && (
        <label htmlFor={id} className="text-white text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder ? placeholder : ""}
        {...register(id)}
        {...rest}
        className={`bg-main-bg-input rounded bg-[#44444f] border-[1px] p-4 text-sm text-white box-border w-full font-semibold focus-visible:outline-none ${
          error
            ? // ? " border-[#b94a48] rounded-t"
              " border-[#FC8181]"
            : "border-[#44444f] bg-[#44444f]"
        }`}
      />
      {error && (
        // <p className="bg-[#b94a48] text-white font-semibold p-2 rounded-b w-full text-xs">
        //   {error}
        // </p>
        <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
          {error}
        </p>
      )}
      {/* {error && (
        <>
          <a
            data-tooltip-id="error-tooltip"
            data-tooltip-content={error}
            data-tooltip-variant="error"
            className="absolute top-0 -right-12 h-full flex items-center cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-[#ff4d4f] text-lg"
              icon={faCircleExclamation}
            />
          </a>
          <Tooltip id="error-tooltip" place="right" />
        </>
      )} */}
    </div>
  );
};

export default CustomInput;
