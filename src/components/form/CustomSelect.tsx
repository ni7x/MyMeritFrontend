import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomSelect({
  options,
  value,
  id,
  label,
  getValues,
  onChange,
  className,
  error,
}: {
  options: string[];
  value: string;
  id?: string;
  getValues?: any;
  label?: string;
  onChange: (value: string) => void;
  className?: string | string[];
  error?: string;
}) {
  return (
    <div className={`${className ? className : ""} relative`}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="relative bg-main-bg-input rounded">
              {label && (
                <label
                  htmlFor={id}
                  className={`absolute top-0 left-0 p-4 flex items-center transition-all duration-100 ease-linear whitespace-nowrap text-xs opacity-70 h-auto -translate-y-3`}
                >
                  {label}
                </label>
              )}
              <ListboxButton
                id={id ? id : ""}
                className={`relative w-full cursor-default rounded pl-4 pr-8 pb-4 ${
                  label ? "pt-6" : "pt-4"
                } text-left text-white shadow-sm outline-none sm:text-sm sm:leading-6`}
              >
                <span className="flex items-center">
                  <span className="block truncate text-sm md:text-base">
                    {id ? getValues(id) : value}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-main-bg-input py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, index) => (
                    <ListboxOption
                      key={index}
                      className={({ focus }) =>
                        classNames(
                          focus ? " bg-main-lighter-2 " : "",
                          "text-white relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                (id ? getValues(id) === option : selected)
                                  ? "font-semibold"
                                  : "font-normal",
                                "text-sm block truncate"
                              )}
                            >
                              {option}
                            </span>
                          </div>

                          {(id ? getValues(id) === option : selected) ? (
                            <span
                              className={classNames(
                                "text-white absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
            {error && (
              <p className="text-error-color font-semibold py-2 rounded-b w-full text-xs">
                {error}
              </p>
            )}
          </>
        )}
      </Listbox>
    </div>
  );
}
