import React, { useState, useEffect } from "react";
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
const Tradehistory = () => {
  const location = useLocation();
  console.log("state location data", location);

  const adminPermission = localStorage.getItem("adminPermission");

  const [selectStrategyType, setStrategyType] = useState("");

  const [strategyNames, setStrategyNames] = useState([]);
  const [tradeHistory, setTradeHistory] = useState({
    data: [],
    data1: [],
  });
  // console.log("tradeHistorytradeHistory tradeHistorytradeHistory", tradeHistory.data);

  const [selectedRowData, setSelectedRowData] = useState("");
  // console.log("selectedRowData selectedRowData selectedRowData123", selectedRowData);


  const [preSelectTableType, setPreSelectTableType] = useState("");

  const [checkedRows, setCheckedRows] = useState([]);


  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [report, setReport] = useState({ loading: true, data1: [], data2: [] });
  const [getPnLData, setPnlData] = useState({
    loading: true,
    data: [],
    data2: [],
  });
  const [getEquityCurveDetails, setEquityCurveDetails] = useState({
    loading: true,
    data: [],
  });
  const [getDropDownData, setDropDownData] = useState({
    loading: true,
    data: [],
  });
  const [getFiveLossTrade, setFiveLossTrade] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [getFiveProfitTrade, setFiveProfitTrade] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [getCharting, setGetCharting] = useState([]);
  const [selectSegmentType, setSegmentType] = useState("");
  const [getChartingSegments, setChartingSegments] = useState([]);
  const [tableType, setTableType] = useState("Scalping");


  const [getAllTradeData, setAllTradeData] = useState({
    loading: true,
    data: [],
    data1: "",
    data2: "",
    data3: "",
    data4: "",
    Overall: [],
  });




  const Username = localStorage.getItem("name");

  // set Defult Date
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // from date
  const DefultToDate = new Date();
  DefultToDate.setDate(DefultToDate.getDate() + 1);
  const year1 = DefultToDate.getFullYear();
  const month1 = String(DefultToDate.getMonth() + 1).padStart(2, "0");
  const day1 = String(DefultToDate.getDate()).padStart(2, "0");
  const Defult_To_Date = `${year1}.${month1}.${day1}`;

  // Date Formetor
  const convertDateFormat = (date) => {
    if (date == "") {
      return "";
    }
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    if (selectSegmentType) getChartingScript();
  }, [selectSegmentType]);

  useEffect(() => {
    getChartingData();
  }, []);

  const getChartingData = async () => {
    await getChargingPlatformDataApi(Username)
      .then((res) => {
        if (res.Status) {
          console.log("resssss", res);
          setChartingSegments(res.Client);
          setSegmentType(res?.Client?.[0]?.Segment);
        } else {
          setChartingSegments([]);
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const getChartingScript = async () => {
    const filterData = getChartingSegments.filter(
      (item) => item.Segment == selectSegmentType
    );
    const req = { Username: Username, Segment: filterData[0].Segment };
    await ChartingPlatformsegment(req)
      .then((response) => {
        if (response.Status) {
          setGetCharting(response.Client);
        } else {
          setGetCharting([]);
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const GetTradeHistory = async () => {
    const data = { Data: selectStrategyType, Username: Username };
    //GET TRADEHISTORY
    await get_User_Data(data).then((response) => {
      if (response.Status) {
        setTradeHistory({
          data: response?.Data,
          data1: response?.NewScalping,
        });
      } else {
        setTradeHistory({
          data: [],
          data1: [],
        });
      }
    })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });
  };

  const strategyType = async () => {
    try {
      const res = await getStrategyType();
      if (res.Data) {
        setStrategyNames(res.Data);
      } else {
        console.log("Error in getting the StrategyType");
      }
    } catch (error) {
      console.log("Error in getting the StrategyType", error);
    }
  };
  useEffect(() => {
    strategyType();
    GetTradeHistory();
  }, [selectStrategyType]);




  useEffect(() => {
    if (location?.state?.goto && location?.state?.goto === 'dashboard') {

      if (location?.state?.type == "MultiCondition") {
        setSelectedRowData(tradeHistory.data1?.[location?.state?.RowIndex])
      } else {
        setSelectedRowData(tradeHistory.data?.[location?.state?.RowIndex])
      }
      setPreSelectTableType(location?.state?.type)

    }
  }, [tradeHistory, location?.state?.RowIndex]);


  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
  };

  useEffect(() => {
    if (location?.state?.type && location?.state?.type != "MultiCondition") {
      setStrategyType(location?.state?.type);
    }
    else if (location?.state?.type == "MultiCondition") {
      setTableType("MultiCondition")
      setStrategyType("Scalping");
    }
    else {
      setStrategyType("Scalping");
    }
  }, [preSelectTableType])

 

  const handleSubmit = async () => {
    const data = {
      MainStrategy:
        selectStrategyType == "Scalping" &&
          selectedRowData.ScalpType == "Multi_Conditional"
          ? "NewScalping"
          : selectStrategyType,
      Strategy:
        selectStrategyType == "Scalping" &&
          selectedRowData.ScalpType != "Multi_Conditional"
          ? selectedRowData && selectedRowData.ScalpType
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.STG
            : selectStrategyType == "Pattern"
              ? selectedRowData && selectedRowData.TradePattern
              : selectStrategyType == "Scalping" &&
                selectedRowData.ScalpType == "Multi_Conditional"
                ? selectedRowData && selectedRowData.Targetselection
                : "Cash",
      Symbol:
        selectStrategyType == "Scalping" || selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.Symbol
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.IName
            : selectStrategyType == "ChartingPlatform"
              ? selectedRowData && selectedRowData.TSymbol
              : "",
      Username: Username,
      ETPattern:
        selectStrategyType == "Scalping"
          ? ""
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.Targettype
            : selectStrategyType == "Pattern"
              ? selectedRowData && selectedRowData.Pattern
              : "",
      Timeframe:
        selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.TimeFrame
          : "",
      From_date: convertDateFormat(FromDate == "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate == "" ? Defult_To_Date : ToDate),
      Group:
        selectStrategyType == "Scalping" ||
          selectStrategyType == "Option Strategy"
          ? selectedRowData && selectedRowData.GroupN
          : "",
      TradePattern: "",
      PatternName: "",
    };
    await get_Trade_History(data)
      .then((response) => {
        if (response.Status) {
          setAllTradeData({
            loading: false,
            data: response.data,
            data1: response.profitconsistant,
            data2: response.profitconcount,
            data3: response.lossconcount,
            data4: response.lossconsistant,
            Overall: response.Overall,
          });
          setShowTable(true);
        } else {
          Swal.fire({
            background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "No Records found",
            icon: "info",
            timer: 1500,
            timerProgressBar: true,
          });
          setAllTradeData({
            loading: false,
            data: [],
            data1: "",
            data2: "",
            data3: "",
            data4: "",
            Overall: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });

    //GET PNL DATA
    await get_PnL_Data(data)
      .then((response) => {
        if (response.Status) {
          const newDataArray = response.Barchart.map((item) => ({
            PnL: item.PnL,
            ETime: item.ETime.split(" ")[1].substring(0, 5),
          }));

          setPnlData({
            loading: false,
            data: newDataArray,
            data2: response.Barchart,
          });
        } else {
          setPnlData({
            loading: false,
            data: [],
            data2: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    //GET GetEquity CurveData
    await get_EQuityCurveData(data)
      .then((response) => {
        if (response.Status) {
          setEquityCurveDetails({
            loading: false,
            data: response.Equitycurve,
          });
        } else {
          setEquityCurveDetails({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    //GET GetEquity CurveData
    await get_DrapDownData(data)
      .then((response) => {
        if (response.Status) {
          setDropDownData({
            loading: false,
            data: response.Drawdown,
          });
        } else {
          setDropDownData({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    // GET 5 MONST PROFIT TRADE
    await get_FiveMostLossTrade(data)
      .then((response) => {
        if (response.Status) {
          setFiveLossTrade({
            loading: false,
            data: response.fivelosstrade,
            data1: response.fivelosstradeall,
          });
        } else {
          setFiveLossTrade({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    await get_FiveMostProfitTrade(data)
      .then((response) => {
        if (response?.Status) {
          setFiveProfitTrade({
            loading: false,
            data: response.fiveprofittrade,
            data1: response.fiveprofittradeall,
          });
        } else {
          setFiveProfitTrade({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    // Get Trade Report
    await get_Trade_Data(data)
      .then((response) => {
        if (response?.Status) {
          setReport({
            loading: false,
            data1: response.Data1,
            data2: response.Data2,
          });
        } else {
          setReport({
            loading: false,
            data1: [],
            data2: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });
  };



    useEffect(() => {
      setTableType("Scalping");
    }, [selectStrategyType]);

  const chartOptions = {
    zoom: { enabled: true },
    data: getPnLData && getPnLData.data,
    series: [{ type: "bar", xKey: "ETime", yKey: "PnL" }],
  };

  const chartOptions1 = {
    zoom: { enabled: true },
    data: getEquityCurveDetails && getEquityCurveDetails.data,
    series: [
      {
        type: "line",
        xKey: selectStrategyType == "Pattern" ? "ETime" : "ExitTime",
        yKey: selectStrategyType == "Scalping" ? "EquityCurve" : "PnL",
      },
    ],
  };

  const chartOptions2 = {
    zoom: { enabled: true },
    data: getDropDownData && getDropDownData.data,
    series: [{ type: "line", xKey: "ETime", yKey: "Drawdown" }],
  };

  const ETime =
    getFiveProfitTrade && getFiveProfitTrade.data.map((item) => item.ETime);
  const PnL =
    getFiveProfitTrade && getFiveProfitTrade.data.map((item) => item.PnL);

  const ETime1 =
    getFiveLossTrade && getFiveLossTrade.data.map((item) => item.ETime);
  const PnL1 =
    getFiveLossTrade &&
    getFiveLossTrade.data.map((item) =>
      item.PnL < 0 ? -1 * item.PnL : item.PnL
    );

  const options = {
    series: PnL,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ETime,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const options1 = {
    series: PnL1,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ETime1,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    setTableType("Scalping");
  }, [selectStrategyType]);
  useEffect(() => {
    setShowTable(false);
  }, [
    selectStrategyType,
    FromDate,
    ToDate,
    selectedRowData,
    selectSegmentType,
  ]);


    useEffect(() => {
      if (selectStrategyType == "Scalping") {
        setTableType("MultiCondition");
      } else {
        setTableType("Scalping");
      }
    }, [selectStrategyType]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Trade History</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div className="was-validated ">
                <div className="row">
                  <div
                    className={`form-group  ${selectStrategyType == "ChartingPlatform" || "Scalping" ? "col-lg-3" : "col-lg-4"}`}>
                    <label>Select Strategy Type</label>
                    <select
                      className="form-select"
                      required=""
                      onChange={(e) => setStrategyType(e.target.value)}
                      value={selectStrategyType}>
                      {strategyNames.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {selectStrategyType == "Scalping" && (
                    <div className="form-group col-lg-3">
                      {/* {console.log("selectStrategyType == Scalping", selectStrategyType == "Scalping")} */}
                      <label>Table Type</label>
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) => setTableType(e.target.value)}
                        value={tableType}>
                        <option value="Scalping">Scalping</option>
                        <option value="MultiCondition">Multi Condition</option>
                      </select>
                    </div>
                  )}
                  {console.log("getChartingSegments", getChartingSegments)}
                  {selectStrategyType == "ChartingPlatform" && (
                    <div className="form-group col-lg-3">
                      <label>Select Segment Type</label>
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) => setSegmentType(e.target.value)}
                        value={selectSegmentType}>
                        {getChartingSegments.map((item, index) => {
                          return (
                            <option key={index} value={item.Segment}>
                              {item.Segment}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  <div
                    className={`form-group ${selectStrategyType == "ChartingPlatform" || "Scalping" ? "col-lg-3" : "col-lg-4"}`}>
                    <label>Select form Date</label>
                    <DatePicker
                      className="form-select"
                      selected={FromDate == "" ? formattedDate : FromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>
                  <div
                    className={`form-group ${selectStrategyType == "ChartingPlatform" || "Scalping" ? "col-lg-3" : "col-lg-4"}`}>
                    <label>Select To Date</label>
                    <DatePicker
                      className="form-select custom-date"
                      selected={ToDate == "" ? Defult_To_Date : ToDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </div>
                </div>
              </div>
              {/* {(
                selectStrategyType == "ChartingPlatform"
                  ? getCharting
                  : tradeHistory.data
              ) ? (
                tableType === "Scalping" && (
                  <div className="modal-body">
                    
                    <GridExample
                      columns={
                        selectStrategyType === "Scalping"
                          ? columns()
                          : selectStrategyType === "Option Strategy"
                            ? columns1()
                            : selectStrategyType === "Pattern"
                              ? columns2()
                              : selectStrategyType == "ChartingPlatform"
                                ? getColumns10()
                                : columns()
                      }
                      data={
                        selectStrategyType == "ChartingPlatform"
                          ? getCharting
                          : tradeHistory.data
                      }
                      onRowSelect={handleRowSelect}
                      checkBox={true}
                      isChecked={location?.state?.RowIndex}
                    />
                  </div>
                )
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}>
                  <img
                    src="/assets/images/no-record-found.png"
                    width="30%"
                    alt=""
                  />
                </div>
              )} */}

              {tableType === "Scalping" ? (
                (selectStrategyType === "ChartingPlatform" &&
                  getCharting.length > 0) ||
                (selectStrategyType !== "ChartingPlatform" &&
                  tradeHistory.data.length > 0) ? (
                  <div className="modal-body">
                    <GridExample
                      columns={
                        selectStrategyType === "Scalping"
                          ? columns()
                          : selectStrategyType === "Option Strategy"
                            ? columns1()
                            : selectStrategyType === "Pattern"
                              ? columns2()
                              : selectStrategyType === "ChartingPlatform"
                                ? getColumns10()
                                : columns()
                      }
                      data={
                        selectStrategyType === "ChartingPlatform"
                          ? getCharting
                          : tradeHistory.data
                      }
                      onRowSelect={handleRowSelect}
                      checkBox={true}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}>
                    <img
                      src="/assets/images/no-record-found.png"
                      width="30%"
                      alt="No record found"
                    />
                  </div>
                )
              ) : null}

              {tableType === "MultiCondition" &&
                selectStrategyType === "Scalping" &&
                adminPermission?.includes("Charting Platform") && (
                  <div>
                    <div className="iq-header-title mt-4">
                      <h4 className="card-title">Multi Conditional</h4>
                    </div>
                    {/* <div className="modal-body">
                      {tradeHistory.data1 && tradeHistory.data1.length > 0 ? (
                        <GridExample
                          columns={columns()}
                          data={tradeHistory.data1}
                          onRowSelect={handleRowSelect}
                          checkBox={true}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}>
                          <img
                            src="/assets/images/no-record-found.png"
                            width="30%"
                            alt=""
                          />
                        </div>
                      )}
                    </div> */}
                    <div className="modal-body">
                      {tradeHistory.data1 && tradeHistory.data1.length > 0 ? (

                        <GridExample
                          columns={columns()}
                          data={tradeHistory.data1.map((item, index) => ({
                            ...item,
                            isChecked: checkedRows[index] || false,
                          }))}
                          onRowSelect={handleRowSelect}
                          checkBox={true}
                          isChecked={location?.state?.RowIndex}

                        />

                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <img
                            src="/assets/images/no-record-found.png"
                            width="30%"
                            alt=""
                          />
                        </div>
                      )}
                    </div>

                  </div>
                )}

              <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                Submit
              </button>
              {showTable && (
                <>
                  <div className="accordion" id="accordionExample">
                    {/* Drawdown Total Profit & Loss */}
                    <div>
                      <p
                        className="bold mt-4"
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "black",
                          color:
                            getAllTradeData &&
                              getAllTradeData?.Overall[0]?.PnL < 0
                              ? "red"
                              : "green",
                        }}>
                        Total Profit and Loss:{" "}
                        <span
                          style={{
                            color:
                              getAllTradeData?.Overall[0]?.PnL < 0
                                ? "red"
                                : "green",
                          }}>
                          {getAllTradeData?.Overall[0]?.PnL}
                        </span>
                      </p>
                    </div>
                    <div className="mt-3">
                      {getAllTradeData?.data?.length > 0 ? (
                        <GridExample
                          columns={columns3(selectStrategyType)}
                          data={getAllTradeData.data}
                          onRowSelect={handleRowSelect}
                          checkBox={false}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}>
                          <img
                            src="/assets/images/no-record-found.png"
                            width="30%"
                            alt="No Record Found"
                          />
                        </div>
                      )}
                    </div>

                    {/* Drawdown Graph */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          style={{ fontWeight: "bold" }}>
                          Drawdown Graph
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <div style={{ width: "100%", height: "500px" }}>
                            <AgChartsReact options={chartOptions2} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drawdown Table */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                          style={{ fontWeight: "bold" }}>
                          Drawdown Table
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          {getDropDownData?.data?.length > 0 ? (
                            <GridExample
                              columns={columns6()}
                              data={getDropDownData.data}
                              onRowSelect={handleRowSelect}
                              checkBox={false}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Profit and Loss Graph */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                          style={{ fontWeight: "bold" }}>
                          Profit and Loss Graph
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <p
                            className="bold mt-3"
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              color: "black",
                            }}>
                            Profit and Loss Graph
                          </p>
                          <div style={{ width: "100%", height: "500px" }}>
                            <AgChartsReact options={chartOptions} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 Most profit and loss graph */}

                  <div className="accordion" id="accordionExample">
                    {/* 5 Most Profit & Loss Trades */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFive">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                          style={{ fontWeight: "bold" }}>
                          5 Most Profit & Loss Trades
                        </button>
                      </h2>
                      <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body d-flex">
                          <div style={{ width: "50%", height: "300px" }}>
                            <p
                              className="bold mt-3"
                              style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "black",
                              }}>
                              5 Most Profit Trade
                            </p>
                            <ApexCharts
                              options={options}
                              series={options.series}
                              type="pie"
                              width={options.chart.width}
                            />
                          </div>
                          <div style={{ width: "50%", height: "300px" }}>
                            <p
                              className="bold mt-3"
                              style={{
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "black",
                              }}>
                              5 Most Loss Trade
                            </p>
                            <ApexCharts
                              options={options1}
                              series={options1.series}
                              type="pie"
                              width={options1.chart.width}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Consistent Loss & Profit-Making Trades */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingSix">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                          style={{ fontWeight: "bold" }}>
                          Consistent Loss & Profit-Making Trades
                        </button>
                      </h2>
                      <div
                        id="collapseSix"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSix"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body row">
                          <div className="col-lg-6">
                            <p>
                              Consistent Profit:{" "}
                              <span>{getAllTradeData?.data1}</span>
                            </p>
                            <p>
                              Count Consistent Profit:{" "}
                              <span>{getAllTradeData?.data2}</span>
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p>
                              Consistent Loss:{" "}
                              <span>{getAllTradeData?.data4}</span>
                            </p>
                            <p>
                              Count Consistent Loss:{" "}
                              <span>{getAllTradeData?.data3}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Equity Curve */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingSeven">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSeven"
                          aria-expanded="false"
                          aria-controls="collapseSeven"
                          style={{ fontWeight: "bold" }}>
                          Equity Curve
                        </button>
                      </h2>
                      <div
                        id="collapseSeven"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSeven"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <div style={{ width: "100%", height: "500px" }}>
                            <AgChartsReact options={chartOptions1} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Equity Curve Table */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingEight">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseEight"
                          aria-expanded="false"
                          aria-controls="collapseEight"
                          style={{ fontWeight: "bold" }}>
                          Equity Curve Table
                        </button>
                      </h2>
                      <div
                        id="collapseEight"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingEight"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          {getEquityCurveDetails?.data?.length > 0 ? (
                            <GridExample
                              columns={columns5(selectStrategyType)}
                              data={getEquityCurveDetails.data}
                              onRowSelect={handleRowSelect}
                              checkBox={false}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                              }}>
                              <img
                                src="/assets/images/no-record-found.png"
                                width="30%"
                                alt="No Record Found"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tradehistory;
