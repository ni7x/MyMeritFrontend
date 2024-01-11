import React from "react";
import TaskPreview from "../../models/TaskPreview";

const SortPanel: React.FC<{ tasks: TaskPreview[] }> = ({ tasks } ) => {
    return (
        <ul className="sort-panel">
            <li>task name</li>
            <li>date solved</li>
            <li>status</li>

            <li>credits</li>
        </ul>
    );
};

export default SortPanel;