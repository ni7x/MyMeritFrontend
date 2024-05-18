import { useEffect, useState } from "react";
import PurchaseHistory from "../../rewards/PurchaseHistory";
import { getPurchaseHistory } from "../../../services/RewardService";
import PurchasedRewardDTO from "../../../models/PurchasedReward";

const UserPurchases = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchasedRewardDTO[]>(
    []
  );

  useEffect(() => {
    getPurchaseHistory().then((history: PurchasedRewardDTO[]) => {
      setPurchaseHistory(history);
    });
  }, []);

  return (
    <>
      <header className="pb-2">
        <h1 className="text-2xl">Purchase history</h1>
      </header>
      <PurchaseHistory history={purchaseHistory} />
    </>
  );
};

export default UserPurchases;
