const SolutionControls = ({
  submitButton,
  runButton,
  timer,
}: {
  submitButton: JSX.Element | null;
  runButton: JSX.Element;
  timer?: JSX.Element;
}) => {
  return (
    <div className="flex gap-3 flex-1">
      <div className="flex items-center gap-3 h-full text-sm justify-center rounded border-task-lighter">
        <div className="flex w-[3rem] h-full rounded">{runButton}</div>
        {timer && (
          <div className="flex bg-terminal-color h-full py-2.5 px-3.5">
            {timer}
          </div>
        )}
      </div>
      {submitButton}
    </div>
  );
};

export default SolutionControls;
