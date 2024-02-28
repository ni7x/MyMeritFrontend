import Reward from "../models/Reward";
import PurchasedReward from "../models/PurchasedReward";

const getRewards = (): Reward[] => {
    return [
        new Reward("1", "Sample Reward 1", "Description of sample reward 1 Description of sample reward 1", 100, "img1.jpg"),
        new Reward("2", "Sample Reward 2", "Description of sample reward 2", 200, "img2.jpg"),
        new Reward("3", "Sample Reward 3", "Description of sample reward 3", 300, "img3.jpg"),
    ];
};


const getPurchaseHistory = (): PurchasedReward[] => {
   return [
        new PurchasedReward("1", new Reward("1", "Reward 1", "Description 1", 100, "img1.jpg"), new Date("2024-01-01")),
        new PurchasedReward("2", new Reward("2", "Reward 2", "Description 2", 200, "img2.jpg"), new Date("2024-01-02")),
        new PurchasedReward("3", new Reward("3", "Reward 3", "Description 3", 300, "img3.jpg"), new Date("2024-01-03")),
    ];
}


export  { getRewards, getPurchaseHistory }