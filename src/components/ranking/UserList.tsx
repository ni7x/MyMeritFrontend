import React from 'react';
import RankingUserDTO from "../../models/dtos/RankingUserDTO";
import UserListItem from "./UserListItem";

interface UserListProps {
    users: RankingUserDTO[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <table className="h-full w-full table-fixed lg:table-auto rounded-xl " style={{ borderCollapse: 'separate', borderSpacing: '0 1rem'}}>
                <thead>
                    <tr className="rounded py-3 ">
                        <th className="lg:px-8 px-2 font-medium text-left">RANK</th>
                        <th className="font-medium text-left">USERNAME</th>
                        <th className="sm:px-20 sm:hidden block font-medium sm:text-left ">MS</th>
                        <th className="sm:px-0 hidden sm:block font-medium text-left lg:px-10">MERIT SCORE</th>
                        <th className="font-medium text-left hidden md:table-cell">LANGUAGES</th>
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