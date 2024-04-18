const FeedbackButton = ({submit}) => {
    return(
        <button
            className="bg-blue-450 text-xs font-semibold rounded w-1/2 text-white hover:bg-blue-500 disabled:bg-terminal-color"
            onClick={submit}
        >
            SUBMIT FEEDBACK
        </button>
    )
}
export default FeedbackButton;