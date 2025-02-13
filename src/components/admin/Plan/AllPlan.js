import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Get_All_Plans } from "../../CommonAPI/User";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./AllPlan.css";  // Import the external CSS file

const AdminServicesList = () => {
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response.Admin.filter(
          (plan) =>
            plan.PlanName !== "Three Days Live" &&
            plan.PlanName !== "Two Days Demo" &&
            plan.PlanName !== "One Week Demo"
        );
        const filterPlanCharting = response.Charting.filter(
          (plan) =>
            plan.PlanName !== "Three Days Live" &&
            plan.PlanName !== "Two Days Demo" &&
            plan.PlanName !== "One Week Demo"
        );
        setPlansData({
          loading: false,
          data: filterPlan,
          data1: filterPlanCharting,
        });
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlansData({ loading: false, data: [], data1: [] });
    }
  };


  return (
    <div className="allplan-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Admin All Plans</h4>
                </div>
                <Link to="/admin/addplan" className="btn btn-primary rounded">
                  Add Plan
                </Link>
              </div>

              <div className="iq-card-body">
                <div className="container mt-4">
                  <Tabs
                    defaultActiveKey="Scalping"
                    id="admin-plans-tabs"
                    className="mb-3 custom-tabs"
                    fill
                  >
                    <Tab eventKey="Scalping" title="Scalping">
                      {plansData.loading ? (
                        <p>Loading...</p>
                      ) : (
                        <div className="allplan-grid">
                          {plansData.data.map((plan, index) => (
                            <div key={index} className="allplan-card">
                              <div className="plan-data">
                                <div className="text-center">
                                  <h2 className="allplan-card-title">
                                    {plan.PlanName}
                                  </h2>
                                  <h4 className="allplan-card-subtitle">
                                    <FaRupeeSign className="m-1" />
                                    <strong>{plan.payment}</strong>
                                  </h4>
                                  <h4 className="allplan-card-subtitle">
                                    Duration: {plan["Plan Validity"]}
                                  </h4>
                                  <div className="plan-details">
                                    <p className="price-item">
                                      <strong>Scalping Strategy:</strong>{" "}
                                      {plan?.Scalping?.join(", ")}
                                    </p>
                                    <p className="price-item">
                                      <strong>Option Strategy:</strong>{" "}
                                      {plan?.["Option Strategy"]?.join(", ")}
                                    </p>
                                    <p className="price-item">
                                      <strong>Pattern Strategy:</strong>{" "}
                                      {plan?.Pattern?.join(", ")}
                                    </p>
                                  </div>
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </Tab>
                    <Tab eventKey="Charting" title="Charting">
                      {plansData.loading ? (
                        <p>Loading...</p>
                      ) : (
                        <div className="allplan-grid">
                          {plansData.data1.map((plan, index) => (
                            <div key={index} className="allplan-card">
                              <div className="plan-data">
                                <div className="text-center">
                                  <h2 className="allplan-card-title">
                                    {plan.PlanName}
                                  </h2>
                                  <h4 className="allplan-card-subtitle">
                                    <FaRupeeSign className="m-1" />
                                    <strong>{plan.payment}</strong>
                                  </h4>
                                  <h4 className="allplan-card-subtitle">
                                    Duration: {plan["Plan Validity"]}
                                  </h4>
                                  <div className="plan-details">
                                    <p className="price-item">
                                      <strong>Charting Signal:</strong>{" "}
                                      {plan?.ChartingSignal?.join(", ")}
                                    </p>
                                  </div>
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServicesList;
