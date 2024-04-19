import UserSection from "./UserSection";
import User from "../../types/User";
import { getPurchaseHistory } from "../../services/RewardService";
import { PurchasedReward as PurchasedRewardDTO } from "../../types/PurchasedReward";
import { useEffect, useState } from "react";
import PurchasedReward from "../../components/rewards/PurchasedReward";

const UserRewards = ({ user }: { user: User }) => {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchasedRewardDTO[]>(
    []
  );

  useEffect(() => {
    getPurchaseHistory().then((history) => {
      setPurchaseHistory(history);
    });
  }, []);

  return (
    <UserSection>
      <div className="px-12 py-4">
        <div className="w-full flex flex-wrap items-center justify-between py-2">
          <p className="text-2xl">Purchase history</p>
          <a href="/rewards" className="text-sm text-primary">
            View all
          </a>
        </div>
        <div className="w-full relative">
          <p className="text-sm text-gray-500 py-2">
            {purchaseHistory.length != 0 &&
              purchaseHistory.slice(0, 2).map((purchasedReward, index) => {
                return (
                  <PurchasedReward key={index} purchase={purchasedReward} />
                );
              })}
            {purchaseHistory.length != 0 && (
              <div className="absolute w-full h-32 bottom-5 left-0 bg-gradient-to-b from-transparent to-main-darker"></div>
            )}
            {purchaseHistory.length === 0 && (
              <p>Your rewards history is empty.</p>
            )}
          </p>
        </div>
      </div>
    </UserSection>
  );
};

export default UserRewards;
