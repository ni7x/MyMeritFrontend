import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { QueryParams } from "../../models/QueryParams";
import RangeInput from "../range_input/RangeInput";
import { buildURL } from "./URLHelper";


const languages = ["Java", "Cpp", "C", "Python"];

const FilterPanel: React.FC<{ queryParams: QueryParams, handleChange: (key: string, value: any) => (void) }> = ({ queryParams, handleChange }) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        let URL = buildURL(queryParams);
        if (URL.charAt(URL.length - 1) === "&") {
            URL = URL.slice(0, -1);
        }
        navigate(URL);
    }, [queryParams]);

    const handleFilterChange = (key: string, value:any) => {
        handleChange(key, value);
        handleChange("page", 1);
    }


    const toggleLanguage = (language: string) => {
        const updatedLanguages = queryParams.languages
            ? queryParams.languages.includes(language)
                ? queryParams.languages.filter((lang) => lang !== language)
                : [...queryParams.languages, language]
            : [language];
        handleFilterChange("languages", updatedLanguages);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    const isSelected = (language: string) => {
        return queryParams.languages?.includes(language);
    };

    return (
        <div className="h-full w-[15rem]">
            <div className={"max-md:absolute top-0 left-0 h-full w-full bg-secondary-bg-color px-5 py-4 mb-10 rounded lg:flex lg:flex-col justify-between " + (isPopupOpen ? "popup-open" : "hidden")}>
                <div className="h-[90%] flex flex-col">
                    <button onClick={togglePopup} className={"text-white bg-red-400 w-10 h-10 font-bold text-sm rounded-[50%] self-end mb-5 " + (isPopupOpen ? "" : "hidden")}><FontAwesomeIcon icon={faX} /></button>
                    <div className="flex flex-col items-center lg:items-start">
                        <label className="pb-5 lg:pb-2 text-sm font-medium">Languages</label>
                        <div className="flex flex-wrap text-sm font-medium">
                            {languages.map((language) => {
                                return (
                                    <button
                                        onClick={() => toggleLanguage(language)}
                                        key={language}
                                        className={"px-5 py-2 rounded mr-2 mb-3 " + (isSelected(language) ? " border-2 border-emerald-400 text-emerald-300" : " bg-main-lighter-2 border-2 border-main-lighter-2 ")}
                                    >
                                        {language}
                                    </button>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col pt-2 text-sm pb-2 lg:justify-center items-center lg:items-stretch">
                        <RangeInput
                            label="Merit Credits"
                            min={0}
                            max={1000}
                            minValue={queryParams.minCredits}
                            maxValue={queryParams.maxCredits}
                            onInputChange={(e) => handleFilterChange("minCredits", e.minValue)}
                        />
                    </div>
                    <div className="flex flex-col pt-2 pb-2 items-center lg:items-stretch">
                        <label className="pb-5 lg:pb-2 text-sm font-medium">Opens From</label>
                        <input
                            type="date"
                            className="outline-none mt-1 p-2 px-3 w-[100%] rounded bg-main-lighter-2"
                            onChange={(e) => handleFilterChange("minOpensIn", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col pt-2 pb-2 items-center lg:items-stretch">
                        <label className="pb-5 lg:pb-2 text-sm font-medium">Opens To</label>
                        <input
                            type="date"
                            className="outline-none mt-1 p-2 px-3 w-[100%] rounded bg-main-lighter-2"
                            onChange={(e) => handleFilterChange("maxOpensIn", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col pt-2 text-sm pb-2 lg:justify-center items-center lg:items-stretch">
                        <RangeInput
                            label="Salary"
                            min={0}
                            max={40000}
                            minValue={queryParams.minSalary}
                            maxValue={queryParams.maxSalary}
                            currency="$"
                            onInputChange={(e) => handleFilterChange("minSalary", e.minValue)}
                        />
                    </div>
                </div>
            </div>
            <button
                className="lg:hidden text-center appearance-none text-sm font-medium outline-none py-3 px-5 mb-3 rounded bg-secondary-bg-color "
                onClick={togglePopup}
            >
                {isPopupOpen ? "Hide filters" : "Show filters"}
            </button>
        </div>
    );

};

export default FilterPanel;
