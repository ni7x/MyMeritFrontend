// import Reward from "./Reward";
import React from "react";
import  {PurchasedReward as PurchasedRewardDTO} from "../../models/PurchasedReward";
import PurchasedReward from "./PurchasedReward";

const PurchaseHistory: React.FC<{history: PurchasedRewardDTO[]}> = ({history}) => {
    return (
        <div className="flex justify-center w-full">
            <ul className="flex flex-wrap w-full">
                {history.map((reward, index)=>{
                    return <PurchasedReward key={index} purchase={reward}/>
                })}
            </ul>
        </div>

    );
};

export default PurchaseHistory;