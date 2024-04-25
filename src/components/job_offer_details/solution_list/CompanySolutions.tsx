import React from "react";
import JobOfferListedDTO from "../../../models/dtos/SolutionListedDTO";
import {formatDistanceToNow} from 'date-fns';

type CompanySolutionsProps = {
    solutions: JobOfferListedDTO[];
};

const CompanySolutions: React.FC<CompanySolutionsProps> = ({ solutions }) => {
    return (
        <div className="flex flex-col w-full lg:w-full h-auto gap-3">
            <div className="w-full text-right">
                <p>Solutions : {solutions.length}</p>
            </div>
            {solutions.map((solution, index) => (
                    <a
                        key={index}
                        href={"solution/" + solution.id}
                        className="flex gap-10 bg-terminal-color p-3 px-5 rounded"
                    >
                        <div className="text-main-lighter">
                            <p className="text-xs font-semibold">
                                SUBMITTED
                            </p>
                            <p className="text-white">
                                {formatDistanceToNow(new Date(solution.submitDate), {addSuffix: true})}
                            </p>
                        </div>
                        <div className="text-main-lighter">
                            <p className="text-xs font-semibold">
                                SOLVED IN
                            </p>
                            <p className="text-white">
                                {solution.solvingTime} minutes
                            </p>
                        </div>
                    </a>
                )
            )}
        </div>
    );
};

export default CompanySolutions;
