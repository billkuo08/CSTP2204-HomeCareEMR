import React, { useEffect } from 'react';
import { addNurse, deleteNurse, getAllNurses, getLPNNurses, getRNNurses } from '../API/users';

export default function TestAPIFunctionJericho() {
  const testCreation = async () => {
    try {
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
      return { success: true, message: "Nurse created successfully" };
    } catch (error) {
      console.error("Error creating nurse:", error);
      return { success: false, message: "Error creating nurse" };
    }
  };

  const testDeletion = async (userId) => {
    try {
      await deleteNurse(userId);
      console.log(`Nurse with userId ${userId} deleted successfully`);
      return { success: true, message: `Nurse with userId ${userId} deleted successfully` };
    } catch (error) {
      console.error("Error deleting nurse:", error);
      return { success: false, message: "Error deleting nurse" };
    }
  };

  const displayAllNurses = async () => {
    try {
      const nurses = await getAllNurses();
      console.log("All nurses:", nurses);
      return { success: true, message: "All nurses retrieved successfully" };
    } catch (error) {
      console.error("Error retrieving all nurses:", error);
      return { success: false, message: "Error retrieving all nurses" };
    }
  };

  const displayLPNNurses = async () => {
    try {
      const lpnNurses = await getLPNNurses();
      console.log("LPN nurses:", lpnNurses);
      return { success: true, message: "LPN nurses retrieved successfully" };
    } catch (error) {
      console.error("Error retrieving LPN nurses:", error);
      return { success: false, message: "Error retrieving LPN nurses" };
    }
  };

  // make sure to screw this one up to fail the test
  const displayRNNurses = async () => {
    try {
      const rnNurses = await getRNNurses();
      console.log("RN nurses:", rnNurses);
      return { success: true, message: "RN nurses retrieved successfully" };
    } catch (error) {
      console.error("Error retrieving RN nurses:", error);
      return { success: false, message: "Error retrieving RN nurses" };
    }
  };

  useEffect(() => {
    const runTests = async () => {
      const tests = [
        testCreation,
        () => testDeletion("test"), // Wrap deletion in a function to ensure it's a function call
        displayAllNurses,
        displayLPNNurses,
        displayRNNurses,
      ];

      for (const test of tests) {
        const result = await test();

        if (!result.success) {
          alert(`Test failed: ${result.message}`);
          return; // Stop further tests on the first failure
        }
      }

      alert("All tests succeeded!");
    };

    runTests();
  }, []);

  return <div>TestAPIFunctionJericho</div>;
}
