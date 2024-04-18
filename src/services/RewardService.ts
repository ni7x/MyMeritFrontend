import Reward from "../types/Reward";
import PurchasedReward from "../types/PurchasedReward";

import { httpCall } from "../api/HttpClient";

const getRewards = async (): Promise<Reward[]> => {
  const data = await httpCall<Reward[]>({
    url: import.meta.env.VITE_API_URL + "/rewards",
    method: "GET",
  });

  return data;
};

const getPurchaseHistory = (): Promise<PurchasedReward[]> => {
  return httpCall<PurchasedReward[]>({
    url: import.meta.env.VITE_API_URL + "/me/rewards",
    method: "GET",
  });
};

const purchaseReward = (rewardId: string): Promise<any> => {
  return httpCall<any>({
    url: import.meta.env.VITE_API_URL + `/me/purchase/${rewardId}`,
    method: "POST",
  });
};

export { getRewards, getPurchaseHistory, purchaseReward };
