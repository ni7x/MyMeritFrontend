import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useRef, useEffect } from "react";
import CustomSelect from "../form/CustomSelect";

type FileData = {
  name: string;
  contentBase64: string;
};

type OutputFile = {
  language: string;
  name: string;
  contentBase64: string;
};

export default function TemplateFileForm({
  languages,
  open,
  getValues,
  setValue,
  setOpen,
  data,
}: {
  languages: string[];
  open: boolean;
  getValues: any;
  setValue: any;
  setOpen: (open: boolean) => void;
  data?: number | false;
}) {
  const [formData, setFormData] = useState<OutputFile>({
    language: languages[0],
    name: "",
    contentBase64: "",
  });

  useEffect(() => {
    if (data !== false && data !== undefined) {
      setFormData({
        language: getValues("templateFiles")[data].language,
        name: getValues("templateFiles")[data].name,
        contentBase64: getValues("templateFiles")[data].contentBase64,
      });
    } else {
      setFormData({
        language: languages[0],
        name: "",
        contentBase64: "",
      });
    }
  }, [data]);

  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0];
    if (!file) {
      return;
    }

    setError(null);

    getFileData(file)
      .then((fileData) => {
        setFormData((prev) => ({
          ...prev,
          name: fileData.name,
          contentBase64: fileData.contentBase64,
        }));
      })
      .catch(() => {
        setError("Error reading file");
      });
  };

  const getFileData = (file: File): Promise<FileData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        const cleanBase64String = base64String.split(",")[1];
        const fileData = {
          name: file.name,
          contentBase64: cleanBase64String,
        };
        resolve(fileData);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddFile = () => {
    if (!formData.name || !formData.contentBase64) {
      setError("No file selected");
      return;
    }

    const prev = getValues("templateFiles");
    if (data !== false && data !== undefined) {
      prev[data] = {
        name: formData.name,
        contentBase64: formData.contentBase64,
        language: formData.language,
      };
      setValue("templateFiles", prev);
    } else {
      setValue("templateFiles", [
        ...prev,
        {
          name: formData.name,
          contentBase64: formData.contentBase64,
          language: formData.language,
        },
      ]);
    }

    setError(null);
    if (data == false) {
      setFormData({
        language: languages[0],
        name: "",
        contentBase64: "",
      });
    }
    setOpen(false);
  };

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Transition show={open}>
      <Dialog className={`relative z-10 `} onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={` relative transform rounded-lg bg-main-bg-color text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-4`}
              >
                <DialogTitle className="text-white text-lg ">
                  Template file
                </DialogTitle>
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex flex-1 flex-col gap-2">
                    <label htmlFor="file" className="text-sm">
                      Select a file to upload
                    </label>
                    <div
                      className={`relative bg-main-bg-input rounded p-2 flex flex-row gap-2 items-center ${
                        error ? "animate-shake border-2 border-error-color" : ""
                      }`}
                    >
                      <input
                        type="file"
                        name="file"
                        id="file"
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={onUpload}
                        className="text-sm text-white bg-main-bg-color rounded p-2"
                      >
                        Upload file
                      </button>
                      {formData.name}
                    </div>
                    {error && (
                      <span className="text-sm text-error-color">{error}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">
                      Choose language associated with file
                    </label>

                    <CustomSelect
                      value={formData.language}
                      options={languages}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, language: val }));
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end p-4 gap-2">
                  <button
                    type="button"
                    className="p-2 text-sm text-white bg-error-color rounded"
                    onClick={() => {
                      setError(null);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleAddFile}
                    className="p-2 text-sm text-white bg-success-color rounded"
                  >
                    {data !== false ? <>Update file</> : <>Add file</>}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
