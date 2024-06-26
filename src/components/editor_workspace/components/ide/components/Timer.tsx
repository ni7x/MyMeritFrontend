import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Timer = ({
  taskClosesAt,
}: // setIsClosed,
{
  taskClosesAt: Date;
  // setIsClosed: (isClosed: boolean) => void;
}) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const updateTimeRemaining = () => {
      // DC changed to remove type problem
      const differenceInSeconds = Math.ceil(
        (Number(new Date(taskClosesAt)) - Number(new Date())) / 1000
      );

      if (differenceInSeconds <= 0) {
        // setIsClosed(true);
        setTimeRemaining("Closed");
      } else {
        const hours = Math.floor(differenceInSeconds / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = differenceInSeconds % 60;

        setTimeRemaining(
          `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
        );
      }
    };

    updateTimeRemaining();

    const intervalId = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [taskClosesAt, setTimeRemaining]);

  return (
    <div className="flex gap-5 w-full bg-terminal-color rounded h-full justify-center items-center font-medium">
      <p>
        <FontAwesomeIcon icon={faClock} className="mr-1 text-slate-200" />
        {timeRemaining}
      </p>
    </div>
  );
};

export default Timer;
