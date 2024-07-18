import React from 'react'
import {
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend
} from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { Colors } from 'chart.js'

ChartJS.register(
    Colors,  
    ArcElement, 
    Tooltip, 
    Legend
    ); 

function DoughnutChart ({chartData}) {
  const options = {
    plugins: {
      legend: {
        position: 'left',
        // rtl : true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
        }
      }
    },
}
  return <Doughnut
            style={{width:"200px", height:"200px"}} 
            data={chartData} 
            options={options}>
            
          </Doughnut>;
}

export default DoughnutChart