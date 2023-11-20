import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreatePatient from './CreatePatient'; // Update the path based on your file structure

describe('CreatePatient Integration Tests', () => {
  test('Submitting the form with valid data', async () => {
    // Mock the addPatient function from the API
    jest.mock('../API/patients', () => ({
      addPatient: jest.fn().mockResolvedValue({}),
    }));

    render(<CreatePatient />);

    // Fill in the form fields with valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    // ... fill in other form fields

    // Submit the form
    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the form submission to be processed (useful for async operations)
    await waitFor(() => {
      // Assert that the addPatient function was called
      expect(addPatient).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        // ... other data
      });

      // Assert that the form fields are cleared after submission
      expect(screen.getByLabelText(/First Name/i).value).toBe('');
      expect(screen.getByLabelText(/Last Name/i).value).toBe('');
      // ... assert other fields are cleared

      // Assert that a success message is displayed (adjust based on your UI)
      expect(screen.getByText(/Doctor information submitted successfully/i)).toBeInTheDocument();
    });
  });

  // Add more test cases for different scenarios, like invalid data, error handling, etc.
});
