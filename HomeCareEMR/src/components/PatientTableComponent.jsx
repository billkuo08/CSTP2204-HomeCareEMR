/* eslint-disable react/prop-types */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link} from 'react-router-dom';
import { useContext } from 'react';
import {PatientsContext} from '../context/PatientsContext';

export default function PatientTableComponent() {
    const data = useContext(PatientsContext);
    console.log(data);
  return (
    <>
    <TableContainer comppoent={Paper}>
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
  )
}
