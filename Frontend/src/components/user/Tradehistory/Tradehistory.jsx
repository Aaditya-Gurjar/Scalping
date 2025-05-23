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
import { overallReportApi } from "../../CommonAPI/User";

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
  const [openSection, setOpenSection] = useState(null);  
  const [AnalyticsOverview, setAnalyticsOverview] = useState([]); 
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
        setStrategyNames([]);  
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

  useEffect(() => {
    setCheckedRows([]); // Reset checked rows
    setSelectedRowData(null); // Reset selected row data
  }, [selectStrategyType]);

  useEffect(() => {
    setOpenSection(null); // Close all open dropdowns when switching tabs
  }, [selectStrategyType]);

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
  console.log("Selected Row Data:", selectedRowData, "selectStrategyType", selectStrategyType);

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
        Symbol:  selectStrategyType === "Option Strategy"? selectedRowData.MainSymbol : selectedRowData.Symbol,
        Username: selectedRowData.Username || "",
        ETPattern:  selectStrategyType ==="Pattern" ? selectedRowData.Pattern :(selectedRowData.TType ||selectedRowData.Targettype),
        Timeframe: selectedRowData.TimeFrame || "",
        From_date: convertDateFormat(FromDate || formattedDate),
        To_date: convertDateFormat(ToDate || Default_To_Date),
        Group: selectedRowData.GroupN || "",
        TradePattern: "",
        PatternName: "",
      };

      // Fetch Total Profit/Loss Overview data
      const overviewParams = {
        MainStrategy: basicData.MainStrategy,
        Strategy: basicData.Strategy,
        Symbol: basicData.Symbol,
        Username: basicData.Username,
        ETPattern: basicData.ETPattern,
        Timeframe: basicData.Timeframe,
        From_date: basicData.From_date,
        To_date: basicData.To_date,
        Group: basicData.Group,
        TradePattern: "",
        PatternName: "",
        InitialDeposite: 0,
      };

      console.log("Overview Params:", overviewParams);
      const overviewRes = await get_Trade_History(overviewParams);
     
      if (!overviewRes?.data?.length && !overviewRes?.Overall?.length) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "No records available.",
          confirmButtonColor: "#1ccc8a",
          timer: 2000,
        });
        return; // Stop execution and prevent auto-scroll
      }

      setAllTradeData({
        data: overviewRes?.data || [],
        Overall: overviewRes?.Overall || [],
      });

      // Open Total Profit/Loss Overview section
      setShowReportSections(true);
      setLoadedSections((prev) => ({ ...prev, overview: true }));
      setOpenSection("overview");

      // Scroll to the Total Profit/Loss Overview section
      setTimeout(() => {
        sectionRefs.current["overview"]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load data",
        text: error.message,
        confirmButtonColor: "#1ccc8a",
        timer: 2000,
      });
    }
  };
console.log("selectedRowData", selectedRowData);
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
        InitialDeposite: 0,
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
      // const params = {
      //   MainStrategy:
      //     selectStrategyType === "Scalping"
      //       ? selectedRowData?.ScalpType === "Multi_Conditional"
      //         ? "NewScalping"
      //         : selectStrategyType
      //       : selectStrategyType,
      //   Strategy:
      //     selectStrategyType === "Scalping"
      //       ? selectedRowData?.Targetselection
      //       : selectStrategyType === "Option Strategy"
      //       ? selectedRowData?.STG
      //       : selectStrategyType === "Pattern"
      //       ? selectedRowData?.TradePattern
      //       : "Cash",
      //   Symbol: selectStrategyType === "Scalping" ? selectedRowData?.Symbol : selectedRowData?.MainSymbol,
      //   Username: selectedRowData?.Username || "",
      //   ETPattern: selectStrategyType ==="Pattern" ? selectedRowData.Pattern :(selectedRowData.TType ||selectedRowData.Targettype),
      //   Timeframe: selectedRowData?.TimeFrame || "",
      //   From_date: convertDateFormat(FromDate || formattedDate),
      //   To_date: convertDateFormat(ToDate || Default_To_Date),
      //   Group: selectedRowData?.GroupN || "",
      //   TradePattern: "",
      //   PatternName: "",
      //   InitialDeposite: 0,
      // };

      const  params = {
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
      Symbol:  selectStrategyType === "Option Strategy"? selectedRowData.MainSymbol : selectedRowData.Symbol,
      Username: selectedRowData.Username || "",
      ETPattern:  selectStrategyType ==="Pattern" ? selectedRowData.Pattern :(selectedRowData.TType ||selectedRowData.Targettype),
      Timeframe: selectedRowData.TimeFrame || "",
      From_date: convertDateFormat(FromDate || formattedDate),
      To_date: convertDateFormat(ToDate || Default_To_Date),
      Group: selectedRowData.GroupN || "",
      TradePattern: "",
      PatternName: "",
      InitialDeposite: 0,
      }

      if (section === "pnlAnalysis") {
        const pnlRes = await get_PnL_Data(params);
        setPnlData({ data: pnlRes.Barchart || [] });
      } else if (section.includes("AnalyticsOverview")) {
        const analyticsRes = await overallReportApi(params);
        setAnalyticsOverview({ data: analyticsRes.Data || [] });
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

  return (
    <Content
      Page_title={"📊 Trade History "}
      button_status={false}
      backbutton_status={true}
    >
      <div className="iq-card-body">
        <div className="">
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6 col-lg-8">
              <div className="d-flex  report-btns">
                <ul
                  className="nav nav-pills shadow rounded-pill p-1"
                 
                >
                  {strategyNames.map((type, index) => (
                    <li className="nav-item" key={index}>
                      <button
                        className={`nav-link ${
                          selectStrategyType === type ? "active" : ""
                        } rounded-pill`}
                        onClick={() => {
                          setStrategyType(type);
                          sessionStorage.setItem("StrategyType", type);
                        }}
                        style={{
                          padding: "10px 20px",
                          margin: "5px",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            <div className="col-12 col-md-6 col-lg-4">
           <div className="history-page-dates">
           <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group">
                <label className="form-label">Select From Date</label>
                <DatePicker
                  className="form-control"
                  selected={FromDate || formattedDate}
                  onChange={setFromDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="form-group">
                <label className="form-label">Select To Date</label>
                <DatePicker
                  className="form-control"
                  selected={ToDate || Default_To_Date}
                  onChange={setToDate}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
           </div>
           </div>
          </div>
          {selectStrategyType === "Scalping" ? (
            <div className="mb-4">
              <h5 className="card-title">Scalping</h5>
              {tradeHistory.data1?.length > 0 ? (
                <>
                  <GridExample
                    columns={getColumnsForStrategy()}
                    data={tradeHistory.data1}
                    onRowSelect={handleRowSelect}
                    checkBox={true}
                    isChecked={checkedRows}
                  />
                  <div className="d-grid gap-2">
                    <button
                      className="addbtn hoverNone"
                      onClick={handleSubmit}
                      disabled={!selectedRowData}
                    >
                      📜 Generate History
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NoDataFound />
                  <style>{`.addbtn { display: none; }`}</style>
                </>
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
                <>
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
                  {selectStrategyType !== "ChartingPlatform" && (
                    <div className="d-grid gap-2">
                      <button
                        className="addbtn hoverNone"
                        onClick={handleSubmit}
                        disabled={!selectedRowData}
                      >
                        📜 Generate History
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <NoDataFound />
                  <style>{`.addbtn { display: none; }`}</style>
                </>
              )}
            </div>
          )}
          {showReportSections && (
            <div className="mt-5">
              {/* AnalyticsOverview Section */}

              <ReportSection title="Total Profit/Loss Overview" section="overview">
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


              <ReportSection title="Analytics Overview" section="AnalyticsOverview">
                {AnalyticsOverview.data?.length > 0 ? (
                  <div className="analytics-overview">
                    <div className="row">
                      {Object.entries(AnalyticsOverview.data[0]).map(([key, value]) => (
                        <div className="col-md-4 mb-3" key={key}>
                          <div className="card modern-card-shadow">
                            <div className="card-body text-center">
                              <h6 className="text-muted">{key}</h6>
                              <h5 className="text-primary">
                                {value !== null ? value : "N/A"}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NoDataFound />
                )}
              </ReportSection>

              {/* Profit/Loss Overview Section */}
              

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
    ? [
        "#22c55e", // Emerald Green
        "#3b82f6", // Blue
        "#10b981", // Teal
        "#6366f1", // Indigo
        "#f59e0b"  // Amber
      ]
    : [
        "#b91c1c", // Dark Red
        "#dc2626", // Red
        "#991b1b", // Deeper Red
        "#7f1d1d", // Blood Red
        "#450a0a"  // Near-Black Red
      ],

  legend: { position: "bottom" },
  dataLabels: { enabled: true },
  tooltip: {
    y: {
      formatter: (value) => `₹${value.toFixed(2)}`,
    },
  },
});


export default Tradehistory;