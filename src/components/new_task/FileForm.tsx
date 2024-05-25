import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import CustomSelect from "../form/CustomSelect";

type FileData = {
  name: string;
  base64: string;
};

type OutputFile = {
  language: string;
} & FileData;

export default function FileForm({
  languages,
  open,
  setOpen,
  handler,
}: {
  languages: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  handler: (file: OutputFile) => void;
}) {
  const [fileToSave, setFileToSave] = useState<FileData | null>(null);
  const [language, setLanguage] = useState(languages[0]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0];
    if (!file) {
      return;
    }

    setError(null);

    getFileData(file)
      .then((fileData) => {
        setFileToSave({
          name: fileData.name,
          base64: fileData.base64,
        });
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
        const fileData = {
          name: file.name,
          base64: base64String,
        };
        resolve(fileData);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddFile = () => {
    if (!fileToSave) {
      setError("No file selected");
      return;
    }

    handler({ ...fileToSave, language: language });
    setError(null);
    setFileToSave(null);
    setOpen(false);
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
                  File upload
                </DialogTitle>
                <div className="p-4 flex flex-col gap-4">
                  <div className="flex flex-1 flex-col gap-2">
                    <label htmlFor="file" className="text-sm">
                      Select a file to upload
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleFileChange}
                      className={`p-2  rounded bg-main-bg-input text-white text-sm ${
                        error
                          ? "animate-shake border-2 border-error-color"
                          : "border border-gray-300"
                      }`}
                    />
                    {error && (
                      <span className="text-sm text-error-color">{error}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="file" className="text-sm">
                      Choose language associated with file
                    </label>

                    <CustomSelect
                      value={language}
                      options={languages}
                      onChange={setLanguage}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex justify-end p-4 gap-2">
                  <button
                    type="button"
                    className="p-2 text-sm text-white bg-error-color rounded"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleAddFile}
                    className="p-2 text-sm text-white bg-success-color rounded"
                  >
                    Add file
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
