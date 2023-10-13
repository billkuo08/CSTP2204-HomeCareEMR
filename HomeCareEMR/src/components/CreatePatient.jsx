import React from 'react';
import { Container, Typography, Stack, TextField, Button, Box, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/config';

const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#0055A4', // Professional blue color
  color: 'yellow', // White text for better contrast
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
};

const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  backgroundColor: 'white', // Light blue background
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'yellow', // White text
  fontWeight: 'bold', // Bold text
  textDecoration: 'none',
};

const gridItemStyle = {
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #E0E0E0', // Light gray border
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Subtle box shadow
};

const gridItemHoverStyle = {
  backgroundColor: '#F0F0F0', // Light gray background on hover
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#0055A4', // Match the top navigation bar
  color: 'white',
  padding: '10px',
  textAlign: 'center',
};

const formContainerStyle = {
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function CreatePatient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleDayChange = (event) => {
    const index = tasks.indexOf(event.target.value);
    if (index === -1) {
      setTasks([...tasks, event.target.value]);
    } else {
      setTasks(tasks.filter((task) => task !== event.target.value));
    }
  };

  const patientsRef = collection(db, 'patients');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patient = {
      firstName,
      lastName,
      phone,
      address,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone,
      tasks,
    };
    try {
      await addDoc(patientsRef, patient);
      alert('Patient information submitted successfully.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <marquee behavior="scroll" direction="left" style={{ backgroundColor: 'red', color: 'white' }}>
      This page is off-limits to the public as it is a company pipeline tool, and it is for admin access only; unauthorized access will result in consequences.
      </marquee>
      <nav style={navStyle}>
        <button style={buttonStyle}>
          <a href="/">Home</a>
        </button>
        <button style={buttonStyle}>
          <a href="/about">About</a>
        </button>
        <button style={buttonStyle}>
          <a href="/contact">Contact</a>
        </button>
      </nav>
      <Container style={formContainerStyle}>
        <Typography variant="h5">Create Patient</Typography>
        <form onSubmit={handleSubmit} action={<Link to="/" />}>
          <Stack spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1 }}>
            <TextField
              size="small"
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              required
            />
            <TextField
              size="small"
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
            />
            <TextField
              size="small"
              type="text"
              variant="outlined"
              color="secondary"
              label="Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              fullWidth
              required
            />
          </Stack>
          <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
            <TextField
              size="small"
              type="address"
              variant="outlined"
              color="secondary"
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              fullWidth
              required
            />
          </Stack>
          <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
            <TextField
              size="small"
              type="text"
              variant="outlined"
              color="secondary"
              label="Emergency Contact Name"
              onChange={(e) => setEmergencyContactName(e.target.value)}
              value={emergencyContactName}
              fullWidth
              required
            />
            <TextField
              size="small"
              type="text"
              variant="outlined"
              color="secondary"
              label="Relationship"
              onChange={(e) => setEmergencyContactRelationship(e.target.value)}
              value={emergencyContactRelationship}
              fullWidth
              required
            />
            <TextField
              size="small"
              type="text"
              variant="outlined"
              color="secondary"
              label="Emergency Contact Phone"
              onChange={(e) => setEmergencyContactPhone(e.target.value)}
              value={emergencyContactPhone}
              fullWidth
              required
            />
          </Stack>
          <Box>
            <FormControl>
              <FormLabel>Patient Daily Visiting Task</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="vitalSigns"
                      checked={tasks.includes('vitalSigns')}
                      onChange={handleDayChange}
                    />
                  }
                  label="Vital Signs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="medicationAdministration"
                      checked={tasks.includes('medicationAdministration')}
                      onChange={handleDayChange}
                    />
                  }
                  label="Medication Administration"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="injectionAdministration"
                      checked={tasks.includes('injectionAdministration')}
                      onChange={handleDayChange}
                    />
                  }
                  label="Injection Administration"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="assessment"
                      checked={tasks.includes('assessment')}
                      onChange={handleDayChange}
                    />
                  }
                  label="Assessment"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="additionalInstruction"
                      checked={tasks.includes('additionalInstruction')}
                      onChange={handleDayChange}
                    />
                  }
                  label="Additional Instruction"
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Button variant="outlined" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}
