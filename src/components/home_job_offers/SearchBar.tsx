import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar: React.FC<{
  searchValue: string;
  handleQueryParamChange: (text: string, number: string | number) => void;
}> = ({ searchValue, handleQueryParamChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    handleQueryParamChange("search", searchTerm);
    handleQueryParamChange("page", 0);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-1 bg-secondary-bg-color rounded outline-none p-3 text-sm">
      <input
        type="text"
        placeholder="Search for technologies, job positions etc..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="bg-secondary-bg-color outline-none flex-1"
      />
      <button
        type="submit"
        onClick={handleSearch}
        className="text-main-lighter font-bold"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
