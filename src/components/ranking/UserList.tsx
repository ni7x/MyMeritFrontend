import React from 'react';
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import UserListItem from "./UserListItem";

interface UserListProps {
    users: RankingUserDTO[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
            <tbody>
            {users.map((user) => (
                <UserListItem key={user.id} user={user} />
            ))}
            </tbody>
        </table>
    );
};

export default UserList;