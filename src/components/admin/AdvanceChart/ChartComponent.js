import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"; // Import zoom plugin
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter for Chart.js

// Registering necessary components, including zoomPlugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Change from LineElement to BarElement
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin // Register the zoom plugin
);

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchedData = generateData();
    setData(fetchedData);
  }, []);

  const generateData = () => {
    let dataPoints = [];
    let startTime = new Date();
    for (let i = 0; i < 50; i++) {
      dataPoints.push({
        x: new Date(startTime.getTime() + i * 60000), // 1 minute gap
        y: Math.random() * 100,
      });
    }
    return dataPoints;
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time", // Time scale on the x-axis
        time: {
          unit: "minute",
          tooltipFormat: "PP HH:mm", // Corrected format
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10, // To avoid overcrowding of labels
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };

  const chartData = {
    datasets: [
      {
        label: "My Data",
        data: data,
        borderColor: "rgba(75, 192, 192, 1)", // Solid border color for clarity
        backgroundColor: "rgba(75, 192, 192, 0.7)", // Reduced transparency
        fill: true, // Fill the bars
        barThickness: 10, // Set the thickness of bars for better clarity
        borderWidth: 1, // Border width to make bars stand out
      },
    ],
  };

  return <Bar data={chartData} options={chartOptions} />; // Use Bar chart here
};

export default ChartComponent;
