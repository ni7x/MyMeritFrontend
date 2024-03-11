import React, {useState} from "react";
import Task from "../../models/Task";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsLeftRight, faUser} from "@fortawesome/free-solid-svg-icons";
import {Navigate, useNavigate} from "react-router-dom";
import QueryParams from "../../models/QueryParams";


const languages = ["Java", "Cpp", "C"];

const FilterPanel : React.FC<{queryParams: QueryParams}> = ({queryParams}) => {
    const [selectedLanguages, setSelectedLanguages] = useState<string []>(queryParams.languages ? queryParams.languages.split(",") : []);
    const [minCredits, setMinCredits] = useState<number>(queryParams.minCredits ? queryParams.minCredits : 0);
    const [maxCredits, setMaxCredits] = useState<number>(queryParams.maxCredits ? queryParams.maxCredits : 20);

    const navigate = useNavigate();

    const submitFilter = () => {
        const URL = "/tasks?" + (selectedLanguages.length != 0 ? "languages=" + selectedLanguages: "")
            + (minCredits != 0 ? "&minCredits=" + minCredits : "")
            + (maxCredits != 20 ? "&maxCredits=" + maxCredits : "");
        navigate(URL);
    }

    const toggleLanguage = (language: string) => {
        setSelectedLanguages((prevLanguages) => {
            if (prevLanguages.includes(language)) {
                return prevLanguages.filter(lang => lang !== language);
            } else {
                return [...prevLanguages, language];
            }
        });
    }


    const isSelected = (language: string) => {
        return selectedLanguages.includes(language);
    }

    return (
        <div className="h-full w-[30%]">
            <div className={"max-md:absolute top-0 left-0 h-full w-full bg-secondary-bg-color px-5 py-4 mb-10 rounded lg:flex lg:flex-col justify-between " + (isPopupOpen ? "popup-open" : "hidden")}>
                <div className="h-[90%] flex flex-col">
                    <button onClick={togglePopup} className={"text-white bg-red-400 w-10 h-10 font-bold text-sm rounded-[50%] self-end mb-5 " + (isPopupOpen? "":"hidden")}><FontAwesomeIcon icon={faX}/></button>
                    <div className="flex flex-col items-center lg:items-start">
                        <label className="pb-5 lg:pb-3 text-base font-medium">Languages</label>
                        <div className="flex flex-wrap mb-2 text-sm font-medium">
                            {languages.map((language)=>{
                                return (
                                    <button
                                        onClick={()=>toggleLanguage(language)}
                                        key={language}
                                        className={"px-4 py-2 rounded-full mr-2 mb-3 "+ (isSelected(language) ? " border-2 border-rose-400 text-rose-400" :  " bg-main-lighter-2 border-2 border-main-lighter-2 ")}>
                                        {language}
                                    </button>
                                )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col border-0 border-t border-[#5c5e68] pt-4">
                <label className="pb-2 text-base font-medium">Merit Score</label>
                <div className="flex justify-center items-center">
                    <input type="number" value={minCredits} onChange={(e)=>setMinCredits(e.currentTarget.value)} min="0" max="20" className="text-center outline-none px-5 py-2 pl-[2rem] w-[40%] rounded-full bg-[#5c5e68] "/>
                    <FontAwesomeIcon icon={faArrowsLeftRight} className="mx-5    text-main-lighter"/>
                    <input type="number" value={maxCredits} onChange={(e)=>setMaxCredits(e.currentTarget.value)} min="0" max="20" className="text-center outline-none px-5 py-2 pl-[2rem] w-[40%] rounded-full bg-[#5c5e68] "/>
                </div>
            </div>
            <div>
                <button onClick={submitFilter} className="w-full bg-emerald-400 rounded py-3 font-semibold mt-6 mb-1">Filter</button>
            </div>
        </div>
    );

};

export default FilterPanel;
