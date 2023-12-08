import { useState, useEffect } from 'react'
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';



function DisplayMileageLog() {
    const [mileageLog, setMileageLog] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
    const db = getFirestore();

    useEffect(() => {
        const mileageLogCollection = collection(db, "mileage");
        getDocs(mileageLogCollection).then((querySnapshot) => {
            const mileageLogArray = querySnapshot.docs.map(doc => doc.data());

            if (sortDirection === 'asc')
                // Sort the array by date in ascending order
                mileageLogArray.sort((a, b) => new Date(a.Date) - new Date(b.Date));

            if (sortDirection === 'desc')
                // Sort the array by date in descending order (reverse chronological order)
                mileageLogArray.sort((a, b) => new Date(b.Date) - new Date(a.Date));


            setMileageLog(mileageLogArray);
        });
    }, [sortDirection]);


    const deleteLog = async (logId) => {
        try {
            const mileageLogCollection = collection(db, "mileage");
            const querySnapshot = await getDocs(mileageLogCollection);

            querySnapshot.forEach(async (mileageDoc) => {
                const mileageLogData = mileageDoc.data();

                // Check if the document has the specified logId
                if (mileageLogData.id === logId) {
                    // Delete the document from Firestore
                    await deleteDoc(doc(mileageLogCollection, mileageDoc.id));

                    // Update the state to reflect the deletion in the UI
                    setMileageLog(prevMileageLog => prevMileageLog.filter(log => log.id !== logId));
                }
            });
        } catch (error) {
            console.error("Error deleting document: ", error);
            // Handle errors here (e.g., show an error message to the user)
        }
    };

    const toggleSortDirection = () => {
        setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    };

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
                        <th>
                            Date
                            <span className="sort-arrow" onClick={toggleSortDirection}>
                                {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                            </span>
                        </th>
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
                            <td><button className='mileage-delete-btn' onClick={() => deleteLog(mileageLog.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default DisplayMileageLog;