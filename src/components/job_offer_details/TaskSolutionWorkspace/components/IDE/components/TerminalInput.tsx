import React from "react";

const TerminalInput: React.FC<{ setInput: (string) => void; input: string; }> = ({ setInput, input }) => {
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
        <div className="flex flex-col bg-terminal-color flex-1 p-2 justify-between">
            <div className="flex gap-2">
                <p className="text-task-lighter text-xs font-normal">INPUT</p>
            </div>
            <div className="flex flex-1 items-end">
                <textarea
                    className="w-full resize-none bg-transparent h-auto overflow-hidden border-none outline-none text-sm text-white caret-white"
                    value={input}
                    onChange={handleChange}
                    placeholder="> enter input"
                    rows={1}
                />
            </div>
        </div>
    );
};

export default TerminalInput;
