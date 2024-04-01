import React from "react";
import Task from "../../../models/Task";
import MDEditor from '@uiw/react-md-editor/nohighlight';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faClock} from "@fortawesome/free-solid-svg-icons";
import { differenceInHours } from 'date-fns';
import {faTrophy} from "@fortawesome/free-solid-svg-icons";

const TaskInfo: React.FC<{task: Task, solutionId: string | undefined}> = ({task, solutionId}) => {
    const customStyles = {
        '--color-fg-subtle': '#8a949d',
        '--color-canvas-default': '#444c56',
        '--color-canvas-subtle': '#2d313a',
        '--color-border-default': '#6c7580',
        '--color-border-muted': '#687179',
        background: 'transparent',
        color: 'white',
    };

    return (
        <div className="flex flex-col bg-terminal-color rounded w-[100%]    lg:flex-1 justify-between h-full overflow-x-auto">
            <div className="p-[1.5rem]">
                <div className="flex flex-row w-100 text-sm font-medium gap-4">
                    <div>
                        <p className="inline-block text-merit-credits-color">
                            <span>
                                <FontAwesomeIcon icon={faTrophy} className="mr-1.5"/>
                                {task.reward} MC
                            </span>
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="inline-block text-task-lighter">
                            <FontAwesomeIcon icon={faClock}/>
                            <span className="ml-1.5">{differenceInHours(new Date(task.closesAt), new Date(task.opensAt))}h</span>
                        </p>
                    </div>
                </div>
                <h3 className="text-2xl font-semibold my-[0.4rem]">{task.title}</h3>
                <div className="text-sm text-task-lighter flex gap-3">
                    <p>Memory limit <span className="text-white">{task.memoryLimit}kb</span></p>
                    <p>Time limit  <span className="text-white">{task.timeLimit}s</span></p>
                </div>
                <div className="my-5">
                    <div className="wmde-markdown-var">
                        <MDEditor.Markdown
                            source={task.instructions}
                            style={customStyles}
                        />
                    </div>
                </div>
                <ul className="flex gap-2.5">
                    {task.allowedLanguages.map((language)=>{
                        return <li className="inline-block text-sm rounded-lg bg-transparent p-1.5 px-3 border-[1px] border-task-lighter text-task-lighter font-medium" key={language}>{language}</li>
                    })}
                </ul>
                <div className="flex mt-5">
                    <a className="flex bg-emerald-500 gap-2 p-2 px-3 text-center text-sm rounded-b rounded text-xs  font-semibold text-white" href={`/job/${solutionId}`}>
                        SEE RELATED JOB OFFER
                        <div>
                            <FontAwesomeIcon icon={faChevronRight} />
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TaskInfo;