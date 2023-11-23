/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PatientsContext } from '../context/PatientsContext';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import PersonAddDisabledTwoToneIcon from '@mui/icons-material/PersonAddDisabledTwoTone';
import {TextField} from '@mui/material'
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';


// Define the ResponsiveTable component here
function ResponsiveTable() {
  const data = useContext(PatientsContext);
  const [search, setNewSearch] = useState("");

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = !search
  ? data
  : data.filter((patient) => {
    return (
      patient.firstName.toLowerCase().includes(search.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(search.toLowerCase()) ||
      patient.healthCardNumber.toLowerCase().includes(search.toLowerCase())
    );
  });




    
  return (

    <div>
      
      <h2><PersonAddAltTwoToneIcon /><em> Patient List </em> <PersonAddDisabledTwoToneIcon /></h2>
      <div className="table-wrapper" >
        <TextField 
          sx={{marginBottom:'20px' , width:'50%'}}
          size="medium"
          type="text"
          variant='outlined'
          color='secondary'
          label="Search Patient"
          value={search}
          onChange={handleSearchChange}
          
        />
        
        <table className="fl-table">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Date of Birth</th>
              <th>HealthCare Number</th>
              <th>Route</th>
              <th>Link</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {filtered.map((patient) => (
              <tr>
                  <td>{patient.lastName}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.birthDate}</td>
                  <td>{patient.healthCardNumber}</td>
                  <td>{patient.route}</td>
                  <td>
                      <Link to={`/visiting/${patient.id}`} className="a" >Visit</Link>
                  </td>
                  <td>
                      <Link to={`/edit/${patient.id}`} className="a" >Edit</Link>
                  </td>
              </tr>
              ))
            }
          
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
