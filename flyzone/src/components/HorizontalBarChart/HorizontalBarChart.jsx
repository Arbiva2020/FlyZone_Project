import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, 
  BarElement, 
  CategoryScale,
  LinearScale, 
  Tooltip, 
  Legend
} from 'chart.js/auto'
import { Colors } from 'chart.js'

  ChartJS.register(
    Colors
    );


function HorizontalBarChart ({chartData}) {
  const screenWidth = window.innerWidth
  // console.log(screenWidth)
  const options = {
    indexAxis: 'y',
    plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
}


const optionsB = {
  plugins: {
    legend: {
      position: 'top',
      // rtl : true,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
      }
    }
  },
}
  return <Bar data={chartData} options={options}></Bar>;
}

export default HorizontalBarChart