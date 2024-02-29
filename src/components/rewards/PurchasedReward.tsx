import {PurchasedReward as PurchasedRewardDTO} from "../../models/PurchasedReward";
import React from "react";
import rewardImg from '../../assets/reward-placeholder.png';

const PurchasedReward:React.FC<{purchase: PurchasedRewardDTO}> = ({purchase}) => {
    return (
        <li className="w-[100%] h-[5rem] bg-secondary-bg-color mb-4 rounded flex">
            <img src={rewardImg} className="h-[5rem] w-[5rem]"/>
            <div className="flex justify-between w-full items-center px-10">
                <div className="flex-col">
                    <p className="text-xs text-task-lighter">name</p>
                    <p className="mt-1 font-medium">{purchase.reward.name}</p>
                </div>
                <div className="flex-col">
                    <p className="text-xs text-task-lighter">purchased</p>
                    <p className="mt-1 font-medium">{purchase.purchaseDate.toLocaleDateString()}</p>
                </div>
                <div className="flex-col">
                    <p className="text-xs text-task-lighter">MC</p>
                    <p className="mt-1 font-medium text-merit-credits-color">{purchase.reward.credits}</p>
                </div>

            </div>
        </li>
    );
};

export default PurchasedReward;