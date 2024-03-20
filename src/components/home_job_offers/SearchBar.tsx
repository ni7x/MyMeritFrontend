import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchBar : React.FC= ({ searchValue, handleQueryParamChange }) => {
    const [searchTerm, setSearchTerm] = useState(searchValue);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        handleQueryParamChange("search", searchTerm);
        handleQueryParamChange("page", 1);
    };

    return (
        <div className="flex flex-1 bg-secondary-bg-color rounded outline-none p-3 text-sm">
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleChange}
                className="bg-secondary-bg-color outline-none flex-1"
            />
            <button
                type="submit"
                onClick={handleSearch}
                className="text-main-lighter font-bold"
            >
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </div>
    );
};

export default SearchBar;
