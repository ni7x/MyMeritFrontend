import React from 'react';
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";

interface TopUsersProps {
    users: RankingUserDTO[];
}

const TopUsers: React.FC<TopUsersProps> = ({ users }) => {
    const languageColors: { [key: string]: string } = {
        JAVA: "#ec9b2a",
        PYTHON: "#40a5f8",
        JAVASCRIPT: "#f1e05a",
        CPP: "#f34b7d",
        GO: "#00ADD8",
        KOTLIN: "#A97BFF",
        TYPESCRIPT: "#46d595",
        PHP: "#c72eb3",
    };
    const topUsers = users.slice(0, 3);


    const renderUserCard = (user: RankingUserDTO) => {
        const cardClassName = "flex items-center  flex-col gap-4 h-auto  bg-secondary-bg-color rounded-xl p-4 w-[15rem] " + (user.rank === 1 &&  "") ;
        const colorClass = user.rank === 1 ? " border-yellow-300 text-yellow-400" :
            user.rank === 2 ? " border-gray-200 gray-200" :
                " border-yellow-600 text-yellow-600";
        return (
            <div className={cardClassName}>
                <p className={`relative mt-[-33px] border-2 bg-ide-color font-semibold p-2 rounded ${colorClass}`}>
                    <FontAwesomeIcon icon={faTrophy}/> {user.rank}
                </p>
                <div className="flex justify-center items-center h-full w-[90%]">
                    <div className="flex items-center justify-around flex-col gap-6 h-auto h-full">
                        <div>
                            <img src={user.profileImageBase64}/>
                        </div>
                        <div className="flex gap-2">
                            <h2 className="text-xl font-semibold text-center" style={{ wordBreak: 'break-all' }}>
                                {user.username}
                            </h2>
                        </div>
                        <div className="flex justify-between">
                            <p className="bg-ide-color px-4 py-2 text-sm font-semibold w-auto rounded inline-block text-emerald-400">
                                {user.meritPoints} MP
                            </p>
                        </div>
                        <ul className="flex items-center justify-center  gap-3">
                            {user.languages.slice(0, 2).map(language => {
                                const color = languageColors[language.toUpperCase()] ?? "#8c8f9f";
                                return (
                                    <li
                                        className="px-3 py-1 text-sm rounded-md font-medium"
                                        style={{
                                            backgroundColor: "transparent",
                                            border: `2px solid ${color}`,
                                            color: color,
                                        }}
                                        key={language}
                                    >
                                        {language}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="flex justify-center gap-4">
            <div className="py-5">
                {renderUserCard(topUsers[1])}
            </div>
            {renderUserCard(topUsers[0])}
            <div className="py-5">
                {renderUserCard(topUsers[2])}
            </div>
        </div>
    );
};

export default TopUsers;