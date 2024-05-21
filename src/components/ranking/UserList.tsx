import React from 'react';
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import UserListItem from "./UserListItem";

interface UserListProps {
    users: RankingUserDTO[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <table className="w-full h-full" style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
            <thead>
            <tr className="rounded py-3">
                <th className="px-8  font-medium text-left">RANK</th>
                <th className="font-medium text-left">USERNAME</th>
                <th className="px-10  font-medium text-left">MERIT POINTS</th>
                <th className="font-medium text-left">LANGUAGES</th>
            </tr>
            </thead>
            <tbody>

            {users.map((user) => (
                <UserListItem key={user.id} user={user} />
            ))}
            </tbody>
        </table>
    );
};

export default UserList;