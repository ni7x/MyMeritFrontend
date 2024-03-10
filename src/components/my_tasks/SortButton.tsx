import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SortButton: React.FC<{
  name: string;
  sortFunction?: (isAscending: boolean) => void;
}> = ({ name, sortFunction }) => {
  const [isAscending, setIsAscending] = useState(false);

  return (
    <li className="flex flex-[1] last:flex-[0.25] items-center">
      {name}
      {sortFunction !== undefined && (
        <button className="bg-none border-none text-main-font-color text-xs font-semibold p-1 rounded-md ml-2 cursor-pointer hover:bg-secondary-bg-color">
          <FontAwesomeIcon
            icon={isAscending ? faChevronDown : faChevronUp}
            onClick={() => {
              sortFunction(isAscending);
              setIsAscending((prevIsAscending) => !prevIsAscending);
            }}
          />
        </button>
      )}
    </li>
  );
};

export default SortButton;
