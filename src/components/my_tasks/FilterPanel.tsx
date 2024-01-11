import React, {useState} from "react";
import TaskPreview from "../../models/TaskPreview";
import TaskStatus from "../../models/TaskStatus";

const FilterPanel: React.FC<{ tasks: TaskPreview[], setFilteredTasks  }> = ({ tasks, setFilteredTasks } ) => {
    const [lastClickedButton, setLastClickedButton] = useState<string>("all");


    const getCount = (filteredTasks: TaskPreview[]) => {
        return filteredTasks.length;
    };

    const showRecent = () => {
        setLastClickedButton("recent");
        setFilteredTasks(tasks.filter(task => task.isRecent));
    }

    const showAll = () => {
        setLastClickedButton("all");
        setFilteredTasks(tasks);
    }

    const showRated = () => {
        setLastClickedButton("rated");
        setFilteredTasks(tasks.filter(task => task.status === TaskStatus.RATED));
    }

    const showUnrated = () => {
        setLastClickedButton("unrated");
        setFilteredTasks(tasks.filter(task => task.status === TaskStatus.UNRATED));
    }

    const showBookmarked = () => {
        setLastClickedButton("bookmarked");
        setFilteredTasks(tasks.filter(task => task.isBookmarked));
    }

    return (
        <ul className="filter-panel">
            <li>
                <button className={lastClickedButton === "recent" ? "active" : ""} onClick={showRecent}  >
                    recent <span>{getCount(tasks.filter(task => task.isRecent))}</span>
                </button>
            </li>
            <li>
                <button className={lastClickedButton === "all" ? "active" : ""} onClick={showAll}  >
                    all <span>{getCount(tasks)}</span>
                </button>
            </li>
            <li>
                <button className={lastClickedButton === "unrated" ? "active" : ""} onClick={showUnrated}  >
                    unrated <span>{getCount(tasks.filter(task => task.status === TaskStatus.UNRATED))}</span>
                </button>
            </li>
            <li>
                <button className={lastClickedButton === "rated" ? "active" : ""} onClick={showRated}  >
                    rated <span>{getCount(tasks.filter(task => task.status === TaskStatus.RATED))}</span>
                </button>
            </li>
            <li>
                <button className={lastClickedButton === "bookmarked" ? "active" : ""} onClick={showBookmarked}  >
                    bookmarked <span>{getCount(tasks.filter(task => task.isBookmarked))}</span>
                </button>
            </li>
        </ul>
    );
};

export default FilterPanel;