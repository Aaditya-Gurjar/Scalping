import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import {
  Get_All_Plans,
  Get_All_Buyed_Plans,
  BuyPlan,
  AddBalance,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NewsTicker from "./Expair";
import "./AllPlan.css";
import Content from "../../../ExtraComponent/Content";

const ServicesList = () => {
  const username = localStorage.getItem("name");
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const expire = localStorage.getItem("expire");
  useEffect(() => {
    fetchPlans();
    fetchPurchasedPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response?.Admin?.filter(
          (plan) =>
            !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
              plan.PlanName
            )
        );
        const filterPlanCharting = response?.Charting?.filter(
          (plan) =>
            !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
              plan.PlanName
            )
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

  const fetchPurchasedPlans = async () => {
    try {
      const response = await Get_All_Buyed_Plans({ userName: username });
      if (response.Status) {
        setPurchasedPlans(response.Allotplan || []);
      }
    } catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  };

  const isPlanPurchased = (planName) => {
    return purchasedPlans.some((plan) => plan.Planname === planName);
  };

  const HandleBuyPlan = async (index, type, isCharting) => {
    try {
      const planDetails = isCharting
        ? plansData?.data1[index]
        : plansData?.data[index];

      console.log("planDetails", planDetails);
      const req1 = {
        Username: username,
        transactiontype: "Purchase",
        money: planDetails.payment,
      };
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to buy the plan: ${planDetails.PlanName} for ₹${planDetails.payment}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Buy it!",
        cancelButtonText: "No, Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const CheckBalanceResponse = await AddBalance(req1);
        if (CheckBalanceResponse.Status && type == 0) {
          const result = await Swal.fire({
            title: "What do you want to do?",
            text: `This is your Scubscribed Script so what do you do Extend the EndDate or Extend the Number of Scripts`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Extend End Date",
            cancelButtonText: "Extend Number of Scripts",
            reverseButtons: true,
          });
          if (result.isConfirmed) {
            const req = {
              Username: username,
              Scalping: planDetails.Scalping,
              Option: planDetails["Option Strategy"],
              PatternS: planDetails.Pattern,
              NumberofScript: planDetails.NumberofScript,
              Duration: planDetails["Plan Validity"],
              Planname: planDetails.PlanName,
              payment: planDetails.payment,
              Extendtype: "ExtendServiceEndDate",
              Charting: planDetails.ChartingSignal,
            };
            const buyPlanResponse = await BuyPlan(req);
            if (buyPlanResponse.Status) {
              fetchPurchasedPlans();
              Swal.fire({
                title: "Success!",
                text: buyPlanResponse.message,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: buyPlanResponse.message,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              });
            }
          } else {
            const req = {
              Username: username,
              Scalping: planDetails.Scalping,
              Option: planDetails["Option Strategy"],
              PatternS: planDetails.Pattern,
              NumberofScript: planDetails.NumberofScript,
              Duration: planDetails["Plan Validity"],
              Planname: planDetails.PlanName,
              payment: planDetails.payment,
              Extendtype: "ExtendServiceCount",
              Charting: planDetails.ChartingSignal,
            };
            const buyPlanResponse = await BuyPlan(req);
            if (buyPlanResponse.Status) {
              fetchPurchasedPlans();
              Swal.fire({
                title: "Success!",
                text: buyPlanResponse.message,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: buyPlanResponse.message,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              });
            }
          }
        } else if (CheckBalanceResponse.Status && type == 1) {
          const req = {
            Username: username,
            Scalping: planDetails.Scalping,
            Option: planDetails["Option Strategy"],
            PatternS: planDetails.Pattern,
            NumberofScript: planDetails.NumberofScript,
            Duration: planDetails["Plan Validity"],
            Planname: planDetails.PlanName,
            payment: planDetails.payment,
            Extendtype: "",
            Charting: planDetails.ChartingSignal,
          };
          const buyPlanResponse = await BuyPlan(req);
          if (buyPlanResponse.Status) {
            fetchPurchasedPlans();
            Swal.fire({
              title: "Success!",
              text: buyPlanResponse.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            Swal.fire({
              title: "Error!",
              text: buyPlanResponse.message,
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: CheckBalanceResponse.message,
            icon: "worning",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your purchase has been cancelled.",
          icon: "info",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error in transaction:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const getUpdatedPlans = plansData.data?.filter(
    (plan) =>
      plan.PlanName !== "Three Days Live" &&
      plan.PlanName !== "Two Days Demo" &&
      plan.PlanName !== "One Week Demo"
  );
  const getUpdatedPlansCharting = plansData.data1?.filter(
    (plan) =>
      plan.PlanName !== "Three Days Live" &&
      plan.PlanName !== "Two Days Demo" &&
      plan.PlanName !== "One Week Demo"
  );

  return (
    <Content Page_title={"📌 All Plans"} button_status={false} backbutton_status={false}>
 
            <div className="">
              {expire?.includes(1) ? (
                <div className="col-lg-9">
                  <NewsTicker />
                </div>
              ) : (
                ""
              )}
            </div>

            <Tabs
              defaultActiveKey="Scalping"
              id="plans-tabs"
              className="mb-3 allplan-custom-tabs"
              fill
            >
              <Tab eventKey="Scalping" title="⚡ Scalping">
                <div className="allplan-grid">
                  {plansData.loading ? (
                    <p className="allplan-loading">Loading...</p>
                  ) : (
                    getUpdatedPlans?.map((plan, index) => (
                      <div key={index} className="allplan-card">
                        <div className="plan-header">
                          <h2 className="allplan-card-title">
                            {plan.PlanName}
                          </h2>
                          {isPlanPurchased(plan.PlanName) && (
                            <BadgeCheck className="purchased-badge" />
                          )}
                        </div>
                        <h4 className="allplan-card-subtitle">
                          <FaRupeeSign /> {plan.payment}
                        </h4>
                        <h4 className="allplan-card-subtitle">
                          Duration: {plan["Plan Validity"]}
                        </h4>
                        <h4 className="allplan-card-subtitle">
                          Scripts: {plan.NumberofScript}
                        </h4>
                        <div className="plan-details">
                          <p>
                            <strong>Scalping:</strong>{" "}
                            {plan.Scalping?.join(", ")}
                          </p>
                          <p>
                            <strong>Options:</strong>{" "}
                            {plan["Option Strategy"]?.join(", ")}
                          </p>
                          <p>
                            <strong>Patterns:</strong>{" "}
                            {plan.Pattern?.join(", ")}
                          </p>
                        </div>
                        {isPlanPurchased(plan.PlanName) ? (
                          <button
                            className="allplan-button buy-again"
                            onClick={() => HandleBuyPlan(index, 0, false)}
                          >
                            🔄 Buy Again
                          </button>
                        ) : (
                          <button
                            className="allplan-button"
                            onClick={() => HandleBuyPlan(index, 1, false)}
                          >
                            🛒 Buy Now
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Tab>

              <Tab eventKey="Charting" title=" 📊 Charting">
                <div className="allplan-grid">
                  {plansData.loading ? (
                    <p className="allplan-loading">Loading...</p>
                  ) : (
                    getUpdatedPlansCharting?.map((plan, index) => (
                      <div key={index} className="allplan-card">
                        <div className="plan-header">
                          <h2 className="allplan-card-title">
                            {plan.PlanName}
                          </h2>
                          {isPlanPurchased(plan.PlanName) && (
                            <BadgeCheck className="purchased-badge" />
                          )}
                        </div>
                        <h4 className="allplan-card-subtitle">
                          <FaRupeeSign /> {plan.payment}
                        </h4>
                        <h4 className="allplan-card-subtitle">
                          Duration: {plan["Plan Validity"]}
                        </h4>
                        <h4 className="allplan-card-subtitle">
                          Scripts: {plan.NumberofScript}
                        </h4>
                        <div className="plan-details">
                          <p>
                            <strong>Charting Signals:</strong>{" "}
                            {plan.ChartingSignal?.join(", ")}
                          </p>
                        </div>
                        {isPlanPurchased(plan.PlanName) ? (
                          <button
                            className="allplan-button buy-again"
                            onClick={() => HandleBuyPlan(index, 0, true)}
                          >
                            🔄 Buy Again
                          </button>
                        ) : (
                          <button
                            className="allplan-button"
                            onClick={() => HandleBuyPlan(index, 1, true)}
                          >
                            🛒 Buy Now
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Tab>
            </Tabs>
         


        
    </Content>
  );
};

export default ServicesList;
