import React from "react";

const TerminalInput: React.FC<{
  setInput: (text: string) => void;
  input: string;
}> = ({ setInput, input }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setInput(text);

    e.currentTarget.style.height = "auto";
    e.currentTarget.style.overflow = "hidden";

    const currentHeight = e.currentTarget.scrollHeight;
    const maxHeight = e.currentTarget.parentElement?.clientHeight;
    if (!maxHeight) return; // DC added to remove type problem

    e.currentTarget.style.height = Math.min(currentHeight, maxHeight) + "px";
    e.currentTarget.style.overflow = "visible";
  };

  return (
    <textarea
      className="w-full resize-none bg-transparent h-auto overflow-hidden border-none outline-none text-sm text-white caret-white"
      value={input}
      onChange={handleChange}
      placeholder="> enter program input"
      rows={1}
    />
  );
};

export default TerminalInput;
