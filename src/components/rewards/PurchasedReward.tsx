import {PurchasedReward as PurchasedRewardDTO} from "../../models/PurchasedReward";
import React from "react";

const PurchasedReward:React.FC<{reward: PurchasedRewardDTO}> = ({reward}) => {
    return (
        <li class="w-[45%] bg-secondary-bg-color m-2 p-4 rounded">
            <p>
                {reward.name}
                {reward.credits} MC
            </p>
            <p>
                {reward.purchaseDate}
            </p>
        </li>
    );
};

export default PurchasedReward;