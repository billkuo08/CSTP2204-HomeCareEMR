/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import '../CSS/PatientTableComponent.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PatientsContext } from '../context/PatientsContext';

// Define the ResponsiveTable component here
function ResponsiveTable() {
    const data = useContext(PatientsContext);
  return (
    <div>
      <h2>Patient List</h2>
      <div className="table-wrapper" >
        
        <table className="fl-table">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Date of Birth</th>
              <th>Healhcare Number</th>
              <th>Link </th>
            </tr>
          </thead>
          <tbody>
          {data.map((patient) => (
            <tr>
                <td>{patient.lastName}</td>
                <td>{patient.firstName}</td>
                <td>{patient.birthDate}</td>
                <td>{patient.healthCardNumber}</td>
                <td>
                    <Link to={`/visiting/${patient.id}`}>Visit</Link>
                </td>
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PatientTableComponent() {
  return (
    <>
      <ResponsiveTable /> {/* Add the ResponsiveTable component here */}
      
    </>
  );
}
