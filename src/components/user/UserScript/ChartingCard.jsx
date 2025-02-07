// import React from "react";

// const ChartingCard = ({
//   item,
//   index,
//   chartingData,
//   setChartingData,
//   handleAddCharting,
// }) => {
//   // Update Trade Status toggle
//   const handleTradeStatusChange = (e) => {
//     const updatedData = [...chartingData];
//     updatedData[index].TradeStatus = e.target.checked ? "On" : "Off";
//     setChartingData(updatedData);
//   };

//   // Update Admin Signal toggle
//   const handleAdminSignalChange = (e) => {
//     const updatedData = [...chartingData];
//     updatedData[index].AdminSignal = e.target.checked ? "On" : "Off";
//     setChartingData(updatedData);
//   };

//   // Update Fund or Lot value
//   const handleFundOrLotChange = (e) => {
//     const updatedData = [...chartingData];
//     if (item.Segment === "Cash") {
//       updatedData[index] = { ...updatedData[index], Fund: e.target.value };
//     } else {
//       updatedData[index] = { ...updatedData[index], Quantity: e.target.value };
//     }
//     setChartingData(updatedData);
//   };

//   // Update Trade Per Day value (replacing Trade Count)
//   const handleTradePerDayChange = (e) => {
//     const updatedData = [...chartingData];
//     updatedData[index] = { ...updatedData[index], TradePerDay: e.target.value };
//     setChartingData(updatedData);
//   };

//   // Update Running Trade value
//   const handleRunningTradeChange = (e) => {
//     const updatedData = [...chartingData];
//     updatedData[index] = {
//       ...updatedData[index],
//       RunningTrade: e.target.value,
//     };
//     setChartingData(updatedData);
//   };

//   // Update Max Profit value
//   const handleMaxProfitChange = (e) => {
//     const updatedData = [...chartingData];
//     updatedData[index] = { ...updatedData[index], MaxProfit: e.target.value };
//     setChartingData(updatedData);
//   };

//   // Update Max Loss value
//   const handleMaxLossChange = (e) => {
//     const updatedData = [...chartingData];
//     updatedData[index] = { ...updatedData[index], MaxLoss: e.target.value };
//     setChartingData(updatedData);
//   };

//   // Update Trade Mode using button group (Intraday/Delivery)
//   const handleTradeModeChange = (mode) => {
//     const updatedData = [...chartingData];
//     updatedData[index].TradeMode = mode;
//     setChartingData(updatedData);
//   };

//   // Define a style for the input fields for a better dark theme look
//   const inputStyle = {
//     backgroundColor: "#121212",
//     border: "1px solid #222",
//     color: "white",
//   };

//   // Define a style for all labels (light grey)
//   const labelStyle = { color: "#ccc" };

//   // Use "Intraday" as the default Trade Mode if none is set
//   const currentTradeMode = chartingData[index]?.TradeMode || "Intraday";

//   return (
//     <div className="col-md-4 mb-4">
//       <div
//         className="card border-0 shadow-lg"
//         style={{ backgroundColor: "#000", color: "white" }}>
//         <div
//           className="card-header py-3"
//           style={{
//             backgroundColor: "#111",
//             borderBottom: "1px solid #222",
//           }}>
//           <h5 className="mb-0 text-center fw-semibold">{item.Segment}</h5>
//         </div>
//         <div className="card-body px-4 py-3">
//           {/* Toggle Switches */}
//           <div className="d-flex justify-content-evenly align-items-center mb-4">
//             <div className="toggle-group">
//               <label className="d-flex align-items-center gap-2">
//                 <span style={labelStyle}>Trade Status</span>
//                 <div className="form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     role="switch"
//                     style={{ width: "40px", height: "20px" }}
//                     checked={chartingData[index]?.TradeStatus === "On"}
//                     onChange={handleTradeStatusChange}
//                   />
//                 </div>
//               </label>
//             </div>
//             <div className="toggle-group">
//               <label className="d-flex align-items-center gap-2">
//                 <span style={labelStyle}>Admin Signal</span>
//                 <div className="form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     role="switch"
//                     style={{ width: "40px", height: "20px" }}
//                     checked={chartingData[index]?.AdminSignal === "On"}
//                     onChange={handleAdminSignalChange}
//                   />
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Input Grid */}
//           <div className="row g-3 mb-4">
//             <div className="col-6">
//               <label className="form-label" style={labelStyle}>
//                 {item.Segment === "Cash" ? "Fund" : "Lot"}
//               </label>
//               <input
//                 type="number"
//                 className="form-control form-control-lg"
//                 style={inputStyle}
//                 placeholder={
//                   item.Segment === "Cash" ? "Enter Fund" : "Enter Lot"
//                 }
//                 onChange={handleFundOrLotChange}
//                 value={
//                   item.Segment === "Cash"
//                     ? chartingData[index]?.Fund || ""
//                     : chartingData[index]?.Quantity || ""
//                 }
//               />
//             </div>
//             <div className="col-6">
//               <label className="form-label" style={labelStyle}>
//                 Trade/Day
//               </label>
//               <input
//                 type="number"
//                 className="form-control form-control-lg"
//                 style={inputStyle}
//                 placeholder="Enter trade per day"
//                 onChange={handleTradePerDayChange}
//                 value={chartingData[index]?.TradePerDay || ""}
//               />
//             </div>
//             {/* Swapped positions: Max Loss comes here (col-6) */}
//             <div className="col-6">
//               <label className="form-label" style={labelStyle}>
//                 Max Loss
//               </label>
//               <input
//                 type="number"
//                 className="form-control form-control-lg"
//                 style={inputStyle}
//                 placeholder="Enter max loss"
//                 onChange={handleMaxLossChange}
//                 value={chartingData[index]?.MaxLoss || ""}
//               />
//             </div>
//             <div className="col-6">
//               <label className="form-label" style={labelStyle}>
//                 Max Profit
//               </label>
//               <input
//                 type="number"
//                 className="form-control form-control-lg"
//                 style={inputStyle}
//                 placeholder="Enter max profit"
//                 onChange={handleMaxProfitChange}
//                 value={chartingData[index]?.MaxProfit || ""}
//               />
//             </div>
//             {/* Swapped positions: Running Trade now appears as a full-width field */}
//             <div className="col-12">
//               <label className="form-label" style={labelStyle}>
//                 Running Trade
//               </label>
//               <input
//                 type="number"
//                 className="form-control form-control-lg"
//                 style={inputStyle}
//                 placeholder="Enter running trade"
//                 onChange={handleRunningTradeChange}
//                 value={chartingData[index]?.RunningTrade || ""}
//               />
//             </div>
//           </div>

//           {/* Trade Mode Toggle */}
//           <div className="mb-4">
//             <label className="d-block mb-2" style={labelStyle}>
//               Trade Mode
//             </label>
//             <div
//               className="btn-group w-100 rounded-pill overflow-hidden"
//               role="group"
//               style={{ backgroundColor: "#222", height: "45px" }}>
//               <button
//                 type="button"
//                 className="btn border-0 rounded-pill"
//                 style={{
//                   width: "50%",
//                   backgroundColor:
//                     currentTradeMode === "Intraday" ? "#7367f0" : "#222",
//                   color: currentTradeMode === "Intraday" ? "white" : "#6c7293",
//                   fontWeight: "500",
//                 }}
//                 onClick={() => handleTradeModeChange("Intraday")}>
//                 Intraday
//               </button>
//               <button
//                 type="button"
//                 className="btn border-0 rounded-pill"
//                 style={{
//                   width: "50%",
//                   backgroundColor:
//                     currentTradeMode === "Delivery" ? "#7367f0" : "#222",
//                   color: currentTradeMode === "Delivery" ? "white" : "#6c7293",
//                   fontWeight: "500",
//                 }}
//                 onClick={() => handleTradeModeChange("Delivery")}>
//                 Delivery
//               </button>
//             </div>
//           </div>

//           <button
//             className="btn btn-primary w-100 py-2 fw-semibold"
//             style={{
//               borderRadius: "8px",
//               backgroundColor: "#7367f0",
//               border: "none",
//             }}
//             onClick={() => handleAddCharting(index)}>
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartingCard;





import React from "react";

const ChartingCard = ({
  item,
  index,
  chartingData,
  setChartingData,
  handleAddCharting,
}) => {
  const handleTradeStatusChange = (e) => {
    const updatedData = [...chartingData];
    updatedData[index].TradeStatus = e.target.checked ? "On" : "Off";
    setChartingData(updatedData);
  };

  const handleAdminSignalChange = (e) => {
    const updatedData = [...chartingData];
    updatedData[index].AdminStatus = e.target.checked ? "On" : "Off";
    setChartingData(updatedData);
  };

  const handleFundOrLotChange = (e) => {
    const updatedData = [...chartingData];
    if (item.Segment === "Cash") {
      updatedData[index] = { ...updatedData[index], Fund: e.target.value };
    } else {
      updatedData[index] = { ...updatedData[index], Quantity: e.target.value };
    }
    setChartingData(updatedData);
  };

  const handleTradePerDayChange = (e) => {
    const updatedData = [...chartingData];
    updatedData[index] = { ...updatedData[index], TradePerDay: e.target.value };
    setChartingData(updatedData);
  };

  const handleRunningTradeChange = (e) => {
    const updatedData = [...chartingData];
    updatedData[index] = {
      ...updatedData[index],
      RunningTrade: e.target.value,
    };
    setChartingData(updatedData);
  };

  const handleMaxProfitChange = (e) => {
    const updatedData = [...chartingData];
    updatedData[index] = { ...updatedData[index], MaxProfit: e.target.value };
    setChartingData(updatedData);
  };

  const handleMaxLossChange = (e) => {
    const updatedData = [...chartingData];
    updatedData[index] = { ...updatedData[index], MaxLoss: e.target.value };
    setChartingData(updatedData);
  };

  const handleTradeModeChange = (mode) => {
    const updatedData = [...chartingData];
    updatedData[index].ExitDay = mode;
    setChartingData(updatedData);
  };

  const inputStyle = {
    backgroundColor: "#121212",
    border: "1px solid #222",
    color: "white",
  };

  const labelStyle = { color: "#ccc" };

  const currentTradeMode = chartingData[index]?.ExitDay || "Intraday";

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow-lg"
        style={{ backgroundColor: "#000", color: "white" }}>
        <div
          className="card-header py-3"
          style={{ backgroundColor: "#111", borderBottom: "1px solid #222" }}>
          <h5 className="mb-0 text-center fw-semibold">{item.Segment}</h5>
        </div>
        <div className="card-body px-4 py-3">
          <div className="d-flex justify-content-evenly align-items-center mb-4">
            <div className="toggle-group">
              <label className="d-flex align-items-center gap-2">
                <span style={labelStyle}>Trade Status</span>
                <div className="form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    style={{ width: "40px", height: "20px" }}
                    checked={chartingData[index]?.TradeStatus === "On"}
                    onChange={handleTradeStatusChange}
                  />
                </div>
              </label>
            </div>
            <div className="toggle-group">
              <label className="d-flex align-items-center gap-2">
                <span style={labelStyle}>Admin Signal</span>
                <div className="form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    style={{ width: "40px", height: "20px" }}
                    checked={chartingData[index]?.AdminStatus === "On"}
                    onChange={handleAdminSignalChange}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="form-label" style={labelStyle}>
                {item.Segment === "Cash" ? "Fund" : "Lot"}
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                style={inputStyle}
                placeholder={
                  item.Segment === "Cash" ? "Enter Fund" : "Enter Lot"
                }
                onChange={handleFundOrLotChange}
                value={
                  item.Segment === "Cash"
                    ? chartingData[index]?.Fund || ""
                    : chartingData[index]?.Quantity || ""
                }
              />
            </div>
            <div className="col-6">
              <label className="form-label" style={labelStyle}>
                Trade/Day
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                style={inputStyle}
                placeholder="Enter trade per day"
                onChange={handleTradePerDayChange}
                value={chartingData[index]?.TradePerDay || ""}
              />
            </div>
            <div className="col-6">
              <label className="form-label" style={labelStyle}>
                Max Loss
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                style={inputStyle}
                placeholder="Enter max loss"
                onChange={handleMaxLossChange}
                value={chartingData[index]?.MaxLoss || ""}
              />
            </div>
            <div className="col-6">
              <label className="form-label" style={labelStyle}>
                Max Profit
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                style={inputStyle}
                placeholder="Enter max profit"
                onChange={handleMaxProfitChange}
                value={chartingData[index]?.MaxProfit || ""}
              />
            </div>
            <div className="col-12">
              <label className="form-label" style={labelStyle}>
                Running Trade
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                style={inputStyle}
                placeholder="Enter running trade"
                onChange={handleRunningTradeChange}
                value={chartingData[index]?.RunningTrade || ""}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="d-block mb-2" style={labelStyle}>
              Trade Mode
            </label>
            <div
              className="btn-group w-100 rounded-pill overflow-hidden"
              role="group"
              style={{ backgroundColor: "#222", height: "45px" }}>
              <button
                type="button"
                className="btn border-0 rounded-pill"
                style={{
                  width: "50%",
                  backgroundColor:
                    currentTradeMode === "Intraday" ? "#7367f0" : "#222",
                  color: currentTradeMode === "Intraday" ? "white" : "#6c7293",
                  fontWeight: "500",
                }}
                onClick={() => handleTradeModeChange("Intraday")}>
                Intraday
              </button>
              <button
                type="button"
                className="btn border-0 rounded-pill"
                style={{
                  width: "50%",
                  backgroundColor:
                    currentTradeMode === "Delivery" ? "#7367f0" : "#222",
                  color: currentTradeMode === "Delivery" ? "white" : "#6c7293",
                  fontWeight: "500",
                }}
                onClick={() => handleTradeModeChange("Delivery")}>
                Delivery
              </button>
            </div>
          </div>
          <button
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{
              borderRadius: "8px",
              backgroundColor: "#7367f0",
              border: "none",
            }}
            onClick={() => handleAddCharting(index)}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartingCard;
