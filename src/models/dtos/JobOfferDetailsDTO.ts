import Company from '../Company';
import UserTaskDTO from "./UserTaskDTO";
import {EmploymentType, Experience} from "../JobOffer";

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
    task: UserTaskDTO | null;
}


export default JobOfferDetailsDTO;