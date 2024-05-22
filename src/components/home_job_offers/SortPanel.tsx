import React, { ChangeEvent } from "react";

interface SortPanelProps {
  sortValue: string;
  handleQueryParamChange: (key: string, value: any) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({
                                               sortValue,
                                               handleQueryParamChange,
                                             }) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleQueryParamChange("sort", event.target.value);
    handleQueryParamChange("page", 0);
  };

  return (
      <div className="flex-1 md:flex-none">
        <div className="relative">
          <select
              id="sort-by"
              name="sort-by"
              defaultValue={sortValue}
              className="relative w-full cursor-default font-medium rounded-md bg-secondary-bg-color py-3 pl-8 pr-12 text-left text-white   ring-gray-300 focus:outline-none  text-sm  appearance-none"
              onChange={handleSortChange}
              aria-labelledby="sort-by-label"
          >
            <option value="taskReward,asc">REWARD ASCENDING</option>
            <option value="taskReward,desc">REWARD DESCENDING</option>
            <option value="taskOpensAt,asc">DATE ASCENDING</option>
            <option value="taskOpensAt,desc">DATE DESCENDING</option>
          </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
              </svg>
            </span>
        </div>
      </div>
  );
};

export default SortPanel;
