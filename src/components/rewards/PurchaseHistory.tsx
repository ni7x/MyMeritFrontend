import Reward from "./Reward";
import React from "react";
import PurchasedReward from "../../models/PurchasedReward";

const PurchaseHistory: React.FC<{history: PurchasedReward[]}> = ({history}) => {
    return (
        <div class="flex justify-center w-full">
            <ul className="flex flex-wrap w-full">
                {history.map((reward)=>{
                    return <PurchasedReward reward={reward}/>
                })}
            </ul>
        </div>

    );
};

export default PurchaseHistory;