import React from "react";

const SortPanel = () => {
    return (
            <select id="sort-by"
                    name="sort-by"
                    className="text-center appearance-none text-sm font-medium outline-none py-3 px-5  rounded bg-[#5c5e68] mt-4">
                <option value="score_asc">Score Ascending</option>
                <option value="score_desc">Score Descending</option>
                <option value="time_left_asc">Time Left Ascending</option>
                <option value="time_left_desc">Time Left Descending</option>
            </select>

    );
};

export default SortPanel;