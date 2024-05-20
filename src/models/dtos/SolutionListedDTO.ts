import {Feedback} from "@types";

interface SolutionListedDTO {
    id: string;
    submitDate: Date;
    solvingTime: number;
    language: string;
    testResults: {name: string, passed:boolean}[];
    feedback: Feedback | null;
}

export default SolutionListedDTO;