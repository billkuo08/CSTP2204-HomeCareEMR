// TestAPIFunctionJericho.js

import React, { useEffect } from 'react';
import { addNurse, deleteNurse, getAllNurses } from '../API/users';

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
    const response = await addNurse(nurseload);
    console.log(response);
  };

  const testDeletion = async (userId) => {
    try {
      await deleteNurse(userId);
      console.log(`Nurse with userId ${userId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting nurse:", error);
    }
  };

// Call the getAllNurses function wherever you need it
const displayAllNurses = async () => {
  await getAllNurses();
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

  return <div>TestAPIFunctionJericho</div>;
}
