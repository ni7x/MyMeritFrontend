import React from "react";
import QueryParams from "../../models/QueryParams";

const Pagination: React.FC<{page: number, maxPages: number, queryParams: QueryParams}> = ({page, maxPages, queryParams}) => {
    const URL = "/tasks?"
        + (queryParams.languages?.length != 0 && queryParams.languages != undefined ? "languages=" + queryParams.languages + "&": "")
        + (queryParams.minCredits != 0 && queryParams.minCredits != undefined ? "minCredits=" + queryParams?.minCredits + "&" : "")
        + (queryParams.maxCredits != 20  && queryParams.maxCredits != undefined ? "maxCredits=" + queryParams.maxCredits  + "&" : "")
        + (queryParams.sort != undefined ? "sort=" + queryParams.sort  + "&" : "")
        + "page=";


    return (
        <div className="flex justify-center font-semibold gap-2 mt-10">
            {page > 1 &&
                <a className="px-2 py-1" href={URL  + (page - 1)} >   {page - 1}</a>}
            <a href={URL + page} className="bg-task-bck px-2 py-1 rounded text-merit-credits-color">{page}</a>
            {page < maxPages &&
                <a className="px-2 py-1" href={URL  + (page + 1)} >  {page + 1} </a>}
        </div>
    );

};

export default Pagination;