// import React, { useState, useEffect } from "react";
// import {
//   addChartingScript,
//   getChargingPlatformDataApi,
// } from "../../CommonAPI/User";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import ChartingCard from "./ChartingCard"; // Adjust the import path as necessary

// const AddChartingScript = () => {
//   const navigate = useNavigate();
//   const userName = localStorage.getItem("name");
//   const [chartingData, setChartingData] = useState([]);

//   const getChartingData = async () => {
//     const res = await getChargingPlatformDataApi(userName);
//     setChartingData(res.Client);
//   };

//   useEffect(() => {
//     getChartingData();
//   }, []);

//   const handleAddCharting = async (index) => {

//     console.log("chartingdartac",chartingData)
//     const data = chartingData[index];

//     const req = {
//       Username: userName,
//       Status: data.Status,
//       Fund: data.Segment === "Cash" ? Number(data.Fund) : 0,
//       Lot: data.Segment === "Cash" ? 0 : Number(data.Quantity),
//       Segment: data.Segment,
//       TradeCount: Number(data.TradeCount),
//       MaxProfit: Number(data.MaxProfit),
//       MaxLoss: Number(data.MaxLoss),
//     };
//     await addChartingScript(req)
//       .then((response) => {
//         if (response.Status) {
//           Swal.fire({
//             background: "#1a1e23",
//             backdrop: "#121010ba",
//             confirmButtonColor: "#1ccc8a",
//             icon: "success",
//             title: "Success",
//             text: response.message,
//             timer: 1500,
//             timerProgressBar: true,
//           });
//           getChartingData();
//         } else {
//           Swal.fire({
//             background: "#1a1e23",
//             backdrop: "#121010ba",
//             confirmButtonColor: "#1ccc8a",
//             icon: "error",
//             title: "Error",
//             text: response.message,
//             timer: 1500,
//             timerProgressBar: true,
//           });
//         }
//       })
//       .catch((err) => {
//         console.error("Error in adding the charting data", err);
//       });
//   };

//   return (
//     <div className="iq-card">
//       <div className="d-flex justify-content-end">
//         <button
//           className="btn btn-primary m-3"
//           onClick={() => navigate("/user/dashboard")}>
//           Back
//         </button>
//       </div>
//       <div className="row">
//         {chartingData?.map((item, index) => (
//           <ChartingCard
//             key={index}
//             item={item}
//             index={index}
//             chartingData={chartingData}
//             setChartingData={setChartingData}
//             handleAddCharting={handleAddCharting}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddChartingScript;




import React, { useState, useEffect } from "react";
import {
  addChartingScript,
  getChargingPlatformDataApi,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
import { useNavigate , useLocation } from "react-router-dom";
import ChartingCard from "./ChartingCard";

const AddChartingScript = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("name");
  const [chartingData, setChartingData] = useState([
    {
      Username: userName,
      Status: "Off",
      Fund: 0,
      Quantity: 0,
      Segment: "Cash",
      TradeCount: 0,
      MaxProfit: 0,
      MaxLoss: 0,
      AdminStatus: "Off",
      ExitDay: "Delivery",
      RunningTrade: 0,
      TradeStatus: "Off",
      AdminSignal: "Off",
      TradePerDay: 0
    },
    {
      Username: userName,
      Status: "Off",
      Fund: 0,
      Quantity: 0,
      Segment: "Future",
      TradeCount: 0,
      MaxProfit: 0,
      MaxLoss: 0,
      AdminStatus: "Off",
      ExitDay: "Delivery",
      RunningTrade: 0,
      TradeStatus: "Off",
      AdminSignal: "Off",
      TradePerDay: 0
    },
    {
      Username: userName,
      Status: "Off",
      Fund: 0,
      Quantity: 0,
      Segment: "Option",
      TradeCount: 0,
      MaxProfit: 0,
      MaxLoss: 0,
      AdminStatus: "Off",
      ExitDay: "Delivery",
      RunningTrade: 0,
      TradeStatus: "Off",
      AdminSignal: "Off",
      TradePerDay: 0
    },
    
  ]);


  console.log("loe",location?.state?.data?.scriptType?.data[location?.state?.data?.scriptType?.data.length-1]?.CombineChartingSignal)

  const getChartingData = async () => {
    await getChargingPlatformDataApi(userName)
    .then((res) => {
      if(res.Status){
         const updatedData = res.Client?.map((item) => ({
           ...item,
           TradeStatus: item.Status || "Off",
           AdminSignal: item.AdminStatus || "Off",
           TradePerDay: item.TradeCount !== undefined ? item.TradeCount : "",
           RunningTrade: item.RunningTrade !== undefined ? item.RunningTrade : "",
           MaxProfit: item.MaxProfit !== undefined ? item.MaxProfit : "",
           MaxLoss: item.MaxLoss !== undefined ? item.MaxLoss : "",
           ExitDay: item.ExitDay || "Intraday",
           Fund: item.Fund !== undefined ? item.Fund : "",
           Quantity: item.Quantity !== undefined ? item.Quantity : "",
         }));
         setChartingData(updatedData);

      }else{

      }
    }).catch((err) => {
      console.error("Error in getting the charting data", err);
    });

   
  

  };

  useEffect(() => {
    getChartingData();
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
    };

    console.log("request", req);

    await addChartingScript(req)
      .then((response) => {
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
      })
      .catch((err) => {
        console.error("Error in adding the charting data", err);
      });
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
        {chartingData?.map((item, index) => (
          <ChartingCard
            key={index}
            item={item}
            index={index}
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
