import React, { useState } from "react";
import DiscriptionData from "./DiscriptionData";

const Discription = () => {
  const [tab, setTab] = useState("Scalping");

  // Handle the tab change to update the state
  const handleTabChange = (type) => {
    setTab(type);
  };

  return (
    <div className="container-fluid" style={{marginTop:"2rem"}}>
    <div className="row">
      <div className="iq-card">
   
        <div className="iq-card-header d-flex justify-content-between">
          <div className="iq-header-title">
            <h4 className="card-title">📄 Description</h4>
          </div>
        </div>
        <div className="iq-card-body">
        <div className="row">
          <div className="col-lg-12">
            <ul
              className="nav nav-pills mb-3 nav-fill"
              id="pills-tab-1"
              role="tablist"
              style={{ height: "80px !important" }}
            >
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${tab === 'Scalping' ? 'active' : ''}`}
                  onClick={() => handleTabChange('Scalping')}
                  id="pills-home-tab-fill"
                  role="tab"
                >
                  📊 Scalping
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${tab === 'Option' ? 'active' : ''}`}
                  onClick={() => handleTabChange('Option')}
                  id="pills-profile-tab-fill"
                  role="tab"
                >
                  ⚡ Option
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link ${tab === 'Candlestick' ? 'active' : ''}`}
                  onClick={() => handleTabChange('Candlestick')}
                  id="pills-contact-tab-fill"
                  role="tab"
                >
                  📈 Candlestick
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-12">
            <div className="nav nav-pills mb-3 nav-fill">
              {/* Render content based on the selected tab */}
              <DiscriptionData Type={tab} />
            </div>
          </div>
        </div>
</div>

      </div>
    </div>
    </div>
  );
};

export default Discription;
