import UserSection from "../user/UserSection";
import { getPurchaseHistory } from "../../services/RewardService";
import PurchasedRewardDTO from "../../models/PurchasedReward";
import { useEffect, useState } from "react";
import PurchasedReward from "../../components/rewards/PurchasedReward";
import { Link } from "react-router-dom";

const UserRewards = () => {
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
      <div className="px-12 py-2 h-full overflow-hidden">
        <div className="w-full flex flex-wrap items-center justify-between py-2">
          <p className="text-2xl">Recent purchases</p>
        </div>
        <div className="w-full h-full relative">
          <p className="text-sm text-gray-500 py-2 mb-[-1rem]">
            {purchaseHistory.length != 0 &&
              purchaseHistory.slice(0, 3).map((purchasedReward, index) => {
                return (
                  <PurchasedReward key={index} purchase={purchasedReward} />
                );
              })}
            {purchaseHistory.length != 0 && (
              <div className="absolute w-full h-48 bottom-5 left-0 bg-gradient-to-b from-transparent to-main-darker"></div>
            )}
            {purchaseHistory.length === 0 && (
              <p>Your rewards history is empty.</p>
            )}
          </p>
        </div>
      </div>
      <>
        {purchaseHistory.length != 0 && (
          <Link
            to="/me/purchases"
            className="absolute bottom-0 left-0 w-full flex justify-center text-sm text-primary font-semibold opacity-70 p-4 text-gray-200 hover:opacity-100 transition-opacity duration-200 ease-linear"
          >
            View all
          </Link>
        )}
      </>
    </UserSection>
  );
};

export default UserRewards;
