import {users} from '../common/users';

const getUsers = () => {
    return users;
}

const getUserById = (userId: string) => {
    return getUsers()[0];
}

export {getUsers, getUserById}

