const SubmitButton = ({
  submitSolution,
  isClosed,
}: {
  submitSolution: () => void;
  isClosed: boolean;
}) => {
  return (
    <button
      className="bg-blue-450 text-xs font-semibold rounded w-1/2 text-white hover:bg-blue-500 disabled:bg-terminal-color"
      onClick={submitSolution}
      disabled={isClosed}
    >
      SUBMIT SOLUTION
    </button>
  );
};
export default SubmitButton;
