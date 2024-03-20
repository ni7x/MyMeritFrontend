import React, { ChangeEvent } from 'react';

interface SortPanelProps {
    sortValue: string;
    handleQueryParamChange: (key: string, value: string) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({ sortValue, handleQueryParamChange }) => {
    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleQueryParamChange("sort", event.target.value);
        handleQueryParamChange("page", "1");

    };

    return (
        <select
            id="sort-by"
            name="sort-by"
            defaultValue={sortValue}
            className="appearance-none text-sm font-medium outline-none rounded bg-secondary-bg-color p-3"
            onChange={handleSortChange}
        >
            <option value="taskReward,asc">Reward Ascending</option>
            <option value="taskReward,desc">Reward Descending</option>
            <option value="taskOpensAt,asc">Opens Ascending</option>
            <option value="taskOpensAt,desc">Opens Descending</option>
        </select>
    );
};

export default SortPanel;
