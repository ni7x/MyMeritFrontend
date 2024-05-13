import Company from '../Company';
import UserTaskDTO from "./UserTaskDTO";
import {EmploymentType, Experience} from "../JobOffer";
import TaskStatus from "../TaskStatus";
// import JobOfferListedDTO from "./SolutionListedDTO";
import SolutionListedDTO from "./SolutionListedDTO";

interface JobOfferDetailsDTO {
    id: string;
    jobTitle: string;
    description: string;
    experience: Experience;
    salary: number;
    employmentType: EmploymentType;
    requiredSkills: string[];
    preferredSkills: string[];
    workLocations: string[];
    opensAt: Date;
    closesAt: Date;
    company: Company;
    task: UserTaskDTO;
    solutions: SolutionListedDTO[];
    templateFiles? : Map<string, string[]>;
    status: TaskStatus,
    isBookmarked: boolean
}


export default JobOfferDetailsDTO;