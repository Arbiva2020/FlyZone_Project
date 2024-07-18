import React from 'react'
import "../BarChart/BarChart.css"
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


function BarChart ({chartData}) {
  const screenWidth = window.innerWidth
  // console.log(screenWidth)
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        // rtl : true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
          
        }
      }
    },
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
  return <Bar className="barChart" data={chartData} options={options}></Bar>;
}

export default BarChart