import User from "../../types/User";
import {Experience} from "@types";

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
  experience: Experience
}

export default JobOfferListedDTO;
