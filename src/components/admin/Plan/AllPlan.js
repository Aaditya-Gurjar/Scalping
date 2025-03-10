import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Get_All_Plans } from "../../CommonAPI/User";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./AllPlan.css"; // Import the external CSS file
import Content from "../../../ExtraComponent/Content";

const AdminServicesList = () => {
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  const [expandedOptions, setExpandedOptions] = useState([]);
  const [expandedPatternItems, setExpandedPatternItems] = useState([]);


  const toggleOptions = (index) => {
    setExpandedOptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleExpand = (index) => {
    setExpandedPatternItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };



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
    <Content
      Page_title={"📌 All Admin Plans"}
      button_status={true}
      backbutton_status={true}
      route={"/admin/addplan"}
      button_title={"Add Plan"}
    >


      <div className="iq-card-body">
        <div className="container mt-4">
          <Tabs
            defaultActiveKey="Scalping"
            id="admin-plans-tabs"
            className="mb-3 custom-tabs"
            fill
          >

            <Tab eventKey="Scalping" title="SOP" onClick={() => setActiveTab("Scalping")}>
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
                          <h4 className="allplan-card-subtitle">
                            Number of Script: {plan.NumberofScript}
                          </h4>
                          <div className="plan-details">
                            <p className="price-item">
                              <strong>Scalping Strategy:</strong>{" "}
                              {plan?.Scalping?.join(", ")}
                            </p>
                            <p className="price-item">
                              <strong>Options:</strong>{" "}
                              {plan["Option Strategy"]?.length > 1 ? (
                                <>
                                  {expandedOptions.includes(index) ? (
                                    <>
                                      {plan["Option Strategy"].join(", ")}
                                      <span
                                        className="show-more"
                                        onClick={() => toggleOptions(index)}
                                      >
                                        {" "}🔼
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {plan["Option Strategy"][0]}
                                      <span
                                        className="show-more"
                                        onClick={() => toggleOptions(index)}
                                      >
                                        {" "}🔽
                                      </span>
                                    </>
                                  )}
                                </>
                              ) : (
                                plan["Option Strategy"]?.join(", ")
                              )}
                            </p>
                            <p className="price-item">
                              <strong>Patterns:</strong>{" "}
                              {plan.Pattern?.length > 1 ? (
                                <>
                                  {expandedPatternItems.includes(index) ? (
                                    <>
                                      {plan.Pattern.join(", ")}
                                      <span
                                        className="show-more"
                                        onClick={() => toggleExpand(index)}
                                      >
                                        {" "}🔼
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {plan.Pattern[0]}
                                      <span
                                        className="show-more"
                                        onClick={() => toggleExpand(index)}
                                      >
                                        {" "}🔽
                                      </span>
                                    </>
                                  )}
                                </>
                              ) : (
                                plan.Pattern?.join(", ")
                              )}
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
                              <strong>Segment:</strong>{" "}
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
    </Content>
  );
};

export default AdminServicesList;
