// import React, { useState, useEffect, useRef } from "react";
// import {
//   get_User_Data,
//   get_Trade_History,
//   get_PnL_Data,
//   get_EQuityCurveData,
//   get_DrapDownData,
//   get_FiveMostProfitTrade,
//   get_FiveMostLossTrade,
//   getStrategyType,
// } from "../../CommonAPI/Admin";
// import GridExample from "../../../ExtraComponent/CommanDataTable";
// import {
//   get_Trade_Data,
//   ChartingPlatformsegment,
//   getChargingPlatformDataApi,
// } from "../../CommonAPI/User";
// import DatePicker from "react-datepicker";
// import { AgChartsReact } from "ag-charts-react";
// import "ag-charts-enterprise";
// import ApexCharts from "react-apexcharts";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
// import {
//   columns8,
//   columns7,
//   columns6,
//   columns5,
//   columns4,
//   columns3,
//   columns2,
//   columns1,
//   columns,
//   getColumns10,
// } from "./TradeHistoryColumn";
// import NoDataFound from "../../../ExtraComponent/NoDataFound";
// import { useLocation } from "react-router-dom";
// import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
// import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
// import ChartComponent from "../../admin/AdvanceChart/ChartComponent";
// import Content from "../../../ExtraComponent/Content";

// const Tradehistory = () => {
//   const StrategyType = sessionStorage.getItem("StrategyType");
//   const location = useLocation();
//   const sectionRefs = useRef({});
//   const [selectStrategyType, setStrategyType] = useState(
//     StrategyType || "Scalping"
//   );
//   const [strategyNames, setStrategyNames] = useState([]);
//   const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [checkedRows, setCheckedRows] = useState([]);
//   const [ToDate, setToDate] = useState("");
//   const [FromDate, setFromDate] = useState("");
//   const [showReportSections, setShowReportSections] = useState(false);
//   const [getCharting, setGetCharting] = useState([]);
//   const [selectSegmentType, setSegmentType] = useState("");
//   const [getChartingSegments, setChartingSegments] = useState([]);
//   const [activeTab, setActiveTab] = useState("Cash");
//   const [getChartingData, setChartingData] = useState([]);
//   const [preSelectTableType, setPreSelectTableType] = useState("");
//   const [loadedSections, setLoadedSections] = useState({
//     overview: false,
//     pnlAnalysis: false,
//     equity: false,
//     drawdown: false,
//     trades: false,
//     profitLoss: false,
//     consistent: false,
//   });
//   const [getAllTradeData, setAllTradeData] = useState({
//     data: [],
//     Overall: [],
//   });
//   const [totalPnLOverview, setTotalPnLOverview] = useState([]);
//   const [getPnLData, setPnlData] = useState({ data: [] });
//   const [getEquityCurveDetails, setEquityCurveDetails] = useState({ data: [] });
//   const [getDropDownData, setDropDownData] = useState({ data: [] });
//   const [getFiveLossTrade, setFiveLossTrade] = useState({
//     data: [],
//     data1: [],
//   });
//   const [getFiveProfitTrade, setFiveProfitTrade] = useState({
//     data: [],
//     data1: [],
//   });
//   const Username = localStorage.getItem("name");
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getFullYear()}.${String(
//     currentDate.getMonth() + 1
//   ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
//   const tomorrow = new Date(currentDate);
//   tomorrow.setDate(currentDate.getDate() + 1);
//   const Defult_To_Date = `${tomorrow.getFullYear()}.${String(
//     tomorrow.getMonth() + 1
//   ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

//   console.log("location?.state?.RowIndex", location?.state?.type);

//   useEffect(() => {
//     if (location?.state?.goto && location?.state?.goto === "dashboard") {
//       if (location?.state?.type === "MultiCondition") {
//         setSelectedRowData(tradeHistory.data1?.[location?.state?.RowIndex]);
//       } else {
//         setSelectedRowData(tradeHistory.data?.[location?.state?.RowIndex]);
//       }

//       setStrategyType(
//         location?.state?.type === "MultiCondition"
//           ? "Scalping"
//           : location?.state?.type
//       );
//     }
//     setCheckedRows(location?.state?.RowIndex);
//   }, [tradeHistory, location?.state?.RowIndex]);

//   console.log("selectedRowData", selectedRowData);

//   console.log("getAllTradeData", getAllTradeData);

//   useEffect(() => {
//     const fetchStrategyTypes = async () => {
//       try {
//         const res = await getStrategyType();
//         setStrategyNames(res.Data || []);
//       } catch (error) {
//         console.error("Error fetching strategy types:", error);
//       }
//     };
//     if (selectStrategyType !== "ChartingPlatform") {
//       const fetchTradeHistory = async () => {
//         try {
//           const response = await get_User_Data({
//             Data: selectStrategyType,
//             Username,
//           });
//           console.log("fetchTradeHistory", response);
//           setTradeHistory(
//             response.Status
//               ? {
//                   data: response?.Data || [],
//                   data1: response?.NewScalping || [],
//                 }
//               : { data: [], data1: [] }
//           );
//         } catch (err) {
//           console.error("Error fetching trade history:", err);
//         }
//       };
//       fetchTradeHistory();
//     }
//     fetchStrategyTypes();
//   }, [selectStrategyType]);

//   const convertDateFormat = (date) => {
//     if (!date) return "";
//     const dateObj = new Date(date);
//     return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}.${String(dateObj.getDate()).padStart(2, "0")}`;
//   };

//   const handleRowSelect = (rowData) => {
//     setSelectedRowData(rowData);
//     setOpenSections({});
//     setShowReportSections(false);
//   };

//   const handleSubmit = async () => {
//     console.log("handlesubmit selectedRowData", selectedRowData);
//     if (selectStrategyType === "ChartingPlatform") return;
//     if (!selectedRowData) {
//       Swal.fire({
//         icon: "warning",
//         title: "Please select a row first!",
//         confirmButtonColor: "#1ccc8a",
//       });
//       return;
//     }
//     setLoadedSections({
//       overview: false,
//       pnlAnalysis: false,
//       equity: false,
//       drawdown: false,
//       trades: false,
//       profitLoss: false,
//       consistent: false,
//     });
//     try {
//       const basicData = {
//         MainStrategy:
//           selectStrategyType === "Scalping"
//             ? selectedRowData.ScalpType === "Multi_Conditional"
//               ? "NewScalping"
//               : selectStrategyType
//             : selectStrategyType,
//         Strategy:
//           selectStrategyType === "Scalping"
//             ? selectedRowData.ScalpType !== "Multi_Conditional"
//               ? selectedRowData.Targetselection
//               : selectedRowData.Targetselection
//             : selectStrategyType === "Option Strategy"
//             ? selectedRowData.STG
//             : selectStrategyType === "Pattern"
//             ? selectedRowData.TradePattern
//             : activeTab,
//         Symbol:
//           selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
//             ? selectedRowData.Symbol
//             : selectStrategyType === "Option Strategy"
//             ? selectedRowData.IName
//             : selectStrategyType === "ChartingPlatform"
//             ? selectedRowData.TSymbol
//             : "",
//         ETPattern:
//           selectStrategyType === "Scalping"
//             ? selectedRowData.TType
//             : selectStrategyType === "Option Strategy"
//             ? selectedRowData.Targettype
//             : selectStrategyType === "Pattern"
//             ? selectedRowData.Pattern
//             : "",
//         Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
//           ? selectedRowData.GroupN
//           : "",
//         Username,
//         From_date: convertDateFormat(FromDate || formattedDate),
//         To_date: convertDateFormat(ToDate || Defult_To_Date),
//         Timeframe:
//           selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
//         TradePattern: "",
//         PatternName: "",
//       };
//       const tradeRes = await get_Trade_History(basicData);
//       if (tradeRes.Status) {
//         setAllTradeData({
//           data: tradeRes.data || [],
//           Overall: tradeRes.Overall || [],
//         });
//         setShowReportSections(true);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: tradeRes.message,
//           text: tradeRes.message,
//           confirmButtonColor: "#1ccc8a",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to load initial data",
//         text: error.message,
//         confirmButtonColor: "#1ccc8a",
//       });
//     }
//   };

//   const getChartingSegmentData = async () => {
//     try {
//       const req = {
//         MainStrategy: "ChartingPlatform",
//         Strategy: activeTab,
//         Symbol: "",
//         Username: Username,
//         ETPattern: "",
//         Timeframe: "",
//         From_date: convertDateFormat(FromDate || formattedDate),
//         To_date: convertDateFormat(ToDate || Defult_To_Date),
//         Group: "",
//         TradePattern: "",
//         PatternName: "",
//       };
//       const res = await get_Trade_History(req);
//       console.log("reees", res);
//       setChartingData(res?.data || []);
//       setAllTradeData({ Overall: res?.Overall || [] });
//     } catch (error) {
//       console.log("Error in getChartingSegmentData", error);
//     }
//   };

//   useEffect(() => {
//     if (selectStrategyType === "ChartingPlatform") {
//       getChartingSegmentData();
//     }
//   }, [activeTab, selectStrategyType, FromDate, ToDate]);

//   const loadSectionData = async (section) => {
//     if (loadedSections[section]) return;
//     try {
//       let params;
//       if (selectStrategyType === "ChartingPlatform") {
//         params = {
//           MainStrategy: "ChartingPlatform",
//           Strategy: activeTab,
//           Symbol: "",
//           Username: Username,
//           ETPattern: "",
//           Timeframe: "",
//           From_date: convertDateFormat(FromDate || formattedDate),
//           To_date: convertDateFormat(ToDate || Defult_To_Date),
//           Group: "",
//           TradePattern: "",
//           PatternName: "",
//         };
//       } else {
//         params = {
//           MainStrategy:
//             selectStrategyType === "Scalping"
//               ? selectedRowData?.ScalpType === "Multi_Conditional"
//                 ? "NewScalping"
//                 : selectStrategyType
//               : selectStrategyType,
//           Strategy:
//             selectStrategyType === "Scalping"
//               ? selectedRowData?.ScalpType !== "Multi_Conditional"
//                 ? selectedRowData?.Targetselection
//                 : selectedRowData?.Targetselection
//               : selectStrategyType === "Option Strategy"
//               ? selectedRowData?.STG
//               : selectStrategyType === "Pattern"
//               ? selectedRowData?.TradePattern
//               : "Cash",
//           Symbol:
//             selectStrategyType === "Scalping" ||
//             selectStrategyType === "Pattern"
//               ? selectedRowData?.Symbol
//               : selectStrategyType === "Option Strategy"
//               ? selectedRowData?.IName
//               : selectStrategyType === "ChartingPlatform"
//               ? selectedRowData?.TSymbol
//               : "",
//           ETPattern:
//             selectStrategyType === "Scalping"
//               ? selectedRowData?.TType
//               : selectStrategyType === "Option Strategy"
//               ? selectedRowData?.Targettype
//               : selectStrategyType === "Pattern"
//               ? selectedRowData?.Pattern
//               : "",
//           Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
//             ? selectedRowData?.GroupN
//             : "",
//           Username,
//           From_date: convertDateFormat(FromDate || formattedDate),
//           To_date: convertDateFormat(ToDate || Defult_To_Date),
//           Timeframe:
//             selectStrategyType === "Pattern" ? selectedRowData?.TimeFrame : "",
//           TradePattern: "",
//           PatternName: "",
//         };
//       }
//       if (section === "pnlAnalysis") {
//         const pnlRes = await get_PnL_Data(params);
//         setPnlData({ data: pnlRes.Barchart || [] });
//       } else if (section?.includes("equity")) {
//         const equityRes = await get_EQuityCurveData(params);
//         setEquityCurveDetails({ data: equityRes.Equitycurve || [] });
//       } else if (section === "drawdown") {
//         const drawdownRes = await get_DrapDownData(params);
//         setDropDownData({ data: drawdownRes.Drawdown || [] });
//       } else if (section === "trades") {
//         const [lossRes, profitRes] = await Promise.all([
//           get_FiveMostLossTrade(params),
//           get_FiveMostProfitTrade(params),
//         ]);
//         setFiveLossTrade({ data: lossRes.fivelosstrade || [] });
//         setFiveProfitTrade({ data: profitRes.fiveprofittrade || [] });
//       }
//       setLoadedSections((prev) => ({ ...prev, [section]: true }));
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: `Failed to load ${section} data`,
//         text: error.message,
//       });
//     }
//   };

//   const [openSections, setOpenSections] = useState({});

//   useEffect(() => {
//     setOpenSections({});
//   }, [activeTab]);

//   const ReportSection = ({ title, section, children }) => {
//     const isOpen = openSections[section] || false;
//     const toggleSection = async () => {
//       if (!isOpen) {
//         setOpenSections((prev) => ({ ...prev, [section]: true }));
//         await loadSectionData(section);
//       } else {
//         setOpenSections((prev) => ({ ...prev, [section]: false }));
//       }
//     };
//     const renderButtonContent = () => {
//       if (!isOpen) return "🔼 Show Data";
//       return loadedSections[section] ? (
//         "🔽 Hide Data"
//       ) : (
//         <>
//           <span
//             className="spinner-border spinner-border-sm me-1"
//             role="status"
//             aria-hidden="true"></span>
//           Loading Data...
//         </>
//       );
//     };
//     return (
//       <div className="card mb-3">
//         <div className="card-header d-flex justify-content-between align-items-center">
//           <h5 className="m-0">{title}</h5>
//           <button className="btn btn-primary btn-sm" onClick={toggleSection}>
//             {renderButtonContent()}
//           </button>
//         </div>
//         {isOpen && (
//           <div className="card-body">
//             {loadedSections[section] ? (
//               children
//             ) : (
//               <div className="spinner-border text-primary" />
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   useEffect(() => {
//     console.log("getChartingData", getChartingData);
//     if (selectStrategyType === "ChartingPlatform") {
//       setLoadedSections({
//         overview: false,
//         pnlAnalysis: false,
//         equity: false,
//         drawdown: false,
//         trades: false,
//         profitLoss: false,
//         consistent: false,
//       });
//       setShowReportSections(true);
//     }
//   }, [selectStrategyType, activeTab, FromDate, ToDate]);

//   const getColumnsForStrategy = () => {
//     switch (selectStrategyType) {
//       case "Scalping":
//         return columns();
//       case "Option Strategy":
//         return columns1();
//       case "Pattern":
//         return columns2();
//       case "ChartingPlatform":
//         return getColumns10();
//       default:
//         return columns();
//     }
//   };

//   return (
//     <Content
//       Page_title={"📊 Trade History Analysis"}
//       button_status={false}
//       backbutton_status={true}>
//       <div className="iq-card-body">
//         <div className="card-body">
//           <div className="row g-3 mb-4">
//             <div className="col-12 col-md-6 col-lg-4">
//               <div className="form-group">
//                 <label className="form-label">Strategy Type</label>
//                 <select
//                   className="form-select"
//                   value={selectStrategyType}
//                   onChange={(e) => {
//                     setStrategyType(e.target.value);
//                     sessionStorage.setItem("StrategyType", e.target.value);
//                   }}>
//                   {strategyNames.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="col-12 col-md-6 col-lg-4">
//               <div className="form-group">
//                 <label className="form-label">From Date</label>
//                 <DatePicker
//                   className="form-control"
//                   selected={FromDate || formattedDate}
//                   onChange={setFromDate}
//                   dateFormat="yyyy.MM.dd"
//                 />
//               </div>
//             </div>
//             <div className="col-12 col-md-6 col-lg-4">
//               <div className="form-group">
//                 <label className="form-label">To Date</label>
//                 <DatePicker
//                   className="form-control"
//                   selected={ToDate || Defult_To_Date}
//                   onChange={setToDate}
//                   dateFormat="yyyy.MM.dd"
//                 />
//               </div>
//             </div>
//           </div>
//           {selectStrategyType === "Scalping" ? (
//             <div className="mb-4">
//               <h5>Scalping</h5>
//               {tradeHistory.data1?.length > 0 ? (
//                 <GridExample
//                   columns={getColumnsForStrategy()}
//                   data={tradeHistory.data1}
//                   onRowSelect={handleRowSelect}
//                   checkBox={true}
//                   isChecked={checkedRows}
//                 />
//               ) : (
//                 <NoDataFound />
//               )}
//             </div>
//           ) : (
//             <div className="mb-4">
//               <h5>{selectStrategyType}</h5>
//               {selectStrategyType === "ChartingPlatform" && (
//                 <div className="container">
//                   <div className="d-flex justify-content-center">
//                     <ul
//                       className="nav nav-pills shadow rounded-pill p-1"
//                       style={{ backgroundColor: "#f1f3f5" }}>
//                       <li className="nav-item">
//                         <button
//                           className={`nav-link ${
//                             activeTab === "Cash" ? "active" : ""
//                           } rounded-pill`}
//                           onClick={() => setActiveTab("Cash")}
//                           style={{
//                             padding: "10px 20px",
//                             margin: "5px",
//                             border: "none",
//                             outline: "none",
//                           }}>
//                           Cash
//                         </button>
//                       </li>
//                       <li className="nav-item">
//                         <button
//                           className={`nav-link ${
//                             activeTab === "Future" ? "active" : ""
//                           } rounded-pill`}
//                           onClick={() => setActiveTab("Future")}
//                           style={{
//                             padding: "10px 20px",
//                             margin: "5px",
//                             border: "none",
//                             outline: "none",
//                           }}>
//                           Future
//                         </button>
//                       </li>
//                       <li className="nav-item">
//                         <button
//                           className={`nav-link ${
//                             activeTab === "Option" ? "active" : ""
//                           } rounded-pill`}
//                           onClick={() => setActiveTab("Option")}
//                           style={{
//                             padding: "10px 20px",
//                             margin: "5px",
//                             border: "none",
//                             outline: "none",
//                           }}>
//                           Option
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               )}
//               {(
//                 selectStrategyType === "ChartingPlatform"
//                   ? getChartingData?.length > 0
//                   : tradeHistory.data?.length
//               ) ? (
//                 <GridExample
//                   columns={getColumnsForStrategy()}
//                   data={
//                     selectStrategyType === "ChartingPlatform"
//                       ? getChartingData
//                       : tradeHistory.data
//                   }
//                   onRowSelect={handleRowSelect}
//                   checkBox={
//                     selectStrategyType === "ChartingPlatform" ? false : true
//                   }
//                   isChecked={checkedRows}
//                 />
//               ) : (
//                 <NoDataFound />
//               )}
//             </div>
//           )}
//           {selectStrategyType !== "ChartingPlatform" && (
//             <div className="d-grid gap-2">
//               <button
//                 className="addbtn"
//                 onClick={handleSubmit}
//                 disabled={!selectedRowData}>
//                 📜 Generate History
//               </button>
//             </div>
//           )}
//           {showReportSections && (
//             <div className="mt-5">
//               <ReportSection
//                 title="Total Profit/Loss Overview"
//                 section="overview">
//                 <div
//                   className="pnl-overview"
//                   style={{
//                     color: "#fff",
//                     padding: "20px",
//                     borderRadius: "8px",
//                     textAlign: "center",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     marginBottom: "20px",
//                   }}>
//                   <h4
//                     style={{
//                       margin: 0,
//                       fontSize: "1.75rem",
//                       fontWeight: "bold",
//                     }}>
//                     💰 Total PnL: ₹
//                     <span
//                       className="badge ms-2"
//                       style={{
//                         backgroundColor:
//                           getAllTradeData.Overall[0]?.PnL > 0
//                             ? "#008000"
//                             : "#B22222",
//                         color: "white",
//                         padding: "8px 15px",
//                         borderRadius: "5px",
//                         fontSize: "1.25rem",
//                         fontWeight: "bold",
//                       }}>
//                       {getAllTradeData.Overall[0]?.PnL?.toFixed(2) || "0.00"}
//                     </span>
//                   </h4>
//                 </div>
//                 <GridExample
//                   columns={columns3(selectStrategyType)}
//                   data={getAllTradeData.data}
//                   checkBox={false}
//                 />
//               </ReportSection>
//               <ReportSection title="Profit/Loss Analysis" section="pnlAnalysis">
//                 <ProfitAndLossGraph data={getPnLData.data} />
//               </ReportSection>
//               <ReportSection title="Equity Curve Analysis" section="equity">
//                 <div style={{ height: "350px", overflow: "hidden" }}>
//                   <ChartComponent data={getEquityCurveDetails.data} />
//                 </div>
//                 <GridExample
//                   columns={columns5(selectStrategyType)}
//                   data={getEquityCurveDetails.data}
//                   checkBox={false}
//                 />
//               </ReportSection>
//               <ReportSection title="Drawdown Analysis" section="drawdown">
//                 <div style={{ height: "350px", overflow: "hidden" }}>
//                   <DrawdownChartComponent data={getDropDownData.data} />
//                 </div>
//                 <GridExample
//                   columns={columns6()}
//                   data={getDropDownData.data}
//                   checkBox={false}
//                 />
//               </ReportSection>
//               <ReportSection title="Top Trades Analysis" section="trades">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="card h-100">
//                       <div
//                         className="card-header text-white"
//                         style={{ backgroundColor: "#006400" }}>
//                         💹 Top Profitable Trades
//                       </div>
//                       <div className="card-body">
//                         <ApexCharts
//                           options={getChartOptions(
//                             getFiveProfitTrade.data,
//                             "Profit"
//                           )}
//                           series={getFiveProfitTrade.data.map((t) => t.PnL)}
//                           type="pie"
//                           height={350}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="card h-100">
//                       <div
//                         className="card-header text-white"
//                         style={{ backgroundColor: "#8B0000" }}>
//                         📉 Top Loss-Making Trades
//                       </div>
//                       <div className="card-body">
//                         <ApexCharts
//                           options={getChartOptions(
//                             getFiveLossTrade.data,
//                             "Loss"
//                           )}
//                           series={getFiveLossTrade.data.map((t) =>
//                             Math.abs(t.PnL)
//                           )}
//                           type="pie"
//                           height={350}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </ReportSection>
//             </div>
//           )}
//         </div>
//       </div>
//     </Content>
//   );
// };

// const getChartOptions = (data, type) => ({
//   chart: { type: "pie" },
//   labels: data.map((t) => t.ETime.split(" ")[1].substring(0, 5)),
//   colors:
//     type === "Profit"
//       ? ["#28a745", "#218838", "#1e7e34"]
//       : ["#dc3545", "#c82333", "#bd2130"],
//   legend: { position: "bottom" },
//   dataLabels: { enabled: true },
//   tooltip: {
//     y: {
//       formatter: (value) => `₹${value.toFixed(2)}`,
//     },
//   },
// });

// export default Tradehistory;


import React, { useState, useEffect, useRef } from "react";
import {
  get_User_Data,
  get_Trade_History,
  get_PnL_Data,
  get_EQuityCurveData,
  get_DrapDownData,
  get_FiveMostProfitTrade,
  get_FiveMostLossTrade,
  getStrategyType,
} from "../../CommonAPI/Admin";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import DatePicker from "react-datepicker";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  columns,
  columns1,
  columns2,
  columns3,
  columns5,
  columns6,
  getColumns10,
} from "./TradeHistoryColumn";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { useLocation } from "react-router-dom";
import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
import ChartComponent from "../../admin/AdvanceChart/ChartComponent";
import Content from "../../../ExtraComponent/Content";

const Tradehistory = () => {
  const StrategyType = sessionStorage.getItem("StrategyType");
  const location = useLocation();
  const sectionRefs = useRef({}); // Refs for each section to scroll to
  const Username = localStorage.getItem("name");
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  const Default_To_Date = `${tomorrow.getFullYear()}.${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

  // States
  const [selectStrategyType, setStrategyType] = useState(
    StrategyType || "Scalping"
  );
  const [strategyNames, setStrategyNames] = useState([]);
  const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [checkedRows, setCheckedRows] = useState([]);
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showReportSections, setShowReportSections] = useState(false);
  const [activeTab, setActiveTab] = useState("Cash");
  const [getChartingData, setChartingData] = useState([]);
  const [loadedSections, setLoadedSections] = useState({
    overview: false,
    pnlAnalysis: false,
    equity: false,
    drawdown: false,
    trades: false,
    profitLoss: false,
    consistent: false,
  });
  const [getAllTradeData, setAllTradeData] = useState({
    data: [],
    Overall: [],
  });
  const [getPnLData, setPnlData] = useState({ data: [] });
  const [getEquityCurveDetails, setEquityCurveDetails] = useState({ data: [] });
  const [getDropDownData, setDropDownData] = useState({ data: [] });
  const [getFiveLossTrade, setFiveLossTrade] = useState({
    data: [],
    data1: [],
  });
  const [getFiveProfitTrade, setFiveProfitTrade] = useState({
    data: [],
    data1: [],
  });
  const [openSection, setOpenSection] = useState(null); // Single open section state

  // Set row selection based on location state
  useEffect(() => {
    if (location?.state?.goto === "dashboard") {
      if (location?.state?.type === "MultiCondition") {
        setSelectedRowData(tradeHistory.data1?.[location?.state?.RowIndex]);
      } else {
        setSelectedRowData(tradeHistory.data?.[location?.state?.RowIndex]);
      }
      setStrategyType(
        location?.state?.type === "MultiCondition"
          ? "Scalping"
          : location?.state?.type
      );
    }
    setCheckedRows(location?.state?.RowIndex);
  }, [
    tradeHistory,
    location?.state?.RowIndex,
    location?.state?.goto,
    location?.state?.type,
  ]);

  useEffect(() => {
    const fetchStrategyTypes = async () => {
      try {
        const res = await getStrategyType();
        setStrategyNames(res.Data || []);
      } catch (error) {
        console.error("Error fetching strategy types:", error);
      }
    };
    if (selectStrategyType !== "ChartingPlatform") {
      const fetchTradeHistory = async () => {
        try {
          const response = await get_User_Data({
            Data: selectStrategyType,
            Username,
          });
          setTradeHistory(
            response.Status
              ? {
                  data: response?.Data || [],
                  data1: response?.NewScalping || [],
                }
              : { data: [], data1: [] }
          );
        } catch (err) {
          console.error("Error fetching trade history:", err);
        }
      };
      fetchTradeHistory();
    }
    fetchStrategyTypes();
  }, [selectStrategyType, Username]);

  const convertDateFormat = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(dateObj.getDate()).padStart(2, "0")}`;
  };

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
    setOpenSection(null); // Reset open section when selecting a new row
    setShowReportSections(false);
  };

  const handleSubmit = async () => {
    if (selectStrategyType === "ChartingPlatform") return;
    if (!selectedRowData) {
      Swal.fire({
        icon: "warning",
        title: "Please select a row first!",
        confirmButtonColor: "#1ccc8a",
        timer: 2000,
      });
      return;
    }
    setLoadedSections({
      overview: false,
      pnlAnalysis: false,
      equity: false,
      drawdown: false,
      trades: false,
      profitLoss: false,
      consistent: false,
    });
    try {
      const basicData = {
        MainStrategy:
          selectStrategyType === "Scalping"
            ? selectedRowData.ScalpType === "Multi_Conditional"
              ? "NewScalping"
              : selectStrategyType
            : selectStrategyType,
        Strategy:
          selectStrategyType === "Scalping"
            ? selectedRowData.Targetselection
            : selectStrategyType === "Option Strategy"
            ? selectedRowData.STG
            : selectStrategyType === "Pattern"
            ? selectedRowData.TradePattern
            : activeTab,
        Symbol:
          selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
            ? selectedRowData.Symbol
            : selectStrategyType === "Option Strategy"
            ? selectedRowData.IName
            : selectStrategyType === "ChartingPlatform"
            ? selectedRowData.TSymbol
            : "",
        ETPattern:
          selectStrategyType === "Scalping"
            ? selectedRowData.TType
            : selectStrategyType === "Option Strategy"
            ? selectedRowData.Targettype
            : selectStrategyType === "Pattern"
            ? selectedRowData.Pattern
            : "",
        Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
          ? selectedRowData.GroupN
          : "",
        Username,
        From_date: convertDateFormat(FromDate || formattedDate),
        To_date: convertDateFormat(ToDate || Default_To_Date),
        Timeframe:
          selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
        TradePattern: "",
        PatternName: "",
      };
      const tradeRes = await get_Trade_History(basicData);
      if (tradeRes.Status) {
        setAllTradeData({
          data: tradeRes.data || [],
          Overall: tradeRes.Overall || [],
        });
        setShowReportSections(true);
        setLoadedSections((prev) => ({ ...prev, overview: true }));
        setOpenSection("overview"); // Open overview by default after submission
        // Scroll to the overview section
        setTimeout(() => {
          sectionRefs.current["overview"]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        Swal.fire({
          icon: "error",
          title: tradeRes.message,
          text: tradeRes.message,
          confirmButtonColor: "#1ccc8a",
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load initial data",
        text: error.message,
        confirmButtonColor: "#1ccc8a",
        timer: 2000,
      });
    }
  };

  const getChartingSegmentData = async () => {
    try {
      const req = {
        MainStrategy: "ChartingPlatform",
        Strategy: activeTab,
        Symbol: "",
        Username,
        ETPattern: "",
        Timeframe: "",
        From_date: convertDateFormat(FromDate || formattedDate),
        To_date: convertDateFormat(ToDate || Default_To_Date),
        Group: "",
        TradePattern: "",
        PatternName: "",
      };
      const res = await get_Trade_History(req);
      setChartingData(res?.data || []);
      setAllTradeData({
        data: res?.data || [],
        Overall: res?.Overall || [],
      });
    } catch (error) {
      console.error("Error in getChartingSegmentData", error);
    }
  };

  useEffect(() => {
    if (selectStrategyType === "ChartingPlatform") {
      getChartingSegmentData();
    }
  }, [activeTab, selectStrategyType, FromDate, ToDate]);

  const loadSectionData = async (section) => {
    if (loadedSections[section]) return;
    try {
      let params;
      if (selectStrategyType === "ChartingPlatform") {
        params = {
          MainStrategy: "ChartingPlatform",
          Strategy: activeTab,
          Symbol: "",
          Username,
          ETPattern: "",
          Timeframe: "",
          From_date: convertDateFormat(FromDate || formattedDate),
          To_date: convertDateFormat(ToDate || Default_To_Date),
          Group: "",
          TradePattern: "",
          PatternName: "",
        };
      } else {
        params = {
          MainStrategy:
            selectStrategyType === "Scalping"
              ? selectedRowData?.ScalpType === "Multi_Conditional"
                ? "NewScalping"
                : selectStrategyType
              : selectStrategyType,
          Strategy:
            selectStrategyType === "Scalping"
              ? selectedRowData?.Targetselection
              : selectStrategyType === "Option Strategy"
              ? selectedRowData?.STG
              : selectStrategyType === "Pattern"
              ? selectedRowData?.TradePattern
              : "Cash",
          Symbol:
            selectStrategyType === "Scalping" ||
            selectStrategyType === "Pattern"
              ? selectedRowData?.Symbol
              : selectStrategyType === "Option Strategy"
              ? selectedRowData?.IName
              : selectStrategyType === "ChartingPlatform"
              ? selectedRowData?.TSymbol
              : "",
          ETPattern:
            selectStrategyType === "Scalping"
              ? selectedRowData?.TType
              : selectStrategyType === "Option Strategy"
              ? selectedRowData?.Targettype
              : selectStrategyType === "Pattern"
              ? selectedRowData?.Pattern
              : "",
          Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
            ? selectedRowData?.GroupN
            : "",
          Username,
          From_date: convertDateFormat(FromDate || formattedDate),
          To_date: convertDateFormat(ToDate || Default_To_Date),
          Timeframe:
            selectStrategyType === "Pattern" ? selectedRowData?.TimeFrame : "",
          TradePattern: "",
          PatternName: "",
        };
      }
      if (section === "pnlAnalysis") {
        const pnlRes = await get_PnL_Data(params);
        setPnlData({ data: pnlRes.Barchart || [] });
      } else if (section.includes("equity")) {
        const equityRes = await get_EQuityCurveData(params);
        setEquityCurveDetails({ data: equityRes.Equitycurve || [] });
      } else if (section === "drawdown") {
        const drawdownRes = await get_DrapDownData(params);
        setDropDownData({ data: drawdownRes.Drawdown || [] });
      } else if (section === "trades") {
        const [lossRes, profitRes] = await Promise.all([
          get_FiveMostLossTrade(params),
          get_FiveMostProfitTrade(params),
        ]);
        setFiveLossTrade({ data: lossRes.fivelosstrade || [] });
        setFiveProfitTrade({ data: profitRes.fiveprofittrade || [] });
      }
      setLoadedSections((prev) => ({ ...prev, [section]: true }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Failed to load ${section} data`,
        text: error.message,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    setOpenSection(null); // Reset open section when activeTab changes
  }, [activeTab]);

  const ReportSection = ({ title, section, children }) => {
    const isOpen = openSection === section;
    const sectionRef = (el) => (sectionRefs.current[section] = el); // Assign ref to this section

    const toggleSection = async () => {
      if (!isOpen) {
        setOpenSection(section); // Open this section, closing others
        await loadSectionData(section);
        // Scroll to the opened section after a slight delay to ensure rendering
        setTimeout(() => {
          sectionRefs.current[section]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        setOpenSection(null); // Close this section
      }
    };

    const renderButtonContent = () => {
      if (!isOpen) return "🔼 Show Data";
      return loadedSections[section] ? (
        "🔽 Hide Data"
      ) : (
        <>
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
            aria-hidden="true"
          ></span>
          Loading Data...
        </>
      );
    };

    return (
      <div ref={sectionRef} className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="m-0">{title}</h5>
          <button className="btn btn-primary btn-sm" onClick={toggleSection}>
            {renderButtonContent()}
          </button>
        </div>
        {isOpen && (
          <div className="card-body">
            {loadedSections[section] ? (
              children
            ) : (
              <div className="spinner-border text-primary" />
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (selectStrategyType === "ChartingPlatform") {
      setLoadedSections({
        overview: false,
        pnlAnalysis: false,
        equity: false,
        drawdown: false,
        trades: false,
        profitLoss: false,
        consistent: false,
      });
      setShowReportSections(true);
    }
  }, [selectStrategyType, activeTab, FromDate, ToDate]);

  const getColumnsForStrategy = () => {
    switch (selectStrategyType) {
      case "Scalping":
        return columns();
      case "Option Strategy":
        return columns1();
      case "Pattern":
        return columns2();
      case "ChartingPlatform":
        return getColumns10();
      default:
        return columns();
    }
  };

  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    const autoSubmitIfNeeded = async () => {
      if (
        !hasSubmittedRef.current &&
        location?.state?.goto === "dashboard" &&
        selectedRowData
      ) {
        hasSubmittedRef.current = true;
        await handleSubmit();
      }
    };

    autoSubmitIfNeeded();
  }, [selectedRowData, location?.state?.goto]);

  console.log("getAllTradeData.data", getAllTradeData.data);

  return (
    <Content
      Page_title={"📊 Trade History "}
      button_status={false}
      backbutton_status={true}
    >
      <div className="iq-card-body">
        <div className="card-body">
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label className="form-label">Strategy Type</label>
                <select
                  className="form-select"
                  value={selectStrategyType}
                  onChange={(e) => {
                    setStrategyType(e.target.value);
                    sessionStorage.setItem("StrategyType", e.target.value);
                  }}
                >
                  {strategyNames.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label className="form-label">From Date</label>
                <DatePicker
                  className="form-control"
                  selected={FromDate || formattedDate}
                  onChange={setFromDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label className="form-label">To Date</label>
                <DatePicker
                  className="form-control"
                  selected={ToDate || Default_To_Date}
                  onChange={setToDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
          {selectStrategyType === "Scalping" ? (
            <div className="mb-4">
              <h5>Scalping</h5>
              {tradeHistory.data1?.length > 0 ? (
                <GridExample
                  columns={getColumnsForStrategy()}
                  data={tradeHistory.data1}
                  onRowSelect={handleRowSelect}
                  checkBox={true}
                  isChecked={checkedRows}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
          ) : (
            <div className="mb-4">
              <h5>{selectStrategyType}</h5>
              {selectStrategyType === "ChartingPlatform" && (
                <div className="container">
                  <div className="d-flex justify-content-center">
                    <ul
                      className="nav nav-pills shadow rounded-pill p-1"
                      style={{ backgroundColor: "#f1f3f5" }}
                    >
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Cash" ? "active" : ""
                          } rounded-pill`}
                          onClick={() => setActiveTab("Cash")}
                          style={{
                            padding: "10px 20px",
                            margin: "5px",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          Cash
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Future" ? "active" : ""
                          } rounded-pill`}
                          onClick={() => setActiveTab("Future")}
                          style={{
                            padding: "10px 20px",
                            margin: "5px",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          Future
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Option" ? "active" : ""
                          } rounded-pill`}
                          onClick={() => setActiveTab("Option")}
                          style={{
                            padding: "10px 20px",
                            margin: "5px",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          Option
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {(
                selectStrategyType === "ChartingPlatform"
                  ? getChartingData?.length > 0
                  : tradeHistory.data?.length
              ) ? (
                <GridExample
                  columns={getColumnsForStrategy()}
                  data={
                    selectStrategyType === "ChartingPlatform"
                      ? getChartingData
                      : tradeHistory.data
                  }
                  onRowSelect={handleRowSelect}
                  checkBox={
                    selectStrategyType === "ChartingPlatform" ? false : true
                  }
                  isChecked={checkedRows}
                />
              ) : (
                <NoDataFound />
              )}
            </div>
          )}
          {selectStrategyType !== "ChartingPlatform" && (
            <div className="d-grid gap-2">
              <button
                className="addbtn"
                onClick={handleSubmit}
                disabled={!selectedRowData}
              >
                📜 Generate History
              </button>
            </div>
          )}
          {showReportSections && (
            <div className="mt-5">
              <ReportSection
                title="Total Profit/Loss Overview"
                section="overview"
              >
                <div
                  className="pnl-overview"
                  style={{
                    color: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "1.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    💰 Total PnL: ₹
                    <span
                      className="badge ms-2"
                      style={{
                        backgroundColor:
                          getAllTradeData.Overall[0]?.PnL > 0
                            ? "#008000"
                            : "#B22222",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      {getAllTradeData.Overall[0]?.PnL?.toFixed(2) || "0.00"}
                    </span>
                  </h4>
                </div>
                <GridExample
                  columns={columns3(selectStrategyType)}
                  data={getAllTradeData.data}
                  checkBox={false}
                />
              </ReportSection>
              <ReportSection title="Profit/Loss Analysis" section="pnlAnalysis">
                <ProfitAndLossGraph data={getPnLData.data} />
              </ReportSection>
              <ReportSection title="Equity Curve Analysis" section="equity">
                <div style={{ height: "350px", overflow: "hidden" }}>
                  <ChartComponent data={getEquityCurveDetails.data} />
                </div>
                <GridExample
                  columns={columns5(selectStrategyType)}
                  data={getEquityCurveDetails.data}
                  checkBox={false}
                />
              </ReportSection>
              <ReportSection title="Drawdown Analysis" section="drawdown">
                <div style={{ height: "350px", overflow: "hidden" }}>
                  <DrawdownChartComponent data={getDropDownData.data} />
                </div>
                <GridExample
                  columns={columns6()}
                  data={getDropDownData.data}
                  checkBox={false}
                />
              </ReportSection>
              <ReportSection title="Top Trades Analysis" section="trades">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div
                        className="card-header text-white"
                        style={{ backgroundColor: "#006400" }}
                      >
                        💹 Top Profitable Trades
                      </div>
                      <div className="card-body">
                        <ApexCharts
                          options={getChartOptions(
                            getFiveProfitTrade.data,
                            "Profit"
                          )}
                          series={getFiveProfitTrade.data.map((t) => t.PnL)}
                          type="pie"
                          height={350}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div
                        className="card-header text-white"
                        style={{ backgroundColor: "#8B0000" }}
                      >
                        📉 Top Loss-Making Trades
                      </div>
                      <div className="card-body">
                        <ApexCharts
                          options={getChartOptions(
                            getFiveLossTrade.data,
                            "Loss"
                          )}
                          series={getFiveLossTrade.data.map((t) =>
                            Math.abs(t.PnL)
                          )}
                          type="pie"
                          height={350}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ReportSection>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

const getChartOptions = (data, type) => ({
  chart: { type: "pie" },
  labels: data.map((t) => t.ETime.split(" ")[1].substring(0, 5)),
  colors:
    type === "Profit"
      ? ["#28a745", "#218838", "#1e7e34"]
      : ["#dc3545", "#c82333", "#bd2130"],
  legend: { position: "bottom" },
  dataLabels: { enabled: true },
  tooltip: {
    y: {
      formatter: (value) => `₹${value.toFixed(2)}`,
    },
  },
});

export default Tradehistory;