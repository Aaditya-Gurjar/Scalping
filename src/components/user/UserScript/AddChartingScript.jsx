import React, { useState, useEffect } from "react";
import {
  addChartingScript,
  getChargingPlatformDataApi,
  getStrategyTagApi,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import ChartingCard from "./ChartingCard";

const AddChartingScript = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("name");
  const [strategTag, setStrategTag] = useState([])

  const allowedSegments = location?.state?.data?.scriptType?.data[location?.state?.data?.scriptType?.data.length - 1]?.CombineChartingSignal

  const defaultChartingData = (userName) =>
    allowedSegments.map((segment) => ({
      Username: userName,
      Status: "Off",
      Fund: 0,
      Quantity: 0,
      Segment: segment,
      TradeCount: 0,
      MaxProfit: 0,
      MaxLoss: 0,
      AdminStatus: "Off",
      ExitDay: "Intraday",
      RunningTrade: 0,
      TradeStatus: "Off",
      TradePerDay: 0,
    }));

    const [chartingData, setChartingData] = useState(
      defaultChartingData(userName)
    );

  const getChartingData = async () => {
    try {
      const res = await getChargingPlatformDataApi(userName);
      if (res.Status) {
        const apiData = res.Client || [];

        const mergedData = defaultChartingData(userName).map((defaultItem) => {
          const apiItem = apiData.find(
            (item) => item.Segment === defaultItem.Segment
          );
          if (apiItem) {
            return {
              ...defaultItem,
              ...apiItem,
              TradeStatus: apiItem.Status || "Off",
              AdminSignal: apiItem.AdminStatus || "Off",
              TradePerDay:
                apiItem.TradeCount !== undefined
                  ? apiItem.TradeCount
                  : defaultItem.TradeCount,
              RunningTrade:
                apiItem.RunningTrade !== undefined
                  ? apiItem.RunningTrade
                  : defaultItem.RunningTrade,
              MaxProfit:
                apiItem.MaxProfit !== undefined
                  ? apiItem.MaxProfit
                  : defaultItem.MaxProfit,
              MaxLoss:
                apiItem.MaxLoss !== undefined
                  ? apiItem.MaxLoss
                  : defaultItem.MaxLoss,
              ExitDay: apiItem.ExitDay || defaultItem.ExitDay,
              Fund:
                apiItem.Fund !== undefined ? apiItem.Fund : defaultItem.Fund,
              Quantity:
                apiItem.Quantity !== undefined
                  ? apiItem.Quantity
                  : defaultItem.Quantity,
            };
          }
          return defaultItem;
        });

        setChartingData(mergedData);
      } else {
      }
    } catch (err) {
      console.error("Error in getting the charting data", err);
    }
  };

  const getStrategyTag = async () => {
    try {
      const res = await getStrategyTagApi(userName);
      console.log("res", res);
      if (res.Status) {
        const strategTag = res.StrategyTag || [];
        setStrategTag(strategTag);
      } else {
      }
    } catch (err) {
      console.error("Error in getting the strategy tag", err);
    }
  }

  console.log("getChartingData", chartingData);

  useEffect(() => {
    getChartingData();
    getStrategyTag()
  }, []);

  const handleAddCharting = async (index) => {
    const data = chartingData[index];
    const req = {
      Username: userName,
      Status: data.TradeStatus,
      Fund: data.Segment === "Cash" ? Number(data.Fund) : 0,
      Lot: data.Segment === "Cash" ? 0 : Number(data.Quantity),
      Segment: data.Segment,
      TradeCount: Number(data.TradePerDay) || 0,
      RunningTrade: Number(data.RunningTrade) || 0,
      MaxProfit: Number(data.MaxProfit) || 0,
      MaxLoss: Number(data.MaxLoss) || 0,
      ExitDay: data.ExitDay,
      ASStatus: data.AdminStatus,
      Strategytag : data.StrategyTag
    };

    try {
      const response = await addChartingScript(req);
      if (response.Status) {
        Swal.fire({
          background: "#1a1e23",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          icon: "success",
          title: "Success",
          text: response.message,
          timer: 1500,
          timerProgressBar: true,
        });
        getChartingData();
      } else {
        Swal.fire({
          background: "#1a1e23",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          icon: "error",
          title: "Error",
          text: response.message,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Error in adding the charting data", err);
    }
  };

  return (
    <div className="iq-card">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary m-3"
          onClick={() => navigate("/user/dashboard")}>
          Back
        </button>
      </div>
      <div className="row">
        {chartingData.map((item, index) => (
          <ChartingCard
            key={index}
            item={item}
            index={index}
            strategTag={strategTag}
            chartingData={chartingData}
            setChartingData={setChartingData}
            handleAddCharting={handleAddCharting}
          />
        ))}
      </div>
    </div>
  );
};

export default AddChartingScript;
