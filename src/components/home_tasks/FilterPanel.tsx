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
        <div className="flex flex-col bg-secondary-bg-color w-[35%] px-6 py-5 h-[100%]">
            <div className="flex flex-col">
                <label className="pb-5 text-base font-semibold">Languages</label>
                <div className="flex flex-wrap mb-5 text-sm font-medium">
                    {languages.map((language)=>{
                            return (
                                <button
                                    onClick={()=>toggleLanguage(language)}
                                    className={"px-5 py-2.5 rounded-full mr-2 mb-3 "+ (isSelected(language) ? " border-2 border-rose-400 text-rose-400" :  " bg-[#5c5e68] border-2 border-[#5c5e68] ")}>
                                    {language}
                                </button>
                                )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label className="pb-5 text-base font-semibold">Merit Score</label>
                <div className="flex justify-center items-center">
                    <input type="number" value={minCredits} onChange={(e)=>setMinCredits(e.currentTarget.value)} min="0" max="20" className="text-center outline-none px-5 py-2.5 pl-[2rem] w-[40%] rounded-full bg-[#5c5e68] "/>
                    <FontAwesomeIcon icon={faArrowsLeftRight} className="mx-5 text-main-lighter"/>
                    <input type="number" value={maxCredits} onChange={(e)=>setMaxCredits(e.currentTarget.value)} min="0" max="20" className="text-center outline-none px-5 py-2.5 pl-[2rem] w-[40%] rounded-full bg-[#5c5e68] "/>
                </div>
            </div>
            <div>
                TODO sortowanie
            </div>
            <div>
                <button onClick={submitFilter} className="w-full bg-emerald-400 rounded py-3 font-semibold mt-8 mb-1">Filter</button>
            </div>
        </div>
    );

};

export default FilterPanel;