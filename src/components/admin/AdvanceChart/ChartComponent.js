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
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
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
        x: new Date(startTime.getTime() + i * 60000),
        y: Math.random() * 100,
      });
    }
    return dataPoints;
  };

  const labels = data.map((point) => point.x.toLocaleTimeString()); // Extract labels

  const chartData = {
    labels: labels, // Required for Bar chart
    datasets: [
      {
        label: "My Data",
        data: data.map((point) => point.y), // Extract only Y values
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "category", // Change from "time" to "category" for Bar chart
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
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

  return <Bar data={chartData} options={chartOptions} />;
};

export default ChartComponent;
