// TradeResponseCard.js
import React from "react";
import PropTypes from "prop-types";
import "./tradeResponseCard.css";

const TradeResponseCard = ({ data, index }) => {
  let orderDetails = {};
  let responseDetails = {};

  try {
    orderDetails = JSON.parse(data.Orderdetail || "{}");
  } catch (error) {
    console.error("Invalid JSON in Orderdetail:", data.Orderdetail);
    orderDetails = {};
  }

  try {
    responseDetails = JSON.parse(data.Response || "{}");
  } catch (error) {
    console.error("Invalid JSON in Response:", data.Response);
    responseDetails = {};
  }

  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value); // Stringify nested objects
    }
    return value;
  };

  return (
    <div className="response-card-container card-bg-color">
      <div className="response-card card shadow-sm">
        <div className="response-card-header card-text-Color">
          <h5 className="text-white">Trade Response #{index + 1}</h5>
        </div>
        <div className="response-card-body card-text-Color">
          <div className="row">
            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">S.No:</strong>{" "}
                <span className="card-text-Color">{index + 1}</span>
              </p>
            </div>
            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">Symbol:</strong>{" "}
                <span className="card-text-Color">{data.Symbol || "N/A"}</span>
              </p>
            </div>
            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">User ID:</strong>{" "}
                <span className="card-text-Color">{data.User_Id || "N/A"}</span>
              </p>
            </div>
            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">Token:</strong>{" "}
                <span className="card-text-Color">{data.Token || "N/A"}</span>
              </p>
            </div>
            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">Strategy Type:</strong>{" "}
                <span className="card-text-Color">
                  {data.StrategyType || "N/A"}
                </span>
              </p>
            </div>
            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">Order:</strong>{" "}
                <span className="card-text-Color">
                  {data.Order ? (
                    typeof data.Order === "object" ? (
                      JSON.stringify(data.Order)
                    ) : (
                      data.Order
                    )
                  ) : (
                    "N/A"
                  )}
                </span>
              </p>
            </div>

            <div className="col-6 mb-2">
              <p className="card-text-Color">
                <strong className="card-text-Color">Reason:</strong>{" "}
                <span className="card-text-Color">
                  {typeof data?.Reason === "object" && data?.Reason !== null
                    ? JSON.stringify(data.Reason, null, 2) // Pretty-print object
                    : data?.Reason || "N/A"} {/* Show string or fallback to "N/A" */}
                </span>
              </p>
            </div>

            <div className="col-12 mb-3">
              <h6 className="response-card-section-title card-text-Color">
                Order Details
              </h6>
              <div
                className="order-details-container"
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap", // Preserve formatting for JSON or strings
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  marginTop: "10px",
                }}
              >
                <p className="card-text-Color">
                  {typeof data.Orderdetail === "string"
                    ? data.Orderdetail // Directly show stringified JSON or plain string
                    : JSON.stringify(data.Orderdetail, null, 2)} {/* Pretty-print objects */}
                </p>
              </div>
            </div>

            
            <div className="col-12">
              <h6 className="response-card-section-title card-text-Color">
                Response
              </h6>
              <ul className="response-card-list">
                {Object.entries(responseDetails).map(([key, value]) => (
                  <li key={key} className="card-text-Color">
                    <strong className="card-text-Color">{key}:</strong>{" "}
                    <span className="card-text-Color">{renderValue(value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TradeResponseCard.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TradeResponseCard;