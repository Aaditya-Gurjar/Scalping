// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   GetSingleChart,
//   Option_Detail,
//   ScalpingPositionDetails,
// } from "../../CommonAPI/User";
// import { Get_Pattern_Charting, Get_Pattern_Name } from "../../CommonAPI/Admin";

// const strategyOptions = {
//   "Straddle/Strangle": [
//     { title: "Long Strangle", value: "LongStrangle" },
//     { title: "Short Strangle", value: "ShortStrangle" },
//     { title: "Long Straddle", value: "LongStraddle" },
//     { title: "Short Straddle", value: "ShortStraddle" },
//   ],
//   "Butterfly/Condor": [
//     { title: "Long Iron Butterfly", value: "LongIronButterfly" },
//     { title: "Short Iron Butterfly", value: "ShortIronButterfly" },
//     { title: "Long Iron Condor", value: "LongIronCondor" },
//     { title: "Short Iron Condor", value: "ShortIronCondor" },
//   ],
//   Spread: [
//     { title: "Bear Call Spread", value: "BearCallSpread" },
//     { title: "Bear Put Spread", value: "BearPutSpread" },
//     { title: "Bull Call Spread", value: "BullCallSpread" },
//     { title: "Bull Put Spread", value: "BullPutSpread" },
//   ],
//   "Ladder/Covered": [
//     { title: "Bull Call Ladder", value: "BullCallLadder" },
//     { title: "Bull Put Ladder", value: "BullPutLadder" },
//     { title: "Covered Call", value: "CoveredCall" },
//     { title: "Covered Put", value: "CoveredPut" },
//   ],
//   "Collar/Ratio": [
//     { title: "Long Collar", value: "LongCollar" },
//     { title: "Short Collar", value: "ShortCollar" },
//     { title: "Ratio Call Spread", value: "RatioCallSpread" },
//     { title: "Ratio Put Spread", value: "RatioPutSpread" },
//   ],
//   // "Shifting/FourLeg": [
//   //   { title: "Short Shifting", value: "ShortShifting" },
//   //   { title: "Long Shifting", value: "LongShifting" },
//   //   { title: "Short Four Leg Strategy", value: "ShortFourLegStrategy" },
//   //   { title: "Long Four Leg Strategy", value: "LongFourLegStrategy" },
//   // ],
// };

// const DescriptionPage = () => {
//   const [activeTab, setActiveTab] = useState("Scalping");
//   const [scalpingOption, setScalpingOption] = useState("Single");
//   const [selectedOption, setSelectedOption] = useState("");
//   const [measurementType, setMeasurementType] = useState("Straddle/Strangle"); // Default measurement type
//   const [patternData, setPatternData] = useState([]);
//   const [selectedPatternType, setSelectedPatternType] = useState("Charting Pattern");
//   const [selectedPatternName, setSelectedPatternName] = useState("");
//   const [description, setDescription] = useState([]);
//   const [patternTypeOptions, setPatternTypeOptions] = useState([]);
//  const [ChartPatternTableData, setChartPatternTableData] = useState({
//     loading: true,
//     PatternData: [],
//     CandleData: [],
//   });
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);

//     if (tab === "Scalping") {
//       setScalpingOption("Single");
//       handleScalpingChange("Single");
//     } else if (tab === "Option") {
//       const defaultStrategy = strategyOptions[measurementType]?.[0];
//       if (defaultStrategy) {
//         setSelectedOption(defaultStrategy.value);
//         handleOptionChange(defaultStrategy);
//       }
//     } else if (tab === "Pattern") {
//       setSelectedPatternType("Charting Pattern");
//       fetchPatternTypeOptions(); // refetch names
//       if (patternTypeOptions.length > 0) {
//         const firstPattern = patternTypeOptions[0];
//         setSelectedPatternName(firstPattern);
//         fetchPatternData();
//       }
//     }
//   };


//   useEffect(() => {
//     if (activeTab === "Pattern" && patternTypeOptions.length > 0 && !selectedPatternName) {
//       const firstPattern = patternTypeOptions[0];
//       setSelectedPatternName(firstPattern);
//       fetchPatternData();
//     }
//   }, [patternTypeOptions]);


//   const handleScalpingChange = async (option) => {
//     try {
//       setScalpingOption(option);
//       const reqData = { PositionType: option };
//       const res = await ScalpingPositionDetails(reqData);
//       setDescription(res.data);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   const handleOptionChange = async (option) => {
//     try {
//       setSelectedOption(option.value);
//       const reqData = { StrategyName: option.value };
//       const res = await Option_Detail(reqData);
//       setDescription(res.data);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   useEffect(() => {
//     handleOptionChange(strategyOptions[measurementType][0]?.value)
//   }, [strategyOptions, measurementType, activeTab])


//   useEffect(() => {
//     if (measurementType) {
//       const defaultStrategy = strategyOptions[measurementType][0];
//       setSelectedOption(defaultStrategy.value);
//       handleOptionChange(defaultStrategy);
//     }

//   }, [measurementType]);

//   const fetchPatternData = async () => {
//     try {
//       const reqData = {
//         Pattern: selectedPatternName,
//         PatternType: selectedPatternType,
//         TType: "",
//       };
//       const res = await GetSingleChart(reqData);
//       setPatternData(res?.data);
//     } catch (error) {
//       console.error("Error fetching pattern data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPatternData();
//   }, [selectedPatternName, selectedPatternType]);

//   useEffect(() => {
//     handleScalpingChange(scalpingOption);
//   }, [scalpingOption, activeTab]);


//   const fetchPatternTypeOptions = async () => {
//     if (selectedPatternType === "Charting Pattern") {
//       const data = await Get_Pattern_Charting();
//       setPatternTypeOptions(data.PatternName);
//     } else {
//       const data = await Get_Pattern_Name();
//       setPatternTypeOptions(data.PatternName);
//     }
//   };

//   useEffect(() => {
//     fetchPatternTypeOptions();
//   }, [selectedPatternType]);

//   const handlePatternTypeChange = async (e) => {
//     const value = e.target.value;
//     setSelectedPatternType(value);
//   };

//   const handlePatternNameChange = async (e) => {
//     const value = e.target.value;
//     setSelectedPatternName(value);
//   };

//   useEffect(() => {
//     // Call API for scalping data on initial render
//     handleScalpingChange(scalpingOption);
//   }, []); // Removed dependencies to ensure it runs only on initial render

//   useEffect(() => {
//     // Call API for option details on initial render
//     if (measurementType) {
//       const defaultStrategy = strategyOptions[measurementType][0];
//       setSelectedOption(defaultStrategy.value);
//       handleOptionChange(defaultStrategy);
//     }
//   }, []); // Removed dependencies to ensure it runs only on initial render

//   useEffect(() => {
//     // Call API for pattern data on initial render
//     fetchPatternData();
//   }, []); // Removed dependencies to ensure it runs only on initial render

//   useEffect(() => {
//     // Fetch pattern type options on initial render
//     fetchPatternTypeOptions();
//   }, []); // Removed dependencies to ensure it runs only on initial render

//   return (
//     <div className="desc-page-wrapper card-bg-color">
//       <div className="desc-container card-bg-color">
//         <ul className="nav desc-nav-tabs">
//           {["Scalping", "Option", "Pattern"].map((tab) => (
//             <li className="nav-item" key={tab}>
//               <button
//                 className={`nav-link ${activeTab === tab ? "active" : ""}`}
//                 onClick={() => handleTabChange(tab)}
//               >
//                 {tab}
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div className="desc-tab-content card-bg-color">
//           {activeTab === "Scalping" && (
//             <div className="scalping-content">
//               <h5 className="desc-heading">Scalping Options</h5>
//               <div className="desc-btn-group">
//                 {["Single", "Multiple"].map((option) => (
//                   <button
//                     key={option}
//                     className={`btn btn-outline-primary ${
//                       scalpingOption === option ? "active" : ""
//                     }`}
//                     onClick={() => handleScalpingChange(option)}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//               <div className="desc-details mt-3">
//                 <div className="desc-card card-bg-color">
//                   <p className="desc-text">
//                     <strong>Position Type:</strong>{" "}
//                     {description?.[0]?.PositionType}
//                   </p>
//                   <p className="desc-text">
//                     <strong>Description:</strong>{" "}
//                     {description?.[0]?.Description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "Option" && (
//             <div>
//               {/* Improved Dropdown for selecting measurement/option type */}
//               <div className="dropdown-container mb-3">
//                 <label htmlFor="measurementType" className="form-label">
//                   Select Option Type
//                 </label>
//                 <select
//                   id="measurementType"
//                   className="form-select"
//                   value={measurementType}
//                   onChange={(e) => setMeasurementType(e.target.value)}
//                 >
//                   {Object.keys(strategyOptions).map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {measurementType && (
//                 <>
//                   <h5 className="desc-heading">Select a Strategy</h5>
//                   <div className="desc-btn-group">
//                     {strategyOptions[measurementType].map((opt) => (
//                       <button
//                         key={opt.value}
//                         className={`btn btn-outline-secondary ${
//                           selectedOption === opt.value ? "active" : ""
//                         }`}
//                         onClick={() => handleOptionChange(opt)}
//                       >
//                         {opt.title}
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}

//               <div className="desc-details mt-3">
//                 {description && description.length > 0 ? (
//                   <div className="option-details d-flex flex-wrap card-bg-color">
//                     <div className="option-image-container">
//                       {description[0].image_data && (
//                         <img
//                           src={`data:image/png;base64,${description[0].image_data}`}
//                           alt="Strategy"
//                           className="option-image"
//                         />
//                       )}
//                     </div>
//                     <div className="option-info">
//                       <p>
//                         <strong>Strategy Name:</strong>{" "}
//                         {description[0]["Strategy Name"]}
//                       </p>
//                       <p>
//                         <strong>Market Outlook:</strong>{" "}
//                         {description[0]["View (Market Outlook)"]}
//                       </p>
//                       <p>
//                         <strong>Strategy:</strong> {description[0]["Strategy"]}
//                       </p>
//                       <p>
//                         <strong>Risk (Max Loss):</strong>{" "}
//                         {description[0]["Risk (Max Loss)"]}
//                       </p>
//                       <p>
//                         <strong>Reward (Max Profit):</strong>{" "}
//                         {description[0]["Reward (Max Profit)"]}
//                       </p>
//                       <div className="nested-info">
//                         <p>
//                           <strong>Breakeven Points:</strong>
//                         </p>
//                         <p>
//                           <strong>Upper BE:</strong>{" "}
//                           {description[0]["Breakeven Points"]?.["Upper BE"]}
//                         </p>
//                         <p>
//                           <strong>Lower BE:</strong>{" "}
//                           {description[0]["Breakeven Points"]?.["Lower BE"]}
//                         </p>
//                       </div>
//                       <div className="nested-info">
//                         <p>
//                           <strong>Max Profit When :</strong>
//                         </p>
//                         <p>
//                           <strong>Upward:</strong>{" "}
//                           {description[0]["Max Profit When?"]?.["Upward"]}
//                         </p>
//                         <p>
//                           <strong>Downward:</strong>{" "}
//                           {description[0]["Max Profit When?"]?.["Downward"]}
//                         </p>
//                       </div>
//                       <p>
//                         <strong>Max Loss When :</strong>{" "}
//                         {description[0]["Max Loss When?"]}
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <p>No option details available.</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === "Pattern" && (
//             <div>
//               <h5 className="desc-heading">Select a Pattern</h5>
//               <div className="desc-btn-group">
//                 <div className="dropdown-container me-2">
//                   <label htmlFor="patternType" className="form-label">
//                     Select Pattern Type
//                   </label>
//                   <select
//                     id="patternType"
//                     className="form-select"
//                     value={selectedPatternType}
//                     onChange={handlePatternTypeChange}
//                   >
//                     <option value="Charting Pattern">Charting Pattern</option>
//                     <option value="CandleStick Pattern">CandleStick Pattern</option>
//                   </select>
//                 </div>
//                 <div className="dropdown-container">
//                   <label htmlFor="patternName" className="form-label">
//                     Select Pattern Name
//                   </label>
//                   <select
//                     id="patternName"
//                     className="form-select"
//                     value={selectedPatternName}
//                     onChange={handlePatternNameChange}
//                   >
//                     {patternTypeOptions.map((pattern) => (
//                       <option key={pattern} value={pattern}>
//                         {pattern}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="desc-details mt-3">
//                 <div className="pattern-container-unique">
//                   <div className="image-container-unique">
//                     <img
//                       src={`data:image/png;base64,${patternData?.[0]?.image_data}`}
//                       alt={patternData?.[0]?.Pattern}
//                       className="pattern-image-unique"
//                     />
//                   </div>
//                   <div className="text-content-unique">
//                     <h2 className="pattern-title-unique">
//                       {patternData?.[0]?.Pattern}
//                     </h2>
//                     <p className="pattern-type-unique">
//                       <strong>Type:</strong> {patternData?.[0]?.PatternType}
//                     </p>
//                     <p className="trading-type-unique">
//                       <strong>Trading Type:</strong> {patternData?.[0]?.TType}
//                     </p>
//                     <p className="pattern-description-unique card-bg-color">
//                       {patternData?.[0]?.Description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DescriptionPage;



import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GetSingleChart,
  Option_Detail,
  ScalpingPositionDetails,
} from "../../CommonAPI/User";
import { Get_Pattern_Charting, Get_Pattern_Name } from "../../CommonAPI/Admin";

// Strategy options organized by category
const STRATEGY_OPTIONS = {
  "Straddle/Strangle": [
    { title: "Long Strangle", value: "LongStrangle" },
    { title: "Short Strangle", value: "ShortStrangle" },
    { title: "Long Straddle", value: "LongStraddle" },
    { title: "Short Straddle", value: "ShortStraddle" },
  ],
  "Butterfly/Condor": [
    { title: "Long Iron Butterfly", value: "LongIronButterfly" },
    { title: "Short Iron Butterfly", value: "ShortIronButterfly" },
    { title: "Long Iron Condor", value: "LongIronCondor" },
    { title: "Short Iron Condor", value: "ShortIronCondor" },
  ],
  Spread: [
    { title: "Bear Call Spread", value: "BearCallSpread" },
    { title: "Bear Put Spread", value: "BearPutSpread" },
    { title: "Bull Call Spread", value: "BullCallSpread" },
    { title: "Bull Put Spread", value: "BullPutSpread" },
  ],
  "Ladder/Covered": [
    { title: "Bull Call Ladder", value: "BullCallLadder" },
    { title: "Bull Put Ladder", value: "BullPutLadder" },
    { title: "Covered Call", value: "CoveredCall" },
    { title: "Covered Put", value: "CoveredPut" },
  ],
  "Collar/Ratio": [
    { title: "Long Collar", value: "LongCollar" },
    { title: "Short Collar", value: "ShortCollar" },
    { title: "Ratio Call Spread", value: "RatioCallSpread" },
    { title: "Ratio Put Spread", value: "RatioPutSpread" },
  ],
};

// Tabs available in the component
const TABS = ["Scalping", "Option", "Pattern"];

const DescriptionPage = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("Scalping");

  // Scalping tab state
  const [scalpingOption, setScalpingOption] = useState("Single");

  // Option tab state
  const [measurementType, setMeasurementType] = useState("Straddle/Strangle");
  const [selectedOption, setSelectedOption] = useState("");

  // Pattern tab state
  const [selectedPatternType, setSelectedPatternType] = useState("Charting Pattern");
  const [selectedPatternName, setSelectedPatternName] = useState("");
  const [patternTypeOptions, setPatternTypeOptions] = useState([]);

  // Common state
  const [description, setDescription] = useState([]);
  const [patternData, setPatternData] = useState([]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Initialize default settings for each tab
    if (tab === "Scalping") {
      setScalpingOption("Single");
      fetchScalpingData("Single");
    } else if (tab === "Option") {
      const defaultStrategyCategory = STRATEGY_OPTIONS[measurementType];
      if (defaultStrategyCategory && defaultStrategyCategory.length > 0) {
        setSelectedOption(defaultStrategyCategory[0].value);
        fetchOptionData(defaultStrategyCategory[0]);
      }
    } else if (tab === "Pattern") {
      setSelectedPatternType("Charting Pattern");
      fetchPatternTypeOptions("Charting Pattern");
    }
  };

  // Fetch scalping data
  const fetchScalpingData = async (option) => {
    try {
      const reqData = { PositionType: option };
      const res = await ScalpingPositionDetails(reqData);
      setDescription(res.data);
    } catch (error) {
      console.error("Error fetching scalping data:", error);
    }
  };

  // Fetch option data
  const fetchOptionData = async (option) => {
    try {
      const reqData = { StrategyName: option.value };
      const res = await Option_Detail(reqData);
      setDescription(res.data);
    } catch (error) {
      console.error("Error fetching option data:", error);
    }
  };

  // Fetch pattern data
  const fetchPatternData = async () => {
    if (!selectedPatternName) return;

    try {
      const reqData = {
        Pattern: selectedPatternName,
        PatternType: selectedPatternType,
        TType: "",
      };
      const res = await GetSingleChart(reqData);
      setPatternData(res?.data || []);
    } catch (error) {
      console.error("Error fetching pattern data:", error);
    }
  };

  // Fetch pattern type options
  const fetchPatternTypeOptions = async (patternType) => {
    try {
      const patternTypeToUse = patternType || selectedPatternType;
      let data;

      if (patternTypeToUse === "Charting Pattern") {
        data = await Get_Pattern_Charting();
      } else {
        data = await Get_Pattern_Name();
      }

      setPatternTypeOptions(data.PatternName || []);

      // Select first pattern by default if available
      if (data.PatternName && data.PatternName.length > 0) {
        setSelectedPatternName(data.PatternName[0]);
      }
    } catch (error) {
      console.error("Error fetching pattern type options:", error);
    }
  };

  // Event handlers
  const handleScalpingChange = (option) => {
    setScalpingOption(option);
    fetchScalpingData(option);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option.value);
    fetchOptionData(option);
  };

  const handlePatternTypeChange = (e) => {
    const value = e.target.value;
    setSelectedPatternType(value);
    fetchPatternTypeOptions(value);
  };

  const handlePatternNameChange = (e) => {
    const value = e.target.value;
    setSelectedPatternName(value);
  };

  // Initialize component on mount
  useEffect(() => {
    handleTabChange(activeTab);
  }, []);

  // Update pattern data when pattern selection changes
  useEffect(() => {
    fetchPatternData();
  }, [selectedPatternName, selectedPatternType]);

  // Update option data when measurement type changes
  useEffect(() => {
    if (activeTab === "Option" && measurementType) {
      const defaultStrategy = STRATEGY_OPTIONS[measurementType][0];
      setSelectedOption(defaultStrategy.value);
      fetchOptionData(defaultStrategy);
    }
  }, [measurementType, activeTab]);

  return (
    <div className="desc-page-wrapper card-bg-color">
      <div className="desc-container card-bg-color">
        {/* Tab Navigation */}
        <ul className="nav nav-pills shadow rounded-pill p-1">
          {TABS.map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link rounded-pill ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div className="desc-tab-content card-bg-color">
          {/* Scalping Tab Content */}
          {activeTab === "Scalping" && (
            <div className="scalping-content">
              <h5 className="desc-heading">Scalping Options</h5>
              <div className="desc-btn-group">
                {["Single", "Multiple"].map((option) => (
                  <button
                    key={option}
                    className={`btn btn-outline-primary ${scalpingOption === option ? "active" : ""
                      }`}
                    onClick={() => handleScalpingChange(option)}
                  >
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

          {/* Option Tab Content */}
          {activeTab === "Option" && (
            <div>
              <div className="dropdown-container mb-3">
                <label htmlFor="measurementType" className="form-label">
                  Select Option Type
                </label>
                <select
                  id="measurementType"
                  className="form-select"
                  value={measurementType}
                  onChange={(e) => setMeasurementType(e.target.value)}
                >
                  {Object.keys(STRATEGY_OPTIONS).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {measurementType && (
                <>
                  <h5 className="desc-heading">Select a Strategy</h5>
                  <div className="desc-btn-group">
                    {STRATEGY_OPTIONS[measurementType].map((opt) => (
                      <button
                        key={opt.value}
                        className={`btn btn-outline-secondary ${selectedOption === opt.value ? "active" : ""
                          }`}
                        onClick={() => handleOptionChange(opt)}
                      >
                        {opt.title}
                      </button>
                    ))}
                  </div>
                </>
              )}

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

          {/* Pattern Tab Content */}
          {activeTab === "Pattern" && (
            <div>
              <h5 className="desc-heading">Select a Pattern</h5>
              <div className="desc-btn-group">
                <div className="dropdown-container me-2">
                  <label htmlFor="patternType" className="form-label">
                    Select Pattern Type
                  </label>
                  <select
                    id="patternType"
                    className="form-select"
                    value={selectedPatternType}
                    onChange={handlePatternTypeChange}
                  >
                    <option value="Charting Pattern">Charting Pattern</option>
                    <option value="CandleStick Pattern">CandleStick Pattern</option>
                  </select>
                </div>
                <div className="dropdown-container">
                  <label htmlFor="patternName" className="form-label">
                    Select Pattern Name
                  </label>
                  <select
                    id="patternName"
                    className="form-select"
                    value={selectedPatternName}
                    onChange={handlePatternNameChange}
                  >
                    {patternTypeOptions.map((pattern) => (
                      <option key={pattern} value={pattern}>
                        {pattern}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="desc-details mt-3">
                <div className="pattern-container-unique option-details d-flex flex-wrap card-bg-color">
                  <div className="image-container-unique">
                    {patternData?.[0]?.image_data && (
                      <img
                        src={`data:image/png;base64,${patternData[0].image_data}`}
                        alt={patternData[0].Pattern}
                        className="pattern-image-unique"
                      />
                    )}
                  </div>
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