import { createUser, getUserById, deleteUser } from '../API/users';
import { addPatient, getPatientById, deletePatient, getDailyTask, addDailyTask, deleteDailyTask } from '../API/patients';

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

    const testCreatePatient = async() =>{
        const payload = {
            name: "test57",
            address: "test",
            phone: "1234567890",
        };
        const response = await addPatient(payload);
        console.log(response.data.id);

        const id=response.data.id;
        const patient = await getPatientById(id);
        console.log(patient);
        
        await deletePatient(id);
    }

    const testDailyTask = async() =>{
        const payload = {
            patientId: "1234567890",
            date: "2021-10-15",
            task: "test",
            status: "test",
        };
        const response = await addDailyTask(payload);
        console.log(response.data.id);
        const id=response.data.id;
        const dailyTask = await getDailyTask(id);
        console.log({dailyTask})
        await deleteDailyTask(id);
    }

    useEffect(() => {
        // testCreationUser();
        //testCreatePatient(); 
        //testDailyTask();
});

  return (
    <div>TestAPIFunction</div>
  )
}
