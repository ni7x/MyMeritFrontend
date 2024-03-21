import React, { ChangeEvent } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";

interface SortPanelProps {
    sortValue: string;
    handleQueryParamChange: (key: string, value: any) => void;
}

const SortPanel: React.FC<SortPanelProps> = ({ sortValue, handleQueryParamChange }) => {
    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleQueryParamChange("sort", event.target.value);
        handleQueryParamChange("page", 1);
    };

    return (
        <select
            id="sort-by"
            name="sort-by"
            defaultValue={sortValue}
            className="appearance-none text-sm font-medium outline-none text-center rounded bg-secondary-bg-color p-3"
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
