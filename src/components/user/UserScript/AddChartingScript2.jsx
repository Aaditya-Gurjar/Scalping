import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../../ExtraComponent/Loader";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import FullDataTable from "../../../ExtraComponent/CommanDataTable(original)";
import { getColumns8 } from "../../user/UserDashboard/Columns";
import { getUserChartingScripts } from "../../CommonAPI/User";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Content from "../../../ExtraComponent/Content";
import ChartingCard from "../UserDashboard/ChartingCard";

const AddChartingScript2 = () => {
  const location = useLocation();
  const {
    selectStrategyType,
    scriptType,
    tableType,
    data,
    selectedType,
    FromDate: initialFromDate,
    ToDate: initialToDate,
    chartingSubTab: initialTab,
    view: initialView,
    fixedRowPerPage,
  } = location.state?.data || {};

  const [chartingSubTab, setChartingSubTab] = useState(initialTab || "Cash");
  const [view, setView] = useState(initialView || "table");
  const [getCharting, setGetCharting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(initialFromDate || Date.now()));
  const [toDate, setToDate] = useState(new Date(initialToDate || Date.now()));

  const fetchChartingData = async () => {
    setLoading(true);
    const req = {
      Username: localStorage.getItem("name"),
      Segment: chartingSubTab,
      From_date: fromDate.toISOString().split("T")[0].replace(/-/g, "."),
      To_date: toDate.toISOString().split("T")[0].replace(/-/g, "."),
    };
    try {
      const response = await getUserChartingScripts(req);
      if (response?.Status) {
        setGetCharting(response.Client);
      } else {
        setGetCharting([]);
      }
    } catch (error) {
      console.error("Error fetching charting data:", error);
      setGetCharting([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartingData();
  }, [chartingSubTab, fromDate, toDate]);

  return (
    <Content
      Page_title={"🖥️ Panel Track"}
      button_status={false}
      backbutton_status={false}>
      <div className="iq-card-body">
        {/* Add view toggle buttons */}
        {data === "ChartingPlatform" && getCharting?.length > 0 && (
          <div className="d-flex justify-content-end my-3">
            <ul
              className="nav nav-pills shadow-lg rounded-pill p-2"
              style={{
                backgroundColor: "#f8f9fa",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <li className="nav-item flex-grow-1 text-center">
                <button
                  className={`nav-link rounded-pill w-100 ${view === "table" ? "active" : ""}`}
                  onClick={() => setView("table")}
                  style={{
                    padding: "7px",
                    fontSize: "10px",
                    fontWeight: "600",
                    backgroundColor: view === "table" ? "#007bff" : "#fff",
                    color: view === "table" ? "#fff" : "#333",
                  }}
                >
                  Table View
                </button>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <button
                  className={`nav-link rounded-pill w-100 ${view === "card" ? "active" : ""}`}
                  onClick={() => setView("card")}
                  style={{
                    padding: "7px",
                    fontSize: "10px",
                    fontWeight: "600",
                    backgroundColor: view === "card" ? "#007bff" : "#fff",
                    color: view === "card" ? "#fff" : "#333",
                  }}
                >
                  Card View
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        {data && (
          <>
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                {tableType === "MultiCondition" ? (
                  <h3 className="card-title">{"Scalping"}</h3>
                ) : (
                  <h4 className="card-title">{data}</h4>
                )}
              </div>
            </div>
            <div className="iq-card-body" style={{ padding: "3px" }}>
              <div className="table-responsive">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {data === "ChartingPlatform" && (
                      <div className="d-flex justify-content-center my-3">
                        <ul
                          className="nav nav-pills shadow-lg rounded-pill p-2"
                          style={{
                            backgroundColor: "#f8f9fa",
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                          }}
                        >
                          {["Cash", "Future", "Option"].map((tab) => (
                            <li
                              className="nav-item flex-grow-1 text-center"
                              key={tab}
                            >
                              <button
                                className={`nav-link rounded-pill w-100 ${chartingSubTab === tab ? "active" : ""}`}
                                onClick={() => setChartingSubTab(tab)}
                                style={{
                                  padding: "14px 30px",
                                  fontSize: "18px",
                                  fontWeight: "600",
                                  backgroundColor: chartingSubTab === tab ? "#007bff" : "#fff",
                                  color: chartingSubTab === tab ? "#fff" : "#333",
                                }}
                              >
                                {tab}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="d-flex justify-content-between my-3">
                      <div>
                        <strong>From Date:</strong>
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                        />
                      </div>
                      <div>
                        <strong>To Date:</strong>
                        <DatePicker
                          selected={toDate}
                          onChange={(date) => setToDate(date)}
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                        />
                      </div>
                    </div>

                    {/* Conditional rendering for Text View and Card View */}
                    {view === "table" ? (
                      getCharting?.length > 0 ? (
                        <FullDataTable
                          columns={getColumns8(() => {}, chartingSubTab, fetchChartingData)}
                          data={getCharting}
                          checkBox={false}
                          FixedRowPerPage={fixedRowPerPage}
                        />
                      ) : (
                        <NoDataFound />
                      )
                    ) : (
                      <div className="card-view-container">
                        {getCharting?.length > 0 ? (
                          getCharting.map((item, index) => (
                            <ChartingCard key={index} data={item} />
                          ))
                        ) : (
                          <NoDataFound />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Content>
  );
};

export default AddChartingScript2;