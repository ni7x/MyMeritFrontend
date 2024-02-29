import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsLeftRight, faX} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import QueryParams from "../../models/QueryParams";
import SortPanel from "./SortPanel";


const languages = ["Java", "Cpp", "C"];

const FilterPanel : React.FC<{queryParams: QueryParams}> = ({queryParams}) => {
    const [selectedLanguages, setSelectedLanguages] = useState<string []>(queryParams.languages ? queryParams.languages.split(",") : []);
    const [minCredits, setMinCredits] = useState<number>(queryParams.minCredits ? queryParams.minCredits : 0);
    const [maxCredits, setMaxCredits] = useState<number>(queryParams.maxCredits ? queryParams.maxCredits : 20);
    const [timeLeft, setTimeLeft] = useState<number|null>(queryParams.timeLeft ? queryParams.timeLeft : null);

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const submitFilter = () => {
        const URL = "/tasks?" + (selectedLanguages.length != 0 ? "languages=" + selectedLanguages: "")
            + (minCredits != 0 ? "&minCredits=" + minCredits : "")
            + (maxCredits != 20 ? "&maxCredits=" + maxCredits : "")
            + (timeLeft != null ? "&timeLeft=" + timeLeft : "");

        setIsPopupOpen(false);
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

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
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
                                        className={"px-4 py-2 rounded-full mr-2 mb-3 "+ (isSelected(language) ? " border-2 border-rose-400 text-rose-400" :  " bg-[#5c5e68] border-2 border-[#5c5e68] ")}>
                                        {language}
                                    </button>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col border-0 border-t border-[#5c5e68] pt-4 pb-4 lg:justify-center items-center lg:items-stretch">
                        <label className="pb-5 lg:pb-3  text-base font-medium">Merit Score</label>
                        <div className="flex items-center">
                            <input type="number" value={minCredits}
                                   onChange={(e)=>setMinCredits(e.currentTarget.value)}
                                   min="0"
                                   max="20"
                                   className="text-center outline-none p-2 w-[100%] lg:w-[40%] rounded bg-[#5c5e68] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                            <FontAwesomeIcon icon={faArrowsLeftRight} className="mx-5 text-main-lighter"/>
                            <input type="number"
                                   value={maxCredits}
                                   onChange={(e)=>setMaxCredits(e.currentTarget.value)}
                                   min="0"
                                   max="20"
                                   className="text-center outline-none p-2 w-[100%] lg:w-[40%] rounded bg-[#5c5e68] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                        </div>
                    </div>
                    <div className="flex flex-col border-0 border-t border-[#5c5e68] pt-4 pb-4 items-center lg:items-stretch">
                        <label className="pb-5 lg:pb-3  text-base font-medium">Time left</label>
                        <div className="flex lg:justify-center">
                            <select id="time-left"
                                    name="time-left"
                                    className="text-center pr-8 pl-2 outline-none p-2 w-[100%] lg:w-[100%] rounded bg-[#5c5e68]"
                                    value={timeLeft === null ? "" : timeLeft}
                                    onChange={(e) => setTimeLeft(parseInt(e.currentTarget.value))}>
                                <option value="1">1 hour</option>
                                <option value="6">6 hours</option>
                                <option value="12">12 hours</option>
                                <option value="24">1 day</option>
                                <option value="72">3 days</option>
                                <option value="168">1 week</option>
                                <option value="">any</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col border-0 border-t border-[#5c5e68] pt-4 items-center lg:items-stretch">
                        <label>Order</label>
                        <SortPanel/>
                    </div>

                </div>
                <button onClick={submitFilter} className="w-full bg-emerald-400 rounded py-3 font-semibold mt-6 mb-1">Filter</button>
            </div>
            <button className="lg:hidden text-center appearance-none text-sm font-medium outline-none py-3 px-5 mb-3 rounded bg-secondary-bg-color " onClick={togglePopup}> {isPopupOpen? "Hide filters" : "Show filters"}</button>
        </div>
    );

};

export default FilterPanel;