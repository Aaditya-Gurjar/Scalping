
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

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import NoDataFound from "../../../ExtraComponent/NoDataFound";

// const ChartingCard = ({
//   item,
//   index,
//   chartingData,
//   setChartingData,
//   handleAddCharting,
// }) => {
//   // If there's no data, display NoDataFound component in the center
//   if (!chartingData || chartingData.length === 0) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <NoDataFound />
//       </div>
//     );
//   }

//   // Define initial values for Formik based on chartingData for the given index
//   const initialValues = {
//     // If Segment is "Cash", use Fund; otherwise, use Quantity (Lot)
//     fundOrLot:
//       item.Segment === "Cash"
//         ? chartingData[index]?.Fund || ""
//         : chartingData[index]?.Quantity || "",
//     tradePerDay: chartingData[index]?.TradePerDay || "",
//     maxLoss: chartingData[index]?.MaxLoss || "",
//     maxProfit: chartingData[index]?.MaxProfit || "",
//     runningTrade: chartingData[index]?.RunningTrade || "",
//     // For toggles, true means "On"
//     tradeStatus: chartingData[index]?.TradeStatus === "On",
//     adminStatus: chartingData[index]?.AdminStatus === "On",
//     // For trade mode, default is "Intraday"
//     tradeMode: chartingData[index]?.ExitDay || "Intraday",
//   };

//   // Manual validation function (without Yup)
//   const validate = (values) => {
//     const errors = {};
//     if (!values.fundOrLot) {
//       errors.fundOrLot = "This field is required.";
//     }
//     if (!values.tradePerDay) {
//       errors.tradePerDay = "This field is required.";
//     }
//     if (!values.maxLoss) {
//       errors.maxLoss = "This field is required.";
//     }
//     if (!values.maxProfit) {
//       errors.maxProfit = "This field is required.";
//     }
//     if (!values.runningTrade) {
//       errors.runningTrade = "This field is required.";
//     }
//     return errors;
//   };

//   // Style objects for dark theme
//   const inputStyle = {
//     backgroundColor: "#121212",
//     border: "1px solid #222",
//     color: "white",
//   };

//   const labelStyle = { color: "#ccc" };

//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card border-0 shadow-lg" style={{ backgroundColor: "#000", color: "white" }}>
//         <div
//           className="card-header py-3"
//           style={{ backgroundColor: "#111", borderBottom: "1px solid #222" }}
//         >
//           <h5 className="mb-0 text-center fw-semibold">{item.Segment}</h5>
//         </div>
//         <div className="card-body px-4 py-3">
//           <Formik
//             initialValues={initialValues}
//             validate={validate}
//             onSubmit={(values) => {
//               // Create a copy of chartingData and update the current index with form values
//               const updatedData = [...chartingData];
//               if (item.Segment === "Cash") {
//                 updatedData[index].Fund = values.fundOrLot;
//               } else {
//                 updatedData[index].Quantity = values.fundOrLot;
//               }
//               updatedData[index].TradePerDay = values.tradePerDay;
//               updatedData[index].MaxLoss = values.maxLoss;
//               updatedData[index].MaxProfit = values.maxProfit;
//               updatedData[index].RunningTrade = values.runningTrade;
//               updatedData[index].TradeStatus = values.tradeStatus ? "On" : "Off";
//               updatedData[index].AdminStatus = values.adminStatus ? "On" : "Off";
//               updatedData[index].ExitDay = values.tradeMode;
//               setChartingData(updatedData);

//               // Call parent's save handler
//               handleAddCharting(index);
//             }}
//           >
//             {(formik) => {
//               const { values, setFieldValue } = formik;
//               // currentTradeMode is taken from Formik's values.tradeMode
//               const currentTradeMode = values.tradeMode;
//               return (
//                 <Form>
//                   {/* Toggle Switches */}
//                   <div className="d-flex justify-content-evenly align-items-center mb-4">
//                     <div className="toggle-group">
//                       <label className="d-flex align-items-center gap-2">
//                         <span style={labelStyle}>Trade Status</span>
//                         <div className="form-switch">
//                           <Field name="tradeStatus">
//                             {({ field }) => (
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 style={{ width: "40px", height: "20px" }}
//                                 {...field}
//                                 checked={field.value}
//                               />
//                             )}
//                           </Field>
//                         </div>
//                       </label>
//                     </div>
//                     <div className="toggle-group">
//                       <label className="d-flex align-items-center gap-2">
//                         <span style={labelStyle}>Admin Signal</span>
//                         <div className="form-switch">
//                           <Field name="adminStatus">
//                             {({ field }) => (
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 style={{ width: "40px", height: "20px" }}
//                                 {...field}
//                                 checked={field.value}
//                               />
//                             )}
//                           </Field>
//                         </div>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Input Grid */}
//                   <div className="row g-3 mb-4">
//                     <div className="col-6">
//                       <label className="form-label" style={labelStyle}>
//                         {item.Segment === "Cash" ? "Fund" : "Lot"}
//                       </label>
//                       <Field
//                         name="fundOrLot"
//                         type="number"
//                         className="form-control form-control-lg"
//                         style={inputStyle}
//                         placeholder={item.Segment === "Cash" ? "Enter Fund" : "Enter Lot"}
//                       />
//                       <ErrorMessage name="fundOrLot">
//                         {(msg) => <div style={{ color: "red", fontSize: "0.8rem" }}>{msg}</div>}
//                       </ErrorMessage>
//                     </div>
//                     <div className="col-6">
//                       <label className="form-label" style={labelStyle}>Trade/Day</label>
//                       <Field
//                         name="tradePerDay"
//                         type="number"
//                         className="form-control form-control-lg"
//                         style={inputStyle}
//                         placeholder="Enter trade per day"
//                       />
//                       <ErrorMessage name="tradePerDay">
//                         {(msg) => <div style={{ color: "red", fontSize: "0.8rem" }}>{msg}</div>}
//                       </ErrorMessage>
//                     </div>
//                     <div className="col-6">
//                       <label className="form-label" style={labelStyle}>Max Loss</label>
//                       <Field
//                         name="maxLoss"
//                         type="number"
//                         className="form-control form-control-lg"
//                         style={inputStyle}
//                         placeholder="Enter max loss"
//                       />
//                       <ErrorMessage name="maxLoss">
//                         {(msg) => <div style={{ color: "red", fontSize: "0.8rem" }}>{msg}</div>}
//                       </ErrorMessage>
//                     </div>
//                     <div className="col-6">
//                       <label className="form-label" style={labelStyle}>Max Profit</label>
//                       <Field
//                         name="maxProfit"
//                         type="number"
//                         className="form-control form-control-lg"
//                         style={inputStyle}
//                         placeholder="Enter max profit"
//                       />
//                       <ErrorMessage name="maxProfit">
//                         {(msg) => <div style={{ color: "red", fontSize: "0.8rem" }}>{msg}</div>}
//                       </ErrorMessage>
//                     </div>
//                     <div className="col-12">
//                       <label className="form-label" style={labelStyle}>Running Trade</label>
//                       <Field
//                         name="runningTrade"
//                         type="number"
//                         className="form-control form-control-lg"
//                         style={inputStyle}
//                         placeholder="Enter running trade"
//                       />
//                       <ErrorMessage name="runningTrade">
//                         {(msg) => <div style={{ color: "red", fontSize: "0.8rem" }}>{msg}</div>}
//                       </ErrorMessage>
//                     </div>
//                   </div>

//                   {/* Trade Mode Toggle */}
//                   <div className="mb-4">
//                     <label className="d-block mb-2" style={labelStyle}>Trade Mode</label>
//                     <div
//                       className="btn-group w-100 rounded-pill overflow-hidden"
//                       role="group"
//                       style={{ backgroundColor: "#222", height: "45px" }}
//                     >
//                       <button
//                         type="button"
//                         className="btn border-0 rounded-pill"
//                         style={{
//                           width: "50%",
//                           backgroundColor: values.tradeMode === "Intraday" ? "#7367f0" : "#222",
//                           color: values.tradeMode === "Intraday" ? "white" : "#6c7293",
//                           fontWeight: "500",
//                         }}
//                         onClick={() => setFieldValue("tradeMode", "Intraday")}
//                       >
//                         Intraday
//                       </button>
//                       <button
//                         type="button"
//                         className="btn border-0 rounded-pill"
//                         style={{
//                           width: "50%",
//                           backgroundColor: values.tradeMode === "Delivery" ? "#7367f0" : "#222",
//                           color: values.tradeMode === "Delivery" ? "white" : "#6c7293",
//                           fontWeight: "500",
//                         }}
//                         onClick={() => setFieldValue("tradeMode", "Delivery")}
//                       >
//                         Delivery
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary w-100 py-2 fw-semibold"
//                     style={{
//                       borderRadius: "8px",
//                       backgroundColor: "#7367f0",
//                       border: "none",
//                     }}
//                   >
//                     Save Changes
//                   </button>
//                 </Form>
//               );
//             }}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartingCard;
