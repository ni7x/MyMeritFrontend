import { z } from "zod";
import { successToast } from "../../main";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Experience,
  EmploymentType,
  AllowedLanguages,
  JobOffer,
} from "../../types";
import { useAuth } from "../../hooks/useAuth";

import { submitJobOffer } from "../../services/JobOfferService";
import { useNavigate } from "react-router-dom";
import JobStep from "../../components/new_task/JobStep";
import TaskStep from "../../components/new_task/TaskStep";

import { HttpResponse } from "../../api/HttpClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

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
  instructions: z
    .string()
    .min(1, { message: "Instructions are required" })
    .max(1000),
  opensAt: z
    .string()
    .refine((val) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(val), {
      message: "Invalid date format",
    }),
  closesAt: z
    .string()
    .refine((val) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(val), {
      message: "Invalid date format",
    }),
  reward: z.coerce.number().int(),
  allowedLanguages: z
    .nativeEnum(AllowedLanguages)
    .array()
    .nonempty("At least one language is required"),
  memoryLimit: z.coerce.number().int(),
  timeLimit: z
    .string()
    .min(1)
    .max(10)
    .refine((value) => /^[\d.]+$/.test(value), {
      message: "Invalid time limit. Please enter a float number",
    }),
});

type JobOfferFields = z.infer<typeof jobOfferSchema>;
type TaskFields = z.infer<typeof taskSchema>;

const NewTask = () => {
  const [jobOfferData, setJobOfferData] = useState<JobOfferFields>(
    {} as JobOfferFields
  );
  const [taskData, setTaskData] = useState<TaskFields>({} as TaskFields);

  // const [instructions, setInstructions] = useState<string>("");

  const [activeStep, setActiveStep] = useState<number>(0);

  const { userData } = useAuth();
  const navigate = useNavigate();

  const {
    register: registerJobOffer,
    handleSubmit: handleSubmitJobOffer,
    setError: setErrorJobOffer,
    setValue: setValueJobOffer,
    getValues: getValuesJobOffer,
    formState: { errors: errorsJobOffer },
    trigger: triggerJobOffer,
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
    getValues: getValuesTask,
    formState: { errors: errorsTask },
    trigger: triggerTask,
  } = useForm<TaskFields>({
    defaultValues: {
      title: "",
      instructions: "",
      opensAt: getCurrentDateTimeLocal(),
      closesAt: getCurrentDateTimeLocal(),
      reward: 0,
      allowedLanguages: [],
      memoryLimit: 500,
      timeLimit: "60.00",
    },
    resolver: zodResolver(taskSchema),
  });

  /**
   * Handles the submission of a job offer form.
   *
   * @param data - The job offer form data.
   * @returns void
   */
  const onSubmitJobOffer = (data: JobOfferFields): void => {
    setJobOfferData(data);
    setActiveStep(1);
  };

  /**
   * Handles the submission of a task.
   *
   * @param data - The task data to be submitted.
   */
  const onSubmitTask = async (data: TaskFields) => {
    setTaskData(data);
    submitJobOffer({
      ...jobOfferData,
      task: data,
      user: userData,
    }).then((res: HttpResponse<JobOffer>) => {
      if (res.data.id) {
        successToast("Job Offer created successfully");
        setTimeout(() => navigate("/job/" + res.data.id), 1000);
      }
    });
  };

  return (
    <div>
      <h1>Create a new Job Offer</h1>
      <div className="grid grid-cols-2 justify-center items-center gap-1 mb-4">
        <span
          onClick={() => setActiveStep(0)}
          className={`h-12 flex gap-2 justify-center items-center font-semibold rounded text-xs sm:text-sm md:text-base bg-blue-450 ${
            activeStep > 0 ? " cursor-pointer bg-success-color" : ""
          }`}
        >
          {activeStep == 0 && <FontAwesomeIcon icon={faEdit} />}
          Job Offer details
        </span>
        <span
          className={`h-12 flex gap-2 justify-center items-center font-semibold rounded text-xs sm:text-sm md:text-base ${
            activeStep == 1 ? "bg-blue-450" : "bg-main-darker"
          }`}
        >
          {activeStep == 1 && <FontAwesomeIcon icon={faEdit} />}
          Task details
        </span>
      </div>
      {/* <h2 className="w-full text-lg opacity-70 text-center mb-4">
        {activeStep == 0 ? "Job Offer information" : "Task information"}
      </h2> */}
      {activeStep == 0 ? (
        <JobStep
          handleSubmit={handleSubmitJobOffer}
          onSubmit={onSubmitJobOffer}
          register={registerJobOffer}
          errors={errorsJobOffer}
          setValue={setValueJobOffer}
          getValues={getValuesJobOffer}
          trigger={triggerJobOffer}
        />
      ) : activeStep == 1 ? (
        <TaskStep
          handleSubmit={handleSubmitTask}
          onSubmit={onSubmitTask}
          register={registerTask}
          errors={errorsTask}
          setValue={setValueTask}
          getValues={getValuesTask}
          trigger={triggerTask}
        />
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
