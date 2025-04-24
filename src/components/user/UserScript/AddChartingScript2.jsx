import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    segment
  } = location.state?.data || {};

  const [chartingSubTab, setChartingSubTab] = useState(initialTab || "Cash");
  const [view, setView] = useState(initialView || "table");
  const [getCharting, setGetCharting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(initialFromDate || Date.now()));
  const [toDate, setToDate] = useState(new Date(initialToDate || Date.now()));
const navigate = useNavigate();
  const fetchChartingData = async () => {
    setLoading(true);
    const req = {
      Username: localStorage.getItem("name"),
      Segment: chartingSubTab,
      From_date: fromDate.toISOString().split("T")[0].replace(/-/g, "."), // Format to yyyy.mm.dd
      To_date: toDate.toISOString().split("T")[0].replace(/-/g, "."), // Format to yyyy.mm.dd
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

  console.log("segment", segment);

  useEffect(() => {
    if (segment) {
      setChartingSubTab(segment);
    }
  }, [segment]);

  useEffect(() => {
    fetchChartingData();
  }, [chartingSubTab, fromDate, toDate]);

  return (
    <Content
      Page_title={"🖥️ Panel Track"}
      button_status={false}
      backbutton_status={false}>
      <div className="iq-card-body">

        <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary m-3"
                  onClick={() => navigate("/user/dashboard")}>
                  Back
                </button>
              </div>


        {/* Add view toggle buttons */}
        {data === "ChartingPlatform" && (
          <div
            className="d-flex justify-content-between align-items-center my-3"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "10px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {/* Heading */}
            <h4 className="m-0" style={{ fontWeight: "600" }}>
              {tableType === "MultiCondition" ? "Scalping" : data}
            </h4>

            {/* Capsule Buttons */}
            <div className="d-flex chartingsignal-capsule-btns" style={{ gap: "10px", flexGrow: 1 }}>
              {["Cash", "Future", "Option"].map((tab) => (
                <button
                  key={tab}
                  className={`nav-link rounded-pill ${chartingSubTab === tab ? "active" : ""}`}
                  onClick={() => setChartingSubTab(tab)}
                  style={{
                    padding: "10px 30px", // Increased padding for larger size
                    fontSize: "14px", // Increased font size for better visibility
                    fontWeight: "600",
                    backgroundColor: chartingSubTab === tab ? "#007bff" : "#fff",
                    color: chartingSubTab === tab ? "#fff" : "#333",
                    border: "1px solid #ddd",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* View Toggle Buttons */}
            <div className="d-flex" style={{ gap: "10px" }}>
              {getCharting?.length > 0 && (
                <>
                  <button
                    className={`nav-link rounded-pill ${view === "table" ? "active" : ""}`}
                    onClick={() => setView("table")}
                    style={{
                      padding: "7px 20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: view === "table" ? "#007bff" : "#fff",
                      color: view === "table" ? "#fff" : "#333",
                      border: "1px solid #ddd",
                    }}
                  >
                    Table View
                  </button>
                  <button
                    className={`nav-link rounded-pill ${view === "card" ? "active" : ""}`}
                    onClick={() => setView("card")}
                    style={{
                      padding: "7px 20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: view === "card" ? "#007bff" : "#fff",
                      color: view === "card" ? "#fff" : "#333",
                      border: "1px solid #ddd",
                    }}
                  >
                    Card View
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        {data && (
          <>
            <div className="iq-card-header d-flex justify-content-between">
              {/* <div className="iq-header-title">
                  {tableType === "MultiCondition" ? (
                  <h3 className="card-title">{"Scalping"}</h3>
                ) : (
                  // <h4 className="card-title">{data}</h4>
                )}  
              </div> */}
            </div>
            <div className="iq-card-body" style={{ padding: "3px" }}>
              <div className="table-responsive">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div className="d-flex justify-content-end  " style={{ gap: "20px" }}>
                      <div style={{ width: "10%" }}>
                        <strong>From Date:</strong>
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                        />
                      </div>
                      <div style={{ width: "10%" }}>
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
                          columns={getColumns8(() => { }, chartingSubTab, fetchChartingData)}
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
                          <ChartingCard data={getCharting} />
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