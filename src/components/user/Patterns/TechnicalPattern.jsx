import React, { useEffect, useState } from "react";
import {
  Get_Pattern_Time_Frame,
  Get_Pattern_Name,
  Get_Pattern_Charting,
} from "../../CommonAPI/Admin";
import {
  AvailableScript,
  GetSymbolIp,
  ChartPatternAPI,
  Candlestick_Pattern,
  GetSingleChart,
} from "../../CommonAPI/User";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import { columns, columns1 } from "./PatternsColumns";
import "ag-charts-enterprise";
import AgChartsReact from "./TechnicalPatternCandle";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Contnet from "../../../ExtraComponent/Content";
import { data } from "jquery";
import ChartingPatternCard from "./ChartingPatternCard";

const LastPattern = () => {
  const Username = localStorage.getItem("name");
  const [selectedPatternType, setSelectedPatternType] = useState(
    "Candlestick Patterns"
  );
  const [selectedRowData, setSelectedRowData] = useState("");
  const [scriptType, setScriptType] = useState("AvailableScript");
  const [candlestickPattern, setCandlestickPattern] =
    useState("Bearish_Engulfing");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1M");
  const [chartPattern, setChartPattern] = useState("");
  const [patternNames, setPatternNames] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const [showCandle, setShowCandle] = useState(false);
  const [availableScripts, setAvailableScripts] = useState([]);
  const [getCandlestickTable, setCandlestickTable] = useState({
    loading: true,
    data1: [],
    data2: [],
  });
  const [ChartPatternTableData, setChartPatternTableData] = useState({
    loading: true,
    PatternData: [],
    CandleData: [],
  });
  const [timeFrameData, setTimeFrameData] = useState({
    loading: true,
    data: [],
  });
  const [getSingleChartImg, setSingleChartImg] = useState({
    loading: true,
    data: "",
  });

  const [chartingPatternNames, setChartingPatternNames] = useState({
    loading: true,
    data: [],
  });
  const [chartingPattern, setChartingPattern] = useState("Broadening_Bottom");

  useEffect(() => {
    fetchAllSymbols();
    fetchAvailableScripts();
  }, [selectedPatternType, scriptType]);

  useEffect(() => {
    fetchPatternTimeFrames();
    fetchPatternNames();
    fetchChartingPatternNames();
  }, []);

  useEffect(() => {
    if (allSymbols.length > 0 && !chartPattern) {
      setChartPattern(allSymbols[0]);
    }
  }, [allSymbols]);

  useEffect(() => {
    GetSingleChartPattern();
  }, [candlestickPattern]);

  useEffect(() => {
    const getCandlestickPatternData = async () => {
      try {
        const data = {
          PatternType: "Charting Pattern",
          Pattern: chartingPattern,
        };
        const res = await GetSingleChart(data);
        setSingleChartImg({ loading: false, data: res.data });
      } catch (error) {
        console.error("Error in fetching candlestick pattern data", error);
        setSingleChartImg({ loading: false, data: [] });
      }
    };
    getCandlestickPatternData();
  }, [chartingPattern]);

  useEffect(() => {
    fetchChartingData();
  }, [
    chartPattern,
    selectedPatternType,
    scriptType,
    selectedTimeFrame,
    chartingPattern,
    candlestickPattern,
  ]);

  useEffect(() => {
    setShowCandle(false);
  }, [
    selectedPatternType,
    candlestickPattern,
    scriptType,
    chartingPattern,
    selectedTimeFrame,
    chartPattern,
  ]);

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
  };



  const fetchAvailableScripts = async () => {
    try {
      const response = await AvailableScript();
      setAvailableScripts(response.Status ? response.Symbol : []);
    } catch (err) {
      console.error("Error in fetching available scripts", err);
    }
  };

  const fetchAllSymbols = async () => {
    try {
      const data = {
        Username,
        Strategy:
          selectedPatternType === "Candlestick Patterns"
            ? "CandlestickPattern"
            : "ChartingPattern",
      };
      const response = await GetSymbolIp(data);
      setAllSymbols(response.Status ? response.Data : []);
    } catch (err) {
      console.error("Error in fetching symbols", err);
    }
  };

  const fetchPatternTimeFrames = async () => {
    try {
      const response = await Get_Pattern_Time_Frame();
      setTimeFrameData({ loading: false, data: response });
    } catch (err) {
      console.error("Error in fetching time frames", err);
    }
  };

  const fetchPatternNames = async () => {
    try {
      const response = await Get_Pattern_Name();
      setPatternNames({
        loading: false,
        data: response.Status ? response.PatternName : [],
      });
    } catch (err) {
      console.error("Error in fetching pattern names", err);
    }
  };

  const fetchChartingPatternNames = async () => {
    try {
      const response = await Get_Pattern_Charting();
      setChartingPatternNames({
        loading: false,
        data: response.Status ? response.PatternName : [],
      });
    } catch (err) {
      console.error("Error in fetching pattern names", err);
    }
  };

  const fetchChartingData = async () => {
    try {
      if (selectedPatternType === "Charting Patterns") {
        if (scriptType && selectedTimeFrame && chartPattern && chartingPattern) {
          const data = {
            Script: scriptType,
            TimeFrame: selectedTimeFrame,
            Username,
            Symbol: chartPattern,
            Patternname: chartingPattern,
          };
          const response = await ChartPatternAPI(data);
          setChartPatternTableData({
            loading: false,
            CandleData: response.Status ? response?.Data?.CandleData : [],
            PatternData: response.Status ? response?.Data?.PatternData : [],
          });
          setShowCandle(response.Status);
        }
      } else {
        if (candlestickPattern && selectedTimeFrame && chartPattern) {
          const data = {
            PatternName: candlestickPattern,
            TimeFrame: selectedTimeFrame,
            Username,
            Symbol: chartPattern,
          };
          const response = await Candlestick_Pattern(data);
          setCandlestickTable({
            loading: false,
            data1: response.Status ? response.Data.CandleData : [],
            data2: response.Status ? response.Data.PatternData : [],
          });
          setShowCandle(response.Status);
        }
      }
    } catch (err) {
      console.error("Error in fetching data:", err);
    }
  };

  const GetSingleChartPattern = async () => {
    const data = {
      Pattern: candlestickPattern,
      TType: "",
      PatternType: "CandleStick Pattern",
    };
    try {
      const response = await GetSingleChart(data);
      if (response.status) {
        setSingleChartImg({ loading: false, data: response.data });
      } else {
        setSingleChartImg({ loading: false, data: [] });
      }
    } catch (err) {
      console.error("Error in fetching single chart image", err);
    }
  };

  useEffect(() => {
    if (selectedPatternType === "Charting Patterns") {
      setChartingPattern("Broadening_Bottom");
      setScriptType("AvailableScript");
      setSelectedTimeFrame("1M");
      setChartPattern("");
      setSelectedRowData("");
    } else {
      setCandlestickPattern("Bearish_Engulfing");
      setSelectedTimeFrame("1M");
      setChartPattern("");
      setSelectedRowData("");
    }
  }, [selectedPatternType]);

  return (
    <>
      <Contnet
        Page_title={"📉 Technical Pattern"}
        button_status={false}
        backbutton_status={true}>
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <div className={`col-md-3`}>
                <div className="form-group">
                  <label>Select Technical pattern</label>
                  <select
                    className="form-control  mt-2"
                    onChange={(e) => setSelectedPatternType(e.target.value)}
                    value={selectedPatternType}>
                    <option value="Candlestick Patterns" selected>
                      Candlestick Patterns
                    </option>
                    <option value="Charting Patterns">Charting Patterns</option>
                  </select>
                </div>
              </div>
              <div className={`col-md-3`}>
                <div className="form-group">
                  {selectedPatternType === "Candlestick Patterns" ? (
                    <>
                      <label>Pattern</label>
                      <select
                        className="form-control  mt-2"
                        onChange={(e) => setCandlestickPattern(e.target.value)}
                        value={candlestickPattern}>
                        {patternNames.data &&
                          patternNames.data.map((item) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label>Pattern</label>
                      <select
                        className="form-control  mt-2"
                        onChange={(e) => setChartingPattern(e.target.value)}
                        value={chartingPattern}>
                        {chartingPatternNames.data.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>

              {selectedPatternType === "Candlestick Patterns" ? (
                ""
              ) : (
                <div className="col-md-2">
                  <div className="form-group">
                    <label>Script</label>
                    <select
                      className="form-control  mt-2"
                      onChange={(e) => setScriptType(e.target.value)}
                      value={scriptType}>
                      <option value="AvailableScript">Available Script</option>
                      <option value="MyScript">My Script</option>
                    </select>
                  </div>
                </div>
              )}
              <div className={`col-md-${selectedPatternType === "Charting Patterns" ? "2" : "3"}`}>
                <div className="form-group">
                  <label>Time Frame</label>
                  <select
                    className="form-control  mt-2"
                    onChange={(e) => setSelectedTimeFrame(e.target.value)}
                    value={selectedTimeFrame}>
                    {timeFrameData?.data?.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`col-md-${selectedPatternType === "Charting Patterns" ? "2" : "3"}`}>
                <div className="form-group">
                  <label>Select Specific Pattern</label>
                  <select
                    className="form-control  mt-2"
                    onChange={(e) => setChartPattern(e.target.value)}
                    value={chartPattern}>
                    {allSymbols.length === 0 ? (
                      <option value="">No Pattern Script Subscribed</option>
                    ) : (
                      <option value="">Please Select Specific Script</option>
                    )}
                    {allSymbols.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {selectedPatternType !== "Charting Patterns" && (
            <div className="container-fluid">
              <div className="row justify-content-center">
                {selectedPatternType === "Candlestick Patterns" &&
                getSingleChartImg?.data?.length === 0 ? null : (
                  <div className="col-12">
                    <div
                      className="card p-3"
                      style={{
                        maxHeight: "auto",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}>
                      <div className="row g-0 align-items-center">
                        <div className="col-12 col-md-6 p-3">
                          <h5 className="mt-3">Description</h5>
                          <p>
                            {getSingleChartImg?.data[0]?.Description || "N/A"}
                          </p>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-2">
                          <img
                            src={`data:image/png;base64,${getSingleChartImg?.data[0]?.image_data}`}
                            className="img-fluid rounded shadow"
                            alt="Pattern Image"
                            style={{
                              width: "100%",
                              maxHeight: "300px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="col-xl-12 mt-3">
            {selectedPatternType === "Candlestick Patterns"
              ? getCandlestickTable?.data2 &&
                getCandlestickTable.data2.length > 0 && (
                  <FullDataTable
                    columns={columns1()}
                    data={getCandlestickTable.data2}
                    checkBox={false}
                  />
                )
              : ChartPatternTableData?.PatternData &&
                ChartPatternTableData.PatternData.length > 0 && (
                  <FullDataTable
                    columns={columns()}
                    data={ChartPatternTableData.PatternData}
                    onRowSelect={handleRowSelect}
                    checkBox={true}
                  />
                )}
          </div>

          {showCandle && (
            <div className="col-xl-12 mt-3">
              {selectedPatternType === "Candlestick Patterns" ? (
                <AgChartsReact
                  ChartData={getCandlestickTable?.data1}
                  timeFrame={selectedTimeFrame}
                  type={"pattern"}
                />
              ) : (
                <AgChartsReact
                  ChartData={ChartPatternTableData?.CandleData}
                  timeFrame={selectedTimeFrame}
                  type={"charting"}
                />
              )}
            </div>
          )}
        </div>

        {selectedPatternType === "Charting Patterns" && (
          <div>
            <ChartingPatternCard data={getSingleChartImg.data} />
          </div>
        )}
      </Contnet>
    </>
  );
};

export default LastPattern;