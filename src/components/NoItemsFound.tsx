import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";

const NoItemsFound = ({ itemName = "items", customMessage, customIcon, customStyles = {} }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full" style={customStyles}>
            {customIcon ? (
                customIcon
            ) : (
                <>
                    <FontAwesomeIcon  className="h-14 w-14 text-task-lighter" icon={faBan}/>
                </>
            )}
            <p className="mt-4 text-task-lighter text-lg font-medium">{customMessage ? customMessage : `No ${itemName} found.`}</p>
        </div>
    );
};

export default NoItemsFound;