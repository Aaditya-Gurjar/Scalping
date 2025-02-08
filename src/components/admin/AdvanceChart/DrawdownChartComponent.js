import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns"; // Ensure date-fns is imported for time scale

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

const DrawdownChartComponent = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const firstTimestamp = new Date(data[0]?.ETime || data[0]?.ExitTime).getTime();
      const oneHourLater = firstTimestamp + 60 * 60 * 1000; // +1 hour in milliseconds

      const initialFilteredData = data.filter(
        (item) => new Date(item.ETime || item.ExitTime).getTime() <= oneHourLater
      );

      setFilteredData(initialFilteredData);
    }
  }, [data]);

  const chartData = {
    labels: filteredData.map((item) => new Date(item?.ETime || item?.ExitTime || Date.now())),
    datasets: [
      {
        label: "Drawdown",
        data: filteredData.map((item) => item?.Drawdown || 0),
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x", // Allow panning in x-axis only
          speed: 10,
        },
        zoom: {
          wheel: { enabled: true, speed: 0.05 }, // Smooth zoom on mouse wheel
          pinch: { enabled: true }, // Zoom on pinch (mobile)
          mode: "xy", // Zoom only in x direction
          scaleMode: "xy", // Prevent y-axis zooming
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "yyyy-MM-dd hh:mm a",
          displayFormats: {
            minute: "hh:mm a",
            hour: "MMM D, hh:mm a",
            day: "MMM D",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          font: { size: 12 },
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default DrawdownChartComponent;
