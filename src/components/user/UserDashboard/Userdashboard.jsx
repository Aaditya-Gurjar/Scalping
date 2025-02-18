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
const Userdashboard = () => {
  const userName = localStorage.getItem("name");
  const dashboardStrategyType = sessionStorage.getItem("dashboardStrategyType");
  const addVia = sessionStorage.getItem("addVia")
  const groupName = sessionStorage.getItem("groupName")
  const [activeTab1, setActiveTab1] = useState("CurrentPosition");
  const [activeTab, setActiveTab] = useState(addVia || "currentScript");
  const [subTab, setSubTab] = useState(dashboardStrategyType || "Scalping");
  const [refresh, setRefresh] = useState(false);
  const [getGroup, setGroup] = useState( groupName || "");
  const [strategyType, setStrategyType] = useState([]);
  const [tableType, setTableType] = useState(dashboardStrategyType || "MultiCondition");
  const [serviceStatus, setServiceStatus] = useState({ status: false, msg: "",});
  const [getGroupName, setGroupName] = useState({ loading: true, data: [] });
  const [getPositionData, setPositionData] = useState({
    loading: true,
    Scalping: [],
    Option: [],
    Pattern: [],
    NewScalping: [],
    ChartingData: [],
  });


  useEffect(() => {
    GetExpriyEndDate();
    fetchStrategyType();
    GetOpenPosition();
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
            data: response?.Data?.map((item) => item?.value || item)
          });
        } else {
          setGroupName({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the group name", err);
      });
  };

  const GetExpriyEndDate = async () => {
    const data = { Username: userName };
    await ExpriyEndDate(data)
      .then((response) => {
        setServiceStatus({
          status: response.Status,
          msg: response.message,
        });
      })
      .catch((err) => {
        console.log("Error in finding the Service end date", err);
      });
  };

  const GetOpenPosition = async () => {
    const data = { userName: userName };
    await OpenPosition(data)
      .then((response) => {
        if (response.Status) {
          setPositionData({
            loading: false,
            Scalping: response.Scalping,
            Option: response.Option,
            Pattern: response.Pattern,
            NewScalping: response?.NewScalping,
            ChartingData: response?.ChartingData,
          });
        } else {
          setPositionData({
            loading: false,
            Scalping: [],
            Option: [],
            Pattern: [],
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
      label: "Unique ID",
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
      name: "Token",
      label: "Token",
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
      label: "Trade Type",
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
      label: "Unique ID",
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
      label: "TradePattern",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SPattern",
      label: "Pattern Type",
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
      label: "Unique ID",
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
    if (subTab === "Scalping") {
      setTableType(dashboardStrategyType || "MultiCondition");
    }
    else {
      setTableType(dashboardStrategyType || "Scalping");
    }
  }, [subTab]);


  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-body" style={{ padding: "3px" }}>
              <ul
                className="nav nav-tabs justify-content-center"
                id="myTab-2"
                role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab1 === "CurrentPosition" ? "active" : ""
                    }`}
                    id="home-tab-justify"
                    data-bs-toggle="tab"
                    href="#home-justify"
                    role="tab"
                    aria-controls="home"
                    aria-selected={activeTab1 === "CurrentPosition"}
                    onClick={() => setActiveTab1("CurrentPosition")}>
                    Current Script
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab1 === "OpenPosition" ? "active" : ""
                    }`}
                    id="profile-tab-justify"
                    data-bs-toggle="tab"
                    href="#profile-justify"
                    role="tab"
                    aria-controls="profile"
                    aria-selected={activeTab1 === "OpenPosition"}
                    onClick={() => setActiveTab1("OpenPosition")}>
                    Open Position
                  </a>
                </li>
              </ul>

              <div className="row mt-3">
                {activeTab1 === "CurrentPosition" && (
                  <div className="d-flex">
                    <div
                      className={`form-group ${
                        activeTab == "currentScript" && subTab == "Scalping"
                          ? "col-lg-6"
                          : activeTab == "group" && subTab == "Scalping"
                          ? "col-lg-4"
                          : activeTab == "currentScript"
                          ? "col-lg-6"
                          : activeTab == "group"
                          ? "col-lg-4"
                          : "col-lg-4"
                      }`}>
                      <div className="px-3">
                        <label>Add Via</label>
                        <select
                          className="form-select"
                          required=""
                          onChange={(e) => {
                            setActiveTab(e.target.value);
                            sessionStorage.setItem('addVia',e.target.value)
                          }}
                          value={activeTab}>
                          <option value="currentScript">Current Script</option>
                          <option value="group">Group Script</option>
                        </select>
                      </div>
                    </div>
                    {activeTab == "group" && (
                      <div
                        className={`form-group ${
                          activeTab == "currentScript" && subTab == "Scalping"
                            ? "col-lg-4"
                            : activeTab == "group" && subTab == "Scalping"
                            ? "col-lg-4"
                            : activeTab == "currentScript"
                            ? "col-lg-6"
                            : activeTab == "group"
                            ? "col-lg-4"
                            : "col-lg-4"
                        }`}>
                        <div className="px-3">
                          <label>Group Name</label>
                          <select
                            className="form-select"
                            required=""
                            onChange={(e) => {
                              setGroup(e.target.value);
                            sessionStorage.setItem('groupName',e.target.value)
                            }}
                            value={getGroup}>
                            <option value="">Select Group Name</option>
                            <option value="copyScript">Copy Script</option>

                            
                            {getGroupName &&
                              getGroupName.data.map((item) => {
                                return <option value={item}>{item}</option>;
                              })}
                           
                          </select>
                        </div>
                      </div>
                    )}

                    <div
                      className={`form-group ${
                        activeTab == "currentScript" && subTab == "Scalping"
                          ? "col-lg-6"
                          : activeTab == "group" && subTab == "Scalping"
                          ? "col-lg-4"
                          : activeTab == "currentScript"
                          ? "col-lg-6"
                          : activeTab == "group"
                          ? "col-lg-4"
                          : "col-lg-4"
                      }`}>
                      <div className="px-3">
                        <label>Strategy Type</label>
                        <select
                          className="form-select"
                          required=""
                          onChange={(e) => {
                            setSubTab(e.target.value);
                            sessionStorage.setItem("dashboardStrategyType", e.target.value);
                          }}
                          value={subTab}>
                          {strategyType.map((type, index) => (
                            <option key={index} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {subTab === "Scalping" && (
                      <div
                        className={`form-group ${
                          activeTab == "currentScript" && subTab == "Scalping"
                            ? "col-lg-4"
                            : activeTab == "group" && subTab == "Scalping"
                            ? "col-lg-4"
                            : activeTab == "currentScript"
                            ? "col-lg-6"
                            : activeTab == "group"
                            ? "col-lg-4"
                            : "col-lg-4"
                        }`}>
                        {/* <div className="px-3">
                          <label>Table Type</label>
                          <select
                            className="form-select"
                            required=""
                            onChange={(e) => {
                              setTableType(e.target.value);
                            }}
                            value={tableType}>
                            <option value="Scalping">Scalping</option>
                            <option value="MultiCondition">
                              Multi Condition
                            </option>
                          </select>
                        </div> */}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="">
                {activeTab1 === "CurrentPosition" ? (
                  <>
                    {activeTab === "group" ? (
                      <div className="tab-pane fade show active" id="home-justify" role="tabpanel">
                        <div className="mt-3">
                          {subTab && serviceStatus ? (
                            getGroup === "copyScript" ? (
                              <Coptyscript data={subTab} selectedType={activeTab} data2={serviceStatus} />
                            ) : (
                              <GroupScript data={subTab} selectedType={activeTab} GroupName={getGroup} data2={serviceStatus} />
                            )
                          ) : (
                            <NoDataFound />
                          )}
                        </div>
                      </div>
                    ) : activeTab === "currentScript" ? (
                      <div className="tab-pane fade show active" id="home-justify" role="tabpanel">
                        <div className="tab-content mt-3">
                        
                          {subTab && serviceStatus ? (
                            <CurrentScript tableType={tableType} data={subTab} selectedType={activeTab} data2={serviceStatus} />
                          ) : (
                            <NoDataFound />
                          )}
                        </div>
                      </div>
                    ) : (
                      <NoDataFound />
                    )}
                  </>
                ) : (
                  <NoDataFound />
                )}
              </div> */}

              {/* <div className="tab-content">
                {activeTab1 === "OpenPosition" &&
                  (getPositionData.Scalping &&
                    getPositionData.NewScalping &&
                    getPositionData.Option &&
                    getPositionData.Pattern &&
                    getPositionData.ChartingData ? (
                    <>
                      {getPositionData.Scalping &&
                        getPositionData.Scalping.length > 0 && (
                          <div className="mt-4">
                            <h4>Scalping</h4>
                            <FullDataTable
                              columns={columns1}
                              data={getPositionData.Scalping}
                              checkBox={false}
                            />
                          </div>
                        )}
                      {getPositionData.NewScalping &&
                        getPositionData.NewScalping.length > 0 && (
                          <div className="mt-4">
                            <h4>Multi Condition</h4>
                            <FullDataTable
                              columns={columns4}
                              data={getPositionData.NewScalping}
                              checkBox={false}
                            />
                          </div>
                        )}

                      {getPositionData.Option &&
                        getPositionData.Option.length > 0 && (
                          <div className="mt-4">
                            <h4>Option</h4>
                            <FullDataTable
                              columns={columns2}
                              data={getPositionData.Option}
                              checkBox={false}
                            />
                          </div>
                        )}

                      {getPositionData.Pattern &&
                        getPositionData.Pattern.length > 0 && (
                          <div className="mt-4">
                            <h4>Pattern</h4>
                            <FullDataTable
                              columns={columns3}
                              data={getPositionData.Pattern}
                              checkBox={false}
                            />
                          </div>
                        )}

                      {getPositionData.ChartingData &&
                        getPositionData.ChartingData.length > 0 && (
                          <div className="mt-4">
                            <h4>Charting Platform</h4>
                            <FullDataTable
                              columns={columns5}
                              data={getPositionData.ChartingData}
                              checkBox={false}
                            />
                          </div>
                        )}
                    </>
                  ) : (
                    <NoDataFound />
                  ))}
              </div> */}

              <div className="">
                {activeTab1 === "CurrentPosition" && (
                  <>
                    {activeTab === "group" ? (
                      <div
                        className="tab-pane fade show active"
                        id="home-justify"
                        role="tabpanel">
                        <div className="mt-3">
                          {subTab && serviceStatus ? (
                            getGroup === "copyScript" ? (
                              <Coptyscript
                                data={subTab}
                                selectedType={activeTab}
                                data2={serviceStatus}
                              />
                            ) : (
                              <GroupScript
                                data={subTab}
                                selectedType={activeTab}
                                GroupName={getGroup}
                                data2={serviceStatus}
                              />
                            )
                          ) : null}
                        </div>
                      </div>
                    ) : activeTab === "currentScript" ? (
                      <div
                        className="tab-pane fade show active"
                        id="home-justify"
                        role="tabpanel">
                        <div className="tab-content mt-3">
                          {subTab && serviceStatus ? (
                            <CurrentScript
                              tableType={tableType}
                              data={subTab}
                              selectedType={activeTab}
                              data2={serviceStatus}
                            />
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}

                {activeTab1 === "OpenPosition" && (
                  <>
                    {/* {getPositionData.Scalping?.length > 0 && (
                      <div className="mt-4">
                        <h4>Scalping</h4>
                        <FullDataTable
                          columns={columns1}
                          data={getPositionData.Scalping}
                          checkBox={false}
                        />
                      </div>
                    )} */}

                    {getPositionData.NewScalping?.length > 0 && (
                      <div className="mt-4">
                        <h4>Multi Condition</h4>
                        <FullDataTable
                          columns={columns4}
                          data={getPositionData.NewScalping}
                          checkBox={false}
                        />
                      </div>
                    )}

                    {getPositionData.Option?.length > 0 && (
                      <div className="mt-4">
                        <h4>Option</h4>
                        <FullDataTable
                          columns={columns2}
                          data={getPositionData.Option}
                          checkBox={false}
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
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Agar dono section me kahin bhi data nahi hai to hi NoDataFound dikhao */}
                {!(subTab && serviceStatus) &&
                  !(
                    getPositionData.Scalping?.length > 0 ||
                    getPositionData.NewScalping?.length > 0 ||
                    getPositionData.Option?.length > 0 ||
                    getPositionData.Pattern?.length > 0 ||
                    getPositionData.ChartingData?.length > 0
                  ) && <NoDataFound />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
