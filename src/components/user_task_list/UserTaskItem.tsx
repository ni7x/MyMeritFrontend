import TaskPreview from "../../models/TaskPreview";
import React from "react";

const UserTaskItem: React.FC<{ task: TaskPreview }> = ({ task } ) => {
    return (
        <li>
            <p><strong>{task.name}</strong></p>
            <p>{task.status}</p>
            <p>{task.submitDate.toLocaleDateString()}</p>
            <p><span className="credits">{task.credits}</span></p>
        </li>
    );
};

export default UserTaskItem;