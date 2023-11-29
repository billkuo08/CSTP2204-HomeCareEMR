import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';



function DisplayMileageLog(){
    const [mileageLog, setMileageLog] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const mileageLogCollection = collection(db, "mileage");
        getDocs(mileageLogCollection).then((querySnapshot) => {
            const mileageLogArray = querySnapshot.docs.map(doc => doc.data());
            setMileageLog(mileageLogArray);
            console.log(mileageLogArray)
        });
    }, []);

    return (
        <div>
            <h1 className="h5">Mileage Log</h1>
            <br></br>
            <br></br>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date</th>
                        <th>Total Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {mileageLog.map((mileageLog, index) => (
                        <tr key={index}>
                            <td>{mileageLog.FirstName}</td>
                            <td>{mileageLog.LastName}</td>
                            <td>{mileageLog.Date}</td>
                            <td>{mileageLog.DistanceTraveled}</td>                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default DisplayMileageLog;