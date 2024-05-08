import { UseFormRegister, FieldValues } from "react-hook-form";
import React, { InputHTMLAttributes, useState } from "react";
import styles from "./form.module.css";
import { TagsInput } from "react-tag-input-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type: string;
  options?: any;
  register?: UseFormRegister<FieldValues>;
  setValue?: any;
  getValues?: any;
  hint?: string;
  error: any;
}

const CustomInput = ({
  id,
  label,
  name,
  placeholder,
  type,
  options,
  register,
  setValue,
  getValues,
  hint,
  error,
}: InputProps) => {
  const register2 = register ? register : () => {};

  const [isFocused, setIsFocused] = useState(false);

  let element = "input";
  if (type === "textarea") {
    element = "textarea";
  } else if (type === "TagsInput") {
    element = "TagsInput";
  } else if (type === "select") {
    element = "select";
  }

  return (
    <div className={`relative flex flex-col ${error ? "animate-shake" : ""}`}>
      {/* {label && (
        <label htmlFor={id} className="text-white text-sm mb-2">
          {label}
        </label>
      )} */}
      <div className="relative">
        {label && (
          <label
            htmlFor={id}
            className={`text-white text-sm md:text-base absolute top-0 left-0 p-4 h-full flex items-center transition-all delay-300 ease-linear ${
              isFocused ? "text-sm h-auto" : ""
            }`}
          >
            {label}
          </label>
        )}
        {element === "TagsInput" ? (
          <TagsInput
            name={name ? name : ""}
            value={getValues(id)}
            onChange={(val) => setValue(id, val)}
            placeHolder={placeholder ? placeholder : ""}
            onBlur={() => {
              console.log("blur");
              setIsFocused(false);
            }}
            onFocus={() => {
              console.log("focus");
              setIsFocused(true);
            }}
          />
        ) : (
          React.createElement(element, {
            id: id,
            name: name ? name : "",
            type: `${
              type !== "textarea" && type !== "TagsInput" && type !== "select"
                ? type
                : ""
            }`,
            placeholder: placeholder ? placeholder : "",
            onBlur: () => {
              console.log("blur");
              setIsFocused(false);
            },
            onFocus: () => {
              console.log("focus");
              setIsFocused(true);
            },
            ...register2(id),
            className: `bg-main-bg-input rounded border-[1px] border-solid border-main-bg-input p-4 text-sm md:text-base w-full outline-none text-white box-border ${
              error ? styles.error : ""
            }`,
            ...(type === "select" && options && options.length > 0
              ? {
                  children: options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )),
                }
              : {}),
          })
        )}
        {error && (
          <div className="absolute top-0 right-2 p-2 h-full flex justify-center items-center">
            <FontAwesomeIcon
              className="text-error-color"
              icon={faCircleExclamation}
            />
          </div>
        )}
      </div>

      {hint && (
        <p className="text-[#888] font-semibold pt-2 rounded-b w-full text-xs">
          {hint}
        </p>
      )}

      {error && (
        <p className="text-error-color font-semibold py-2 rounded-b w-full text-xs">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
