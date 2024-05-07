interface SolutionListedDTO {
    id: string;
    submitDate: Date;
    solvingTime: number;
    language: string;
    testResults: {name: string, passed:boolean}[];
}

export default SolutionListedDTO;