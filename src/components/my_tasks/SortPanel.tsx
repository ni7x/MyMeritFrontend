import React from "react";
import TaskPreview from "../../models/TaskPreview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import SortButton from "./SortButton";

const SortPanel: React.FC<{ filteredTasks: TaskPreview[], setFilteredTasks }> = ({ filteredTasks, setFilteredTasks } ) => {

    const sortByName = (isAscending) => {
        const tasks = [...filteredTasks];
        if(isAscending){
            setFilteredTasks(tasks.sort((t1,t2)=>t1.name.localeCompare(t2.name)));
        }else{
            setFilteredTasks(tasks.sort((t1,t2)=>t2.name.localeCompare(t1.name)));
        }
    }

    const sortByDate = (isAscending) => {
        const tasks = [...filteredTasks];
        if(isAscending){
            setFilteredTasks(tasks.sort((t1,t2)=>t1.submitDate.getTime() - t2.submitDate.getTime()));
        }else{
            setFilteredTasks(tasks.sort((t1,t2)=>t2.submitDate.getTime() - t1.submitDate.getTime()));
        }
    }

    const sortByCredits = (isAscending) => {
        const tasks = [...filteredTasks];
        if(isAscending){
            setFilteredTasks(tasks.sort((t1,t2)=>t1.credits - t2.credits));
        }else{
            setFilteredTasks(tasks.sort((t1,t2)=>t2.credits - t1.credits));
        }
    }



    return (
        <ul className="sort-panel">
            <SortButton name={"task name"} sortFunction={sortByName}/>
            <SortButton name={"date solved"} sortFunction={sortByDate}/>
            <li>status</li>

            <SortButton name={"mc"} sortFunction={sortByCredits}/>
        </ul>
    );
};

export default SortPanel;