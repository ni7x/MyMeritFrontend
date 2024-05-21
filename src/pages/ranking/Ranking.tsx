import React, { useEffect, useState } from "react";
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import Button from "../../components/ranking/Button";
import TopUsers from "../../components/ranking/TopUsers";
import UserList from "../../components/ranking/UserList";
import {List} from "@mui/material";

const Ranking = () => {
    const initialUsers: RankingUserDTO[] = [
        {
            id: 1,
            rank: 1,
            meritPoints: 2500,
            username: 'CodeMaster',
            profileImageBase64: 'profileImageCodeMasterBase64',
            languages: ['JavaScript', 'TypeScript', 'Python']
        },
        {
            id: 2,
            rank: 2,
            meritPoints: 2400,
            username: 'DevGuru',
            profileImageBase64: 'profileImageDevGuruBase64',
            languages: ['Java', 'Kotlin', 'Scala']
        },
        {
            id: 3,
            rank: 3,
            meritPoints: 2300,
            username: 'BugHunter',
            profileImageBase64: 'profileImageBugHunterBase64',
            languages: ['C++', 'C#', 'Rust']
        },
        {
            id: 4,
            rank: 4,
            meritPoints: 2200,
            username: 'ScriptKid',
            profileImageBase64: 'profileImageScriptKidBase64',
            languages: ['JavaScript', 'PHP', 'Ruby']
        },
        {
            id: 5,
            rank: 5,
            meritPoints: 2100,
            username: 'AlgoQueen',
            profileImageBase64: 'profileImageAlgoQueenBase64',
            languages: ['Python', 'R', 'Matlab']
        }
    ];
    const [users, setUsers] = useState<RankingUserDTO[]>(initialUsers);
    const [activeButton, setActiveButton] = useState<'year' | 'month' | 'week'>('year');

    const handleButtonClick = (button: 'year' | 'month' | 'week') => {
        setActiveButton(button);
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="text-3xl font-semibold">Leaderboard</h2>
            <div className="flex gap-4">
                <Button
                    label="TOP THIS YEAR"
                    isActive={activeButton === 'year'}
                    onClick={() => handleButtonClick('year')}
                />
                <Button
                    label="TOP THIS MONTH"
                    isActive={activeButton === 'month'}
                    onClick={() => handleButtonClick('month')}
                />
                <Button
                    label="TOP THIS WEEK"
                    isActive={activeButton === 'week'}
                    onClick={() => handleButtonClick('week')}
                />
            </div>
            <div className="flex flex-col gap-4 w-[80%] m-auto">
                <TopUsers users={users.slice(0, 3)} />
                <UserList users={users.slice(3)} />
            </div>
        </div>
    );
};

export default Ranking;
