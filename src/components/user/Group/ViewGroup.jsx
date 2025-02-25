import React, { useState } from "react";
import "./GroupStyles.css"; // Ensure this CSS file has responsive styles
import { Container, Row, Col } from "react-bootstrap"; // Bootstrap Grid

const ShortStraddle = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Container fluid className="container_view">
      {/* Header Section */}
      <Row className="header_view">
        <Col xs={12}>
          <h2 className="text-center text-md-start">Short Straddle - 2 Leg</h2>
          <p className="text-center text-md-start">
            <strong>Symbol:</strong> Nifty Bank | <strong>Type:</strong> Intraday |
            <strong> Required Margin:</strong> ₹180K |{" "}
            <strong>Start Time:</strong> 09:30 | <strong>End Time:</strong> 15:00
          </p>
        </Col>
      </Row>

      {/* Tabs */}
      <Row className="tabs_view">
        <Col xs={6}>
          <button
            className={`tab_button_view ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}>
            Description
          </button>
        </Col>
        <Col xs={6}>
          <button
            className={`tab_button_view ${activeTab === "parameters" ? "active" : ""}`}
            onClick={() => setActiveTab("parameters")}>
            Parameters
          </button>
        </Col>
      </Row>

      {/* Description Tab */}
      {activeTab === "description" && (
        <Row className="tab_content_view">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <img src="assets/images/DemoImg.png" alt="Payoff Chart" className="chart_view img-fluid" />
          </Col>
          <Col xs={12} md={6} className="content_view">
            <h3>Detail Description of: Short Straddle - 2 Leg</h3>
            <ul>
              <li><strong>View:</strong> Bank Nifty will experience very little volatility</li>
              <li><strong>Strategy:</strong> Sell Call and Sell Put option of the same strike price</li>
              <li><strong>Risk:</strong> Unlimited</li>
              <li><strong>Reward:</strong> Limited to Premium received</li>
              <li><strong>Breakeven:</strong>
                <ul>
                  <li>Upper BEP = Strike price of short call + Net premium received</li>
                  <li>Lower BEP = Strike price of short put - Net premium received</li>
                </ul>
              </li>
              <li><strong>Max Profit:</strong> When both options are not exercised</li>
              <li><strong>Loss:</strong> When one of the options is exercised</li>
            </ul>
          </Col>
        </Row>
      )}

      {/* Parameters Tab */}
      {activeTab === "parameters" && (
        <Row className="tab_content_view">
          <Col xs={12} md={6} className="content_view">
            <div className="row_view">
              <h3>Symbol</h3>
              <p><strong>Underlying Symbol:</strong> NSE INDEX Nifty Bank</p>
            </div>

            <div className="row_view">
              <h3>Parameters</h3>
              <p><strong>Type:</strong> Normal | <strong>Trading Type:</strong> Intraday | <strong>Product:</strong> MIS | <strong>Required Margin:</strong> ₹180,000</p>
            </div>

            <div className="row_view">
              <h3>Time</h3>
              <p><strong>Entry Time:</strong> 09:30 | <strong>Sqroff Time:</strong> 15:00</p>
            </div>
          </Col>

          <Col xs={12} md={6} className="content_view">
            <div className="row_view">
              <h3>Master Target & Stop-Loss</h3>
              <p>
                <strong>Master Target:</strong> 0 (Money) | 
                <strong> Master SL:</strong> 1500 (Money) | 
                <strong> Trail SL:</strong> Enabled | 
                <strong> Trail Type:</strong> Dynamic
              </p>
              <p>
                <strong>Profit Move:</strong> 1000.00 | 
                <strong> SL Move:</strong> 500.00 | 
                <strong> Live max MTM as profit move:</strong> Disabled
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ShortStraddle;
