import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import JobOfferDetailsDTO from "../../models/dtos/JobOfferDetailsDTO";
import {useAuth} from "../../hooks/useAuth";
import {getJobOfferById} from "../../services/JobOfferService";
import JobOfferInfo from "../../components/job_offer_details/job_offer_info/JobOfferInfo";

const JobOfferDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [ jobOffer, setJobOffer ] = useState<JobOfferDetailsDTO>();
    const { accessToken } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(accessToken){
                    const response = await getJobOfferById(id!, accessToken);
                    if (response.ok) {
                        setJobOffer(await response.json());
                    }
                }else{
                    console.log("No token provided")
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchData();
    }, []);
    return(
        <div className="flex w-[100%] justify-center">
            {jobOffer &&
                <JobOfferInfo jobOffer={jobOffer}/>
            }
        </div>
    )
}

export default JobOfferDetails;