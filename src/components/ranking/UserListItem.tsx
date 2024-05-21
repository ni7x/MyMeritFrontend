import React from 'react';
import RankingUserDTO from "../../models/dtos/RankingUserDTO";

interface UserListItemProps {
    user: RankingUserDTO;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
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
    return (
        <tr className="bg-secondary-bg-color rounded py-4">
            <td className="px-8 font-semibold">
                <div className="flex items-center gap-0.5">
                    <span className="text-task-lighter text-xs font-medium">#</span>{user.rank}
                </div>
            </td>
            <td className="flex gap-2 items-center py-2">
                <img src={user.profileImageBase64} alt={user.username} className="w-12 h-12 rounded-full" />
                <p>
                    {user.username}
                </p>
            </td>
            <td className="px-10">
                <p className="bg-ide-color p-2 px-4 text-sm font-semibold w-auto rounded inline-block text-emerald-400">
                    {user.meritPoints} MP
                </p>
            </td>
            <td className="flex flex-wrap gap-2">
                {user.languages.map(language => {
                    const color = languageColors[language.toUpperCase()] ?? "#8c8f9f";
                    return (
                        <p
                            className="px-3 py-1 text-sm rounded-md font-medium"
                            style={{
                                backgroundColor: "transparent",
                                border: `2px solid ${color}`,
                                color: color,
                            }}
                            key={language}
                        >
                            {language}
                        </p>
                    );
                })}
            </td>
        </tr>
    );
};

export default UserListItem;