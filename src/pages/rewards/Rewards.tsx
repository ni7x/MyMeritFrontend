import { useEffect, useState } from "react";
import AvailableRewards from "../../components/rewards/AvailableRewards";
import { getPurchaseHistory, getRewards } from "../../services/RewardService";
import { getUser } from "../../services/UserService";
import User from "../../types/User";
import SecondWrapper from "../../components/SecondWrapper";
import PurchaseHistory from "../../components/rewards/PurchaseHistory";
import Reward from "../../types/Reward";
import PurchasedReward from "../../types/PurchasedReward";
import { purchaseReward } from "../../services/RewardService";
import meritCoin from "../../assets/meritcoin.png";

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
    <>
      <div className="flex justify-end mb-3 text-main-lighter text-sm font-medium flex-wrap">
        {user && (
          <div className="px-4 py-3 rounded-lg text-merit-credits-color text-base font-semibold bg-secondary-bg-color flex flex-row items-center justify-center">
            {user.credits ?? 0}
            <img src={meritCoin} alt="meritcoin" className="h-4 w-4 ml-1" />
          </div>
        )}
      </div>

      <AvailableRewards
        rewards={availableRewards}
        currentBalance={user ? user.credits : 0}
        onPurchase={onPurchase}
      />
    </>
  );
};

export default Rewards;
