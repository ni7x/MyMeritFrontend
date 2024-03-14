import Company from '../Company';
import UserTaskDTO from "./UserTaskDTO";

interface JobOfferDetailsDTO {
    id: string;
    jobTitle: string;
    description: string;
    requiredSkills: string[];
    preferredSkills: string[];
    workLocations: string[];
    technologies: string[];
    company: Company;
    task: UserTaskDTO | null;
}

export default JobOfferDetailsDTO;