import { useState, useEffect } from 'react';
import { getAllNurses } from '../API/users';
import NurseTable from '../components/NurseTable';

export default function NurseListPage() {
    const [nurse, setNurse] = useState([]);
    console.log(nurse);
    const getNurses = async () => {
        try{
            const nurses = await getAllNurses();
            console.log(nurses);
            setNurse(nurses);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getNurses();
    }, [])
  return (
    <>
        <NurseTable data={nurse}/>
    </>
  )
}
