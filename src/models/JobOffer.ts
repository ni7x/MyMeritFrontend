import Company from "./Company";
import Task from "./Task";

export enum Experience {
  INTERN = "Intern",
  JUNIOR = "Junior",
  REGULAR = "Regular",
  SENIOR = "Senior",
  EXPERT = "Expert",
}

export enum EmploymentType {
  STATIONARY,
  REMOTE,
  MIXED,
}

class JobOffer {
  constructor(
    public jobTitle: string,
    public description: string,
    public salary: number,
    public employmentType: EmploymentType,
    public requiredSkills: string[],
    public preferredSkills: string[],
    public workLocations: string[],
    public experience: Experience,
    public company: Company,
    public task: Task
  ) {}
}

export default JobOffer;
