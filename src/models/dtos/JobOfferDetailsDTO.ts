import Company from '../Company';
import Task from '../Task';

interface JobOfferDetailsDTO {
    id: string;
    jobTitle: string;
    description: string;
    requiredSkills: string[];
    preferredSkills: string[];
    workLocations: string[];
    technologies: string[];
    company: Company;
    task: Task | null;
}

export default JobOfferDetailsDTO;