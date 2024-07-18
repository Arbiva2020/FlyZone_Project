import React from 'react'
import {
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend
} from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { Colors } from 'chart.js'
import './PieChart.css'

ChartJS.register(
    Colors,  
    ArcElement, 
    Tooltip, 
    Legend
    ); 

function PieChart ({chartData}) {
  const options = {
    plugins: {
      legend: {
        position: 'left',
        // rtl : true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        }
      }
    },
}
  return <Pie className="piePie" data={chartData} options={options}></Pie>;
}

export default PieChart