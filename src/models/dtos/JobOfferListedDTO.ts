import Company from "../Company";
import TaskStatus from "../TaskStatus";

interface JobOfferListedDTO {
    id: string;
    jobTitle: string;
    workLocations: string[];
    technologies: string[];
    reward: number;
    opensAt: Date;
    closesAt: Date;
    company: Company;
    status: TaskStatus;
}

export default JobOfferListedDTO;