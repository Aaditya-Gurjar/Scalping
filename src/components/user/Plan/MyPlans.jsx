import React, { useState, useEffect } from "react";
import { BadgeCheck } from "lucide-react";
import { Get_All_Buyed_Plans } from "../../CommonAPI/User";
import Swal from "sweetalert2";
import "./MyPlan.css"; // Import external CSS

const MyPurchasedPlans = () => {
  const username = localStorage.getItem("name");
  const [buyedPlans, setBuyedPlans] = useState({ loading: true, data: [] });


  useEffect(() => {
    const fetchBoughtPlans = async () => {
      try {
        const req = { userName: username };
        const response = await Get_All_Buyed_Plans(req);
        if (response.Status) {
          setBuyedPlans({
            loading: false,
            data: response.Allotplan,
          });
        } else {
          setBuyedPlans({
            loading: false,
            data: [],
          });
        }
      } catch (error) {
        console.error("Error fetching purchased plans:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch purchased plans.",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
        setBuyedPlans({
          loading: false,
          data: [],
        });
      }
    };
    fetchBoughtPlans();
  }, [username]);

  return (
    <div className="myplan-container card-bg-color">
      <h1 className="myplan-title">Already Purchased Plans</h1>
      {buyedPlans.loading ? (
        <p className="myplan-loading">Loading...</p>
      ) : buyedPlans.data.length > 0 ? (
        <div className="myplan-grid">
          {buyedPlans.data.map((plan, index) => {
            const hasChartingSignal = plan?.ChartingSignal?.length > 0;

            return (
              <div key={index} className="myplan-plancard card-bg-color">
                <h2 className="myplan-card-title">
                  {plan.Planname}
                  <BadgeCheck size={24} color="#4caf50" />
                </h2>
                <h4 className="myplan-card-subtitle">
                  No of Scripts: {plan?.NumberofScript}
                </h4>

                {hasChartingSignal ? (
                  <p className="myplan-card-detail">
                    <strong>Charting Signal:</strong>{" "}
                    {plan?.ChartingSignal?.join(", ")}
                  </p>
                ) : (
                  <>
                    <p className="myplan-card-detail">
                      <strong>Scalping Strategy:</strong>{" "}
                      {plan?.Scalping?.join(", ")}
                    </p>
                    <p className="myplan-card-detail">
                      <strong>Option Strategy:</strong>{" "}
                      {plan?.["Option Strategy"]?.join(", ")}
                    </p>
                    <p className="myplan-card-detail">
                      <strong>Pattern Strategy:</strong>{" "}
                      {plan?.Pattern?.join(", ")}
                    </p>
                  </>
                )}

                <button className="myplan-purchased-button" disabled>
                  PURCHASED <BadgeCheck size={24} color="#ffffff" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="myplan-loading">No Plans Purchased Yet</p>
      )}
    </div>
  );
};

export default MyPurchasedPlans;
