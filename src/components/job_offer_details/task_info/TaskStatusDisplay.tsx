import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { TaskStatus } from "../../../models/TaskStatus";
import { useNavigate } from "react-router-dom";

const TaskStatusDisplay = ({ status }: { status: string }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {};

  const handleSolveButtonClick = () => {
    return navigate("solution");
  };

  return (
    <div className="flex items-center gap-3 rounded">
      <button
        className={`flex justify-center items-center gap-2 text-job-primary p-2 px-3 ${
          status === TaskStatus.NOT_YET_OPEN
            ? "bg-orange-500"
            : status === TaskStatus.OPEN
            ? "bg-emerald-500"
            : "bg-red-500"
        } rounded text-xs font-semibold text-white`}
        onClick={
          status === TaskStatus.OPEN
            ? handleSolveButtonClick
            : handleButtonClick
        }
      >
        {status === TaskStatus.NOT_YET_OPEN
          ? "NOTIFY ME WHEN OPENS"
          : status === TaskStatus.OPEN
          ? "SOLVE RECRUITMENT TASK"
          : "REMIND ME ABOUT SIMILAR OFFERS"}
        <div>
          <FontAwesomeIcon icon={faChevronRight} />
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </button>
    </div>
  );
};
export default TaskStatusDisplay;
