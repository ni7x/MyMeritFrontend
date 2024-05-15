import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AllowedLanguages } from "../../types";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";
import { useState } from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TaskStep = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  getValues,
}: {
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
  setValue: any;
  getValues: any;
  trigger: any;
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <CustomInput
        id="title"
        label="Task title"
        type="text"
        register={register}
        getValues={getValues}
        error={errors?.title?.message}
        hint="Enter the task title here"
      />

      <CustomInput
        id="instructions"
        label="Instructions"
        floatLabel={false}
        hint={"Enter the task instructions here"}
        type="mdeditor"
        register={register}
        getValues={getValues}
        setValue={setValue}
        error={errors?.instructions?.message}
      />

      <CustomInput
        id="opensAt"
        label="Opens at"
        alwaysFloatLabel={true}
        type="datetime-local"
        register={register}
        error={errors?.opensAt?.message}
        setValue={setValue}
        getValues={getValues}
      />

      <CustomInput
        id="closesAt"
        label="Closes at"
        alwaysFloatLabel={true}
        type="datetime-local"
        register={register}
        error={errors?.closesAt?.message}
        setValue={setValue}
        getValues={getValues}
      />

      <CustomInput
        id="reward"
        label="Reward"
        alwaysFloatLabel={true}
        type="number"
        register={register}
        error={errors?.reward?.message}
        setValue={setValue}
        getValues={getValues}
      />

      <CustomInput
        id="allowedLanguages"
        label="Allowed languages"
        placeholder="Type and press enter to add"
        type="select"
        options={Object.values(AllowedLanguages)}
        register={register}
        error={errors?.allowedLanguages?.message}
        setValue={setValue}
        getValues={getValues}
        multiple={true}
      />

      <p
        onClick={() => {
          setShowAdvanced((prev) => !prev);
        }}
        className="opacity-70 cursor-pointer flex items-center flex-row gap-2"
      >
        {showAdvanced ? (
          <>
            <span>Hide advanced</span>
            <FontAwesomeIcon icon={faChevronUp} />
          </>
        ) : (
          <>
            <span>Show advance</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </>
        )}
      </p>
      <div
        className={`${showAdvanced ? "block" : "hidden"} flex flex-col gap-4`}
      >
        <CustomInput
          id="memoryLimit"
          label="Memory limit"
          type="number"
          alwaysFloatLabel={true}
          register={register}
          error={errors?.memoryLimit?.message}
          getValues={getValues}
        />

        <CustomInput
          id="timeLimit"
          label="Time limit"
          type="text"
          alwaysFloatLabel={true}
          register={register}
          error={errors?.timeLimit?.message}
          getValues={getValues}
        />
      </div>

      <div className="flex w-full justify-end">
        <AuthSubmit>Next</AuthSubmit>
      </div>
    </form>
  );
};

export default TaskStep;
