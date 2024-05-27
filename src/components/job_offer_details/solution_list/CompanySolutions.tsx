import React from "react";
// import JobOfferListedDTO from "../../../models/dtos/SolutionListedDTO";
import { formatDistanceToNow } from "date-fns";
import SolutionListedDTO from "../../../models/dtos/SolutionListedDTO";
import NoItemsFound from "../../NoItemsFound";

type CompanySolutionsProps = {
  solutions: SolutionListedDTO[];
};

const CompanySolutions: React.FC<CompanySolutionsProps> = ({ solutions }) => {
  function getColorClass(passed: number, total: number) {
    const percentage = (passed / total) * 100;
    if (total == 0) {
      return "text-white";
    }
    if (percentage >= 80) {
      return "text-emerald-400";
    } else if (percentage >= 50) {
      return "text-orange-400";
    } else {
      return "text-red-400";
    }
  }
  return (
    <div className="flex flex-col w-full lg:w-full h-auto gap-4 pl-1">
      <div className="w-full text-right flex justify-end gap-4 mb-2">
        <p className="text-task-lighter font-semibold text-sm">UNRATED <span className="ml-1.5 text-white font-semibold bg-emerald-450 px-2 py-0.5 rounded border-[2px] border-emerald-450 ">{solutions.filter(s=>s.feedback == null).length}</span></p>
        <p className="text-task-lighter font-semibold text-sm">ALL <span className="ml-1.5 text-task-lighter  font-semibold bg-transparent border-[2px] border-task-lighter px-2 py-0.5 rounded">{solutions.length}</span></p>
      </div>

      {solutions.length === 0 ? (
        <NoItemsFound
          itemName="solutions"/>
      ) : null}

      {solutions.map(
        (
          solution,
          index //powineinem zrboic komponenty ale w/e
        ) => (
            <a
                key={index}
                href={"solution/" + solution.id}
                className={
                    "grid sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4 p-3 px-5 rounded " +
                    (solution.feedback === null ? " bg-terminal-color border-[1px] border-task-lighter" : "bg-ide-color")
                }
            >
              <div className="text-main-lighter">
                <p className="text-xs font-semibold">SUBMITTED</p>
                <p className="text-white truncate">
                  {formatDistanceToNow(new Date(solution.submitDate), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="text-main-lighter">
                <p className="text-xs font-semibold">SOLVED IN</p>
                <p className="text-white">{solution.solvingTime} minutes</p>
              </div>

              <div className="text-main-lighter">
                <p className="text-xs font-semibold">TEST RESULTS</p>
                <p
                    className={` ${getColorClass(
                        solution.testResults.filter((t) => t.passed).length,
                        solution.testResults.length
                    )}`}
                >
                  {solution.testResults.length > 0 ? (
                      <>
                        {(solution.testResults.filter((t) => t.passed).length /
                                solution.testResults.length) *
                            100}
                        % ({solution.testResults.filter((t) => t.passed).length}/
                        {solution.testResults.length})
                      </>
                  ) : (
                      <>NOT TESTED</>
                  )}
                </p>
              </div>

              <div className="text-main-lighter">
                <p className="text-xs font-semibold">LANGUAGE</p>
                <p className="text-white">{solution.language}</p>
              </div>

              <div className="text-main-lighter">
                <p className="text-xs font-semibold">STATUS</p>
                <p className={solution.feedback !== null ? "text-task-lighter font-medium" : "text-white font-medium"}>
                  {solution.feedback !== null ? "RATED" : "UNRATED"}
                </p>
              </div>
            </a>



        )
      )}
    </div>
  );
};

export default CompanySolutions;
