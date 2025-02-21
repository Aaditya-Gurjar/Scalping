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
import {
  get_Trade_Data,
  ChartingPlatformsegment,
  getChargingPlatformDataApi,
} from "../../CommonAPI/User";
import DatePicker from "react-datepicker";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  columns8,
  columns7,
  columns6,
  columns5,
  columns4,
  columns3,
  columns2,
  columns1,
  columns,
  getColumns10,
} from "./TradeHistoryColumn";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { useLocation } from "react-router-dom";
import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
import ChartComponent from "../../admin/AdvanceChart/ChartComponent";

const Tradehistory = () => {
  const StrategyType = sessionStorage.getItem("StrategyType");
  const location = useLocation();
  const sectionRefs = useRef({});
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
  const [getCharting, setGetCharting] = useState([]);
  const [selectSegmentType, setSegmentType] = useState("");
  const [getChartingSegments, setChartingSegments] = useState([]);

  // Track if data for a section has been loaded.
  const [loadedSections, setLoadedSections] = useState({
    overview: false,
    pnlAnalysis: false,
    equity: false,
    drawdown: false,
    trades: false,
    profitLoss: false,
    consistent: false,
  });

  // Data states
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

  const Username = localStorage.getItem("name");

  // Date configuration
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  const Defult_To_Date = `${tomorrow.getFullYear()}.${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchStrategyTypes = async () => {
      try {
        const res = await getStrategyType();
        setStrategyNames(res.Data || []);
      } catch (error) {
        console.error("Error fetching strategy types:", error);
      }
    };

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

    fetchStrategyTypes();
    fetchTradeHistory();
  }, [selectStrategyType]);

  const convertDateFormat = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(dateObj.getDate()).padStart(2, "0")}`;
  };

  // When a row is selected, reset open sections and hide report sections.
  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
    setOpenSections({});
    setShowReportSections(false);
  };

  const handleSubmit = async () => {
    if (!selectedRowData) {
      Swal.fire({
        icon: "warning",
        title: "Please select a row first!",
        confirmButtonColor: "#1ccc8a",
      });
      return;
    }

    // Reset loaded sections so that new data will be fetched
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
            ? selectedRowData.ScalpType !== "Multi_Conditional"
              ? selectedRowData.Targetselection
              : selectedRowData.Targetselection
            : selectStrategyType === "Option Strategy"
            ? selectedRowData.STG
            : selectStrategyType === "Pattern"
            ? selectedRowData.TradePattern
            : "Cash",
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
        To_date: convertDateFormat(ToDate || Defult_To_Date),
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
      } else {
        Swal.fire({
          icon: "error",
          title: tradeRes.message,
          text: tradeRes.message,
          confirmButtonColor: "#1ccc8a",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load initial data",
        text: error.message,
        confirmButtonColor: "#1ccc8a",
      });
    }
  };

  const loadSectionData = async (section) => {
    if (loadedSections[section]) return;
    try {
      // For "overview", assume data is already loaded via handleSubmit.
      if (section === "overview") {
        setLoadedSections((prev) => ({ ...prev, [section]: true }));
        return;
      }
      const params = {
        MainStrategy:
          selectStrategyType === "Scalping"
            ? selectedRowData.ScalpType === "Multi_Conditional"
              ? "NewScalping"
              : selectStrategyType
            : selectStrategyType,
        Strategy:
          selectStrategyType === "Scalping"
            ? selectedRowData.ScalpType !== "Multi_Conditional"
              ? selectedRowData.Targetselection
              : selectedRowData.Targetselection
            : selectStrategyType === "Option Strategy"
            ? selectedRowData.STG
            : selectStrategyType === "Pattern"
            ? selectedRowData.TradePattern
            : "Cash",
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
        To_date: convertDateFormat(ToDate || Defult_To_Date),
        Timeframe:
          selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
        TradePattern: "",
        PatternName: "",
      };

      console.log("section-", section,"-");


      if (section === "pnlAnalysis") {
        const pnlRes = await get_PnL_Data(params);
        setPnlData({ data: pnlRes.Barchart || [] });
      } else if (section?.includes("equity")) {
      console.log("section->", section);

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
        confirmButtonColor: "#1ccc8a",
      });
    }
  };

  // Instead of a single shared state, track open/closed state for each section.
  const [openSections, setOpenSections] = useState({});

  // ReportSection component uses its own open state from openSections.
  const ReportSection = ({ title, section, children }) => {
    const isOpen = openSections[section] || false;

    const toggleSection = async () => {
      if (!isOpen) {
        setOpenSections((prev) => ({ ...prev, [section]: true }));
        await loadSectionData(section);
      } else {
        setOpenSections((prev) => ({ ...prev, [section]: false }));
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
      <div className="card mb-3">
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

  const getColumnsForStrategy = () => {
    switch (selectStrategyType) {
      case "Scalping":
        return columns();
      case "Option Strategy":
        return columns1();
      case "Pattern" || "Pattern Script":
        return columns2();
      case "ChartingPlatform":
        return getColumns10();
      default:
        return columns();
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: "2rem" }}>
      <div className="row">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">📊 Trade History Analysis</h4>
            </div>
          </div>

          <div className="iq-card-body">
            <div className="card-body">
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label className="form-label">Strategy Type</label>
                    <select
                      className="form-select"
                      value={selectStrategyType}
                      onChange={(e) => {
                        setStrategyType(e.target.value);
                        sessionStorage.setItem("StrategyType", e.target.value);
                      }}>
                      {strategyNames.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectStrategyType === "ChartingPlatform" && (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="form-group">
                      <label className="form-label">Segment Type</label>
                      <div onWheel={(e) => e.stopPropagation()}>
                        <select
                          className="form-select"
                          value={selectSegmentType}
                          onChange={(e) => setSegmentType(e.target.value)}>
                          {getChartingSegments.map((item) => (
                            <option key={item.Segment} value={item.Segment}>
                              {item.Segment}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label className="form-label">From Date</label>
                    <DatePicker
                      className="form-control"
                      selected={FromDate || formattedDate}
                      onChange={setFromDate}
                      dateFormat="yyyy.MM.dd"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label className="form-label">To Date</label>
                    <DatePicker
                      className="form-control"
                      selected={ToDate || Defult_To_Date}
                      onChange={setToDate}
                      dateFormat="yyyy.MM.dd"
                    />
                  </div>
                </div>
              </div>
              {selectStrategyType === "Scalping" ? (
                <div className="mb-4">
                  <h5>Multi Conditional Strategies</h5>
                  {tradeHistory.data1?.length > 0 ? (
                    <GridExample
                      columns={getColumnsForStrategy()}
                      data={tradeHistory.data1}
                      onRowSelect={handleRowSelect}
                      checkBox={true}
                    />
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <h5>{selectStrategyType} Strategies</h5>
                  {tradeHistory.data?.length > 0 ? (
                    <GridExample
                      columns={getColumnsForStrategy()}
                      data={tradeHistory.data}
                      onRowSelect={handleRowSelect}
                      checkBox={true}
                    />
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              )}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                  disabled={!selectedRowData}
                >
                  📜 Generate History
                </button>
              </div>
              {showReportSections && (
                <div className="mt-5">
                  <ReportSection
                    title="Total Profit/Loss Overview"
                    section="overview">
                    <div
                      className="pnl-overview"
                      style={{
                        color: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        textAlign: "center",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        marginBottom: "20px",
                      }}>
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
                                : "#B22222", // Dark Green & Dark Red
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "5px",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                          }}
                        >
                          {getAllTradeData.Overall[0]?.PnL?.toFixed(2) ||
                            "0.00"}
                        </span>
                      </h4>
                    </div>
                    <GridExample
                      columns={columns3(selectStrategyType)}
                      data={getAllTradeData.data}
                      checkBox={false}
                    />
                  </ReportSection>

                  <ReportSection
                    title="Profit/Loss Analysis"
                    section="pnlAnalysis">
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
                      {/* Top Profitable Trades */}
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

                      {/* Top Loss-Making Trades */}
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
        </div>
      </div>
    </div>
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
