import Company from "./Company";
import Task from './Task';

enum Experience {
    INTERN = "Intern",
    JUNIOR = "Junior",
    REGULAR = "Regular",
    SENIOR = "Senior",
    EXPERT = "Expert"
}

class JobOffer {
    constructor(
        public jobTitle: string,
        public description: string,
        public requiredSkills: string[],
        public preferredSkills: string[],
        public workLocations: string[],
        public categories: string[],
        public experience: Experience,
        public company: Company,
        public task: Task
    ) {}
}

export default JobOffer;
