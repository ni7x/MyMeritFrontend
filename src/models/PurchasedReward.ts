import Reward from "./Reward";

class PurchasedReward {
    constructor(
        public id: string,
        public reward: Reward,
        public datePurchase: Date,
    ) {}
}

export default PurchasedReward;