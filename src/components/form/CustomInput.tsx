import { UseFormRegister } from "react-hook-form";
import React, { InputHTMLAttributes, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import MDEditor from "@uiw/react-md-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  floatLabel?: boolean;
  alwaysFloatLabel?: boolean;
  name?: string;
  className?: string | undefined;
  multiple?: boolean;
  placeholder?: string;
  type: string;
  options?: any;
  register?: UseFormRegister<any>;
  // register?: FieldValues;
  setValue?: any;
  getValues: any;
  trigger?: any;
  hint?: string;
  error: any;
}

const CustomInput = ({
  id,
  label,
  floatLabel,
  alwaysFloatLabel,
  name,
  className,
  multiple,
  placeholder,
  type,
  options,
  register,
  setValue,
  getValues,
  trigger,
  hint,
  error,
}: InputProps) => {
  const register2 = register ? register : () => {};

  const [isFocused, setIsFocused] = useState(false);
  const [data, setData] = useState<string | undefined>(getValues(id));

  const labelUp =
    isFocused ||
    getValues(id).length > 0 ||
    placeholder ||
    (alwaysFloatLabel !== undefined ? alwaysFloatLabel : false)
      ? true
      : false;

  let element = "input";

  switch (type) {
    case "textarea":
      element = "textarea";
      break;
    case "TagsInput":
      element = "TagsInput";
      break;
    case "select":
      element = "select";
      break;
    case "mdeditor":
      element = "MDEditor";
      break;
    default:
      element = "input";
      break;
  }

  return (
    <div
      className={`relative flex flex-col ${
        error ? "animate-shake error" : ""
      } ${className ? className : ""}`}
    >
      {label && (floatLabel !== undefined ? !floatLabel : false) && (
        <label htmlFor={id} className={`text-white text-sm md:text-base pb-2`}>
          {label}
        </label>
      )}
      <div
        className="relative h-full bg-main-bg-input rounded"
        tabIndex={-1}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      >
        {label && (floatLabel !== undefined ? !!floatLabel : true) && (
          <label
            htmlFor={id}
            className={`absolute top-0 left-0 p-4 flex items-center transition-all duration-100 ease-linear whitespace-nowrap ${
              labelUp
                ? "text-xs opacity-70 h-auto -translate-y-3"
                : "h-full text-sm text-white md:text-base cursor-text"
            }`}
          >
            {label}
          </label>
        )}
        {element === "TagsInput" ? (
          <TagsInput
            name={name ? name : ""}
            value={getValues(id)}
            onChange={(val) => {
              setValue(id, val);
              if (error && trigger) trigger(id);
            }}
            placeHolder={placeholder ? placeholder : ""}
            classNames={{
              input: "z-10 pr-8",
              tag: "z-20 mx-4 mt-6",
            }}
          />
        ) : element === "MDEditor" ? (
          <MDEditor
            height={400}
            value={data}
            onChange={(val) => {
              setData(val);
              setValue(id, val);
              if (error & trigger) trigger(id);
            }}
            className={`border-[1px] border-solid ${
              error ? "border-[#FC8181]" : "border-[#44444f] bg-[#44444f]"
            }`}
          />
        ) : (
          React.createElement(
            element,
            {
              id: id,
              name: name ? name : "",
              type: `${
                type !== "textarea" && type !== "TagsInput" && type !== "select"
                  ? type
                  : ""
              }`,
              placeholder: placeholder ? placeholder : "",
              ...register2(id),
              className: `${
                className ? className : ""
              } bg-transparent transparent z-10 relative flex items-center rounded pl-4 pr-8 pb-4 pt-6 text-sm md:text-base w-full outline-none text-white box-border ${
                error ? "border-[1px] border-solid border-error-color" : ""
              }`,
              multiple: multiple ? true : false,
            },
            type === "select" && options && options.length > 0
              ? options.map((option: string) =>
                  React.createElement("option", {
                    key: option,
                    value: option,
                    children: option,
                    className: "bg-main-bg-input text-white",
                  })
                )
              : null
          )
        )}
        {error && (
          <div className="absolute top-0 right-2 p-2 h-full flex justify-center items-center">
            <FontAwesomeIcon
              className="text-error-color z-20"
              icon={faCircleExclamation}
            />
          </div>
        )}
      </div>

      {hint && (
        <p className="opacity-50 font-semibold pt-2 rounded-b w-full text-xs">
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
