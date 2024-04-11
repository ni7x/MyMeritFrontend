import React, { useEffect, useState } from "react";
import Reward from "../../models/Reward";
import AvailableRewards from "../../components/rewards/AvailableRewards";
import { getPurchaseHistory, getRewards } from "../../services/RewardService";
import SecondWrapper from "../../components/SecondWrapper";
import PurchaseHistory from "../../components/rewards/PurchaseHistory";
import PurchasedReward from "../../models/PurchasedReward";

import { useAuth } from "../../hooks/useAuth";

const Rewards: React.FC = () => {
  const [availableRewards, setAvailableRewards] = useState<any[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchasedReward[]>([]);

  const { isAuthenticated, user } = useAuth();

  const currentBalance = 200;

  const [isHistoryTab, setIsHistoryTab] = useState(false);

  const purchaseReward = () => {};

  useEffect(() => {
    getRewards().then((rewards) => {
      setAvailableRewards(rewards);
    });

    setPurchaseHistory(getPurchaseHistory);
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
            {currentBalance} MC
          </span>
        </h2>
      </div>

      {isHistoryTab ? (
        <PurchaseHistory history={purchaseHistory} />
      ) : (
        <AvailableRewards
          rewards={availableRewards}
          currentBalance={currentBalance}
        />
      )}
    </SecondWrapper>
  );
};

export default Rewards;
