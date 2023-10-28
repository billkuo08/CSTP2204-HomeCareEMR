/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PatientsContext } from '../context/PatientsContext';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PersonAddDisabledTwoToneIcon from '@mui/icons-material/PersonAddDisabledTwoTone';

const marqueeStyle = {
  backgroundColor: 'red',
  color: 'white',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  animation: 'marquee 990s linear infinite', // Adjust the duration to 30 seconds
};

// Define the ResponsiveTable component here
function ResponsiveTable() {
    const data = useContext(PatientsContext);
  return (

    <div>
      <marquee className="marquee" behavior="scroll" direction="left">
     Access to this page is strictly restricted to authorized personnel, exclusively designated for administrators within our organization. This particular web page serves as a vital component of our company's proprietary pipeline tool, and its contents are confidential in nature. Any attempt at unauthorized access, whether intentional or accidental, will not be taken lightly, and it will inevitably lead to severe consequences as we uphold stringent security protocols to safeguard our data and operations. We urge all users to respect these access limitations in the interest of maintaining the integrity and security of our systems.
      </marquee>
      
      <h2><PersonAddAltTwoToneIcon /> Patient List <PersonAddDisabledTwoToneIcon /></h2>
      <div className="table-wrapper" >
        
        <table className="fl-table">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Date of Birth</th>
              <th>HealthCare Number</th>
              <th>Link</th>
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
                    <Link to={`/visiting/${patient.id}`} className="a" >Visit</Link>
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
