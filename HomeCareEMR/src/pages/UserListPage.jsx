import { useState, useEffect } from 'react';
import { getAllUsers } from '../API/users';

export default function UserListPage() {
    const [user, setUser] = useState([]);
    console.log(user);
    const getUsers = async () => {
        try{
            const users = await getAllUsers();
            setUser(users);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
  return (
    <div>UserListPage</div>
  )
}
