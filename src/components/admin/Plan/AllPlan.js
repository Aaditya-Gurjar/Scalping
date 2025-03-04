// import React, { useState, useEffect } from "react";
// import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
// import { BadgeCheck } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Get_All_Plans } from "../../CommonAPI/User";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import "./AllPlan.css"; // Import the external CSS file
// import Content from "../../../ExtraComponent/Content";

// const AdminServicesList = () => {
//   const [plansData, setPlansData] = useState({
//     loading: true,
//     data: [],
//     data1: [],
//   });

//   const [expandedOptions, setExpandedOptions] = useState([]);
//   const [expandedPatternItems, setExpandedPatternItems] = useState([]);


//   const toggleOptions = (index) => {
//     setExpandedOptions((prev) =>
//       prev.includes(index)
//         ? prev.filter((i) => i !== index)
//         : [...prev, index]
//     );
//   };

//   const toggleExpand = (index) => {
//     setExpandedPatternItems((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };



//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await Get_All_Plans();
//       if (response.Status) {
//         const filterPlan = response.Admin.filter(
//           (plan) =>
//             plan.PlanName !== "Three Days Live" &&
//             plan.PlanName !== "Two Days Demo" &&
//             plan.PlanName !== "One Week Demo"
//         );
//         const filterPlanCharting = response.Charting.filter(
//           (plan) =>
//             plan.PlanName !== "Three Days Live" &&
//             plan.PlanName !== "Two Days Demo" &&
//             plan.PlanName !== "One Week Demo"
//         );
//         setPlansData({
//           loading: false,
//           data: filterPlan,
//           data1: filterPlanCharting,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       setPlansData({ loading: false, data: [], data1: [] });
//     }
//   };

//   return (
//     <Content
//       Page_title={"📌 All Admin Plans"}
//       button_status={true}
//       backbutton_status={true}
//       route={"/admin/addplan"}
//       button_title={"Add Plan"}
//     >


//       <div className="iq-card-body">
//         <div className="container mt-4">
//           <Tabs
//             defaultActiveKey="Scalping"
//             id="admin-plans-tabs"
//             className="mb-3 custom-tabs"
//             fill
//           >
//             <Tab eventKey="Scalping" title="Scalping">
//               {plansData.loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className="allplan-grid">
//                   {plansData.data.map((plan, index) => (
//                     <div key={index} className="allplan-card">
//                       <div className="plan-data">
//                         <div className="text-center">
//                           <h2 className="allplan-card-title">
//                             {plan.PlanName}
//                           </h2>
//                           <h4 className="allplan-card-subtitle">
//                             <FaRupeeSign className="m-1" />
//                             <strong>{plan.payment}</strong>
//                           </h4>
//                           <h4 className="allplan-card-subtitle">
//                             Duration: {plan["Plan Validity"]}
//                           </h4>
//                           <h4 className="allplan-card-subtitle">
//                             Number of Script: {plan.NumberofScript}
//                           </h4>
//                           <div className="plan-details">
//                             <p className="price-item">
//                               <strong>Scalping Strategy:</strong>{" "}
//                               {plan?.Scalping?.join(", ")}
//                             </p>
//                             <p className="price-item">
//                               <strong>Options:</strong>{" "}
//                               {plan["Option Strategy"]?.length > 1 ? (
//                                 <>
//                                   {expandedOptions.includes(index) ? (
//                                     <>
//                                       {plan["Option Strategy"].join(", ")}
//                                       <span
//                                         className="show-more"
//                                         onClick={() => toggleOptions(index)}
//                                       >
//                                         {" "}🔼
//                                       </span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       {plan["Option Strategy"][0]}
//                                       <span
//                                         className="show-more"
//                                         onClick={() => toggleOptions(index)}
//                                       >
//                                         {" "}🔽
//                                       </span>
//                                     </>
//                                   )}
//                                 </>
//                               ) : (
//                                 plan["Option Strategy"]?.join(", ")
//                               )}
//                             </p>
//                             <p className="price-item">
//                               <strong>Patterns:</strong>{" "}
//                               {plan.Pattern?.length > 1 ? (
//                                 <>
//                                   {expandedPatternItems.includes(index) ? (
//                                     <>
//                                       {plan.Pattern.join(", ")}
//                                       <span
//                                         className="show-more"
//                                         onClick={() => toggleExpand(index)}
//                                       >
//                                         {" "}🔼
//                                       </span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       {plan.Pattern[0]}
//                                       <span
//                                         className="show-more"
//                                         onClick={() => toggleExpand(index)}
//                                       >
//                                         {" "}🔽
//                                       </span>
//                                     </>
//                                   )}
//                                 </>
//                               ) : (
//                                 plan.Pattern?.join(", ")
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Tab>
//             <Tab eventKey="Charting" title="Charting">
//               {plansData.loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className="allplan-grid">
//                   {plansData.data1.map((plan, index) => (
//                     <div key={index} className="allplan-card">
//                       <div className="plan-data">
//                         <div className="text-center">
//                           <h2 className="allplan-card-title">
//                             {plan.PlanName}
//                           </h2>
//                           <h4 className="allplan-card-subtitle">
//                             <FaRupeeSign className="m-1" />
//                             <strong>{plan.payment}</strong>
//                           </h4>
//                           <h4 className="allplan-card-subtitle">
//                             Duration: {plan["Plan Validity"]}
//                           </h4>
//                           <div className="plan-details">
//                             <p className="price-item">
//                               <strong>Segment:</strong>{" "}
//                               {plan?.ChartingSignal?.join(", ")}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                     </div>
//                   ))}
//                 </div>
//               )}
//             </Tab>
//           </Tabs>
//         </div>
//       </div>


//     </Content>
//   );
// };

// export default AdminServicesList;

import React, { useState, useEffect } from "react";
import Select from "react-select";

import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { EditPlan, Get_All_Plans } from "../../CommonAPI/User";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";    // <-- Modal import
import Button from "react-bootstrap/Button";   // <-- Button import
import "./AllPlan.css"; // Import your custom CSS
import Content from "../../../ExtraComponent/Content";
import { GetAllStratgy } from "../../CommonAPI/Admin";
import Swal from 'sweetalert2';


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
    console.log("Edit group:", plan);
    try {
      const res = await GetAllStratgy();
      console.log("response from handleedit is", planData)
      setPlanData(res)
    } catch (error) {
      console.error("Error in editPlan", error)
    }
    setEditPlanData(plan);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response.Admin.filter(
          (plan) =>
            plan.PlanName !== "Three Days Live" &&
            plan.PlanName !== "Two Days Demo" &&
            plan.PlanName !== "One Week Demo"
        );
        const filterPlanCharting = response.Charting.filter(
          (plan) =>
            plan.PlanName !== "Three Days Live" &&
            plan.PlanName !== "Two Days Demo" &&
            plan.PlanName !== "One Week Demo"
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
      console.log("Updated Plan Data:", editPlanData);
      const updatedPlanRequest = {
        Scalping: activeTab === "Scalping" ? editPlanData.Scalping : [],
        Option: activeTab === "Scalping" ? editPlanData["Option Strategy"] : [],
        PatternS: activeTab === "Scalping" ? editPlanData.Pattern : [],
        planname: editPlanData.PlanName,
        Charting: editPlanData.ChartingSignal,
        SOPPrice: 0.0,
        payment: editPlanData.payment,
        NumberofScript: editPlanData.NumberofScript,
        SOPPaperTrade: 0.0,
        SOPLiveTrade: 0.0,
        ChartPerTrade: 0.0,
        ChartPerMonth: 0.0
      }
      const res = await EditPlan(updatedPlanRequest)
      console.log("apiresponse is", res)
      if (res.Status) {
        Swal.fire({
          title: "Plan Updated",
          icon: "success",
          draggable: true,
          timer: 3000,
        });
      }
      else {
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
  console.log("activeTab", activeTab)
  return (
    <Content
      Page_title={"📌 All Admin Plans"}
      button_status={true}
      backbutton_status={true}
      route={"/admin/addplan"}
      button_title={"Add Plan"}
    >
      <div className="iq-card-body">
        <div className="container mt-4">
          <Tabs
            defaultActiveKey="Scalping"
            id="admin-plans-tabs"
            className="mb-3 custom-tabs"
            fill
          >

            <Tab eventKey="Scalping" title="Scalping" onClick={() => setActiveTab("Scalping")}>
              {plansData.loading ? (
                <p>Loading...</p>
              ) : (
                <div className="allplan-grid">
                  {plansData.data.map((plan, index) => (
                    <div key={index} className="allplan-card">
                      <div className="plan-data">
                        <div className="text-center">
                          <h2 className="allplan-card-title">{plan.PlanName}</h2>
                          <h4 className="allplan-card-subtitle">
                            <FaRupeeSign className="m-1" />
                            <strong>{plan.payment}</strong>
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
                          </div>}
                          {/* Edit Button */}
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(plan)}
                          >
                            <FaEdit /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Tab>
            <Tab eventKey="Charting" title="Charting" onClick={() => setActiveTab("Charting")}>
              {plansData.loading ? (
                <p>Loading...</p>
              ) : (
                <div className="allplan-grid">
                  {plansData.data1.map((plan, index) => (
                    <div key={index} className="allplan-card">
                      <div className="plan-data">
                        <div className="text-center">
                          <h2 className="allplan-card-title">{plan.PlanName}</h2>
                          <h4 className="allplan-card-subtitle">
                            <FaRupeeSign className="m-1" />
                            <strong>{plan.payment}</strong>
                          </h4>
                          <h4 className="allplan-card-subtitle">
                            Duration: {plan["Plan Validity"]}
                          </h4>
                          <div className="plan-details">
                            <p className="price-item">
                              <strong>Segment:</strong>{" "}
                              {plan?.ChartingSignal?.join(", ")}
                            </p>
                          </div>
                          {/* Edit Button */}
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(plan)}
                          >
                            <FaEdit /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Tab>
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
                  <label htmlFor="planname" className="form-label">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="planname"
                    name="PlanName"
                    value={editPlanData.PlanName || ""}
                    onChange={handleModalChange}
                    disabled
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="payment" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="payment"
                    name="payment"
                    value={editPlanData.payment || ""}
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
