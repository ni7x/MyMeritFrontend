import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons'

const SortButton: React.FC<{   name: string; sortFunction: (isAscending: boolean) => void  }> = ({ name, sortFunction } ) => {
    const [ isAscending, setIsAscending ] = useState(false);

    const handleSortClick = () => {
        sortFunction(isAscending);
        setIsAscending((prevIsAscending) => !prevIsAscending);
    };

    return (
        <li>
            {name}
            <button>
                <FontAwesomeIcon icon={ isAscending? faChevronDown : faChevronUp} onClick={handleSortClick}/>
            </button>
        </li>
    );
};

export default SortButton;