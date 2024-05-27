import PurchasedRewardDTO from "../../models/PurchasedReward";
import React from "react";
import rewardImg from "../../assets/reward-placeholder.png";
import meritCoin from "../../assets/meritcoin.png";

const PurchasedReward: React.FC<{ purchase: PurchasedRewardDTO }> = ({
  purchase,
}) => {
  return (
    <li className="w-full h-[300px] sm:h-[5rem] bg-secondary-bg-color mb-4 rounded flex flex-col sm:flex-row">
      <div
        className="w-full h-full sm:w-[5rem] bg-cover bg-center max-sm:rounded-t sm:rounded-l"
        style={{
          backgroundImage: `url(${
            purchase.reward.imageBase64 == ""
              ? rewardImg
              : "data:image/png;base64," + purchase.reward.imageBase64
          })`,
        }}
      ></div>
      <div className="flex flex-wrap justify-between w-full h-full items-center px-4">
        <div className="flex-col">
          <p className="text-xs text-task-lighter">name</p>
          <p className="mt-1 font-medium">{purchase.reward.name}</p>
        </div>
        <div className="flex-col">
          <p className="text-xs text-task-lighter">purchased</p>
          <p className="mt-1 font-medium">
            {new Date(purchase.datePurchase).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-task-lighter">cost</p>
          <p className="mt-1 font-semibold text-merit-credits-color flex flex-row gap-1 items-center justify-center">
            {purchase.reward.cost}
            <img
              title="merit coin"
              alt="merit coin"
              src={meritCoin}
              width="16"
              height="16"
              className="max-w-full h-4 w-4"
            />
          </p>
        </div>
      </div>
    </li>
  );
};

export default PurchasedReward;
