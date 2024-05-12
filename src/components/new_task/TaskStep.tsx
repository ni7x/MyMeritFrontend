import { AllowedLanguages } from "../../types";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";

const TaskStep = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  getValues,
  trigger,
}: {
  handleSubmit: any;
  onSubmit: any;
  register: any;
  errors: any;
  setValue: any;
  getValues: any;
  trigger: any;
}) => {
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

      <div className="flex w-full justify-end">
        <AuthSubmit>Next</AuthSubmit>
      </div>
    </form>
  );
};

export default TaskStep;
