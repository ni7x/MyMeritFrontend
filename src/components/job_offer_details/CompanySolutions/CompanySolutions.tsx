import React from "react";

type CompanySolutionsProps = {
    solutions: string[];
};

const CompanySolutions: React.FC<CompanySolutionsProps> = ({ solutions }) => {
    return (
        <div className="flex flex-col w-full lg:w-[65%] h-auto gap-3">
            <div className="w-full text-right">
                <p>Solutions : {solutions.length}</p>
            </div>
            {solutions.map((solution, index) => (
                    <a
                        key={index}
                        href={"solution/" + solution}
                        className="bg-terminal-color p-3 rounded"
                    >
                        {solution}
                    </a>
                )
            )}
        </div>
    );
};

export default CompanySolutions;
