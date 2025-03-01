// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { GetAllGroupService } from "../../CommonAPI/Admin";
// import { useLocation } from "react-router-dom";
// import GridExample from "../../../ExtraComponent/CommanDataTable";
// import NoDataFound from "../../../ExtraComponent/NoDataFound";
// import { Modal, Button } from "react-bootstrap";
// import { Eye } from "lucide-react";
// import {
//   GetSingleChart,
//   Option_Detail,
//   ScalpingPositionDetails,
// } from "../../CommonAPI/User";

// const ViewGroup = () => {
//   const [activeTab, setActiveTab] = useState("Scalping");
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalActiveTab, setModalActiveTab] = useState("Description");
//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const [showOptionModal, setShowOptionModal] = useState(false);
//   const [optionModalActiveTab, setOptionModalActiveTab] = useState("Description");
//   const [selectedOptionData, setSelectedOptionData] = useState(null);

//   const [showPatternModal, setShowPatternModal] = useState(false);
//   const [patternModalActiveTab, setPatternModalActiveTab] = useState("Description");
//   const [selectedPatternData, setSelectedPatternData] = useState(null);

//   const [parameters, setParameters] = useState([]);
//   const location = useLocation();
//   const groupName = location.state.name;

//   // Columns for the three tabs in the main grid
//   const getColumnsForScalping = [
//     {
//       name: "S.No",
//       label: "S.No",
//       options: {
//         filter: true,
//         sort: true,
//         customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
//       },
//     },
//     {
//       name: "Actions",
//       label: "Actions",
//       options: {
//         customBodyRender: (value, tableMeta) => (
//           <Eye
//             onClick={() => handleView(tableMeta.rowIndex)}
//             style={{ cursor: "pointer" }}
//           />
//         ),
//       },
//     },
//     {
//       name: "Symbol",
//       label: "Symbol",
//       options: { filter: true, sort: true },
//     },
//     {
//       name: "Targetselection",
//       label: "Target Selection",
//       options: { filter: true, sort: true },
//     },
//   ];

//   const getColForOption = [
//     {
//       name: "S.No",
//       label: "S.No",
//       options: {
//         filter: true,
//         sort: true,
//         customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
//       },
//     },
//     {
//       name: "Actions",
//       label: "Actions",
//       options: {
//         customBodyRender: (value, tableMeta) => {
//           const rowData = tableMeta.rowData;
//           return (
//             <Eye
//               onClick={() => handleViewOption(rowData)}
//               style={{ cursor: "pointer" }}
//             />
//           );
//         },
//       },
//     },
//     {
//       name: "STG",
//       label: "Option Type",
//       options: { filter: true, sort: true },
//     },
//     {
//       name: "Symbol",
//       label: "Symbol",
//       options: { filter: true, sort: true },
//     },
//   ];

//   const getColForPattern = [
//     {
//       name: "S.No",
//       label: "S.No",
//       options: {
//         filter: true,
//         sort: true,
//         customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
//       },
//     },
//     {
//       name: "Actions",
//       label: "Actions",
//       options: {
//         customBodyRender: (value, tableMeta) => {
//           const rowData = tableMeta.rowData;
//           return (
//             <Eye
//               onClick={() => handleViewPattern(rowData)}
//               style={{ cursor: "pointer" }}
//             />
//           );
//         },
//       },
//     },
//     {
//       name: "Symbol",
//       label: "Symbol",
//       options: { filter: true, sort: true },
//     },
//     {
//       name: "Pattern",
//       label: "Pattern Type",
//       options: { filter: true, sort: true },
//     },
//   ];

//   const handleView = async (rowData) => {
//     if (typeof rowData === "number") {
//       const filteredData = data.filter((_, index) => index === rowData);
//       setParameters(filteredData[0]);
//       const reqData = { PositionType: filteredData[0].FixedSM };
//       const res = await ScalpingPositionDetails(reqData);
//       setSelectedRowData(res.data);
//     } else {
//       setSelectedRowData(rowData);
//     }
//     setModalActiveTab("Description");
//     setShowModal(true);
//   };

//   const handleViewOption = async (rowData) => {
//     const reqData = { StrategyName: rowData[2] };
//     const res = await Option_Detail(reqData);
//     setSelectedOptionData(res.data?.[0]);
//     setOptionModalActiveTab("Description");
//     setShowOptionModal(true);
//   };

//   const handleViewPattern = async (rowData) => {
//     const reqData = {
//       Pattern: rowData[3],
//       PatternType: "CandleStick Pattern",
//       TType: "",
//     };
//     const res = await GetSingleChart(reqData);
//     setSelectedPatternData(res.data?.[0]);
//     setPatternModalActiveTab("Description");
//     setShowPatternModal(true);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const reqData = { Strategy: activeTab, Group: groupName };
//       const response = await GetAllGroupService(reqData);
//       setData(response.Data);
//     };
//     fetchData();
//   }, [activeTab, groupName]);

//   return (
//     <div className="container my-5">
//       <div className="d-flex justify-content-center">
//         <ul
//           className="nav nav-pills shadow rounded-pill p-1"
//           style={{ backgroundColor: "#f1f3f5" }}>
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === "Scalping" ? "active" : ""} rounded-pill`}
//               onClick={() => setActiveTab("Scalping")}
//               style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//               Scalping
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === "Option Strategy" ? "active" : ""} rounded-pill`}
//               onClick={() => setActiveTab("Option Strategy")}
//               style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//               Option Strategy
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === "Pattern" ? "active" : ""} rounded-pill`}
//               onClick={() => setActiveTab("Pattern")}
//               style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//               Pattern
//             </button>
//           </li>
//         </ul>
//       </div>
//       <div className="mt-4">
//         {activeTab === "Scalping" && (
//           <div className="tab-content shadow-sm rounded bg-white">
//             {data && data.length > 0 ? (
//               <GridExample
//                 columns={getColumnsForScalping}
//                 data={data}
//                 checkBox={false}
//               />
//             ) : (
//               <div className="text-center">
//                 <NoDataFound />
//               </div>
//             )}
//           </div>
//         )}
//         {activeTab === "Option Strategy" && (
//           <div className="tab-content shadow-sm rounded bg-white">
//             {data && data.length > 0 ? (
//               <GridExample
//                 columns={getColForOption}
//                 data={data}
//                 checkBox={false}
//               />
//             ) : (
//               <div className="text-center">
//                 <NoDataFound />
//               </div>
//             )}
//           </div>
//         )}
//         {activeTab === "Pattern" && (
//           <div className="tab-content shadow-sm rounded bg-white">
//             {data && data.length > 0 ? (
//               <GridExample
//                 columns={getColForPattern}
//                 data={data}
//                 checkBox={false}
//               />
//             ) : (
//               <NoDataFound />
//             )}
//           </div>
//         )}
//       </div>

//       {/* Scalping Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         size="lg"
//         centered
//         dialogClassName="custom-modal-dialog">
//         <Modal.Header className="card-bg-color" closeButton>
//           <Modal.Title className="card-text-Color">View Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex justify-content-center">
//             <ul className="nav nav-pills shadow rounded-pill p-1" style={{ backgroundColor: "#f1f3f5" }}>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${modalActiveTab === "Description" ? "active" : ""} rounded-pill`}
//                   onClick={() => setModalActiveTab("Description")}
//                   style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//                   Description
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${modalActiveTab === "Parameters" ? "active" : ""} rounded-pill`}
//                   onClick={() => setModalActiveTab("Parameters")}
//                   style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//                   Parameters
//                 </button>
//               </li>
//             </ul>
//           </div>
//           <div className="mt-3 modal-content-scroll">
//             {modalActiveTab === "Description" && (
//               <div>
//                 <p className="modal-description">
//                   {selectedRowData
//                     ? selectedRowData[0]?.Description ||
//                       JSON.stringify(selectedRowData, null, 2)
//                     : "No description available."}
//                 </p>
//               </div>
//             )}
//             {modalActiveTab === "Parameters" && (
//               <div className="modal-container">
//                 {selectedRowData ? (
//                   <div className="parameters-card card-bg-color">
//                     <h2 className="parameters-title card-text-Color">
//                       Trade Parameters
//                     </h2>
//                     <div className="parameters-grid">
//                       {[
//                         { label: "Symbol", value: parameters?.Symbol },
//                         { label: "Trading Type", value: parameters?.Trading },
//                         { label: "Trade Type", value: parameters?.TType },
//                         { label: "Measurement Type", value: parameters?.TStype },
//                         { label: "Target", value: parameters?.["Booking Point"] },
//                         { label: "Re-entry", value: parameters?.["Re-entry Point"] },
//                         { label: "Lot", value: parameters?.Quantity },
//                         { label: "Exit Day", value: parameters?.ExitDay },
//                         { label: "Entry Time", value: parameters?.EntryTime },
//                         { label: "Exit Time", value: parameters?.ExitTime },
//                         { label: "Trade Execution", value: parameters?.TradeExecution },
//                         { label: "Target Selection", value: parameters?.Targetselection },
//                       ].map((item, index) => (
//                         <div key={index} className="parameters-item card-bg-color">
//                           <span className="parameters-label card-text-Color">
//                             {item.label}:
//                           </span>
//                           <span className="parameters-value card-text-Color">
//                             {item.value || "N/A"}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="no-parameters card-text-Color">
//                     No parameters available.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             className="card-text-Color card-bg-color"
//             onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Option Strategy Modal */}
//       <Modal
//         show={showOptionModal}
//         onHide={() => setShowOptionModal(false)}
//         size="lg"
//         centered
//         dialogClassName="custom-modal-dialog">
//         <Modal.Header className="card-bg-color" closeButton>
//           <Modal.Title className="card-text-Color">Option Strategy Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex justify-content-center">
//             <ul className="nav nav-pills shadow rounded-pill p-1" style={{ backgroundColor: "#f1f3f5" }}>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${optionModalActiveTab === "Description" ? "active" : ""} rounded-pill`}
//                   onClick={() => setOptionModalActiveTab("Description")}
//                   style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//                   Description
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${optionModalActiveTab === "Parameters" ? "active" : ""} rounded-pill`}
//                   onClick={() => setOptionModalActiveTab("Parameters")}
//                   style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//                   Parameters
//                 </button>
//               </li>
//             </ul>
//           </div>
//           <div className="mt-3 modal-content-scroll">
//             {optionModalActiveTab === "Description" ? (
//               <div className="option-modal-container">
//                 <div className="option-image-container">
//                   {selectedOptionData && selectedOptionData["image_data"] ? (
//                     <img
//                       src={`data:image/png;base64,${selectedOptionData["image_data"]}`}
//                       alt="Option Strategy"
//                       className="img-fluid rounded shadow-sm option-image"
//                     />
//                   ) : (
//                     <div className="no-image">No Image Available</div>
//                   )}
//                 </div>
//                 <div className="option-details-container">
//                   <h5>{selectedOptionData?.["Strategy Name"]}</h5>
//                   <p>
//                     <strong>Market Outlook:</strong>{" "}
//                     {selectedOptionData?.["View (Market Outlook)"]}
//                   </p>
//                   <p>
//                     <strong>Strategy:</strong> {selectedOptionData?.["Strategy"]}
//                   </p>
//                   <p>
//                     <strong>Risk (Max Loss):</strong>{" "}
//                     {selectedOptionData?.["Risk (Max Loss)"]}
//                   </p>
//                   <p>
//                     <strong>Reward (Max Profit):</strong>{" "}
//                     {selectedOptionData?.["Reward (Max Profit)"]}
//                   </p>
//                   <p>
//                     <strong>Breakeven Point:</strong>{" "}
//                     {selectedOptionData?.["Breakeven Point"]}
//                   </p>
//                   <p>
//                     <strong>Max Profit When?:</strong>{" "}
//                     {selectedOptionData?.["Max Profit When?"]}
//                   </p>
//                   <p>
//                     <strong>Max Loss When?:</strong>{" "}
//                     {selectedOptionData?.["Max Loss When?"]}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="option-parameters-container">
//                 <h4 className="card-text-Color">Option Parameters</h4>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             className="card-text-Color card-bg-color"
//             onClick={() => setShowOptionModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Pattern Modal */}
//       <Modal
//         show={showPatternModal}
//         onHide={() => setShowPatternModal(false)}
//         size="lg"
//         centered
//         dialogClassName="custom-modal-dialog">
//         <Modal.Header className="card-bg-color" closeButton>
//           <Modal.Title className="card-text-Color">Pattern Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex justify-content-center">
//             <ul className="nav nav-pills shadow rounded-pill p-1" style={{ backgroundColor: "#f1f3f5" }}>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${patternModalActiveTab === "Description" ? "active" : ""} rounded-pill`}
//                   onClick={() => setPatternModalActiveTab("Description")}
//                   style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//                   Description
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${patternModalActiveTab === "Parameters" ? "active" : ""} rounded-pill`}
//                   onClick={() => setPatternModalActiveTab("Parameters")}
//                   style={{ padding: "10px 20px", margin: "5px", border: "none", outline: "none" }}>
//                   Parameters
//                 </button>
//               </li>
//             </ul>
//           </div>
//           <div className="mt-3 modal-content-scroll">
//             {patternModalActiveTab === "Description" ? (
//               <div className="pattern-modal-container">
//                 <div className="pattern-image-container">
//                   {selectedPatternData && selectedPatternData["image_data"] ? (
//                     <img
//                       src={`data:image/png;base64,${selectedPatternData["image_data"]}`}
//                       alt="Pattern"
//                       className="img-fluid rounded shadow-sm pattern-image"
//                     />
//                   ) : (
//                     <div className="no-image">No Image Available</div>
//                   )}
//                 </div>
//                 <div className="pattern-details-container">
//                   <h5>{selectedPatternData?.["Pattern"]}</h5>
//                   <p className="pattern-description">
//                     {selectedPatternData?.["Description"]}
//                   </p>
//                   <p className="pattern-type">
//                     <strong>Type:</strong> {selectedPatternData?.["PatternType"]}
//                   </p>
//                   <p className="pattern-ttype">
//                     <strong>TType:</strong> {selectedPatternData?.["TType"]}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="pattern-parameters-container">
//                 <h4 className="card-text-Color">Pattern Parameters</h4>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             className="card-text-Color card-bg-color"
//             variant="secondary"
//             onClick={() => setShowPatternModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ViewGroup;
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetAllGroupService } from "../../CommonAPI/Admin";
import { useLocation } from "react-router-dom";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { Modal, Button } from "react-bootstrap";
import { Eye } from "lucide-react";
import {
  GetSingleChart,
  Option_Detail,
  ScalpingPositionDetails,
} from "../../CommonAPI/User";

const ViewGroup = () => {
  const [activeTab, setActiveTab] = useState("Scalping");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState("Description");
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [showOptionModal, setShowOptionModal] = useState(false);
  const [optionModalActiveTab, setOptionModalActiveTab] =
    useState("Description");
  const [selectedOptionData, setSelectedOptionData] = useState(null);

  const [showPatternModal, setShowPatternModal] = useState(false);
  const [patternModalActiveTab, setPatternModalActiveTab] =
    useState("Description");
  const [selectedPatternData, setSelectedPatternData] = useState(null);

  const [parameters, setParameters] = useState([]);
  const location = useLocation();
  const groupName = location.state?.name || "";

  // Columns for the three tabs in the main grid
  const getColumnsForScalping = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Eye
            onClick={() => handleView(tableMeta.rowIndex)}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: { filter: true, sort: true },
    },
    {
      name: "Targetselection",
      label: "Target Selection",
      options: { filter: true, sort: true },
    },
  ];

  const getColForOption = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = tableMeta.rowIndex;
          return (
            <Eye
              onClick={() => handleViewOption(rowData)}
              style={{ cursor: "pointer" }}
            />
          );
        },
      },
    },
    {
      name: "STG",
      label: "Option Type",
      options: { filter: true, sort: true },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: { filter: true, sort: true },
    },
  ];

  const getColForPattern = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = tableMeta.rowIndex;
          return (
            <Eye
              onClick={() => handleViewPattern(rowData)}
              style={{ cursor: "pointer" }}
            />
          );
        },
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: { filter: true, sort: true },
    },
    {
      name: "Pattern",
      label: "Pattern Type",
      options: { filter: true, sort: true },
    },
  ];

  const handleView = async (rowData) => {
    if (typeof rowData === "number") {
      const filteredData = data.filter((_, index) => index === rowData);
      const newParameters = filteredData[0];
      setParameters(newParameters);
      const reqData = { PositionType: newParameters.FixedSM };
      const res = await ScalpingPositionDetails(reqData);
      setSelectedRowData(res.data);
    } else {
      setSelectedRowData(rowData);
    }
    setModalActiveTab("Description");
    setShowModal(true);
  };

  const handleViewOption = async (rowData) => {
    const filteredData = data.filter((_, index) => index === rowData);
    const newParameters = filteredData[0];
    setParameters(newParameters);
    const reqData = { StrategyName: newParameters?.STG };
    const res = await Option_Detail(reqData);
    setSelectedOptionData(res.data?.[0]);
    setOptionModalActiveTab("Description");
    setShowOptionModal(true);
  };

  const handleViewPattern = async (rowData) => {
    const filteredData = data.filter((_, index) => index === rowData);
    const newParameters = filteredData[0];
    setParameters(newParameters);
    const reqData = {
      Pattern: newParameters.Pattern,
      PatternType: "CandleStick Pattern",
      TType: "",
    };
    const res = await GetSingleChart(reqData);
    setSelectedPatternData(res.data?.[0]);
    setPatternModalActiveTab("Description");
    setShowPatternModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const reqData = { Strategy: activeTab, Group: groupName };
      const response = await GetAllGroupService(reqData);
      setData(response.Data);
    };
    fetchData();
  }, [activeTab, groupName]);

  console.log("Stateeee", parameters);
  console.log("selectedRowData", selectedRowData);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center">
        <ul
          className="nav nav-pills shadow rounded-pill p-1"
          style={{ backgroundColor: "#f1f3f5" }}>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "Scalping" ? "active" : ""
              } rounded-pill`}
              onClick={() => setActiveTab("Scalping")}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}>
              Scalping
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "Option Strategy" ? "active" : ""
              } rounded-pill`}
              onClick={() => setActiveTab("Option Strategy")}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}>
              Option Strategy
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "Pattern" ? "active" : ""
              } rounded-pill`}
              onClick={() => setActiveTab("Pattern")}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}>
              Pattern
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        {activeTab === "Scalping" && (
          <div className="tab-content shadow-sm rounded  ">
            {data && data.length > 0 ? (
              <GridExample
                columns={getColumnsForScalping}
                data={data}
                checkBox={false}
              />
            ) : (
              <div className="text-center">
                <NoDataFound />
              </div>
            )}
          </div>
        )}
        {activeTab === "Option Strategy" && (
          <div className="tab-content shadow-sm rounded ">
            {data && data.length > 0 ? (
              <GridExample
                columns={getColForOption}
                data={data}
                checkBox={false}
              />
            ) : (
              <div className="text-center">
                <NoDataFound />
              </div>
            )}
          </div>
        )}
        {activeTab === "Pattern" && (
          <div className="tab-content shadow-sm rounded ">
            {data && data.length > 0 ? (
              <GridExample
                columns={getColForPattern}
                data={data}
                checkBox={false}
              />
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </div>

      {/* Scalping Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title className="card-text-Color">View Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-pills shadow rounded-pill p-1"
              style={{ backgroundColor: "#f1f3f5" }}>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    modalActiveTab === "Description" ? "active" : ""
                  } rounded-pill`}
                  onClick={() => setModalActiveTab("Description")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    modalActiveTab === "Parameters" ? "active" : ""
                  } rounded-pill`}
                  onClick={() => setModalActiveTab("Parameters")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Parameters
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-3 modal-content-scroll">
            {modalActiveTab === "Description" && (
              <div>
                <p className="modal-description">
                  {selectedRowData
                    ? selectedRowData[0]?.Description ||
                      JSON.stringify(selectedRowData, null, 2)
                    : "No description available."}
                </p>
              </div>
            )}
            {modalActiveTab === "Parameters" && (
              <div className="modal-container">
                {parameters ? (
                  <div className="parameters-card card-bg-color">
                    <h2 className="parameters-title card-text-Color">
                      Trade Parameters
                    </h2>
                    <div className="parameters-grid">
                      {[
                        { label: "Symbol", value: parameters?.Symbol },
                        { label: "Trading Type", value: parameters?.Trading },
                        { label: "Trade Type", value: parameters?.TType },
                        {
                          label: "Measurement Type",
                          value: parameters?.TStype,
                        },
                        {
                          label: "Target",
                          value: parameters?.["Booking Point"],
                        },
                        {
                          label: "Re-entry",
                          value: parameters?.["Re-entry Point"],
                        },
                        { label: "Lot", value: parameters?.Quantity },
                        { label: "Exit Day", value: parameters?.ExitDay },
                        { label: "Entry Time", value: parameters?.EntryTime },
                        { label: "Exit Time", value: parameters?.ExitTime },
                        {
                          label: "Trade Execution",
                          value: parameters?.TradeExecution,
                        },
                        {
                          label: "Target Selection",
                          value: parameters?.Targetselection,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="parameters-item card-bg-color">
                          <span className="parameters-label card-text-Color">
                            {item.label}:
                          </span>
                          <span className="parameters-value card-text-Color">
                            {item.value || "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="no-parameters card-text-Color">
                    No parameters available.
                  </p>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="card-text-Color card-bg-color"
            onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Option Strategy Modal */}
      <Modal
        show={showOptionModal}
        onHide={() => setShowOptionModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title className="card-text-Color">
            Option Strategy Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-pills shadow rounded-pill p-1"
              style={{ backgroundColor: "#f1f3f5" }}>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    optionModalActiveTab === "Description" ? "active" : ""
                  } rounded-pill`}
                  onClick={() => setOptionModalActiveTab("Description")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    optionModalActiveTab === "Parameters" ? "active" : ""
                  } rounded-pill`}
                  onClick={() => setOptionModalActiveTab("Parameters")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Parameters
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-3 modal-content-scroll">
            {optionModalActiveTab === "Description" ? (
              <div className="option-modal-container">
                <div className="option-image-container">
                  {selectedOptionData && selectedOptionData["image_data"] ? (
                    <img
                      src={`data:image/png;base64,${selectedOptionData["image_data"]}`}
                      alt="Option Strategy"
                      className="img-fluid rounded shadow-sm option-image"
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="option-details-container">
                  <h5>{selectedOptionData?.["Strategy Name"]}</h5>
                  <p>
                    <strong>Market Outlook:</strong>{" "}
                    {selectedOptionData?.["View (Market Outlook)"]}
                  </p>
                  <p>
                    <strong>Strategy:</strong>{" "}
                    {selectedOptionData?.["Strategy"]}
                  </p>
                  <p>
                    <strong>Risk (Max Loss):</strong>{" "}
                    {selectedOptionData?.["Risk (Max Loss)"]}
                  </p>
                  <p>
                    <strong>Reward (Max Profit):</strong>{" "}
                    {selectedOptionData?.["Reward (Max Profit)"]}
                  </p>
                  <p>
                    <strong>Breakeven Point:</strong>{" "}
                    {selectedOptionData?.["Breakeven Point"]}
                  </p>
                  <p>
                    <strong>Max Profit When?:</strong>{" "}
                    {selectedOptionData?.["Max Profit When?"]}
                  </p>
                  <p>
                    <strong>Max Loss When?:</strong>{" "}
                    {selectedOptionData?.["Max Loss When?"]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="option-parameters-container">
                <div className="modal-container">
                  {parameters ? (
                    <div className="parameters-card card-bg-color">
                      <h2 className="parameters-title card-text-Color">
                        Trade Parameters
                      </h2>
                      <div className="parameters-grid">
                        {[
                          { label: "Option type", value: parameters?.STG },
                          {
                            label: "risk handle",
                            value: parameters?.Targettype,
                          },
                          { label: "symbol", value: parameters?.Symbol },
                          {
                            label: "expiry type",
                            value: parameters?.Expirytype,
                          },
                          {
                            label: "measurement type",
                            value: parameters?.strategytype,
                          },
                          {
                            label: "target",
                            value: parameters?.["Target value"],
                          },
                          {
                            label: "Stoploss",
                            value: parameters?.["SL value"],
                          },
                          {
                            label: "Trade execution",
                            value: parameters?.TradeExecution,
                          },
                          { label: "lot", value: parameters?.["Lot Size"] },
                          {
                            label: "exit day",
                            value: parameters?.["Product Type"],
                          },
                          {
                            label: "entry time",
                            value: parameters?.["Entry Time"],
                          },
                          {
                            label: "exit time",
                            value: parameters?.["Exit Time"],
                          },
                          {
                            label: "strike type",
                            value: parameters?.StrikeType,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="parameters-item card-bg-color">
                            <span className="parameters-label card-text-Color">
                              {item.label}:
                            </span>
                            <span className="parameters-value card-text-Color">
                              {item.value || "N/A"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-parameters card-text-Color">
                      No parameters available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="card-text-Color card-bg-color"
            onClick={() => setShowOptionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pattern Modal */}
      <Modal
        show={showPatternModal}
        onHide={() => setShowPatternModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title className="card-text-Color">Pattern Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-pills shadow rounded-pill p-1"
              style={{ backgroundColor: "#f1f3f5" }}>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    patternModalActiveTab === "Description" ? "active" : ""
                  } rounded-pill`}
                  onClick={() => setPatternModalActiveTab("Description")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    patternModalActiveTab === "Parameters" ? "active" : ""
                  } rounded-pill`}
                  onClick={() => setPatternModalActiveTab("Parameters")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Parameters
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-3 modal-content-scroll">
            {patternModalActiveTab === "Description" ? (
              <div className="pattern-modal-container">
                <div className="pattern-image-container">
                  {selectedPatternData && selectedPatternData["image_data"] ? (
                    <img
                      src={`data:image/png;base64,${selectedPatternData["image_data"]}`}
                      alt="Pattern"
                      className="img-fluid rounded shadow-sm pattern-image"
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="pattern-details-container">
                  <h5>{selectedPatternData?.["Pattern"]}</h5>
                  <p className="pattern-description">
                    {selectedPatternData?.["Description"]}
                  </p>
                  <p className="pattern-type">
                    <strong>Type:</strong>{" "}
                    {selectedPatternData?.["PatternType"]}
                  </p>
                  <p className="pattern-ttype">
                    <strong>TType:</strong> {selectedPatternData?.["TType"]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="pattern-parameters-container">
                <div className="modal-container">
                  {parameters ? (
                    <div className="parameters-card card-bg-color">
                      <h2 className="parameters-title card-text-Color">
                        Trade Parameters
                      </h2>
                      <div className="parameters-grid">
                        {[
                          {
                            label: "Pattern Name",
                            value: parameters?.TradePattern,
                          },
                          { label: "Pattern Type", value: parameters?.Pattern },
                          { label: "Symbol", value: parameters?.Symbol },
                          { label: "Trade type", value: parameters?.TType },
                          { label: "Quantity", value: parameters?.Quantity },
                          { label: "Time Frame", value: parameters?.TimeFrame },
                          {
                            label: "Measuremnet type",
                            value: parameters?.TStype,
                          },
                          {
                            label: "target",
                            value: parameters?.["Target value"],
                          },
                          {
                            label: "Stoploss",
                            value: parameters?.["SL value"],
                          },
                          {
                            label: "trade execution",
                            value: parameters?.TradeExecution,
                          },
                          { label: "exit day", value: parameters?.ExitDay },
                          { label: "entry time", value: parameters?.EntryTime },
                          { label: "exit time", value: parameters?.ExitTime },
                          {
                            label: "strike type",
                            value: parameters?.["Strike Price"],
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="parameters-item card-bg-color">
                            <span className="parameters-label card-text-Color">
                              {item.label}:
                            </span>
                            <span className="parameters-value card-text-Color">
                              {item.value || "N/A"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-parameters card-text-Color">
                      No parameters available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="card-text-Color card-bg-color"
            variant="secondary"
            onClick={() => setShowPatternModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewGroup;
