import React, { useState, useEffect } from "react";
import Select from "react-select";

import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { EditPlan, Get_All_Plans } from "../../CommonAPI/User";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";    // <-- Modal import
import Button from "react-bootstrap/Button";   // <-- Button import
import "./AllPlan.css"; // Import your custom CSS
import Content from "../../../ExtraComponent/Content";
import { EditPlanname, GetAllStratgy, getChartingStrategyTag } from "../../CommonAPI/Admin";
import Swal from 'sweetalert2';
import NoDataFound from "../../../ExtraComponent/NoDataFound";



// Make sure Bootstrap CSS is imported in your entry file (index.js or App.js)
// import 'bootstrap/dist/css/bootstrap.min.css';

const AdminServicesList = () => {
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  const [expandedOptions, setExpandedOptions] = useState([]);
  const [expandedPatternItems, setExpandedPatternItems] = useState([]);

  // State for the Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [planData, setPlanData] = useState({})
  const [activeTab, setActiveTab] = useState("Scalping");
  const [editablePlans, setEditablePlans] = useState(['ABCd', 'XYZ', 'Testing'])
  const [strategyTags, setStrategyTags] = useState([]); // State for strategy tag options
  const navigate = useNavigate();
  const adminPermission = localStorage.getItem("adminPermission")

  const EditablePlanName = async () => {
    try {
      const res = await EditPlanname();
      setEditablePlans(res.EditPlans);

    } catch (error) {
      console.error("error", error)
    }
  }

  useEffect(() => {
    EditablePlanName()
  }, [])

  const toggleOptions = (index) => {
    setExpandedOptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    setEditPlanData("")
  }, [activeTab])

  const toggleExpand = (index) => {
    setExpandedPatternItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  // Function to handle edit button click
  const handleEdit = async (plan) => {
    try {
      const res = await GetAllStratgy();
      setPlanData(res)
    } catch (error) {
      console.error("Error in editPlan", error)
    }
    setEditPlanData(plan);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchPlans();
    // fetchStarategyTag();
    fetchStrategyTags();
  }, [showEditModal]);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response.Admin.filter(
          (plan) =>
            plan.Planname !== "Three Days Live" &&
            plan.Planname !== "Two Days Demo" &&
            plan.Planname !== "One Week Demo"
        );
        const filterPlanCharting = response.Charting.filter(
          (plan) =>
            plan.Planname !== "Three Days Live" &&
            plan.Planname !== "Two Days Demo" &&
            plan.Planname !== "One Week Demo"
        );
        setPlansData({
          loading: false,
          data: filterPlan,
          data1: filterPlanCharting,
          
        });
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlansData({ loading: false, data: [], data1: [] });
    }
  };


  // const fetchStarategyTag = async () => {
  //       const res = await getChartingStrategyTag();
  //       console.log("All Strategy Tag", res);
  //       if (res && res.data) {
  //         const tags = res.data.map((tag) => ({
  //           value: tag,
  //           label: tag,
  //         }));
  //         setStrategyTags(tags); 
  //       }
  //   };

  //   useEffect(() => {
  //       fetchStarategyTag();
  //   }, []);


  const fetchStrategyTags = async () => {
    try {
      const res = await getChartingStrategyTag();
      if (res && res.data) {
        const tags = res.data.map((tag) => ({
          value: tag.Strategytag,
          label: tag.Strategytag,
        }));
        setStrategyTags(tags); // Store fetched strategy tags in state
      }
    } catch (err) {
      console.error("Failed to fetch strategy tags");
    }
  };



  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditPlanData({
      ...editPlanData,
      [name]: value,
    });
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;

    setEditPlanData((prev) => ({
      ...prev,
      ["Option Strategy"]: [selectedOption], // Store as an array
    }));
  };

  const handleModalSave = async () => {
    try {

      const updatedPlanRequest = {
        Scalping: activeTab === "Scalping" ? editPlanData.Scalping : [],
        Option: activeTab === "Scalping" ? editPlanData["Option Strategy"] : [],
        PatternS: activeTab === "Scalping" ? editPlanData.Pattern : [],
        planname: editPlanData.Planname,
        Charting: editPlanData.ChartingSignal,
        SOPPrice: editPlanData.SOPPrice || 0.0,
        NumberofScript: editPlanData.NumberofScript || 0,
        SOPPaperTrade: editPlanData.SOPPaperTrade || 0.0,
        SOPLiveTrade: editPlanData.SOPLiveTrade || 0.0,
        ChartPerTrade: editPlanData.ChartPerTrade || 0.0,
        ChartPerMonth: editPlanData.ChartPerMonth || 0.0,
        ChartPaperTrade: editPlanData.ChartPaperTrade || 0.0, // New field
        ChartLiveTrade: editPlanData.ChartLiveTrade || 0.0,   // New field
        Strategytag: editPlanData.Strategytag || [], // Pass selected strategy tags
      };

      const res = await EditPlan(updatedPlanRequest);
      if (res.Status) {
        Swal.fire({
          title: "Plan Updated",
          icon: "success",
          draggable: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: res.message,
          icon: "failed",
          draggable: true,
          timer: 3000,
        });
      }
      fetchPlans();
      setShowEditModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "failed",
        draggable: true,
        timer: 3000,
      });
      console.error("Error in plan edit", error);
    }
  };

  const handleModalCancel = () => {
    setShowEditModal(false);
  };
  return (
    <Content
      Page_title={"📌 All Admin Plans"}
      button_status={true}
      backbutton_status={true}
      route={"/admin/addplan"}
      button_title={"Add Plan"}
    >
      <div className="iq-card-body">
        <div className="d-flex align-items-center mb-3">
          <h4 className="flex-grow-1"></h4>
          <button
            className="addbtn ml-auto"
            color="addbtn"
            onClick={() => navigate("/admin/addplan")}
          >
            ➕ Add Plan
          </button>
        </div>

        <div className="container mt-4">
          <Tabs
            defaultActiveKey="Scalping"
            id="admin-plans-tabs"
            className="mb-3 custom-tabs"
            fill
          >
            <Tab eventKey="Scalping" title="SOP" onClick={() => setActiveTab("Scalping")}>
              {plansData.loading ? (
                <p>Loading...</p>
              ) : plansData.data.length === 0 ? (
                <NoDataFound />
              ) : (
                <div className="allplan-grid">
                  {plansData.data
                    .filter(
                      (plan) =>
                        !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(plan.Planname) &&
                        plan.SOPPrice > 0
                    )
                    .map((plan, index) => (
                      <div key={index} className="allplan-card">
                        <div className="plan-data">
                          <div className="text-center">
                            <h2 className="allplan-card-title">{plan.Planname}</h2>
                            <h4 className="allplan-card-subtitle">
                              <FaRupeeSign className="m-1" />
                              <strong className="planClass">{plan.SOPPrice}</strong>
                            </h4>
                            <h4 className="allplan-card-subtitle">
                              Duration: {plan["Plan Validity"]}
                            </h4>
                            <h4 className="allplan-card-subtitle">
                              Number of Script: {plan.NumberofScript}
                            </h4>
                            {<div className="plan-details">
                              <p className="price-item">
                                <strong>Scalping Strategy:</strong>{" "}
                                {plan?.Scalping?.join(", ")}
                              </p>
                              <p className="price-item">
                                <strong>Options:</strong>{" "}
                                {plan["Option Strategy"]?.length > 1 ? (
                                  <>
                                    {expandedOptions.includes(index) ? (
                                      <>
                                        {plan["Option Strategy"].join(", ")}
                                        <span
                                          className="show-more"
                                          onClick={() => toggleOptions(index)}
                                        >
                                          {" "}
                                          🔼
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {plan["Option Strategy"][0]}
                                        <span
                                          className="show-more"
                                          onClick={() => toggleOptions(index)}
                                        >
                                          {" "}
                                          🔽
                                        </span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  plan["Option Strategy"]?.join(", ")
                                )}
                              </p>
                              <p className="price-item">
                                <strong>Patterns:</strong>{" "}
                                {plan.Pattern?.length > 1 ? (
                                  <>
                                    {expandedPatternItems.includes(index) ? (
                                      <>
                                        {plan.Pattern.join(", ")}
                                        <span
                                          className="show-more"
                                          onClick={() => toggleExpand(index)}
                                        >
                                          {" "}
                                          🔼
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {plan.Pattern[0]}
                                        <span
                                          className="show-more"
                                          onClick={() => toggleExpand(index)}
                                        >
                                          {" "}
                                          🔽
                                        </span>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  plan.Pattern?.join(", ")
                                )}
                              </p>
                              {plan.SOPPaperTrade > 0 && <p className="allplan-card-subtitle">
                                <strong className="card-text-Color">Price Per Paper Trade :</strong>
                                <FaRupeeSign /> {plan.SOPPaperTrade}
                              </p>}
                              {plan.SOPLiveTrade > 0 &&
                                <p className="allplan-card-subtitle">
                                  <strong className="card-text-Color">Price Per Live Trade :</strong>
                                  <FaRupeeSign /> {plan.SOPLiveTrade}
                                </p>}



                            </div>}
                            {/* Edit Button */}

                            {
                              editablePlans?.includes(plan.Planname) ? <button
                                className="edit-btn"
                                onClick={() => handleEdit(plan)}
                              >
                                <FaEdit /> Edit
                              </button>
                                :
                                ""
                            }
                            {/* <button
                            className="edit-btn"
                            onClick={() => handleEdit(plan)}
                          >
                            <FaEdit /> Edit
                          </button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Tab>
            {adminPermission.includes("ChartingPlatform") && (
              <Tab eventKey="Charting" title="Charting" onClick={() => setActiveTab("Charting")}>
                {plansData.loading ? (
                  <p>Loading...</p>
                ) : plansData.data1.length === 0 ? (
                  <NoDataFound />
                ) : (
                  <div className="allplan-grid">
                    {plansData.data1
                      .filter(
                        (plan) =>
                          !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(plan.Planname) &&
                          plan.ChartPerMonth > 0
                      )
                      .map((plan, index) => (
                        <div key={index} className="allplan-card">
                          <div className="plan-data">
                            <div className="text-center">
                              <h2 className="allplan-card-title">{plan.Planname}</h2>
                              <h4 className="allplan-card-subtitle">
                                <FaRupeeSign className="m-1" />
                                <strong className="planClass">{plan.ChartPerMonth
                                }</strong>
                              </h4>
                              <h4 className="allplan-card-subtitle">
                                Duration: {plan["Plan Validity"]}
                              </h4>
                              <div className="plan-details">
                                <p className="price-item">
                                  <strong>Segment:</strong>{" "}
                                  {plan?.ChartingSignal?.join(", ")}
                                </p>
                                {/* <p className="allplan-card-subtitle">  
                                                  {/* <strong className="card-text-Color">Live Per Trade:</strong>
                                                  <FaRupeeSign /> {plan.ChartPerTrade}
                                                </p>
                            
                                                <p className="allplan-card-subtitle">
                                                  <strong className="card-text-Color">Fixed Per Month:</strong>
                                                  <FaRupeeSign /> {plan.ChartPerMonth}
                                                </p> */}
                                {plan.ChartPaperTrade > 0 && <p className="allplan-card-subtitle">
                                  <strong className="card-text-Color">Paper Per Trade Price:</strong>
                                  <FaRupeeSign /> {plan.ChartPaperTrade}
                                </p>}
                                {plan.ChartLiveTrade > 0 &&
                                  <p className="allplan-card-subtitle">
                                    <strong className="card-text-Color">Live Per Trade Price:</strong>
                                    <FaRupeeSign /> {plan.ChartLiveTrade}
                                  </p>}

                                {plan?.Strategytag && (
                                  <p className="allplan-card-subtitle">
                                    <strong className="card-text-Color">Strategy Tag:</strong>
                                    <FaRupeeSign />{" "}
                                    {Array.isArray(plan.Strategytag)
                                      ? plan.Strategytag.join(", ")
                                      : plan.Strategytag}
                                  </p>
                                )}

                              </div>

                              {/* Edit Button */}
                              {
                                editablePlans?.includes(plan.Planname) ? <button
                                  className="edit-btn"
                                  onClick={() => handleEdit(plan)}
                                >
                                  <FaEdit /> Edit
                                </button>
                                  :
                                  ""
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Tab>
            )}
          </Tabs>
        </div>
      </div>

      {/* ========================= Modal for Editing Plan ========================= */}
      <Modal
        show={showEditModal}
        onHide={handleModalCancel}
        centered
        size="lg" // Makes the modal wider
      >
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title>Edit Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editPlanData && (
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="Planname" className="form-label">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Planname"
                    name="Planname"
                    value={editPlanData.Planname || ""}
                    onChange={handleModalChange}
                    disabled
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="SOPPrice" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="SOPPrice"
                    name="SOPPrice"
                    value={editPlanData.SOPPrice || editPlanData.ChartPerMonth || ""}
                    onChange={handleModalChange}
                  />
                </div>

                {activeTab === "Scalping" &&
                  <div className="col-md-6 mb-3">
                    <label htmlFor="NumberofScript" className="form-label">
                      No. of Scripts
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="NumberofScript"
                      name="NumberofScript"
                      value={editPlanData.NumberofScript || ""}
                      onChange={handleModalChange}
                    />
                  </div>}

                {activeTab === "Scalping" &&
                  <div className="col-md-6 mb-3">
                    <label htmlFor="SOPLiveTrade" className="form-label">
                      Live Trade Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="SOPLiveTrade"
                      name="SOPLiveTrade"
                      value={editPlanData.SOPLiveTrade || ""}
                      onChange={handleModalChange}
                    />
                  </div>}



                {activeTab === "Scalping" &&
                  <div className="col-md-6 mb-3">
                    <label htmlFor="SOPPaperTrade" className="form-label">
                      Paper Trade Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="SOPPaperTrade"
                      name="SOPPaperTrade"
                      value={editPlanData.SOPPaperTrade || editPlanData.ChartPaperTrade || ""}
                      onChange={handleModalChange}
                    />
                  </div>}
                {activeTab === "Scalping" &&
                  <div className="col-md-6 mb-3">
                    <label htmlFor="scalping" className="form-label">
                      Scalping Strategy
                    </label>
                    <Select
                      id="scalping"
                      name="Scalping"
                      isMulti
                      options={Object.values(planData.Scalping || {}).map((scalping) => ({
                        value: scalping,
                        label: scalping,
                      }))}
                      value={(editPlanData.Scalping || []).map((scalping) => ({
                        value: scalping,
                        label: scalping,
                      }))}
                      onChange={(selectedOptions) =>
                        setEditPlanData((prev) => ({
                          ...prev,
                          Scalping: selectedOptions.map((opt) => opt.value),
                        }))
                      }
                      className="custom-select"
                    />
                  </div>}



                {activeTab === "Charting" && (
                  <div className="row">

                    {/* <div className="col-md-6 mb-3">
                      <label htmlFor="ChartPerTrade" className="form-label">
                        Live Trade Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ChartPerTrade"
                        name="ChartPerTrade"
                        value={editPlanData.ChartPerTrade || ""}
                        onChange={handleModalChange}
                      />
                    </div> */}

                    {/* Segment Multi-Select */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="segment" className="form-label">
                        Segment
                      </label>
                      <Select
                        id="segment"
                        name="Segment"
                        isMulti
                        options={[
                          { value: "Cash", label: "Cash" },
                          { value: "Future", label: "Future" },
                          { value: "Option", label: "Option" },
                        ]}
                        value={(editPlanData.ChartingSignal || []).map((segment) => ({
                          value: segment,
                          label: segment,
                        }))}
                        onChange={(selectedOptions) =>
                          setEditPlanData((prev) => ({
                            ...prev,
                            ChartingSignal: selectedOptions.map((opt) => opt.value),
                          }))
                        }
                        className="custom-select"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="ChartPaperTrade" className="form-label">
                        Chart Paper Trade
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ChartPaperTrade"
                        name="ChartPaperTrade"
                        value={editPlanData.ChartPaperTrade || ""}
                        onChange={handleModalChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="ChartLiveTrade" className="form-label">
                        Chart Live Trade
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ChartLiveTrade"
                        name="ChartLiveTrade"
                        value={editPlanData.ChartLiveTrade || ""}
                        onChange={handleModalChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="strategytag" className="form-label">
                        Strategy Tag
                      </label>
                      <Select
                        id="strategytag"
                        name="Strategytag"
                        isMulti
                        options={strategyTags.filter(
                          (tag) =>
                            !(editPlanData.Strategytag || []).includes(tag.value) // Exclude already selected tags
                        )}
                        value={(editPlanData.Strategytag || []).map((tag) => ({
                          value: tag,
                          label: tag,
                        }))}
                        onChange={(selectedOptions) =>
                          setEditPlanData((prev) => ({
                            ...prev,
                            Strategytag: selectedOptions.map((opt) => opt.value),
                          }))
                        }
                        className="custom-select"
                      />
                    </div>
                  </div>
                )}


                {activeTab === "Scalping" &&
                  <div className="col-md-6 mb-3">
                    <label htmlFor="option" className="form-label">
                      Option Strategy
                    </label>
                    <Select
                      id="option"
                      name="Option Strategy"
                      isMulti
                      options={Object.values(planData.Option || {}).map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      value={(editPlanData["Option Strategy"] || []).map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={(selectedOptions) =>
                        setEditPlanData((prev) => ({
                          ...prev,
                          ["Option Strategy"]: selectedOptions.map((opt) => opt.value),
                        }))
                      }
                      className="custom-select"
                    />
                  </div>
                }
                {activeTab === "Scalping" &&
                  <div className="col-md-6 mb-3">
                    <label htmlFor="pattern" className="form-label">
                      Pattern
                    </label>
                    <Select
                      id="pattern"
                      name="Pattern"
                      isMulti
                      options={Object.values(planData.Pattern || {}).map((pattern) => ({
                        value: pattern,
                        label: pattern,
                      }))}
                      value={(editPlanData.Pattern || []).map((pattern) => ({
                        value: pattern,
                        label: pattern,
                      }))}
                      onChange={(selectedOptions) =>
                        setEditPlanData((prev) => ({
                          ...prev,
                          Pattern: selectedOptions.map((opt) => opt.value),
                        }))
                      }
                      className="custom-select"
                    />
                  </div>}
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ========================= End of Modal ========================= */}
    </Content>
  );
};

export default AdminServicesList;
