import { Reward as RewardDTO } from "../../models/Reward";
import Reward from "./Reward";
import React from "react";

const AvailableRewards: React.FC<{
  rewards: RewardDTO[];
  currentBalance: number;
}> = ({ rewards, currentBalance }) => {
  return (
    <div className="flex justify-center ">
      <ul className="w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {rewards.map((reward, index) => {
          return <Reward reward={reward} key={index} currentBalance={currentBalance} />;
        })}
      </ul>
    </div>
  );
};

export default AvailableRewards;
