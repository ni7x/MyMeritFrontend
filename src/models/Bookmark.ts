import {JobOffer} from "@types";
import User from "../types/User";

class Bookmark {
    constructor(
        public id: number,
        public user: User,
        public jobOffer: JobOffer
    ) {}
}

export default Bookmark;