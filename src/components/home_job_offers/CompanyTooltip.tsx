import React from "react";
import { Tooltip } from 'react-tooltip';
import JobOfferListedDTO from "../../models/dtos/JobOfferListedDTO";

const CompanyTooltip: React.FC<{ jobOffer: JobOfferListedDTO }> = ({ jobOffer }) => {
    return (
        jobOffer.company.description && (
            <Tooltip
                anchorSelect=".img-anchor"
                place="left"
                style={{ backgroundColor: "#434550", boxShadow: "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px" }}
                opacity={1}
            >
                <div className="flex py-2 gap-1">
                    <div className="flex-col">
                        <img
                            src={jobOffer.company.imageBase64}
                            className="block w-[3rem] h-[3rem] rounded mr-2 object-cover"
                            alt={jobOffer.company.username}
                        />
                    </div>
                    <div className="w-[15rem] flex flex-col rounded gap-1">
                        <h3 className="text-[18px] font-medium">{jobOffer.company.username}</h3>
                        <p className="text-main-2 text-task-lighter">{jobOffer.company.description}</p>
                    </div>
                </div>
            </Tooltip>
        )
    );
};

export default CompanyTooltip;
