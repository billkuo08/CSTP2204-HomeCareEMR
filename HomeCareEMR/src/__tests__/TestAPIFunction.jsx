import React from 'react'
import { createUser } from '../API/users';
import { useEffect } from 'react';

export default function TestAPIFunction() {
    const testCreation = async() =>{
        const payload = {
            username: "test",
            password: "test",
            role: "admin",
        };
        const response = await createUser(payload);
        console.log(response);

        
        
    }

    useEffect(() => {
        testCreation();
});

  return (
    <div>TestAPIFunction</div>
  )
}
