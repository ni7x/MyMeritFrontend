import { Reward as RewardDTO } from "../../models/Reward";
import React, { useState } from "react";
import rewardImg from "../../assets/reward-placeholder.png";
import steamImg from "../../assets/steam-reward.jpg";
import amazonImg from "../../assets/amazon-reward.png";
import paypalImg from "../../assets/paypal-reward.png";

const randomImages = [steamImg, amazonImg, paypalImg];

const Reward: React.FC<{ reward: RewardDTO; currentBalance: number }> = ({
  reward,
  currentBalance,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <li
      className={
        "flex flex-col justify-between w-full h-[20rem] rounded relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] group overflow-hidden"
      }
    >
      <div
        className="w-full h-full bg-cover bg-center rounded group-hover:scale-105 transition-all duration-200 ease-linear"
        style={{
          backgroundImage: `url(${
            randomImages[Math.floor(Math.random() * randomImages.length)]
          })`,
        }}
      ></div>
      <div className="absolute w-full h-full items-center justify-center hidden md:flex">
        {!isPopupOpen ? (
          <button
            className={
              "font-medium text-sm py-2 px-4 rounded opacity-0 group-hover:opacity-95 transition-all duration-200 ease-linear" +
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
      <div className="flex justify-between absolute p-2 top-0 left-0 w-full">
        <p className="bg-secondary-bg-color p-2 px-4 text-sm rounded  text-merit-credits-color font-semibold opacity-95">
          {reward.credits} MC
        </p>
        {!isPopupOpen ? (
          <button
            className={
              "font-medium text-sm py-2 px-4 rounded md:hidden" +
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
              className="font-medium text-sm py-2 mr-1 px-4 rounded bg-emerald-500 md:hidden"
              onClick={() => {
                alert("xd");
                setIsPopupOpen(false);
              }}
            >
              Are you sure?
            </button>
            <button
              className="font-medium text-sm py-2 px-4 rounded bg-orange-300 md:hidden"
              onClick={() => setIsPopupOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="bg-secondary-bg-color p-5 absolute bottom-0 left-0 w-full opacity-95">
        <p className="font-semibold mb-1 text-md">{reward.name}</p>
        <p className="text-sm text-task-lighter overflow-hidden whitespace-nowrap block text-ellipsis">
          {reward.description}
        </p>
      </div>
    </li>
  );
};

export default Reward;
