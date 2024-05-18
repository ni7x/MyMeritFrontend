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
  status: "OPEN" | "NOT_YET_OPEN" | "EXPIRED";
}

export default JobOfferListedDTO;
