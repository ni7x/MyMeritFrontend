import Company from "../Company";

interface JobOfferListedDTO {
    id: string;
    jobTitle: string;
    workLocations: string[];
    technologies: string[];
    reward: number;
    opensAt: Date;
    closesAt: Date;
    company: Company;
}

export default JobOfferListedDTO;