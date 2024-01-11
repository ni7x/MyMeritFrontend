import React from "react";
import TaskPreview from "../../models/TaskPreview";

const FilterPanel: React.FC<{ tasks: TaskPreview[] }> = ({ tasks } ) => {
    return (
        <ul>
            <li>recent</li>
            <li>all</li>
            <li>not rated</li>
            <li>rated</li>
            <li>bookmarked</li>
        </ul>
    );
};

export default FilterPanel;