import React, { useEffect } from 'react';
import { addNurse, deleteNurse, getAllNurses, getLPNNurses, getRNNurses } from '../API/users';

export default function TestAPIFunctionJericho() {
  const testCreation = async () => {
    const nurseload = {
      address: "test",
      firstName: "test",
      gender: "admin",
      lastName: "test",
      phone: "test",
      position: "test",
      userId: "test"
    };

    try {
      const response = await addNurse(nurseload);
      console.log(response);
      alert("Nurse creation succeeded!");
    } catch (error) {
      console.error("Error creating nurse:", error);
      alert("Nurse creation failed!");
    }
  };

  const testDeletion = async (userId) => {
    try {
      await deleteNurse(userId);
      console.log(`Nurse with userId ${userId} deleted successfully`);
      alert("Nurse deletion succeeded!");
    } catch (error) {
      console.error("Error deleting nurse:", error);
      alert("Nurse deletion failed!");
    }
  };

  // Call the getAllNurses function wherever you need it
  const displayAllNurses = async () => {
    try {
      await getAllNurses();
      alert("Displaying all nurses succeeded!");
    } catch (error) {
      console.error("Error displaying all nurses:", error);
      alert("Displaying all nurses failed!");
    }
  };

  const displayLPNNurses = async () => {
    try {
      await getLPNNurses();
      alert("Displaying LPN nurses succeeded!");
    } catch (error) {
      console.error("Error displaying LPN nurses:", error);
      alert("Displaying LPN nurses failed!");
    }
  };

  const displayRNNurses = async () => {
    try {
      await getRNNurses();
      alert("Displaying RN nurses succeeded!");
    } catch (error) {
      console.error("Error displaying RN nurses:", error);
      alert("Displaying RN nurses failed!");
    }
  };

  useEffect(() => {
    testCreation();
    // Assuming you want to delete the nurse after a delay (for testing purposes)
    const deleteTimeout = setTimeout(() => {
      testDeletion("test"); // Pass the actual userId you want to delete
    }, 5000); // 5 seconds delay

    return () => clearTimeout(deleteTimeout); // Cleanup timeout on component unmount
  }, []);

  useEffect(() => {
    displayAllNurses();
  }, []);

  useEffect(() => {
    displayLPNNurses();
  }, []);

  useEffect(() => {
    displayRNNurses();
  }, []);

  return <div>TestAPIFunctionJericho</div>;
}
