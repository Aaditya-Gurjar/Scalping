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
  const [selectedOptionData, setSelectedOptionData] = useState(null);
  const [showPatternModal, setShowPatternModal] = useState(false);
  const [selectedPatternData, setSelectedPatternData] = useState(null);
  const location = useLocation();
  const groupName = location.state.name;

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
          const rowData = tableMeta.rowData;
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
          const rowData = tableMeta.rowData;
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
      const reqData = { PositionType: filteredData[0].FixedSM };
      const res = await ScalpingPositionDetails(reqData);
      setSelectedRowData(res.data);
    } else {
      setSelectedRowData(rowData);
    }
    setShowModal(true);
  };

  const handleViewOption = async (rowData) => {
    console.log("rowdata of 0 ", rowData);
    // const reqData = { StrategyName: "Bull_Put_Spread" }; // static for testng
    const reqData = { StrategyName: rowData[2] };
    const res = await Option_Detail(reqData);
    setSelectedOptionData(res.data?.[0]);
    setShowOptionModal(true);
  };

  const handleViewPattern = async (rowData) => {
    const reqData = {
      Pattern: rowData[3],
      PatternType: "CandleStick Pattern",
      TType: "",
    };
    const res = await GetSingleChart(reqData);
    console.log("res....", res.data?.[0]);
    setSelectedPatternData(res.data?.[0]);
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
          <div className="tab-content shadow-sm rounded bg-white p-3">
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
          <div className="tab-content shadow-sm rounded bg-white p-3">
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
          <div className="tab-content shadow-sm rounded bg-white p-3">
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>View Details</Modal.Title>
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
                    ? selectedRowData.Description ||
                      JSON.stringify(selectedRowData, null, 2)
                    : "No description available."}
                </p>
              </div>
            )}
            {modalActiveTab === "Parameters" && (
              <div>
                <p className="modal-parameters">
                  {selectedRowData
                    ? "Parameters details will be rendered here."
                    : "No parameters available."}
                </p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-text-color"
            onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showOptionModal}
        onHide={() => setShowOptionModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Option Strategy Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <strong>Strategy:</strong> {selectedOptionData?.["Strategy"]}
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-text-color"
            onClick={() => setShowOptionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showPatternModal}
        onHide={() => setShowPatternModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header closeButton>
          <Modal.Title>Pattern Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <strong>Type:</strong> {selectedPatternData?.["PatternType"]}
              </p>
              <p className="pattern-ttype">
                <strong>TType:</strong> {selectedPatternData?.["TType"]}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-text-color"
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
