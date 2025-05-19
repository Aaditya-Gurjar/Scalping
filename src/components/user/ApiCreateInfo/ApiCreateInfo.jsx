import React, { useEffect, useState } from 'react'
import Content from '../../../ExtraComponent/Content'
import { getBrokerDetails } from '../../CommonAPI/Admin';
import NoDataFound from '../../../ExtraComponent/NoDataFound'; // <-- Add this import

const ApiCreateInfo = () => {

  const [brokerDetails, setBrokerDetails] = useState([])
  const brokerName = localStorage.getItem("Broker")

  const getBrokerAlldetails = async () => {
    if (brokerName === "") return;
    const req = { BrokerName: brokerName };
    try {
      await getBrokerDetails(req).then((response) => {
        console.log("response", response);

        if (response.Status) {
          setBrokerDetails(response.Data?.[0]);
        } else {
          setBrokerDetails([]);
        }
      });
    } catch (error) {
      console.log("Error in fetching brokers", error);
    }
  };

  useEffect(() => {
    getBrokerAlldetails();
  }, []);

  // Helper to get steps as array
  const getSteps = (details) => {
    const steps = [];
    for (let i = 1; i <= 5; i++) {
      const text = details[`Step${i}Text`];
      const img = details[`Step${i}Image`];
      if (text || img) {
        steps.push({
          step: i,
          text,
          img,
        });
      }
    }
    return steps;
  };
  
  return (
    <Content>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card shadow card-bg-color">
              <div className="card-header text-white card-bg-color card-text-Color">
                <h4 className="mb-0 text-center  card-text-Color">
                  {brokerDetails?.Brokername ? `${brokerDetails.Brokername} API Creation Steps` : "Broker API Creation Steps"}
                </h4>
              </div>
              <div className="card-body card-bg-color card-text-Color">
                {brokerDetails && getSteps(brokerDetails).length > 0 ? (
                  <ol className="list-group list-group-numbered card-bg-color">
                    {getSteps(brokerDetails).map((step, idx) => (
                      <li
                        key={idx}
                        className="list-group-item d-flex flex-column align-items-start mb-3 card-bg-color card-text-Color"
                        style={{ border: "1px solid #e3e3e3", borderRadius: "8px" }}
                      >
                        <div className="w-100 card-text-Color">
                          <span className="fw-bold card-text-Color">Step {step.step}:</span>
                        </div>
                        {step.text && (
                          <div className="mb-2 mt-1 card-text-Color" style={{ fontSize: "1rem" }}>
                            {step.text}
                          </div>
                        )}
                        {step.img && (
                          <div className="mb-2">
                            <img
                              src={`data:image/jpeg;base64,${step.img}`}
                              alt={`Step ${step.step}`}
                              className="img-fluid rounded border" 
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="text-center text-muted py-5 card-text-Color">
                    {/* Show NoDataFound image if no steps available */}
                    <NoDataFound />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
}

export default ApiCreateInfo