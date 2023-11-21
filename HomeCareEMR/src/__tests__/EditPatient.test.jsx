import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import CreatePatient from './CreatePatient';
import { updatePatient } from '../API/patients';

jest.mock('../API/patients', () => ({
  updatePatient: jest.fn(),
}));

describe('CreatePatient Integration Test', () => {
  it('updates patient information', async () => {
    const patientId = '123';
    const patientMock = {
      id: patientId,
      firstName: 'John',
      lastName: 'Doe',
      // ... other mock data
    };

    // Mock the context value to provide patient data
    const patientsMock = [
      // ... other patients
      patientMock,
    ];

    render(
      <MemoryRouter initialEntries={[`/edit/${patientId}`]}>
        <Route path="/edit/:id">
          <CreatePatient />
        </Route>
      </MemoryRouter>
    );

    // Ensure the form fields are pre-populated with patient data
    await waitFor(() => {
      expect(screen.getByLabelText(/First Name/i)).toHaveValue(patientMock.firstName);
      expect(screen.getByLabelText(/Last Name/i)).toHaveValue(patientMock.lastName);
      // ... other assertions for pre-populated fields
    });

    // Mock the updatePatient function to resolve successfully
    updatePatient.mockResolvedValueOnce();

    // Trigger the form submission
    userEvent.click(screen.getByText(/Update/i));

    // Wait for the updatePatient function to be called
    await waitFor(() => {
      expect(updatePatient).toHaveBeenCalledWith(patientMock);
    });

    // Assert that the success alert is shown (you may need to adjust this based on your actual implementation)
    await waitFor(() => {
      expect(screen.getByText(/Patient information update successfully/i)).toBeInTheDocument();
    });

    // Assert that the user is redirected back to the patient list (you may need to adjust this based on your actual implementation)
    expect(screen.getByText(/Back To List/i)).toHaveAttribute('href', '/patients');
  });
});
