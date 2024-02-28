import Reward from "../models/Reward";

const getRewards = (): Reward[] => {
    return [
        new Reward("1", "Sample Reward 1", "Description of sample reward 1 Description of sample reward 1", 100, "img1.jpg"),
        new Reward("2", "Sample Reward 2", "Description of sample reward 2", 200, "img2.jpg"),
        new Reward("3", "Sample Reward 3", "Description of sample reward 3", 300, "img3.jpg"),
    ];
};





export  { getRewards }