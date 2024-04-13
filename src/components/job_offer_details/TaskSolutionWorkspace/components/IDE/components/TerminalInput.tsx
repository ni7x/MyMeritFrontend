import React, {useState} from "react";
import TestInterface from "./TestInterface";

const TerminalInput: React.FC<{ setInput: (string) => void; input: string; }> = ({ setInput, input }) => {
    const [isTestView, setIsTestView] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        setInput(text);

        e.currentTarget.style.height = "auto";
        e.currentTarget.style.overflow = "hidden";

        const currentHeight = e.currentTarget.scrollHeight;
        const maxHeight = e.currentTarget.parentElement.clientHeight;

        e.currentTarget.style.height = Math.min(currentHeight, maxHeight) + "px";
        e.currentTarget.style.overflow = "visible";
    };

    return (
        <div className="flex h-full">
            <div className="flex flex-col bg-terminal-color min-h-[5rem] flex-1 p-2 justify-between">
                <div className="flex gap-2">
                    <button
                        className={"text-xs font-normal "  + (!isTestView ? "text-white" : "text-task-lighter")}
                        onClick={() => setIsTestView(false)}>
                        INPUT
                    </button>
                    <button
                        className={"text-xs font-normal "  + (isTestView ? "text-white" : "text-task-lighter")}
                        onClick={() => setIsTestView(true)}>
                        TESTS
                    </button>

                </div>
                <div className="flex flex-1 items-end">
                    {isTestView ?
                        <TestInterface/>
                    :
                        <textarea
                            className="w-full resize-none bg-transparent h-auto overflow-hidden border-none outline-none text-sm text-white caret-white"
                            value={input}
                            onChange={handleChange}
                            placeholder="> enter input"
                            rows={1}
                        />
                    }

                </div>
            </div>
        </div>
    );
};

export default TerminalInput;
