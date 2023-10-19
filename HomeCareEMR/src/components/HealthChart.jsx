import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Blood Pressure',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [120, 122, 118, 124, 126, 120],
    },
    {
      label: 'Heart Rate',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      data: [70, 72, 68, 75, 78, 72],
    },
  ],
};

class HealthChart extends Component {
  render() {
    return (
      <div>
        <h2>Health Charts</h2>
        <div className="chart">
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default HealthChart;