import Form from "react-bootstrap/Form";
import { TagsInput } from "react-tag-input-component";
import { Experience, EmploymentType } from "../../types";
import AuthSubmit from "../form/AuthSubmit";
import CustomInput from "../form/CustomInput";

const JobStep = ({
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
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <CustomInput
        id="jobTitle"
        label="Job Title"
        type="text"
        register={register}
        error={errors?.jobTitle?.message}
      />

      <CustomInput
        id="description"
        label="Description"
        type="textarea"
        register={register}
        error={errors?.description?.message}
      />

      <CustomInput
        id="requirements"
        label="Requirements"
        type="TagsInput"
        register={register}
        error={errors?.requirements?.message}
        setValue={setValue}
        getValues={getValues}
        defaultValue={[]}
      />

      <CustomInput
        id="preferredSkills"
        label="Preferred Skills"
        type="TagsInput"
        register={register}
        error={errors?.preferredSkills?.message}
        setValue={setValue}
        getValues={getValues}
        defaultValue={[]}
      />

      <CustomInput
        id="workLocations"
        label="Work Locations"
        type="TagsInput"
        register={register}
        error={errors?.workLocations?.message}
        setValue={setValue}
        getValues={getValues}
        defaultValue={[]}
      />

      <CustomInput
        id="technologies"
        label="Technologies"
        type="TagsInput"
        register={register}
        error={errors?.technologies?.message}
        setValue={setValue}
        getValues={getValues}
        defaultValue={[]}
      />

      <CustomInput
        id="salary"
        label="Salary"
        type="number"
        register={register}
        error={errors?.salary?.message}
      />

      <CustomInput
        id="salary"
        label="Salary"
        type="number"
        register={register}
        error={errors?.salary?.message}
      />

      <CustomInput
        id="employmentType"
        label="Employment type"
        type="select"
        options={Object.values(Experience)}
        register={register}
        error={errors?.experience?.message}
      />
      <div className="flex w-full justify-end">
        <AuthSubmit>Next</AuthSubmit>
      </div>
    </form>
  );
};

export default JobStep;
