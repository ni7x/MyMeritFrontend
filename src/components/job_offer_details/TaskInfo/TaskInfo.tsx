import React from "react";
import Task from "../../../models/Task";
import MDEditor from '@uiw/react-md-editor/nohighlight';


const TaskInfo: React.FC<{task: Task}> = ({task}) => {
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
        <div className="flex flex-col bg-terminal-color p-[1.5rem] rounded w-[100%] lg:flex-1 justify-between h-full overflow-x-auto">
            <div>
                <div className="flex flex-row w-100 text-sm font-semibold justify-between">
                    <div>
                        <p className="inline-block mr-3 text-merit-credits-color"><span>{task.reward} MC</span></p>
                    </div>
                </div>
                <h3 className="text-2xl font-semibold my-[0.5rem] leading-7">{task.title}</h3>


                <div className="my-5">
                    <div className="wmde-markdown-var">
                        <MDEditor.Markdown
                            source={task.instructions}
                            style={customStyles}
                        />
                    </div>
                </div>
                <ul className="flex gap-2">
                    {task.allowedLanguages.map((language)=>{
                        return <li className="inline-block px-4 py-1.5 font-medium bg-[#555764] rounded-lg text-sm" key={language}>{language}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TaskInfo;