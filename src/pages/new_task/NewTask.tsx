import { z } from "zod";
import { errorToast, successToast } from "../../main";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, KeyboardEventHandler } from "react";
import { Experience, EmploymentType, AllowedLanguages } from "../../types";
import CustomInput from "../../components/login/CustomInput";
import { TagsInput } from "react-tag-input-component";
import AuthSubmit from "../../components/form/AuthSubmit";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import { useAuth } from "../../hooks/useAuth";

import { submitJobOffer } from "../../services/JobOfferService";
import { useNavigate } from "react-router-dom";

const jobOfferSchema = z.object({
  jobTitle: z.string().min(5),
  description: z.string().nonempty("Required").max(300),
  requiredSkills: z
    .string()
    .array()
    .nonempty("At least one required skill is required"),
  preferredSkills: z
    .string()
    .array()
    .nonempty("At least one preferred skill is required"),
  workLocations: z
    .string()
    .array()
    .nonempty("At least one work location is required"),
  technologies: z
    .string()
    .array()
    .nonempty("At least one technology is required"),
  experience: z.nativeEnum(Experience),
  salary: z.coerce.number().int(),
  employmentType: z.nativeEnum(EmploymentType),
});

const taskSchema = z.object({
  title: z.string().min(5),
  instructions: z.string().nonempty("Instructions are required").max(1000),
  opensAt: z.coerce.date(),
  closesAt: z.coerce.date(),
  reward: z.coerce.number().int(),
  allowedLanguages: z.nativeEnum(AllowedLanguages).array().nonempty("At least one language is required"),
});

type JobOfferFields = z.infer<typeof jobOfferSchema>;
type TaskFields = z.infer<typeof taskSchema>;

const NewTask = () => {
  const [jobOfferData, setJobOfferData] = useState<JobOfferFields>(
    {} as JobOfferFields
  );
  const [taskData, setTaskData] = useState<TaskFields>({} as TaskFields);

  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);
  const [workLocations, setWorkLocations] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);

  const [instructions, setInstructions] = useState<string>("");
  const [allowedLanguages, setAllowedLanguages] = useState<string[]>([]);

  const [activeStep, setActiveStep] = useState<number>(0);

  const { userData } = useAuth();
  const navigate = useNavigate();

  const {
    register: registerJobOffer,
    handleSubmit: handleSubmitJobOffer,
    setError: setErrorJobOffer,
    setValue: setValueJobOffer,
    formState: { errors: errorsJobOffer, isSubmiting: isSubmitingJobOffer },
  } = useForm<JobOfferFields>({
    defaultValues: {
      jobTitle: "",
      description: "",
      requiredSkills: [],
      preferredSkills: [],
      workLocations: [],
      technologies: [],
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
    setValue: setValueTask,
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
    setJobOfferData(data);
    setActiveStep(1);
  };

  const onSubmitTask = async (data: TaskFields) => {
    setTaskData(data);
    submitJobOffer({
      ...jobOfferData,
      task: data,
      user: userData,
    }).then((res) => {
      if (res.id) {
        successToast("Job Offer created successfully");
        setTimeout(() => navigate("/job/" + res.id), 1000);
      }
    });
  };

  return (
    <div>
      <h1>Create a new Job Offer</h1>
      <h2 className="mb-4">
        {activeStep == 0
          ? "Step 1 - Job Offer information"
          : "Step 2 - Task information"}
      </h2>
      {/* {jobOfferData === null ? ( */}
      {activeStep == 0 ? (
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
            type="textarea"
            register={registerJobOffer}
            error={errorsJobOffer?.description?.message}
          />

          <div
            className={`relative ${
              errorsJobOffer?.requiredSkills?.message
                ? "animate-shake error"
                : ""
            }`}
          >
            <label htmlFor="requiredSkills" className="text-white text-sm">
              Required Skills
            </label>
            <TagsInput
              value={requiredSkills}
              onChange={(newRequiredSkills) => {
                setRequiredSkills(newRequiredSkills);
                setValueJobOffer("requiredSkills", newRequiredSkills);
              }}
              name="requiredSkills"
              placeHolder="enter required skills and press enter"
            />
            {errorsJobOffer?.requiredSkills?.message && (
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsJobOffer?.requiredSkills?.message}
              </p>
            )}
          </div>

          <div
            className={`relative ${
              errorsJobOffer?.preferredSkills?.message
                ? "animate-shake error"
                : ""
            }`}
          >
            <label htmlFor="preferredSkills" className="text-white text-sm">
              Preferred Skills
            </label>

            <TagsInput
              value={preferredSkills}
              onChange={(newPreferredSkills) => {
                setPreferredSkills(newPreferredSkills);
                setValueJobOffer("preferredSkills", newPreferredSkills);
              }}
              name="preferredSkills"
              placeHolder="enter preferred skills and press enter"
            />
            {errorsJobOffer?.preferredSkills?.message && (
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsJobOffer?.preferredSkills?.message}
              </p>
            )}
          </div>

          <div
            className={`relative ${
              errorsJobOffer?.workLocations?.message
                ? "animate-shake error"
                : ""
            }`}
          >
            <label htmlFor="workLocations" className="text-white text-sm">
              Work Locations
            </label>
            <TagsInput
              value={workLocations}
              onChange={(newWorkLocations) => {
                setWorkLocations(newWorkLocations);
                setValueJobOffer("workLocations", newWorkLocations);
              }}
              name="workLocations"
              placeHolder="enter work locations and press enter"
            />
            {errorsJobOffer?.workLocations?.message && (
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsJobOffer?.workLocations?.message}
              </p>
            )}
          </div>

          <div
            className={`relative ${
              errorsJobOffer?.technologies?.message ? "animate-shake error" : ""
            }`}
          >
            <label htmlFor="technologies" className="text-white text-sm">
              Technologies
            </label>
            <TagsInput
              value={technologies}
              onChange={(newTechnologies) => {
                setTechnologies(newTechnologies);
                setValueJobOffer("technologies", newTechnologies);
              }}
              name="technologies"
              placeHolder="enter technologies and press enter"
            />
            {errorsJobOffer?.technologies?.message && (
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsJobOffer?.technologies?.message}
              </p>
            )}
          </div>

          <div
            className={`relative ${
              errorsJobOffer?.experience?.message ? "error" : ""
            }`}
          >
            <label htmlFor="experience" className="text-white text-sm">
              Experience
            </label>
            <select
              {...registerJobOffer("experience")}
              className={`bg-main-bg-input rounded bg-[#44444f] border-[1px] p-4 text-sm text-white box-border w-full font-semibold outline-none focus-visible:outline-none ${
                errorsJobOffer?.experience?.message
                  ? " border-[#FC8181]"
                  : "border-[#44444f]"
              }`}
            >
              {Object.values(Experience).map((experience) => (
                <option key={experience} value={experience}>
                  {experience}
                </option>
              ))}
            </select>
            {errorsJobOffer?.experience?.message && (
              // <p className="bg-[#b94a48] text-white font-semibold p-2 rounded-b w-full text-xs">
              //   {error}
              // </p>
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsJobOffer?.experience?.message}
              </p>
            )}
          </div>

          <CustomInput
            id="salary"
            label="Salary"
            type="number"
            register={registerJobOffer}
            error={errorsJobOffer?.salary?.message}
          />

          <div className="relative">
            <label htmlFor="employmentType" className="text-white text-sm">
              Employment type
            </label>
            <select
              {...registerJobOffer("employmentType")}
              className={`bg-main-bg-input rounded bg-[#44444f] border-[1px] p-4 text-sm text-white box-border w-full font-semibold outline-none focus-visible:outline-none ${
                errorsJobOffer?.employmentType?.message
                  ? " border-[#FC8181]"
                  : "border-[#44444f]"
              }`}
            >
              {Object.values(EmploymentType).map((employmentType) => (
                <option key={employmentType} value={employmentType}>
                  {employmentType}
                </option>
              ))}
            </select>
            {errorsJobOffer?.employmentType?.message && (
              // <p className="bg-[#b94a48] text-white font-semibold p-2 rounded-b w-full text-xs">
              //   {error}
              // </p>
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsJobOffer?.employmentType?.message}
              </p>
            )}
          </div>
          <div className="flex w-full justify-end">
            <AuthSubmit>Next</AuthSubmit>
          </div>
        </form>
      ) : // ) : taskData === null ? (
      activeStep == 1 ? (
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
          <div
            className={`relative ${
              errorsTask?.instructions?.message ? "animate-shake" : ""
            }`}
          >
            <label htmlFor="instructions" className="text-white text-sm">
              Instructions
            </label>

            <MDEditor
              height={400}
              value={instructions}
              onChange={(newInstructions) => {
                setInstructions(newInstructions);
                setValueTask("instructions", newInstructions);
              }}
              className={`border-[1px] border-solid ${
                errorsTask?.instructions?.message
                  ? "border-[#FC8181]"
                  : "border-[#44444f] bg-[#44444f]"
              }`}
            />

            {errorsTask?.instructions?.message && (
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsTask?.instructions?.message}
              </p>
            )}
          </div>

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

          <div
            className={`relative ${
              errorsTask?.allowedLanguages?.message ? "error" : ""
            }`}
          >
            <label htmlFor="experience" className="text-white text-sm">
              Allowed languages
            </label>
            <select multiple
              {...registerTask("allowedLanguages")}
              className={`bg-main-bg-input rounded bg-[#44444f] border-[1px] p-4 text-sm text-white box-border w-full font-semibold outline-none focus-visible:outline-none ${
                errorsTask?.allowedLanguages?.message
                  ? " border-[#FC8181]"
                  : "border-[#44444f]"
              }`}
            >
              {Object.values(AllowedLanguages).map((allowedLanguage) => (
                <option key={allowedLanguage} value={allowedLanguage}>
                  {allowedLanguage}
                </option>
              ))}
            </select>
            {errorsTask?.allowedLanguages?.message && (
              <p className="text-[#FC8181] font-semibold py-2 rounded-b w-full text-[0.8rem]">
                {errorsTask?.allowedLanguages?.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-4 w-full">
            <button
              onClick={() => setActiveStep(0)}
              className="bg-red-800 p-4 rounded"
            >
              Back
            </button>
            <AuthSubmit>Create Task</AuthSubmit>
          </div>
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
