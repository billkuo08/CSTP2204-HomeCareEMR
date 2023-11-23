import { createUser, getUserById, deleteUser } from '../API/users';
import { useEffect } from 'react';


export default function TestAPIFunction() {
    const testCreationUser = async() =>{
        const payload = {
            username: "test57",
            password: "test",
            role: "admin",
        };
        const response = await createUser(payload);
        console.log(response.data.userId);
        const id=response.data.userId;
        const user = await getUserById(id);
        console.log(user);

        await deleteUser(id);   

        
    }

    useEffect(() => {
        testCreationUser();
});

  return (
    <div>TestAPIFunction</div>
  )
}
