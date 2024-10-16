import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Colors } from 'chart.js';

const DoughnutChart = ({ chartData }) => {
  // Define the gaugeChartText plugin
  const gaugeChartText = {
    id: 'gaugeChartText',
    afterDatasetDraw(chart) {
      const { ctx, chartArea: { bottom, left, top, right, width, height, center } } = chart;

      ctx.save();
      const xCoor = left + 98; // Adjust for left positioning
      const yCoor = bottom - 13; // Keep for bottom positioning
      // const score = data.datasets[0].data[0]

      ctx.fillStyle = '#666';
      ctx.font = '15px sans-serif';
      ctx.textBaseline = 'top'; // Set baseline for positioning
      ctx.textAlign = 'left'
      ctx.fillText('0', left, yCoor); // Draw text at specified coordinates
      ctx.textAlign = 'right'
      ctx.fillText('100', right, yCoor); // Draw text at specified coordinates
      ctx.restore(); // Restore the context after drawing
      
      ctx.font = '30px sans-serif';
      ctx.fillStyle = "lightgray"
      ctx.textAlign = "center";
      // ctx.textBaseline = 'bottom'; // Set baseline for positioning
      ctx.fillText('85', xCoor, yCoor); // Draw text at specified coordinates, this value will come from the database

    }
  };

  const options = {
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'left',
        display: false,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
        },
        tooltip: { enabled: false },
      },
    },
  };

  return (
    <Doughnut
      style={{ width: "200px", height: "200px" }}
      data={chartData}
      options={options}
      plugins={[gaugeChartText]} // Pass the plugin here
    />
  );
};

export default DoughnutChart;