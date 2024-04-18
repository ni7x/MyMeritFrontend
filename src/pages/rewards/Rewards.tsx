import React, { useEffect, useState } from "react";
import AvailableRewards from "../../components/rewards/AvailableRewards";
import { getPurchaseHistory, getRewards } from "../../services/RewardService";
import { getUser } from "../../services/UserService";
import User from "../../types/User";
import SecondWrapper from "../../components/SecondWrapper";
import PurchaseHistory from "../../components/rewards/PurchaseHistory";
import Reward from "../../types/Reward";
import PurchasedReward from "../../types/PurchasedReward";
import { useAuth } from "../../hooks/useAuth";
import { purchaseReward } from "../../services/RewardService";

const Rewards = () => {
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchasedReward[]>([]);
  const [isHistoryTab, setIsHistoryTab] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  const onPurchase = (rewardId: string) => {
    purchaseReward(rewardId).then(() => {
      getUser().then((user) => setUser(user));
      getRewards().then((rewards) => {
        setAvailableRewards(rewards);
      });
      getPurchaseHistory().then((history) => {
        setPurchaseHistory(history);
      });
    });
  };

  useEffect(() => {
    getUser().then((user) => setUser(user));

    getRewards().then((rewards) => {
      setAvailableRewards(rewards);
    });

    getPurchaseHistory().then((history) => {
      setPurchaseHistory(history);
    });
  }, []);

  return (
    <SecondWrapper>
      <div className="flex justify-between mb-3 text-main-lighter text-sm font-medium flex-wrap">
        <div className="h-10 mb-2 md:sm-0">
          <button
            onClick={() => setIsHistoryTab(true)}
            className={`mr-2 bg-secondary-bg-color p-3 px-6 rounded ${
              isHistoryTab ? "text-white" : ""
            }`}
          >
            History
          </button>
          <button
            onClick={() => setIsHistoryTab(false)}
            className={`bg-secondary-bg-color p-3 px-6 rounded ${
              !isHistoryTab ? "text-white" : ""
            }`}
          >
            Rewards
          </button>
        </div>
        <h2 className="text-center h-10 bg-secondary-bg-color flex items-center p-3 px-9 rounded">
          {" "}
          Balance:{" "}
          <span className="text-merit-credits-color ml-2 font-semibold">
            {user ? user.points : ""} MC
          </span>
        </h2>
      </div>

      {isHistoryTab ? (
        <PurchaseHistory history={purchaseHistory} />
      ) : (
        <AvailableRewards
          rewards={availableRewards}
          currentBalance={user ? user.points : 0}
          onPurchase={onPurchase}
        />
      )}
    </SecondWrapper>
  );
};

export default Rewards;
