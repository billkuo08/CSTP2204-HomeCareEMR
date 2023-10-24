/* eslint-disable react/prop-types */

import '../CSS/PatientTableComponent.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PatientsContext } from '../context/PatientsContext';

// Define the ResponsiveTable component here
function ResponsiveTable() {
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
          <tr>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
            </tr>

            <tr>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
            </tr>

            <tr>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
            </tr>

            <tr>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
              <td>Content 1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PatientTableComponent() {
  const data = useContext(PatientsContext);

  return (
    <>
      <ResponsiveTable /> {/* Add the ResponsiveTable component here */}
      <TableContainer component={Paper}>
        <Table aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Health Care Number</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.birthDate}</TableCell>
                <TableCell>{patient.healthCardNumber}</TableCell>
                <TableCell>
                  <Link to={`/visiting/${patient.id}`}>Visit</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
