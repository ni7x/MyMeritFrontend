import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import TaskStatus from "../../../models/TaskStatus";
import {useNavigate} from "react-router-dom";


const TaskStatusDisplay = ({ status}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
    };

    const handleSolveButtonClick = () => {
        return navigate("solution");
    };

    const renderButton = (text, color, onClickHandler) => (
        <button
            className={`flex justify-center items-center gap-2 text-job-primary p-2 px-3 bg-${color}-500 rounded text-xs font-semibold text-white`}
            onClick={onClickHandler}
        >
            {text}
            <div>
                <FontAwesomeIcon icon={faChevronRight} />
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </button>
    );

    const renderTaskStatus = () => {
        switch (status) {
            case TaskStatus.NOT_YET_OPEN:
                return renderButton('NOTIFY ME WHEN OPENS', 'orange', handleButtonClick);
            case TaskStatus.OPEN:
                return renderButton('SOLVE RECRUITMENT TASK', 'emerald', handleSolveButtonClick);
            case TaskStatus.EXPIRED:
                return renderButton('REMIND ME ABOUT SIMILAR OFFERS', 'red', handleButtonClick);
            default:
                return null;
        }
    };

    return (
        <div className="flex items-center gap-3 rounded">
            {renderTaskStatus()}
        </div>
    );
};
export default TaskStatusDisplay;
