import { z } from "zod";
import { errorToast, successToast } from "../../main";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, KeyboardEventHandler } from "react";
import { Experience, EmploymentType } from "../../types";
import CustomInput from "../../components/login/CustomInput";
import CreatableSelect from "react-select/creatable";
import ControlledSelect from "../../components/form/ControlledSelect";
import { TagsInput } from "react-tag-input-component";
import AuthSubmit from "../../components/form/AuthSubmit";
import MDEditor, { selectWord } from "@uiw/react-md-editor";

const jobOfferSchema = z.object({
  jobTitle: z.string().min(5),
  description: z.string().nonempty("Required").max(300),
  //   requiredSkills: z.array(z.string()),
  //   preferredSkills: z.array(z.string()),
  //   workLocations: z.array(z.string()),
  //   technologies: z.array(z.string()),
  experience: z.nativeEnum(Experience),
  salary: z.coerce.number(),
  employmentType: z.nativeEnum(EmploymentType),
});

const taskSchema = z.object({
  title: z.string().min(5),
  instructions: z.string().nonempty("Required").max(300),
  opensAt: z.date(),
  closesAt: z.date(),
  reward: z.number().int(),
  allowedLanguages: z.array(z.string()),
});

type JobOfferFields = z.infer<typeof jobOfferSchema>;
type TaskFields = z.infer<typeof taskSchema>;

interface Option {
  readonly label: string;
  readonly value: string;
}

const requiredSkills: Option[] = [
  { label: "Required Skill 1", value: "Required Skill 1" },
  { label: "Required Skill 2", value: "Required Skill 2" },
  { label: "Required Skill 3", value: "Required Skill 3" },
];

const PreferredSkills: Option[] = [
  { label: "Preferred Skill 1", value: "Preferred Skill 1" },
  { label: "Preferred Skill 2", value: "Preferred Skill 2" },
  { label: "Preferred Skill 3", value: "Preferred Skill 3" },
];

const WorkLocations: Option[] = [
  { label: "Work Location 1", value: "Work Location 1" },
  { label: "Work Location 2", value: "Work Location 2" },
  { label: "Work Location 3", value: "Work Location 3" },
];

const Technologies: Option[] = [
  { label: "Technology 1", value: "Technology 1" },
  { label: "Technology 2", value: "Technology 2" },
  { label: "Technology 3", value: "Technology 3" },
];

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const NewTask = () => {
  const [jobOfferData, setJobOfferData] = useState<JobOfferFields | null>(null);
  const [taskData, setTaskData] = useState<TaskFields | null>(null);

  const [requiredSkills, setRequiredSkills] = useState<String[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<String[]>([]);
  const [workLocations, setWorkLocations] = useState<String[]>([]);
  const [technologies, setTechnologies] = useState<String[]>([]);

  const [instructions, setInstructions] = useState<string>("");

  const {
    control: controlJobOffer,
    register: registerJobOffer,
    handleSubmit: handleSubmitJobOffer,
    setError: setErrorJobOffer,
    formState: { errors: errorsJobOffer, isSubmiting: isSubmitingJobOffer },
  } = useForm<JobOfferFields>({
    defaultValues: {
      jobTitle: "",
      description: "",
      // requiredSkills: [],
      // preferredSkills: [],
      // workLocations: [],
      // technologies: [],
      experience: Experience.INTERN,
      salary: 0,
      employmentType: EmploymentType.REMOTE,
    },
    resolver: zodResolver(jobOfferSchema),
  });

  const {
    register: registerTask,
    handleSubmit: handleSubmitTask,
    setError: setErrorTask,
    formState: { errors: errorsTask, isSubmiting: isSubmitingTask },
  } = useForm<TaskFields>({
    defaultValues: {
      title: "",
      instructions: "",
      opensAt: new Date(),
      closesAt: new Date(),
      reward: 0,
      allowedLanguages: [],
    },
    resolver: zodResolver(taskSchema),
  });

  const onSubmitJobOffer = (data: JobOfferFields) => {
    console.log(data);
    setJobOfferData(data);
  };

  const onSubmitTask = (data: TaskFields) => {
    setTaskData(data);
  };

  return (
    <div>
      <h1>Create a new Job Offer</h1>
      <h2 className="mb-4">
        {jobOfferData === null
          ? "Step 1 - Job Offer information"
          : taskData === null
          ? "Step 2 - Task information"
          : "Job Offer and Task created"}
      </h2>
      {jobOfferData === null ? (
        <form
          onSubmit={handleSubmitJobOffer(onSubmitJobOffer)}
          className="flex flex-col gap-4"
        >
          <CustomInput
            id="jobTitle"
            label="Job Title"
            type="text"
            register={registerJobOffer}
            error={errorsJobOffer?.jobTitle?.message}
          />
          <CustomInput
            id="description"
            label="Description"
            type="text"
            register={registerJobOffer}
            error={errorsJobOffer?.description?.message}
          />

          <TagsInput
            value={requiredSkills}
            onChange={setRequiredSkills}
            placeholder="Add required skills"
            name="requiredSkills"
            className="bg-main-bg-input rounded bg-[#44444f] border-[1px] p-4 text-sm text-white box-border w-full font-semibold focus-visible:outline-none"
          />

          <CustomInput
            id="experience"
            label="Experience"
            type="select"
            register={registerJobOffer}
            error={errorsJobOffer?.experience?.message}
          />

          <CustomInput
            id="salary"
            label="Salary"
            type="number"
            register={registerJobOffer}
            error={errorsJobOffer?.salary?.message}
          />

          <CustomInput
            id="employmentType"
            label="Employment Type"
            type="select"
            register={registerJobOffer}
            error={errorsJobOffer?.employmentType?.message}
          />
          <AuthSubmit>Next</AuthSubmit>
        </form>
      ) : taskData === null ? (
        <form
          onSubmit={handleSubmitTask(onSubmitTask)}
          className="flex flex-col gap-4"
        >
          <CustomInput
            id="title"
            label="Title"
            type="text"
            register={registerTask}
            error={errorsTask?.title?.message}
          />
          {/* <CustomInput
            id="instructions"
            label="Instructions"
            type="text"
            register={registerTask}
            error={errorsTask?.instructions?.message}
          /> */}
          <MDEditor
            height={200}
            // value={instructions}
            // onChange={setInstructions}
            {...registerTask("instructions")}
          />

          <CustomInput
            id="opensAt"
            label="Opens At"
            type="date"
            register={registerTask}
            error={errorsTask?.opensAt?.message}
          />
          <CustomInput
            id="closesAt"
            label="Closes At"
            type="date"
            register={registerTask}
            error={errorsTask?.closesAt?.message}
          />
          <CustomInput
            id="reward"
            type="number"
            label="Reward"
            register={registerTask}
            error={errorsTask?.reward?.message}
          />
          <CustomInput
            id="allowedLanguages"
            label="Allowed Languages"
            type="select"
            register={registerTask}
            error={errorsTask?.allowedLanguages?.message}
          />
          <AuthSubmit>Create Task</AuthSubmit>
        </form>
      ) : (
        <div>
          <h2>Job Offer</h2>
          <p>{JSON.stringify(jobOfferData)}</p>
          <h2>Task</h2>
          <p>{JSON.stringify(taskData)}</p>
        </div>
      )}
    </div>
  );
};

export default NewTask;
