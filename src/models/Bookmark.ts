import { JobOffer } from "@types";
import { User } from "../types";

class Bookmark {
  constructor(
    public id: number,
    public user: User,
    public jobOffer: JobOffer
  ) {}
}

export default Bookmark;
