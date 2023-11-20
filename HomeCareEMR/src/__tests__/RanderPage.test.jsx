/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import OrderPage from "../pages/OrderPage";
import PatientListPage from "../pages/PatientListPage";


test("Test OrderPage ", async () => {
  render(<OrderPage />);

  expect(true).toBeTruthy();
});

test("Test PatientList Page", async () => {
  render(<PatientListPage />);

  expect(true).toBeTruthy();
});

