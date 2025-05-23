import React, { useEffect, useState } from "react";
import Coptyscript from "./Copyscript";
import GroupScript from "./Groupscript";
import CurrentScript from "./CurrentScript";
import {
  GetAllUserGroup,
  OpenPosition,
  getStrategyType,
} from "../../CommonAPI/User";
import { ExpriyEndDate } from "../../CommonAPI/Admin";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";
import DatePicker from "react-datepicker";
import { FiPlusCircle } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import ViewGroup from "../Group/ViewGroup";
import { useLocation } from "react-router-dom";

const Userdashboard = () => {
  const userName = localStorage.getItem("name");
  const StrategyType = sessionStorage.getItem("StrategyType");

  const addVia = sessionStorage.getItem("addVia");
  const groupName = sessionStorage.getItem("groupName");
  const [activeTab1, setActiveTab1] = useState("CurrentPosition");
  const [activeTab, setActiveTab] = useState(addVia || "currentScript");
  const [subTab, setSubTab] = useState("Scalping"); // Default to "Scalping"
  const [refresh, setRefresh] = useState(false);
  const [getGroup, setGroup] = useState('');
  const [strategyType, setStrategyType] = useState([]);
  const [tableType, setTableType] = useState(StrategyType || "MultiCondition");
  const [data2, setData2] = useState({ status: true, msg: "Initial state" });
  const [groupNames, setGroupNames] = useState([])

  const [ToDate, setToDate] = useState(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [FromDate, setFromDate] = useState(new Date());
  const [showLivePrice, setShowLivePrice] = useState(false);
  const location = useLocation();

  const [botView, setBotView] = useState("Create New Bot"); // Default to "Create New Bot"


  const redirectStrategyType = sessionStorage.getItem("redirectStrategyType");

  useEffect(() => {
    setSubTab(redirectStrategyType);
    // sessionStorage.removeItem("redirectStrategyType"); 
  }, [redirectStrategyType]);


  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${currentDate.getFullYear()}`;

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);

  const Defult_To_Date = `${String(tomorrow.getDate()).padStart(2, "0")}.${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}.${tomorrow.getFullYear()}`;

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}.${month}.${day}`;
  };

  const [getGroupName, setGroupName] = useState({ loading: true, data: [] });
  const [getPositionData, setPositionData] = useState({
    loading: true,
    Scalping: [],
    Option: [],
    Pattern: [],
    NewScalping: [],
    ChartingData: [],
  });


  console.log("getPositionData", getPositionData);
  const getAllGroupNames = async () => {
    const data = { User: userName };
    const res = await GetAllUserGroup(data)
    setGroupNames(res?.Data)
  }

  useEffect(() => {
    fetchStrategyType();
    GetOpenPosition();
    getAllGroupNames();
  }, []);

  useEffect(() => {
    getUserAllGroup();
  }, [activeTab]);

  const fetchStrategyType = async () => {
    try {
      const res = await getStrategyType();
      if (res.Data) {
        setStrategyType(res.Data);
      }
    } catch (error) {
      console.log("Error in finding the strategy type", error);
    }
  };

  const getUserAllGroup = async () => {
    const data = { User: userName };
    await GetAllUserGroup(data)
      .then((response) => {
        if (response.Status) {
          setRefresh(!refresh);
          setGroupName({
            loading: false,
            data: response?.Data?.map((item) => item?.value || item),
          });
          setData2({ status: true, msg: "Groups fetched successfully" });
        } else {
          setGroupName({
            loading: false,
            data: [],
          });
          setData2({
            status: false,
            msg: response.Message || "No groups found",
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the group name", err);
        setData2({ status: false, msg: "Error fetching groups" });
      });
  };

  const GetOpenPosition = async () => {
    const data = { userName: userName };
    await OpenPosition(data)
      .then((response) => {
        if (response.Status) {
          setPositionData({
            loading: false,
            Scalping: response.Scalping || [],
            Option: response.Option || [],
            Pattern: response.Pattern || [],
            NewScalping: response?.NewScalping || [],
            ChartingData: response?.ChartingData || [],
          });
        } else {
          setPositionData({
            loading: false,
            Scalping: [],
            Option: [],
            Pattern: [],
            ChartingData: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the open postion data", err);
      });
  };


  

  const columns1 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "ScalpType",
      label: "ScalpType",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeType",
      label: "Trade Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "GroupN",
      label: "Unique Name",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns2 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "STG",
      label: "Strategy",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "LotSize",
      label: "Lot",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Option Type",
      label: "Option Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Strike price",
      label: "Strike price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Hashing",
      label: "Hashing",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns3 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "TradePattern",
      label: "Pattern Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SPattern",
      label: "Pattern Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "PatternTime",
      label: "Pattern Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Lot",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TimeFrame",
      label: "Time Frame",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns4 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "ScalpType",
      label: "Target Type",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Lot",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Re-entry",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "GroupN",
      label: "Unique Name",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns5 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Token",
      label: "Token",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeType",
      label: "Trade Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Stretegy",
      label: "Stretegy",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "AccType",
      label: "Account Type",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Segmenttype",
      label: "Segment Type",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  useEffect(() => {
    if (botView === "Create New Bot") {
      setSubTab("Scalping");
      setGroup("");
      sessionStorage.setItem("StrategyType", "Scalping");
      sessionStorage.removeItem("groupName");
    } else if (botView === "Suggested Bots") {
      setGroup("demo");
      setSubTab("");
      sessionStorage.setItem("groupName", "demo");
      sessionStorage.removeItem("StrategyType");
    }
  }, [botView]);



  useEffect(() => {
    setSubTab(redirectStrategyType || "Scalping");
  }
    , [redirectStrategyType]);


  return (
    <Content
      Page_title="📊 User Dashboard"
      button_status={false}
      backbutton_status={false}>
      <div className="iq-card-body" >
        <ul
          className="nav nav-tabs justify-content-center border-bottom rounded-0"
          id="myTab-2"
          role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link d-flex align-items-center gap-8 me-5 ${activeTab1 === "CurrentPosition" ? "active" : ""
                }`}
              id="home-tab-justify"
              data-bs-toggle="tab"
              href="#home-justify"
              role="tab"
              aria-controls="home"
              aria-selected={activeTab1 === "CurrentPosition"}
              onClick={() => setActiveTab1("CurrentPosition")}>
              🏦 <span>Current Script</span>
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link d-flex align-items-center gap-8 ms-8 ${activeTab1 === "OpenPosition" ? "active" : ""
                }`}
              id="profile-tab-justify"
              data-bs-toggle="tab"
              href="#profile-justify"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab1 === "OpenPosition"}
              onClick={() => setActiveTab1("OpenPosition")}>
              📈 <span>Open Position</span>
            </a>
          </li>
        </ul>

        <div className="row mt-3">
          {activeTab1 === "CurrentPosition" && (
            <>
              <div className="d-flex justify-content-center align-items-center flex-column gap-4 mt-4">
                <div className="d-flex justify-content-start align-items-center w-100" style={{ maxWidth: "1200px" }}>
                  <div className="d-flex align-items-center gap-3 me-3">
                    <select
                      className="form-select"
                      style={{ width: "200px" }}
                      value={botView}
                      onChange={(e) => setBotView(e.target.value)}
                    >
                      <option value="Create New Bot">Create New Bot</option>
                      <option value="Suggested Bots">Suggested Bots</option>
                    </select>
                  </div>
                  <div className="d-flex flex-wrap gap-3 ">
                    <ul className="nav nav-pills shadow rounded-pill p-1">
                      {botView === "Create New Bot" &&
                        strategyType.map((type, index) => (
                          <li className="nav-item" key={index}>
                            <button
                              className={`nav-link rounded-pill ${subTab === type.trim() ? "active rounded-pill" : "nav-link rounded-pill"}`}
                              style={{
                                padding: "10px 20px",
                                margin: "5px",
                                border: "none",
                                outline: "none",
                              }}
                              onClick={() => {
                                setSubTab(type.trim());
                                setGroup(""); // Deselect group
                                sessionStorage.setItem("StrategyType", type.trim());
                                sessionStorage.removeItem("groupName"); // Clear groupName from session
                              }}
                            >
                              <FiPlusCircle className="me-1" /> {type} Bot
                            </button>
                          </li>
                        ))}
                      {botView === "Suggested Bots" &&
                        groupNames.map((type, index) => (
                          <li className="nav-item" key={index} style={{ textAlign: "left" }}>
                            <button
                              className={`nav-link rounded-pill ms-2 me-2 ${getGroup === type.trim() ? "active rounded-pill" : "nav-link rounded-pill"}`}
                              style={{
                                padding: "10px 20px",
                                margin: "5px 0", // Ensure vertical spacing for left alignment
                                border: "none",
                                outline: "none",
                              }}
                              onClick={() => {
                                setGroup(type.trim());
                                setSubTab(""); // Deselect strategy type
                                sessionStorage.setItem("groupName", type.trim());
                                sessionStorage.removeItem("StrategyType"); // Clear StrategyType from session
                              }}
                            >
                              <FiPlusCircle className="me-1" /> {type}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{ maxWidth: "1200px" }}
                >
                  {/* <h5 className="me-3" style={{ minWidth: "100px", textAlign: "left" }}>
                     Suggested Bot:
                     </h5> */}

                  <div className="">

                    {/* <div className="d-flex justify-content-start align-items-center w-100" style={{ maxWidth: "1200px" }}>
                      {/* <h5 className="me-3" style={{ minWidth: "100px", textAlign: "left" }}></h5> */}
                    <div className="d-flex flex-wrap gap-3 ">
                      <ul
                        className="nav nav-pills shadow rounded-pill p-1"

                      >

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {activeTab1 === "CurrentPosition" && (
          <>
            {activeTab === "group" ? (
              <div
                className="tab-pane fade show active"
                id="home-justify"
                role="tabpanel">
                <div className="mt-3">
                  {subTab ? (
                    getGroup === "copyScript" ? (
                      <Coptyscript
                        data={subTab}
                        selectedType={activeTab}
                        data2={data2}
                        FromDate={formatDate(FromDate)}
                        ToDate={formatDate(ToDate)}
                      />
                    ) : (
                      <GroupScript
                        data={subTab}
                        selectedType={activeTab}
                        GroupName={getGroup}
                        data2={data2}
                      />
                    )
                  ) : null}
                </div>
              </div>
            ) : (
              activeTab === "currentScript" && (
                <div
                  className="tab-pane fade show active"
                  id="home-justify"
                  role="tabpanel">
                  {subTab && (
                    <CurrentScript
                      tableType={tableType}
                      data={subTab}
                      selectedType={activeTab}
                      FromDate={formatDate(FromDate)}
                      ToDate={formatDate(ToDate)}
                      alignDates="right"
                    />
                  )}


                  {getGroup && (
                    <>
                      {/* <ViewGroup group={getGroup}  isCopyScriptVisible={true}/> */}
                      <GroupScript
                        data={subTab}
                        selectedType={activeTab}
                        GroupName={getGroup}
                        data2={data2}
                        getGroup={getGroup} />
                    </>
                  )}
                </div>
              )
            )}
          </>
        )}

        {activeTab1 === "OpenPosition" && (
          <>
            {getPositionData.NewScalping?.length > 0 && (
              <>
                <h4>Scalping</h4>
                <FullDataTable
                  columns={columns4}
                  data={getPositionData.NewScalping}
                  checkBox={false}
                  alignDates="right"
                />
              </>
            )}

            {getPositionData.Option?.length > 0 && (
              <div className="mt-4">
                <h4>Option</h4>
                <FullDataTable
                  columns={columns2}
                  data={getPositionData.Option}
                  checkBox={false}
                  alignDates="right"
                />
              </div>
            )}

            {getPositionData.Pattern?.length > 0 && (
              <div className="mt-4">
                <h4>Pattern</h4>
                <FullDataTable
                  columns={columns3}
                  data={getPositionData.Pattern}
                  checkBox={false}
                  alignDates="right"
                />
              </div>
            )}


            {getPositionData.ChartingData?.length > 0 && (
              <div className="mt-4">
                <h4>Charting Platform</h4>
                <FullDataTable
                  columns={columns5}
                  data={getPositionData.ChartingData}
                  checkBox={false}
                  alignDates="right"
                />
              </div>
            )}
          </>
        )}

        {
          activeTab1 === "OpenPosition" &&
          getPositionData.Scalping?.length === 0 &&
          getPositionData.NewScalping?.length === 0 &&
          getPositionData.Option?.length === 0 &&
          getPositionData.Pattern?.length === 0 &&
          getPositionData.ChartingData?.length === 0 && <NoDataFound />
        }
      </div>
    </Content >
  );
};

export default Userdashboard;
