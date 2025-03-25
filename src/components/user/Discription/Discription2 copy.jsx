// import React, { useState } from "react";
// import DiscriptionData from "./DiscriptionData";
// import Content from "../../../ExtraComponent/Content";
// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

// const Discription = () => {
//   const [value, setValue] = useState("1");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Content
//       Page_title={"📄 Description"}
//       button_status={false}
//       backbutton_status={true}>
//       <Box sx={{ width: "100%", typography: "body1" }}>
//         <TabContext value={value}>
//           {/* 🛠️ Styled Tabs */}
//           <Box
//             sx={{
//               borderBottom: 1,
//               borderColor: "divider",
//               backgroundColor: "#f8f9fa", // Light background for tabs
//               borderRadius: "8px 8px 0 0",
//               padding: "10px",
//               width: "100%",
//             }}>
//             <TabList
//               onChange={handleChange}
//               aria-label="lab API tabs example"
//               sx={{
//                 "& .MuiTab-root": {
//                   width: "33.33%", // Equal width for all tabs
//                   fontSize: "20px", // Bigger font size
//                   fontWeight: "bold", // Bold text
//                   textTransform: "none", // Remove uppercase
//                   padding: "12px 20px",
//                 },
//                 "& .Mui-selected": {
//                   color: "#1976d2", // Highlight active tab
//                   borderBottom: "3px solid #1976d2", // Underline effect
//                 },
//               }}>
//               <Tab label=" 📊 Scalping" value="1" />
//               <Tab label=" ⚡ Option" value="2" />
//               <Tab label="📈 Candlestick" value="3" />
//             </TabList>
//           </Box>

//           {/* Tabs Content */}
//           <TabPanel value="1">
//             <DiscriptionData Type={"Scalping"} />
//           </TabPanel>
//           <TabPanel value="2">
//             <DiscriptionData Type={"Option"} />
//           </TabPanel>
//           <TabPanel value="3">
//             <DiscriptionData Type={"Candlestick"} />
//           </TabPanel>
//         </TabContext>
//       </Box>
//     </Content>
//   );
// };
// export default Discription;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GetSingleChart,
  Option_Detail,
  ScalpingPositionDetails,
} from "../../CommonAPI/User";
import { Get_Pattern_Charting, Get_Pattern_Name } from "../../CommonAPI/Admin";

const DescriptionPage = () => {
  const [activeTab, setActiveTab] = useState("Scalping");
  const [scalpingOption, setScalpingOption] = useState("Single");
  const [selectedOption, setSelectedOption] = useState("Long Strangle");
  const [patternData, setPatternData] = useState([]);
  const [selectedPatternType, setSelectedPatternType] =
    useState("Charting Pattern");

  const [selectedPatternName, setSelectedPatternName] = useState("");
  const [description, setDescription] = useState([]);
  const [patternTypeOptions, setPatternTypeOptions] = useState([]);

  console.log("Description:", description);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log("Active Tab:", tab);
  };

  const handleScalpingChange = async (option) => {
    try {
      setScalpingOption(option);
 
      const reqData = { PositionType: option };
      const res = await ScalpingPositionDetails(reqData);
      console.log("res", res.data);
      setDescription(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOptionChange = async (option) => {
    try {
      setSelectedOption(option);
      console.log("Option Selected:", option);
      const reqData = { StrategyName: option.split(" ").join("") };
      const res = await Option_Detail(reqData);
      setDescription(res.data);
      console.log("res", res);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchPatternData = async () => {
    try {
      const reqData = {
        Pattern: selectedPatternName,
        PatternType: selectedPatternType,
        TType: "",
      };
      console.log("reqData is", reqData);
      const res = await GetSingleChart(reqData);
      setPatternData(res?.data);
      console.log("PatternResponse:", res);
    } catch (error) {
      console.error("Error fetching pattern data:", error);
    }
  };

  useEffect(() => {
    fetchPatternData();
  }, [selectedPatternName, selectedPatternType]);

  console.log("|Patterndata is", patternData);

  useEffect(() => {
    handleScalpingChange(scalpingOption);
  }, [scalpingOption, activeTab]);

  useEffect(() => {
    if (activeTab === "Option") {
      handleOptionChange(selectedOption);
    }
  }, [activeTab]);

  const handlePatternChange = (pattern) => {
    setSelectedPatternType(pattern);
    console.log("Pattern Selected:", pattern);
  };

  const fetchPatternTypeOptions = async () => {
    if (selectedPatternType === "Charting Pattern") {
      const data = await Get_Pattern_Charting();
      console.log("Charting Pattern Data:", data.PatternName);
      setPatternTypeOptions(data.PatternName);
    } else {
      const data = await Get_Pattern_Name();
      console.log("Charting Pattern Data2:", data.PatternName);
      setPatternTypeOptions(data.PatternName);
    }
  };
  useEffect(() => {
    fetchPatternTypeOptions();
  }, [selectedPatternType]);

  const handlePatternTypeChange = async (e) => {
    const value = e.target.value;
    setSelectedPatternType(value);

    console.log("Pattern Type Selected:", value);
  };

  const handlePatternNameChange = async (e) => {
    const value = e.target.value;
    setSelectedPatternName(value);
  };

  return (
    <div className="desc-page-wrapper card-bg-color">
      <div className="desc-container card-bg-color">
        <ul className="nav desc-nav-tabs">
          {["Scalping", "Option", "Pattern"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}>
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div className="desc-tab-content card-bg-color">
          {activeTab === "Scalping" && (
            <div className="scalping-content">
              <h5 className="desc-heading">Scalping Options</h5>
              <div className="desc-btn-group">
                {["Single", "Multiple"].map((option) => (
                  <button
                    key={option}
                    className={`btn btn-outline-primary ${
                      scalpingOption === option ? "active" : ""
                    }`}
                    onClick={() => handleScalpingChange(option)}>
                    {option}
                  </button>
                ))}
              </div>
              <div className="desc-details mt-3">
                <div className="desc-card card-bg-color">
                  <p className="desc-text">
                    <strong>Position Type:</strong>{" "}
                    {description?.[0]?.PositionType}
                  </p>
                  <p className="desc-text">
                    <strong>Description:</strong>{" "}
                    {description?.[0]?.Description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Option" && (
            <div>
              <h5 className="desc-heading">Select an Strategy</h5>
              <div className="desc-btn-group">
                {[
                  "Long Strangle",
                  "Short Strangle",
                  "Long Straddle",
                  "Short Straddle",
                ].map((opt) => (
                  <button
                    key={opt}
                    className={`btn btn-outline-secondary ${
                      selectedOption === opt ? "active" : ""
                    }`}
                    onClick={() => handleOptionChange(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
              <div className="desc-details mt-3">
                {description && description.length > 0 ? (
                  <div className="option-details d-flex flex-wrap card-bg-color">
                    <div className="option-image-container">
                      {description[0].image_data && (
                        <img
                          src={`data:image/png;base64,${description[0].image_data}`}
                          alt="Strategy"
                          className="option-image"
                        />
                      )}
                    </div>
                    <div className="option-info">
                      <p>
                        <strong>Strategy Name:</strong>{" "}
                        {description[0]["Strategy Name"]}
                      </p>
                      <p>
                        <strong>Market Outlook:</strong>{" "}
                        {description[0]["View (Market Outlook)"]}
                      </p>
                      <p>
                        <strong>Strategy:</strong> {description[0]["Strategy"]}
                      </p>
                      <p>
                        <strong>Risk (Max Loss):</strong>{" "}
                        {description[0]["Risk (Max Loss)"]}
                      </p>
                      <p>
                        <strong>Reward (Max Profit):</strong>{" "}
                        {description[0]["Reward (Max Profit)"]}
                      </p>
                      <div className="nested-info">
                        <p>
                          <strong>Breakeven Points:</strong>
                        </p>
                        <p>
                          <strong>Upper BE:</strong>{" "}
                          {description[0]["Breakeven Points"]?.["Upper BE"]}
                        </p>
                        <p>
                          <strong>Lower BE:</strong>{" "}
                          {description[0]["Breakeven Points"]?.["Lower BE"]}
                        </p>
                      </div>
                      <div className="nested-info">
                        <p>
                          <strong>Max Profit When :</strong>
                        </p>
                        <p>
                          <strong>Upward:</strong>{" "}
                          {description[0]["Max Profit When?"]?.["Upward"]}
                        </p>
                        <p>
                          <strong>Downward:</strong>{" "}
                          {description[0]["Max Profit When?"]?.["Downward"]}
                        </p>
                      </div>
                      <p>
                        <strong>Max Loss When :</strong>{" "}
                        {description[0]["Max Loss When?"]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>No option details available.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Pattern" && (
            <div>
              <h5 className="desc-heading">Select a Pattern</h5>
              <div className="desc-btn-group">
                <div className="dropdown-container me-2">
                  <label htmlFor="">Select Pattern Type</label>
                  <select
                    className="form-select"
                    value={selectedPatternType}
                    onChange={handlePatternTypeChange}>
                    <option value="Charting Pattern">Charting Pattern</option>
                    <option value="CandleStick Pattern">
                      CandleStick Pattern
                    </option>
                  </select>
                </div>
                <div className="dropdown-container">
                  <label htmlFor="">Select Pattern Name</label>
                  <select
                    className="form-select"
                    value={selectedPatternName}
                    onChange={handlePatternNameChange}>
                    {patternTypeOptions.map((pattern) => (
                      <option key={pattern} value={pattern}>
                        {pattern}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="desc-details mt-3">
                <div className="pattern-container-unique">
                  {/* Left Side - Image */}
                  <div className="image-container-unique">
                    <img
                      src={`data:image/png;base64,${patternData?.[0]?.image_data}`}
                      alt={patternData?.[0]?.Pattern}
                      className="pattern-image-unique"
                    />
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="text-content-unique">
                    <h2 className="pattern-title-unique">
                      {patternData?.[0]?.Pattern}
                    </h2>
                    <p className="pattern-type-unique">
                      <strong>Type:</strong> {patternData?.[0]?.PatternType}
                    </p>
                    <p className="trading-type-unique">
                      <strong>Trading Type:</strong> {patternData?.[0]?.TType}
                    </p>
                    <p className="pattern-description-unique card-bg-color">
                      {patternData?.[0]?.Description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
