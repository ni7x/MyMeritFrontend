import {Reward as RewardDTO} from "../../models/Reward";
import Reward from "./Reward";
import React from "react";

const AvailableRewards: React.FC<{rewards: RewardDTO[], currentBalance:number}> = ({rewards, currentBalance}) => {
    return (
                <div class="flex justify-center ">
                    <ul className="flex flex-wrap w-full gap-[2%]">
                    {rewards.map((reward)=>{
                        return <Reward reward={reward} currentBalance={currentBalance}/>
                    })}
                    </ul>
                </div>

    );
};

export default AvailableRewards;