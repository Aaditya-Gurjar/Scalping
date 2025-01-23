import React, { useState, useEffect } from "react";
import { get_User_Data } from "../../CommonAPI/Admin";
import {
  ChartingPlatformsegment,
  get_Trade_Response,
  getChargingPlatformDataApi,
  getStrategyType,
} from "../../CommonAPI/User";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import {
  columns3,
  columns2,
  columns1,
  columns,
  columns5,
  columns4,
  columns6,
  columns8,
} from "./TradeReponseColumn";
const TradeResponse = () => {
  const Username = localStorage.getItem("name");

  const [selectStrategyType, setSelectStrategyType] = useState("Scalping");
  const [strategyType, setStrategyType] = useState([]);
  const [tradeHistory, setTradeHistory] = useState({ loading: true, data: [], data1: [], });
  const [selectedRowData, setSelectedRowData] = useState("");
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selectSegmentType, setSegmentType] = useState('')
  const [getAllTradeData, setAllTradeData] = useState({ loading: true, data: [], });
  const [getChartingSegments, setChartingSegments] = useState([])
  const [getCharting, setGetCharting] = useState([]);
  const [tableType, setTableType] = useState('Scalping')


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


  useEffect(() => {
    if (selectSegmentType)
      getChartingScript();
  }, [selectSegmentType]);
  
  useEffect(() => {
    if (selectStrategyType == "ChartingPlatform")
      getChartingData();
  }, [selectStrategyType]);

  const getChartingScript = async () => {
    const filterData = getChartingSegments.filter(item => item.Segment == selectSegmentType)
    const req = { Username: Username, Segment: filterData[0].Segment }
    await ChartingPlatformsegment(req)
      .then((response) => {
        if (response.Status) {
          setGetCharting(response.Client)
        }
        else {
          setGetCharting([])
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err)
      })
  }

  const getChartingData = async () => {
    await getChargingPlatformDataApi(Username)
      .then((res) => {
        if (res.Status) {
          setChartingSegments(res.Client);
          setSegmentType(res?.Client?.[0]?.Segment)
        }
        else {
          setChartingSegments([])
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err
        )
      })
  };



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

  const GetTradeStrategyType = async () => {
    try {
      const res = await getStrategyType();
      if (res) {
        setStrategyType(res.Data);
      }
    } catch (error) {
      setStrategyType([]);
      console.log("Error in finding the Strategy Type", error);
    }
  };

  const GetTradeResposne = async () => {
    const data = { Data: selectStrategyType, Username: Username };

    //GET TRADEHISTORY
    await get_User_Data(data)
      .then((response) => {
        if (response.Status) {
          const filterLiveTrade = response.Data.filter((item) => {
            return item.TradeExecution == "Live Trade";
          });
          const filterLiveTrade1 =
            selectStrategyType != "Scalping"
              ? []
              : response?.NewScalping?.filter((item) => {
                return item.TradeExecution == "Live Trade";
              });

          setTradeHistory({
            loading: false,
            data: filterLiveTrade,
            data1: filterLiveTrade1,
          });
        } else {
          setTradeHistory({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });
  };

  useEffect(() => {
    GetTradeResposne();
  }, [selectStrategyType, FromDate, ToDate]);

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
  };




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
                : selectStrategyType == "ChartingPlatform" && (selectedRowData.Optiontype == " " || selectedRowData?.Optiontype == "") ? "Cash"
                  : selectStrategyType == "ChartingPlatform" && (selectedRowData?.Optiontype == "SX") ? "Future"
                    : "Option",
      Symbol:
        selectStrategyType == "Scalping" || selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.Symbol
          : selectStrategyType == "Option Strategy"
            ? selectedRowData && selectedRowData.IName
            : selectStrategyType == "ChartingPlatform" ? selectedRowData && selectedRowData?.TSymbol : "",
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

    await get_Trade_Response(data)
      .then((response) => {
        if (response.Status) {
          setAllTradeData({
            loading: false,
            data: response.Data,
          });
          setShowTable(true);
        } else {
          Swal.fire({
            title: "No Records found",
            icon: "info",
            timer: 1500,
            timerProgressBar: true,
          });
          setAllTradeData({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });
  };

  useEffect(() => {
    setSelectStrategyType("Scalping");
    GetTradeStrategyType();
  }, []);

  useEffect(() => {
    setShowTable(false);
  }, [selectStrategyType, FromDate, ToDate, selectedRowData, selectSegmentType]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Trade Response</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div className="was-validated ">
                <div className="row">
                  <div
                    className={`form-group ${selectStrategyType == "ChartingPlatform" || "Scalping" ? "col-lg-3" : "col-lg-4"}`}>
                    <label>Select Strategy Type</label>
                    <select
                      className="form-select"
                      required
                      onChange={(e) => setSelectStrategyType(e.target.value)}
                      value={selectStrategyType}>
                      {strategyType.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectStrategyType == "Scalping" && (
                    <div className="form-group col-lg-3">
                      <label>Select Table Type</label>
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

                  {selectStrategyType == "ChartingPlatform" && (
                    <div className="form-group col-lg-3">
                      <label>Select Segment Type</label>
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) => setSegmentType(e.target.value)}
                        value={selectSegmentType}>
                        {getChartingSegments?.map((item, index) => {
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
                      className="form-select"
                      selected={ToDate == "" ? Defult_To_Date : ToDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </div>
                </div>
              </div>
              {
                <div className="modal-body">
                  {(
                    selectStrategyType === "ChartingPlatform"
                      ? getCharting && getCharting.length > 0
                      : tradeHistory?.data.length > 0
                  ) ? (
                    tableType === "Scalping" && (
                      <GridExample
                        columns={
                          selectStrategyType === "Scalping"
                            ? columns
                            : selectStrategyType === "Option Strategy"
                              ? columns1
                              : selectStrategyType === "Pattern"
                                ? columns2
                                : selectStrategyType === "ChartingPlatform"
                                  ? columns8
                                  : columns
                        }
                        data={
                          selectStrategyType === "ChartingPlatform"
                            ? getCharting
                            : tradeHistory?.data
                        }
                        onRowSelect={handleRowSelect}
                        checkBox={true}
                      />
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
                  )}
                </div>
              }

              {tableType === "MultiConditional" &&
                selectStrategyType == "Scalping" && (
                  <div>
                    <div className="iq-header-title mt-4">
                      <h4 className="card-title">Multi Conditional</h4>
                    </div>
                    {
                      <div className="modal-body">
                        {tradeHistory?.data1 &&
                        tradeHistory?.data1.length > 0 ? (
                          <GridExample
                            columns={columns6}
                            data={tradeHistory?.data1}
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
                      </div>
                    }
                  </div>
                )}

              <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                Submit
              </button>

              {showTable && (
                <>
                  <div className="mt-3">
                    {getAllTradeData.data && getAllTradeData.data.length > 0 ? (
                      <GridExample
                        columns={
                          selectStrategyType === "Scalping"
                            ? columns3
                            : selectStrategyType === "Option Strategy"
                              ? columns4
                              : selectStrategyType === "ChartingPlatform"
                                ? columns3
                                : columns5
                        }
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
                          alt=""
                        />
                      </div>
                    )}
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

export default TradeResponse;
