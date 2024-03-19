import { Reward as RewardDTO } from "../../models/Reward";
import React, { useState } from "react";
import rewardImg from "../../assets/reward-placeholder.png";

const Reward: React.FC<{ reward: RewardDTO; currentBalance: number }> = ({
  reward,
  currentBalance,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <li
      className={
        "flex flex-col justify-between w-full md:w-[49%] h-[20rem] rounded mb-4 bg-cover bg-center"
      }
      style={{ backgroundImage: `url(${rewardImg})` }}
    >
      <div className="flex justify-between m-2">
        <p className="bg-secondary-bg-color p-2 px-4 text-sm rounded  text-merit-credits-color font-semibold">
          {reward.credits} MC
        </p>
        {!isPopupOpen ? (
          <button
            className={
              "font-medium text-sm py-2 px-4 rounded" +
              (currentBalance < reward.credits
                ? " pointer-events-none bg-red-400 text-gray-200"
                : " bg-emerald-500 text-white")
            }
            disabled={currentBalance < reward.credits}
            onClick={() => setIsPopupOpen(true)}
          >
            {currentBalance < reward.credits
              ? "Can't purchase "
              : "Click to purchase"}
          </button>
        ) : (
          <div>
            <button
              className="font-medium text-sm py-2 mr-1 px-4 rounded bg-emerald-500"
              onClick={() => {
                alert("xd");
                setIsPopupOpen(false);
              }}
            >
              Are you sure?
            </button>
            <button
              className="font-medium text-sm py-2 px-4 rounded bg-orange-300"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="bg-secondary-bg-color p-5">
        <p className="font-semibold mb-1 text-md">{reward.name}</p>
        <p className="text-sm text-task-lighter overflow-hidden whitespace-nowrap block text-ellipsis">
          {reward.description}
        </p>
      </div>
    </li>
  );
};

export default Reward;
