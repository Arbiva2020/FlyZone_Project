import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Colors } from 'chart.js';

const GaugeChart = ({ chartData, gaugeScore, rating }) => {
  const canvasRef = useRef(null);

  const gaugeNeedle = {
    id: "gaugeNeedle", 
    afterDatasetDraw(chart, args, plugins){
        const {ctx, data} = chart;
        ctx.save();
        const needleValue = data.datasets[0].needleValue;
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius -6 ;
        const angle = Math.PI;

        const dataTotal = data.datasets[0].data.reduce((a, b) => a+b, 0);
        console.log(dataTotal)
        let circumference = ((chart.getDatasetMeta(0).data[0].circumference)/Math.PI/data.datasets[0].data[0]*needleValue)
        console.log(circumference)
        const needleValueAngle = circumference + 1.5;
        // console.log(chart.getDatasetMeta(0).data[0].circumference)

        ctx.translate(xCenter, yCenter);
        ctx.rotate(angle*needleValueAngle)
        //needle
        ctx.beginPath();
        ctx.strokeStyle = "rgba(184, 153, 187, 1)";
        ctx.fillStyle = "rgba(184, 153, 187, 0.5)";
        ctx.moveTo(0 - 5, 0);
        ctx.lineTo(0, -outerRadius);
        ctx.lineTo(0 + 5, 0);
        ctx.stroke();
        ctx.fill();

        ctx.globalCompositeOperation='destination-over';
        ctx.restore();

        //dot
        ctx.beginPath();
        // ctx.arc(x, y, radius, startangle, endEngle, false)
        ctx.arc(0, 0, 0, angle*0, angle*2, false);
        ctx.fill();
        ctx.restore();
    }
  }

  const gaugeChartText = {
    id: 'gaugeChartText',
    afterDatasetDraw(chart) {
      const { ctx, chartArea: { bottom, left, right } } = chart;

      // Create the gradient here
      const gradientSegment = ctx.createLinearGradient(0, 0, 600, 0);
      gradientSegment.addColorStop(0, "red");
      gradientSegment.addColorStop(0.2, "yellow");
      gradientSegment.addColorStop(1, "green");

      // Set the gradient as the background color for the dataset
      chart.data.datasets[0].backgroundColor = [gradientSegment, 'rgb(110, 148, 180, 0.8)'];
      
      ctx.save();
      const xCoor = left + 98; // Adjust for left positioning
      const yCoor = bottom - 13; // Keep for bottom positioning

      ctx.fillStyle = '#666';
      ctx.font = '15px sans-serif';
      ctx.textBaseline = 'top'; // Set baseline for positioning
      ctx.textAlign = 'left';
      ctx.fillText('0', left, yCoor); // Draw text at specified coordinates
      ctx.textAlign = 'right';
      ctx.fillText('100', right, yCoor); // Draw text at specified coordinates
      ctx.restore(); // Restore the context after drawing
      
      ctx.font = '30px sans-serif';
      ctx.fillStyle = "lightgray";
      ctx.textAlign = "center";
      ctx.fillText(gaugeScore, xCoor, yCoor); // Draw text at specified coordinates

      ctx.font = '15px sans-serif';
      ctx.textBaseline = 'bottom'; // Set baseline for positioning
      ctx.textAlign = 'center';
      ctx.fillText(rating, left + 100, yCoor - 35); // Draw text at specified coordinates
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
      ref={canvasRef} 
      style={{ width: "200px", height: "200px" }}
      data={chartData}
      options={options}
      plugins={[gaugeNeedle,gaugeChartText]} 
    />
  );
};

export default GaugeChart;