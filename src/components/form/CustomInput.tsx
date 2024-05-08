import { UseFormRegister, FieldValues } from "react-hook-form";
import React, { InputHTMLAttributes } from "react";
import styles from "./form.module.css";
import { TagsInput } from "react-tag-input-component";

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
  defaultValue?: any;
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
  defaultValue,
  error,
  ...rest
}: InputProps) => {
  const register2 = register ? register : () => {};

  let element = "input";
  if (type === "textarea") {
    element = "textarea";
  } else if (type === "TagsInput") {
    element = "TagsInput";
  } else if (type === "select") {
    element = "select";
  }

  return (
    <div className={`relative ${error ? "animate-shake" : ""}`}>
      {label && (
        <label htmlFor={id} className="text-white text-sm">
          {label}
        </label>
      )}
      {element === "TagsInput" ? (
        <TagsInput
          name={name ? name : ""}
          value={getValues ? getValues(id) : defaultValue ? defaultValue : ""}
          onChange={(val) => setValue(id, val)}
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
          ...register2(id),
          value: `${
            getValues ? getValues(id) : defaultValue ? defaultValue : ""
          }`,
          onChange: (e: any) => setValue(id, e.target.value),
          className: `${styles.CustomInput} ${error ? styles.error : ""}`,
          ...(type === "select" && options && options.length > 0
            ? {
                children: options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )),
              }
            : {}),
          ...rest,
        })
      )}

      {/* <input
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
      /> */}
      {error && (
        // <p className="bg-[#b94a48] text-white font-semibold p-2 rounded-b w-full text-xs">
        //   {error}
        // </p>
        <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
