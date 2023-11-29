import { useEffect, useState } from "react";
import { getAllDailyTasks } from "../API/patients"
import '../CSS/PatientTableComponent.css';
import '../CSS/CreatePatient.css';
import {useParams} from "react-router-dom";
import { Typography, Container, Tab, Box} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import VitalSign from "../components/VitalSign";
import Medication from "../components/Medication";

export default function HistoryOfVisiting() {
    const {id} = useParams();
    const [dailyTasks, setDailyTasks] = useState([]);
    const [value, setValue] = useState('1');
    console.log(dailyTasks);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const getAllHistoryOfVisiting = async () => {
        const response = await getAllDailyTasks();
        setDailyTasks(response);
    };

    useEffect(() => {
        getAllHistoryOfVisiting();
    }, []);

  return (
    
    <Container className="flex justify-center items-center form-container" sx={{ width: '100%' }}>
                <h1 className="h5">
                    History of Visiting
                </h1>
                <br></br>
        <div className="form-wrapper">
            <div className="form-column">
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Vital Sign" value="1" />
                    <Tab label="Medication" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1"><VitalSign data={dailyTasks} id={id}/></TabPanel>
                <TabPanel value="2"><Medication data={dailyTasks} id={id}/></TabPanel>
            </TabContext>
            </Box>
        </div>
    </Container>
  )
}
