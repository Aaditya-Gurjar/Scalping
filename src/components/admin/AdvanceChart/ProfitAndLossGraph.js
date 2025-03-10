// import React, { useState, useEffect, useRef } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from "chart.js";
// import zoomPlugin from "chartjs-plugin-zoom";
// import "chartjs-adapter-date-fns";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale,
//   zoomPlugin
// );

// const ProfitAndLossGraph = ({ data }) => {

//   // console.log("dataaaa", data)
//   const [filteredData, setFilteredData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const chartRef = useRef(null); // Ref for chart instance

//   // useEffect(() => {
//   //   if (data && data.length > 0) {
//   //     // console.log("🔍 Full Data:", data);

//   //     const firstTime = data[0]?.ETime;
//   //     const currentDate = new Date();
//   //     const [firstHour, firstMinute] = firstTime.split(":").map(Number);
//   //     const firstTimestamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), firstHour, firstMinute).getTime();
//   //     const oneHourLater = firstTimestamp + 60 * 60 * 1000;

//   //     const initialFilteredData = data.filter((item) => {
//   //       const [hour, minute] = item.ETime.split(":").map(Number);
//   //       const itemTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, minute).getTime();
//   //       return itemTime >= firstTimestamp && itemTime <= oneHourLater;
//   //     });

//   //     setFilteredData(initialFilteredData.length > 0 ? initialFilteredData : data);
//   //     setOriginalData(data);
//   //   }
//   // }, [data]);

//   useEffect(() => {
//     if (data && data.length > 0) {

//       const firstTime = new Date(data[0].ETime); // Correctly parse full timestamp
//       const oneHourLater = new Date(firstTime.getTime() + 60 * 60 * 1000);

//       const initialFilteredData = data.filter((item) => {
//         const itemTime = new Date(item.ETime); // Ensure full timestamp is used
//         return itemTime >= firstTime && itemTime <= oneHourLater;
//       });

//       setFilteredData(initialFilteredData.length > 0 ? initialFilteredData : data);
//       setOriginalData(data);
//     }
//   }, [data]);


//   // const handleZoom = ({ chart }) => {
//   //   const { min, max } = chart.scales.x;
//   //   const newFilteredData = originalData.filter((item) => {
//   //     const [hour, minute] = item.ETime.split(":").map(Number);
//   //     const itemTime = new Date(new Date().setHours(hour, minute, 0, 0)).getTime();
//   //     return itemTime >= min && itemTime <= max;
//   //   });

//   //   console.log("🔄 Updated Filtered Data (After Zoom):", newFilteredData);

//   //   if (newFilteredData.length === 0) {
//   //     console.warn("⚠️ Zoomed too much! Resetting to last state.");
//   //     return;
//   //   }

//   //   setFilteredData(newFilteredData);
//   // };

//   const resetZoom = () => {
//     if (chartRef.current) {
//       chartRef.current.resetZoom();
//     }
//     setFilteredData(originalData);
//   };

//   const chartData = {
//     // labels: filteredData.map((item) => {
//     //   const [hour, minute] = item.ETime.split(":").map(Number);
//     //   return new Date(new Date().setHours(hour, minute, 0, 0));
//     // }),

//     labels: filteredData.map((item) => new Date(item.ETime)),

//     datasets: [
//       {
//         label: "Profit & Loss",
//         data: filteredData.map((item) => item?.PnL || 0),
//         backgroundColor: "#2196F4", // Bar color
//         borderColor: "#1E88E5", // Border color
//         borderWidth: 2,
//         barThickness: 18, // Set bar thickness
//         borderRadius: 0, // Sharp edges
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       zoom: {
//         pan: { enabled: true, mode: "xy", speed: 10 },
//         zoom: {
//           wheel: { enabled: true, speed: 0.05 }, // Smooth zoom on mouse wheel
//           pinch: { enabled: true }, // Zoom on pinch (mobile)
//           mode: "xy",
//           scaleMode: "xy",
//           // onZoom: handleZoom,
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           unit: "minute",
//           tooltipFormat: "yyyy-MM-dd hh:mm a",
//           displayFormats: { minute: "hh:mm a", hour: "MMM D, hh:mm a", day: "MMM D" },
//         },
//         ticks: { autoSkip: true, maxTicksLimit: 10, font: { size: 12 } },
//       },
//       y: {
//         beginAtZero: true, // Ensure the y-axis starts from 0
//         ticks: { autoSkip: true, font: { size: 12 } },
//       },
//     },
//   };

//   return (
//     <div style={{ position: "relative", height: "500px", width: "100%" }}>
//       <button
//         onClick={resetZoom}
//         style={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           padding: "5px 10px",
//           background: "blue",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//           zIndex: 999,
//         }}
//       >
//         Reset Zoom
//       </button>

//       {filteredData.length > 0 ? (
//         <Bar ref={chartRef} data={chartData} options={chartOptions} />
//       ) : (
//         <p style={{ textAlign: "center", color: "red", fontSize: "16px" }}>
//           No data available to display
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProfitAndLossGraph;


import React, { useState, useEffect, useRef, useMemo } from "react";
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

const ProfitAndLossGraph = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const chartRef = useRef(null);

  // Filter data: only show the first hour based on ETime
  useEffect(() => {
    if (data && data.length > 0) {
      const firstTime = new Date(data[0].ETime);
      const oneHourLater = new Date(firstTime.getTime() + 60 * 60 * 1000);
      const initialFilteredData = data.filter((item) => {
        const itemTime = new Date(item.ETime);
        return itemTime >= firstTime && itemTime <= oneHourLater;
      });
      setFilteredData(initialFilteredData.length > 0 ? initialFilteredData : data);
      setOriginalData(data);
    }
  }, [data]);

  // Reset zoom and revert to original data
  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
    setFilteredData(originalData);
  };

  // Define a preset palette of vibrant colors
  const palette = [
    "#66BB6A", // Green
    "#FFA726", // Orange
    "#42A5F5", // Blue
    "#AB47BC", // Purple
    "#EF5350", // Red
    "#29B6F6", // Light Blue
    "#FFCA28", // Amber
  ];

  // Compute colors for each bar using the palette cyclically
  const presetColors = useMemo(() => {
    return filteredData.map((_, i) => palette[i % palette.length]);
  }, [filteredData]);

  const chartData = {
    labels: filteredData.map((item) => new Date(item.ETime)),
    datasets: [
      {
        label: "Profit & Loss",
        data: filteredData.map((item) => item?.PnL || 0),
        backgroundColor: presetColors,
        borderColor: "#ffffff", // White border for a modern look
        borderWidth: 2,
        barThickness: 18,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: { enabled: true, mode: "xy", speed: 10 },
        zoom: {
          wheel: { enabled: true, speed: 0.05 },
          pinch: { enabled: true },
          mode: "xy",
          scaleMode: "xy",
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#555",
        borderWidth: 1,
      },
      legend: {
        labels: {
          font: { family: "Roboto, sans-serif", size: 14 },
          color: "#555",
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
            hour: "MMM d, hh:mm a",
            day: "MMM d",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          font: { size: 12, family: "Roboto, sans-serif" },
          color: "#555",
        },
        grid: {
          color: "#ccc", // Gray grid lines for minimalism
          borderColor: "#ccc",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          font: { size: 12, family: "Roboto, sans-serif" },
          color: "#555",
        },
        grid: {
          color: "#ccc", // Gray grid lines for minimalism
          borderColor: "#ccc",
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      <button
        onClick={resetZoom}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "5px 10px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        Reset Zoom
      </button>

      {filteredData.length > 0 ? (
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      ) : (
        <p style={{ textAlign: "center", color: "red", fontSize: "16px" }}>
          No data available to display
        </p>
      )}
    </div>
  );
};

export default ProfitAndLossGraph;
