import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./GroupStyles.css";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GroupCard = ({ strategy }) => {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Performance",
        data: strategy.data,
        borderColor: "#33cc66",
        backgroundColor: "rgba(51, 204, 102, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const handleViewClick = () => {
    navigate("/user/ViewGroup");  
  };

  return (
    <div className="group-card">
      <div className="group-header">
        <h3 className="group-title">{strategy.name}</h3>
        <span
          className={`group-badge ${
            strategy.type === "My Strategy" ? "group-my-strategy" : ""
          }`}>
          {strategy.type}
        </span>
        <p className="group-date">Created {strategy.created}</p>
      </div>

      <div className="group-category">
        {strategy.category.map((cat, index) => (
          <span key={index} className="group-category-item">
            {cat}
          </span>
        ))}
      </div>

      {/* Chart Section */}
      <div className="group-chart">
        {strategy.backtestAvailable ? (
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        ) : (
          <p className="group-no-data">Backtest data not available</p>
        )}
      </div>

      <div className="group-buttons">
        <button className="group-btn-backtest" onClick={handleViewClick}>
          View
        </button>
        <button className="group-btn-deploy">Subscribe</button>
      </div>

      {strategy.premium && <span className="group-premium">Premium</span>}
    </div>
  );
};

export default GroupCard;
