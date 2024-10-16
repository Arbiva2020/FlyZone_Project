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
import { Colors, scales } from 'chart.js'

  ChartJS.register(
    Colors
    );


function BarChart ({chartData}) {

  const canvasBackgroundColor = {
   id: 'canvasBackgroundColor',
    beforeDraw(chart, args, pluginOptions) {
      console.log(chart)
      const {ctx, chartArea: {top, bottom, left, right, width}, scales: {x, y} } = chart;
      ctx.fillStyle = 'rgba(255, 26, 104, 0.3)';
      ctx.fillReact(left, 100, width, 25)
    }
  }


  const screenWidth = window.innerWidth
  const options = {
    scales: {
      y:{
        beginAtZero: true
      }
    },
    plugins: [canvasBackgroundColor], 
    // plugins: {
    //   canvasBackgroundColor,
    //   legend: {
    //     position: 'bottom',
    //     // rtl : true,
    //     labels: {
    //       usePointStyle: true,
    //       pointStyle: 'circle',
    //       padding: 10,
    //     }
    //   }
    // },
}
const optionsB = {
  plugins: [canvasBackgroundColor], 

  // plugins: {
  //   legend: {
  //     position: 'top',
  //     // rtl : true,
  //     labels: {
  //       usePointStyle: true,
  //       pointStyle: 'circle',
  //       padding: 20,
  //     }
  //   }
  // },
}
  return <Bar 
            className="barChart" 
            data={chartData} 
            options={options}
            // plugins={canvasBackgroundColor}
            >
          </Bar>;
}

export default BarChart