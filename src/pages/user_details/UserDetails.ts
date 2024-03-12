import {useParams} from 'react-router-dom';
import {getUserById} from '../../services/UserService';

const UserDetails = () => {
    const {id} = useParams<{ id: string }>();
    if(id === undefined) return;

    const user = getUserById(id);
    

    return (
        
    );
}

export default UserDetails