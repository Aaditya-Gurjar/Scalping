import React, { useState, useEffect } from "react";
import { Get_Broker_Name, viewBrokerDetails } from "../../CommonAPI/Admin";
import { Eye, Trash2, BarChart2 } from "lucide-react";
import Modal from "../../../ExtraComponent/Modal1";
import Content from "../../../ExtraComponent/Content";

const ApiCreateInfo = () => {
  const [brokers, setBrokers] = useState([]);
  const [show, setShow] = useState(false);
  const [brokerName, setBrokerName] = useState("");
  const [brokerDetails, setBrokerDetails] = useState({});

  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    fetchBrokerName();
  }, []);

  const fetchBrokerName = async () => {
    try {
      const response = await Get_Broker_Name();
      if (response.Status) {
        const brokerList = response?.Brokernamelist?.filter(
          (item) => item.BrokerName !== "DEMO"
        );
        setBrokers(brokerList);
      } else {
        setBrokers([]);
      }
    } catch (error) {
      console.log("Error in fetching brokers", error);
    }
  };

  useEffect(() => {
    getBrokerAlldetails();
  }, [brokerName]);

  const getBrokerAlldetails = async () => {
    if (brokerName === "") return;
    const req = { BrokerName: brokerName };
    try {
      await viewBrokerDetails(req).then((response) => {
        if (response.status) {
          setBrokerDetails(req.BrokerName);
        } else {
          setBrokerDetails({});
        }
      });
    } catch (error) {
      console.log("Error in fetching brokers", error);
    }
  };

  const handleShow = () => {
    setshowModal(true);
  };

  return (
    <>
      <Content
        Page_title="📈 Api Information"
        button_status={false}
        backbutton_status={false}
      >
        <div className="container-fluid" style={{ marginTop: "2rem" }}>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {brokers.map((item, index) => (
              <div className="col" key={index}>
                <div className=" broker-card">
                  <div className="card-body text-center">
                    <div className="row">
                      <div className="col-3 pe-0">
                        {" "}
                        <div className="trading-icon">
                          <BarChart2 className="broker-card-icon" size={20} />
                        </div>
                      </div>
                      <div className="col-9 text-end">
                        <h5 className="card-title">
                          {item.BrokerName}
                        </h5>
                        <div className="card-actions justify-content-end  mt-3">
                          <Eye
                            size={24}
                            className="action-icon edit-icon text-warning"
                            onClick={() => {
                              handleShow();
                              setBrokerName(item.BrokerName);
                            }}
                          />
                          <Trash2
                            size={24}
                            className="action-icon delete-icon text-danger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          isOpen={showModal}
          size="lg"
          title={`${brokerDetails}  API Create Information.`}
          hideBtn={true}
          handleClose={() => setshowModal(false)}
        ></Modal>
      </Content>
    </>
  );
};

export default ApiCreateInfo;
