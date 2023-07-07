import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';

const Users = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    const users = useSelector((state) => state.users.users);  // (1) users назва сховища
    const isLoading = useSelector((state) => state.users.isLoading);
    const error = useSelector((state) => state.users.error)

    if (isLoading) {
        return '...loadign';
    }

    if (error) {
        return error;
    }

    return (
        <div>
            {users.map(user => <div key={ user._id }>{ user.email }</div>)}
        </div>
    );
}

export default Users;