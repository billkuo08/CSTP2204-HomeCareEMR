import { useState, useEffect } from 'react';
import { getAllNurses } from '../API/nurses';

export default function NurseListPage() {
    const [nurse, setNurse] = useState([]);
    console.log(nurse);
    const getNurses = async () => {
        try{
            const nurses = await getAllNurses();
            setNurse(nurses);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getNurses();
    }, [])
  return (
    <div>NurseListPage</div>
  )
}
