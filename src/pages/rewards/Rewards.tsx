import React, {useEffect, useState} from "react";
import Reward from "../../models/Reward";
import AvailableRewards from "../../components/rewards/AvailableRewards";
import {getPurchaseHistory, getRewards} from "../../services/RewardService";
import SecondWrapper from "../../components/SecondWrapper";
import PurchaseHistory from "../../components/rewards/PurchaseHistory";
import PurchasedReward from "../../models/PurchasedReward";

const Rewards: React.FC = () => {
    const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
    const [purchaseHistory, setPurchaseHistory] = useState<PurchasedReward[]>([]);

    const currentBalance = 200;

    const [isHistoryTab, setIsHistoryTab] = useState(false);

    const purchaseReward = () => {

    }

    useEffect(()=>{
        setAvailableRewards(getRewards);
        setPurchaseHistory(getPurchaseHistory)
    }, [])

    return (
        <SecondWrapper>
            <div class="flex justify-between mb-3 text-main-lighter text-sm font-medium flex-wrap">
                <div class="h-10 mb-2 md:sm-0">
                    <button onClick={() => setIsHistoryTab(true)}
                            className={`mr-2 bg-secondary-bg-color p-3 px-6 rounded ${isHistoryTab ? "text-white" : ""}`}>
                        History
                    </button>
                    <button onClick={() => setIsHistoryTab(false)}
                            className={`bg-secondary-bg-color p-3 px-6 rounded ${!isHistoryTab ? "text-white" : ""}`}>
                        Rewards
                    </button>
                </div>
                <h2 className="text-center h-10 bg-secondary-bg-color flex items-center p-3 px-9 rounded"> Balance:  <span class="text-merit-credits-color ml-2 font-semibold">{currentBalance} MC</span></h2>

            </div>

            {isHistoryTab ?
                <PurchaseHistory history={purchaseHistory}/>
                :
                <AvailableRewards rewards={availableRewards}  currentBalance={currentBalance}/>
            }
        </SecondWrapper>

    );
};

export default Rewards;