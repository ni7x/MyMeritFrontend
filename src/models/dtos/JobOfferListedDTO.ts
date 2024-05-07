import Company from "../Company";
import TaskStatus from "../TaskStatus";
import User from "../../types/User";

interface JobOfferListedDTO {
    id: string;
    jobTitle: string;
    workLocations: string[];
    technologies: string[];
    reward: number;
    opensAt: Date;
    closesAt: Date;
    company: User;
    status: TaskStatus;
}

export default JobOfferListedDTO;