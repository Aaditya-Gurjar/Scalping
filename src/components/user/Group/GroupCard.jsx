import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal
import "./GroupStyles.css";
import Viewcard from "./ViewGroup";
import { ClientGroupAllot } from "../../CommonAPI/User";
import Swal from "sweetalert2";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GroupCard = ({ strategy }) => {
  console.log("strategy", strategy);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = localStorage.getItem("name");

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
    // setIsModalOpen(true);
    navigate("/user/viewgroup", { state: strategy });
  };

  const handleSubscribe = async () => {
    try {
      const reqData = {
        User: username,
        GroupName: [strategy.name],
        SubAdmin: "",
      };
      const res = await ClientGroupAllot(reqData);
      console.log("respnse is ", res);
      if (res.Status) {
        Swal.fire({
          title: "Subscribed Successfully!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error !",
        icon: "false",
        draggable: true,
      });
      console.log("error in subscribe", error);
    }
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
        <button className="group-btn-deploy" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>

      {strategy.premium && <span className="group-premium">Premium</span>}

      {/* Bootstrap Modal */}
    </div>
  );
};

export default GroupCard;
