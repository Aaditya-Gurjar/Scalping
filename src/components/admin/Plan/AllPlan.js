import styled from "styled-components";
import { FaRupeeSign, FaEye, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Get_All_Plans } from "../../CommonAPI/User";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useEffect } from "react";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 300px; /* Reduced width for better horizontal scrolling */
  padding: 15px;y
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
    background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(to right, #3f414d 0%, #3f414d 100%) !important;
    color: #fff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:hover h2,
  &:hover h4,
  &:hover p {
    color: #fff;
  }
`;

const ServicesList = () => {
  const [GetAllPlans, setAllPlans] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  useEffect(() => {
    GetAllPlansData();
  }, []);

  const GetAllPlansData = async () => {
    await Get_All_Plans().then((response) => {
      if (response.Status) {
        const filterPlan = response?.Admin?.filter(
          (plan) =>
            plan.PlanName !== "Three Days Live" &&
            plan.PlanName !== "Two Days Demo" &&
            plan.PlanName !== "One Week Demo"
        );
        const filterplanforCharting = response?.Charting?.filter(
          (plan) =>
            plan.PlanName !== "Three Days Live" &&
            plan.PlanName !== "Two Days Demo" &&
            plan.PlanName !== "One Week Demo"
        );
        setAllPlans({
          loading: false,
          data: filterPlan,
          data1: filterplanforCharting,
        });
      }
    });
  };

  let servicegivenmonth = localStorage.getItem("servicegivenmonth");

  const SetPlan = (index) => {
    if (servicegivenmonth === 0) {
      return null;
    }

    const ranges = [
      { min: 1, max: 2, index: 0 },
      { min: 3, max: 5, index: 1 },
      { min: 6, max: 11, index: 2 },
      { min: 12, max: 12, index: 3 },
    ];

    const matchedRange = ranges.find(
      (range) =>
        servicegivenmonth >= range.min &&
        servicegivenmonth <= range.max &&
        range.index === index
    );

    return matchedRange ? <BadgeCheck style={{ color: "green" }} /> : null;
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">All Plan</h4>
              </div>
              <Link to="/admin/addplan" className="btn btn-primary rounded">
                Add Plan
              </Link>
            </div>

            <div className="iq-card-body">
              <div className="container mt-4">
                <Tabs
                  defaultActiveKey="Scalping"
                  id="fill-tab-example"
                  className="mb-3 custom-tabs"
                  fill>
                  <Tab eventKey="Scalping" title="Scalping">
                    <div className="">
                      <h5 className="mb-4">
                        <div className="iq-card-body">
                          <div style={styles.container} className="row">
                            {GetAllPlans?.data.map((plan, index) => (
                              <Card
                                key={index}
                                style={styles.card}
                                className="col-lg-3 col-md-6 mb-3 all-plan-card">
                                {/* <img src={imgArr[getRandomNumber()]} alt={plan.PlanName} style={styles.image} /> */}
                                <div style={styles.content}>
                                  <h2 style={styles.title}>
                                    {plan.PlanName} {SetPlan(index)}
                                  </h2>
                                  <h4 style={styles.subtitle}>
                                    <FaRupeeSign className="m-1" />
                                    <strong>{plan.payment}</strong>
                                  </h4>
                                  <h5 style={styles.prices}>
                                    No of Scripts: {plan.NumberofScript}
                                  </h5>
                                  <h5 style={styles.prices}>
                                    Duration: {plan?.["Plan Validity"]}
                                  </h5>

                                  <div style={styles.prices}>
                                    <p style={styles.priceItem}>
                                      <strong>Scalping Strategy:</strong>{" "}
                                      {plan?.Scalping?.join(", ")}
                                    </p>
                                    <p style={styles.priceItem}>
                                      <strong>Option Strategy:</strong>{" "}
                                      {plan?.["Option Strategy"]?.join(", ")}
                                    </p>
                                    <p style={styles.priceItem}>
                                      <strong>Pattern Strategy:</strong>{" "}
                                      {plan?.Pattern?.join(", ")}
                                    </p>
                                    {/* <p style={styles.priceItem}>
                                      <strong>Charting Signal:</strong>{" "}
                                      {plan?.ChartingSignal?.join(", ")}
                                    </p> */}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </h5>
                    </div>
                  </Tab>
                  <Tab eventKey="Charting" title="Charting">
                    
                      <div className="iq-card-body">
                        <div style={styles.container} className="row">
                          {GetAllPlans?.data1.map((plan, index) => (
                            <Card
                              key={index}
                              style={styles.card}
                              className="col-lg-3 col-md-6 mb-3">
                              {/* <img src={imgArr[getRandomNumber()]} alt={plan.PlanName} style={styles.image} /> */}
                              <div style={styles.content}>
                                <h2 style={styles.title}>
                                  {plan.PlanName} {SetPlan(index)}
                                </h2>
                                <h4 style={styles.subtitle}>
                                  <FaRupeeSign className="m-1" />
                                  <strong>{plan.payment}</strong>
                                </h4>
                                <h5 style={styles.prices}>
                                  No of Scripts: {plan.NumberofScript}
                                </h5>
                                <h5 style={styles.prices}>
                                  Duration: {plan?.["Plan Validity"]}
                                </h5>

                                <div style={styles.prices}>
                                  {/* <p style={styles.priceItem}>
                                    <strong>Scalping Strategy:</strong>{" "}
                                    {plan?.Scalping?.join(", ")}
                                  </p>
                                  <p style={styles.priceItem}>
                                    <strong>Option Strategy:</strong>{" "}
                                    {plan?.["Option Strategy"]?.join(", ")}
                                  </p>
                                  <p style={styles.priceItem}>
                                    <strong>Pattern Strategy:</strong>{" "}
                                    {plan?.Pattern?.join(", ")}
                                  </p> */}
                                  <p style={styles.priceItem}>
                                      <strong>Charting Script:</strong>{" "}
                                      {plan?.ChartingSignal?.join(", ")}
                                    </p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    
                  </Tab>
                </Tabs>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    // display: "flex",
    // flexWrap: "nowrap",
    overflowX: "auto",
    padding: "5px",
    gap: "20px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "1.5rem",
    margin: "10px 0",
    color: "rgb(15 164 32)",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.2rem",
    margin: "5px 0",
  },
  description: {
    fontSize: "1rem",
    margin: "10px 0",
  },
  prices: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "10px 0",
    color: "#555",
    padding: "0",
    listStyle: "none",
  },
  priceItem: {
    margin: "5px 0",
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: "15px",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ServicesList;
