import { createUser, getUserById, deleteUser } from '../API/users';
import { addPatient, getPatientById, deletePatient, getDailyTask, addDailyTask, deleteDailyTask } from '../API/patients';

import { useEffect, useMemo } from 'react';


export default function TestAPIFunction() {
    const testCreationUser =  async() =>{
        const payload = {
            username: "test57",
            password: "test",
            role: "admin",
        };
        const response = await createUser(payload);
        console.log(response);
        const id=response.data.userId;
        console.log(id)
        if(response.success){
            console.log("createUser sussesfully")
        }else{
            alert("createUser fail")
        }

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
        if(response.success){
            console.log("createUser sussesfully")
        }else{
            alert("createUser fail")
        }
        
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
                if(response.success){
            console.log("createUser sussesfully")
        }else{
            alert("createUser fail")
        }

        await deleteDailyTask(id);
    }

    useEffect(() => {
        //testCreationUser();
        //testCreatePatient(); 
        //testDailyTask();
});

  return (
    <div>TestAPIFunction</div>
  )
}
