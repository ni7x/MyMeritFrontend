import React, { ChangeEvent } from 'react';

interface SortPanelProps {
    sortValue: string;
    handleQueryParamChange: (key: string, value: any) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({ sortValue, handleQueryParamChange }) => {
    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleQueryParamChange("sort", event.target.value);
        handleQueryParamChange("page", 0);
    };

    return (
        <select
            id="sort-by"
            name="sort-by"
            defaultValue={sortValue}
            className="appearance-none text-xs font-semibold outline-none text-center rounded bg-secondary-bg-color p-3 px-5"
            onChange={handleSortChange}
        >
            <option value="taskReward,asc">REWARD ASCENDING</option>
            <option value="taskReward,desc">REWARD DESCENDING</option>
            <option value="taskOpensAt,asc">DATE ASCENDING</option>
            <option value="taskOpensAt,desc">DATE DESCENDING</option>
        </select>
    );
};

export default SortPanel;
