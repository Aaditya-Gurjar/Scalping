


// import React, { useState, useEffect } from "react";
// import { FaRupeeSign } from "react-icons/fa";
// import { BadgeCheck } from "lucide-react";
// import {
//   Get_All_Plans,
//   Get_All_Buyed_Plans,
//   BuyPlan,
//   AddBalance,
//   ExpirePlanDetails,
// } from "../../CommonAPI/User";
// import Swal from "sweetalert2";
// // import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import NewsTicker from "./Expair";
// import "./AllPlan.css";
// import Content from "../../../ExtraComponent/Content";

// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

// const ServicesList = () => {
//   const username = localStorage.getItem("name");
//   const [plansData, setPlansData] = useState({
//     loading: true,
//     data: [],
//     data1: [],
//   });
//   const [purchasedPlans, setPurchasedPlans] = useState([]);
//   const expire = localStorage.getItem("expire");
//   const [planExpired, setPlanExpired] = useState([]);

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
//     fetchPurchasedPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await Get_All_Plans();
//       if (response.Status) {
//         const filterPlan = response?.Admin?.filter(
//           (plan) =>
//             !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
//               plan.Planname
//             )
//         );
//         const filterPlanCharting = response?.Charting?.filter(
//           (plan) =>
//             !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
//               plan.Planname
//             )
//         );
//         setPlansData({
//             loading: false,
//             data: filterPlan,
//             data1: filterPlanCharting,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       setPlansData({ loading: false, data: [], data1: [] });
//     }
//   };

//   const fetchPurchasedPlans = async () => {
//     try {
//       const response = await Get_All_Buyed_Plans({ userName: username });
//       if (response.Status) {
//         setPurchasedPlans(response.Allotplan || []);
//       }
//     } catch (error) {
//       console.error("Error fetching purchased plans:", error);
//     }
//   };
//   const isPlanExpired = async () => {
//     try {
//       const response = await ExpirePlanDetails(username);
//       if (response.Status) {
//         setPlanExpired(response.ExpirePlan || false);
//       }
//     }
//     catch (error) {
//       console.error("Error fetching purchased plans:", error);
//     }
//   }
//   useEffect(() => {
//     isPlanExpired();
//   }, [])



//   const isPlanPurchased = (planName) => {
//     return purchasedPlans.some((plan) => plan.Planname === planName);
//   };

//   const HandleBuyPlan = async (index, type, isCharting) => {
//     try {
//       const planDetails = isCharting
//         ? plansData?.data1[index]
//         : plansData?.data[index];

//       const req1 = {
//         Username: username,
//         transactiontype: "Purchase",
//         money: planDetails.SOPPrice || planDetails.payment,
//       };
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: `Do you want to buy the plan: ${planDetails.Planname || planDetails.PlanName} for ₹${planDetails.SOPPrice}?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, Buy it!",
//         cancelButtonText: "No, Cancel",
//         reverseButtons: true,
//       });

//       if (result.isConfirmed) {
//         const CheckBalanceResponse = await AddBalance(req1);
//         if (CheckBalanceResponse.Status && type == 0) {
//           const result = await Swal.fire({
//             title: "What do you want to do?",
//             text: `This is your Scubscribed Script so what do you do Extend the EndDate or Extend the Number of Scripts`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Extend End Date",
//             cancelButtonText: "Extend Number of Scripts",
//             reverseButtons: true,
//           });
//           if (result.isConfirmed) {
//             const req = {
//               Username: username,
//               Scalping: planDetails.Scalping,
//               Option: planDetails["Option Strategy"],
//               PatternS: planDetails.Pattern,
//               NumberofScript: planDetails.NumberofScript,
//               Duration: planDetails["Plan Validity"],
//               Planname: planDetails.Planname || planDetails.PlanName,
//               SOPPrice: planDetails.SOPPrice,
//               Extendtype: "ExtendServiceEndDate",
//               money: planDetails.SOPPrice,
//               Charting: planDetails.ChartingSignal,
//             };
//             const buyPlanResponse = await BuyPlan(req);
//             if (buyPlanResponse.Status) {
//               fetchPurchasedPlans();
//               Swal.fire({
//                 title: "Success!",
//                 text: buyPlanResponse.message,
//                 icon: "success",
//                 timer: 1500,
//                 timerProgressBar: true,
//               });
//             } else {
//               Swal.fire({
//                 title: "Error!",
//                 text: buyPlanResponse.message,
//                 icon: "error",
//                 timer: 1500,
//                 timerProgressBar: true,
//               });
//             }
//           } else {


//             const req = {
//               Username: username,
//               Scalping: planDetails.Scalping,
//               Option: planDetails["Option Strategy"],
//               PatternS: planDetails.Pattern,
//               NumberofScript: planDetails.NumberofScript,
//               Duration: planDetails["Plan Validity"],
//               Planname: planDetails.Planname || planDetails.PlanName,
//               SOPPrice: planDetails.SOPPrice,
//               Extendtype: "ExtendServiceCount",
//               Charting: planDetails.ChartingSignal,
//             };

//             const buyPlanResponse = await BuyPlan(req);
//             if (buyPlanResponse.Status) {
//               fetchPurchasedPlans();
//               Swal.fire({
//                 title: "Success!",
//                 text: buyPlanResponse.message,
//                 icon: "success",
//                 timer: 1500,
//                 timerProgressBar: true,
//               });
//             } else {
//               Swal.fire({
//                 title: "Error!",
//                 text: buyPlanResponse.message,
//                 icon: "error",
//                 timer: 1500,
//                 timerProgressBar: true,
//               });
//             }
//           }
//         } else if (CheckBalanceResponse.Status && type == 1) {
//           const req = {
//             Username: username,
//             Scalping: planDetails.Scalping,
//             Option: planDetails["Option Strategy"],
//             PatternS: planDetails.Pattern,
//             NumberofScript: planDetails.NumberofScript,
//             Duration: planDetails["Plan Validity"],
//             Planname: planDetails.Planname || planDetails.PlanName,
//             SOPPrice: planDetails.SOPPrice,
//             Extendtype: "",
//             Charting: planDetails.ChartingSignal,
//           };
//           const buyPlanResponse = await BuyPlan(req);
//           if (buyPlanResponse.Status) {
//             fetchPurchasedPlans();
//             Swal.fire({
//               title: "Success!",
//               text: buyPlanResponse.message,
//               icon: "success",
//               timer: 1500,
//               timerProgressBar: true,
//             });
//             setTimeout(() => {
//               window.location.reload();
//             }, 1500);
//           } else {
//             Swal.fire({
//               title: "Error!",
//               text: buyPlanResponse.message,
//               icon: "error",
//               timer: 1500,
//               timerProgressBar: true,
//             });
//           }
//         } else {
//           Swal.fire({
//             title: "Error!",
//             text: CheckBalanceResponse.message,
//             icon: "worning",
//             timer: 1500,
//             timerProgressBar: true,
//           });
//         }
//       } else {
//         Swal.fire({
//           title: "Cancelled",
//           text: "Your purchase has been cancelled.",
//           icon: "info",
//           timer: 1500,
//           timerProgressBar: true,
//         });
//       }
//     } catch (error) {
//       console.error("Error in transaction:", error);
//       Swal.fire({
//         title: "Error",
//         text: "An unexpected error occurred",
//         icon: "error",
//         timer: 1500,
//         timerProgressBar: true,
//       });
//     }
//   };

//   const getUpdatedPlans = plansData.data?.filter(
//     (plan) =>
//       (plan?.SOPPrice !== 0 && plan?.payment !== 0) &&
//       plan.Planname !== "Three Days Live" &&
//       plan.Planname !== "Two Days Demo" &&
//       plan.Planname !== "One Week Demo"
//   );
//   const getUpdatedPlansCharting = plansData.data1?.filter(
//     (plan) =>
//       (plan?.SOPPrice !== 0 && plan?.payment !== 0) &&
//       plan.Planname !== "Three Days Live" &&
//       plan.Planname !== "Two Days Demo" &&
//       plan.Planname !== "One Week Demo"
//   );

//   const [value, setValue] = useState("1");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Content
//       Page_title={"📌 All Plans"}
//       button_status={false}
//       backbutton_status={false}
//     >
//       <div className="">
//         {expire?.includes(1) ? (
//           <div className="col-lg-9">
//             <NewsTicker />
//           </div>
//         ) : (
//           ""
//         )}
//       </div>

//       <Box sx={{ width: "100%", typography: "body1" }}>
//         <TabContext value={value}>
//           {/* 🛠️ Styled Tabs */}
//           <Box
//             sx={{
//               borderBottom: 1,
//               borderColor: "divider",
//               backgroundColor: "#f8f9fa", // Light background for tabs
//               borderRadius: "8px 8px 0 0",
//               padding: "10px",
//               width: "100%",
//               alignItems: "center",
//               justifyContent: "center",
//               display: { xs: "none", md: "flex" },

//             }}
//           >
//             <TabList
//               onChange={handleChange}
//               aria-label="lab API tabs example"
//               sx={{
//                 "& .MuiTab-root": {
//                   width: "50%", // Equal width for all tabs
//                   fontSize: "20px", // Bigger font size
//                   fontWeight: "bold", // Bold text
//                   textTransform: "none", // Remove uppercase
//                   padding: "12px 20px",
//                 },
//                 "& .Mui-selected": {
//                   color: "#1976d2", // Highlight active tab
//                   borderBottom: "3px solid #1976d2", // Underline effect
//                 },
//               }}
//             >
//               <Tab label="📊 SOP" value="1" />
//               <Tab label=" ⚡ Charting" value="2" />
//             </TabList>
//           </Box>

//           {/* Tabs Content */}
//           <TabPanel value="1">
//             <div className="d-flex flex-wrap gap-3">
//               {plansData.loading ? (
//                 <p className="allplan-loading">Loading...</p>
//               ) : (
//                 getUpdatedPlans?.map((plan, index) => (
//                   <div key={index} className="allplan-card ">
//                     <div className="plan-header">
//                       <h2 className="allplan-card-title">{plan.Planname}</h2>
//                       {isPlanPurchased(plan.Planname) && (
//                         <BadgeCheck className="purchased-badge" />
//                       )}
//                     </div>
//                     <h3 className="allplan-card-subtitle">
//                       <strong className="card-text-Color">Price:</strong>
//                       <FaRupeeSign /> {(plan.SOPPrice || plan.payment)}
//                     </h3>
//                     <h3 className="allplan-card-subtitle">
//                       Duration: {plan["Plan Validity"]}
//                     </h3>
//                     <h3 className="allplan-card-subtitle">
//                       Scripts: {plan.NumberofScript}
//                     </h3>
//                     <div className="plan-details">
//                       <p>
//                         <strong className="card-text-Color">Scalping:</strong> {plan.Scalping?.join(", ")}
//                       </p>
//                       <p>
//                         <strong className="card-text-Color">Options:</strong>{" "}
//                         {plan["Option Strategy"]?.length > 1 ? (
//                           <>
//                             {expandedOptions.includes(index) ? (
//                               <>
//                                 {plan["Option Strategy"].join(", ")}
//                                 <span
//                                   className="show-more"
//                                   onClick={() => toggleOptions(index)}
//                                 >
//                                   {" "}🔼
//                                 </span>
//                               </>
//                             ) : (
//                               <>
//                                 {plan["Option Strategy"][0]}
//                                 <span
//                                   className="show-more"
//                                   onClick={() => toggleOptions(index)}
//                                 >
//                                   {" "}🔽
//                                 </span>
//                               </>
//                             )}
//                           </>
//                         ) : (
//                           plan["Option Strategy"]?.join(", ")
//                         )}
//                       </p>


//                       <p>
//                         <strong className="card-text-Color">Patterns:</strong>{" "}
//                         {plan.Pattern?.length > 1 ? (
//                           <>
//                             {expandedPatternItems.includes(index) ? (
//                               <>
//                                 {plan.Pattern.join(", ")}
//                                 <span
//                                   className="show-more"
//                                   onClick={() => toggleExpand(index)}
//                                 >
//                                   {" "}🔼
//                                 </span>
//                               </>
//                             ) : (
//                               <>
//                                 {plan.Pattern[0]}
//                                 <span
//                                   className="show-more"
//                                   onClick={() => toggleExpand(index)}
//                                 >
//                                   {" "}🔽
//                                 </span>
//                               </>
//                             )}
//                           </>
//                         ) : (
//                           plan.Pattern?.join(", ")
//                         )}
//                       </p>

//                     </div>
//                     {(isPlanPurchased(plan.Planname) && !planExpired.includes(plan.Planname)) ? (
//                       <button
//                         className="allplan-button buy-again"
//                         onClick={() => HandleBuyPlan(index, 0, false)}
//                       >
//                         🔄 Buy Again
//                       </button>
//                     ) : (
//                       <button
//                         className="allplan-button"
//                         onClick={() => HandleBuyPlan(index, 1, false)}
//                       >
//                         🛒 Buy Now
//                       </button>
//                     )}
//                   </div>
//                 ))
//               )}
//             </div>
//           </TabPanel>

//           <TabPanel value="2">
//             <div className="d-flex flex-wrap gap-3">
//               {plansData.loading ? (
//                 <p className="allplan-loading">Loading...</p>
//               ) : (
//                 getUpdatedPlansCharting?.map((plan, index) => (
//                   <div key={index} className="allplan-card">
//                     <div className="plan-header">
//                       <h2 className="allplan-card-title">{plan.Planname}</h2>
//                       {isPlanPurchased(plan.Planname) && (
//                         <BadgeCheck className="purchased-badge" />
//                       )}
//                     </div>
//                     <h3 className="allplan-card-subtitle">
//                       <FaRupeeSign /> {plan.SOPPrice}
//                     </h3>
//                     <h3 className="allplan-card-subtitle">
//                       Duration: {plan["Plan Validity"]}
//                     </h3>
//                     {/* <h3 className="allplan-card-subtitle">
//                       Scripts: {plan.NumberofScript}
//                     </h3> */}
//                     <div className="plan-details">
//                       <p>
//                         <strong className="card-text-Color">Charting Signals:</strong>{" "}
//                         {plan.ChartingSignal?.join(", ")}
//                       </p>
//                     </div>
//                     {isPlanPurchased(plan.Planname) ? (
//                       <button
//                         className="allplan-button buy-again"
//                         onClick={() => HandleBuyPlan(index, 0, true)}
//                       >
//                         🔄 Buy Again
//                       </button>
//                     ) : (
//                       <button
//                         className="allplan-button"
//                         onClick={() => HandleBuyPlan(index, 1, true)}
//                       >
//                         🛒 Buy Now
//                       </button>
//                     )}
//                   </div>
//                 ))
//               )}
//             </div>
//           </TabPanel>
//         </TabContext>
//       </Box>
//     </Content>
//   );
// };

// export default ServicesList;



// ___below code is perfect 




import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import {
  Get_All_Plans,
  Get_All_Buyed_Plans,
  BuyPlan,
  AddBalance,
  ExpirePlanDetails,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
// import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NewsTicker from "./Expair";
import "./AllPlan.css";
import Content from "../../../ExtraComponent/Content";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const ServicesList = () => {
  const username = localStorage.getItem("name");
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [planExpired, setPlanExpired] = useState([]);
  const expire = localStorage.getItem("expire");


  const [expandedOptions, setExpandedOptions] = useState([]);
  const [expandedPatternItems, setExpandedPatternItems] = useState([]);

  const toggleOptions = (index) => {
    setExpandedOptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleExpand = (index) => {
    setExpandedPatternItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };



  useEffect(() => {
    fetchPlans();
    fetchPurchasedPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response?.Admin?.filter(
          (plan) =>
            !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
              plan.PlanName
            )
        );
        const filterPlanCharting = response?.Charting?.filter(
          (plan) =>
            !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
              plan.PlanName
            )
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

  const fetchPurchasedPlans = async () => {
    try {
      const response = await Get_All_Buyed_Plans({ userName: username });
      if (response.Status) {
        setPurchasedPlans(response.Allotplan || []);
      }
    } catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  };


  const isPlanExpired = async () => {
    try {
      const response = await ExpirePlanDetails(username);
    
      if (response.Status) {
        setPlanExpired(response.Admin.Planname);
      }
    }
    catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  }
  useEffect(() => {
    isPlanExpired();
  }, [])

 


  const isPlanPurchased = (planName) => {
    return purchasedPlans.some((plan) => plan.Planname === planName);
  };

  const HandleBuyPlan = async (index, type, isCharting) => {
    try {
      const planDetails = isCharting
        ? plansData?.data1[index]
        : plansData?.data[index];

     
      const req1 = {
        Username: username,
        transactiontype: "Purchase",
        money: planDetails.payment,
      };
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to buy the plan: ${planDetails.PlanName} for ₹${planDetails.payment}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Buy it!",
        cancelButtonText: "No, Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const CheckBalanceResponse = await AddBalance(req1);
        if (CheckBalanceResponse.Status && type == 0) {
          const result = await Swal.fire({
            title: "What do you want to do?",
            text: `This is your Scubscribed Script so what do you do Extend the EndDate or Extend the Number of Scripts`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Extend End Date",
            cancelButtonText: "Extend Number of Scripts",
            reverseButtons: true,
          });
          if (result.isConfirmed) {
            const req = {
              Username: username,
              Scalping: planDetails.Scalping,
              Option: planDetails["Option Strategy"],
              PatternS: planDetails.Pattern,
              NumberofScript: planDetails.NumberofScript,
              Duration: planDetails["Plan Validity"],
              Planname: planDetails.PlanName,
              payment: planDetails.payment,
              Extendtype: "ExtendServiceEndDate",
              Charting: planDetails.ChartingSignal,
            };
            const buyPlanResponse = await BuyPlan(req);
            if (buyPlanResponse.Status) {
              fetchPurchasedPlans();
              Swal.fire({
                title: "Success!",
                text: buyPlanResponse.message,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: buyPlanResponse.message,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              });
            }
          } else {
            const req = {
              Username: username,
              Scalping: planDetails.Scalping,
              Option: planDetails["Option Strategy"],
              PatternS: planDetails.Pattern,
              NumberofScript: planDetails.NumberofScript,
              Duration: planDetails["Plan Validity"],
              Planname: planDetails.PlanName,
              payment: planDetails.payment,
              Extendtype: "ExtendServiceCount",
              Charting: planDetails.ChartingSignal,
            };
            const buyPlanResponse = await BuyPlan(req);
            if (buyPlanResponse.Status) {
              fetchPurchasedPlans();
              Swal.fire({
                title: "Success!",
                text: buyPlanResponse.message,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: buyPlanResponse.message,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              });
            }
          }
        } else if (CheckBalanceResponse.Status && type == 1) {
          const req = {
            Username: username,
            Scalping: planDetails.Scalping,
            Option: planDetails["Option Strategy"],
            PatternS: planDetails.Pattern,
            NumberofScript: planDetails.NumberofScript,
            Duration: planDetails["Plan Validity"],
            Planname: planDetails.PlanName,
            payment: planDetails.payment,
            Extendtype: "",
            Charting: planDetails.ChartingSignal,
          };
          const buyPlanResponse = await BuyPlan(req);
          if (buyPlanResponse.Status) {
            fetchPurchasedPlans();
            Swal.fire({
              title: "Success!",
              text: buyPlanResponse.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            Swal.fire({
              title: "Error!",
              text: buyPlanResponse.message,
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: CheckBalanceResponse.message,
            icon: "worning",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your purchase has been cancelled.",
          icon: "info",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error in transaction:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };
  
 

  const getUpdatedPlans = plansData.data?.filter(
    (plan) =>
      plan.PlanName !== "Three Days Live" &&
      plan.PlanName !== "Two Days Demo" &&
      plan.PlanName !== "One Week Demo"
  );
  const getUpdatedPlansCharting = plansData.data1?.filter(
    (plan) =>
      plan.PlanName !== "Three Days Live" &&
      plan.PlanName !== "Two Days Demo" &&
      plan.PlanName !== "One Week Demo"
  );

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Content
      Page_title={"📌 All Plans"}
      button_status={false}
      backbutton_status={false}
    >
      <div className="">
        {expire?.includes(1) ? (
          <div className="col-lg-9">
            <NewsTicker />
          </div>
        ) : (
          ""
        )}
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          {/* 🛠️ Styled Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#f8f9fa", // Light background for tabs
              borderRadius: "8px 8px 0 0",
              padding: "10px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: { xs: "none", md: "flex" },

            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                "& .MuiTab-root": {
                  width: "50%", // Equal width for all tabs
                  fontSize: "20px", // Bigger font size
                  fontWeight: "bold", // Bold text
                  textTransform: "none", // Remove uppercase
                  padding: "12px 20px",
                },
                "& .Mui-selected": {
                  color: "#1976d2", // Highlight active tab
                  borderBottom: "3px solid #1976d2", // Underline effect
                },
              }}
            >
              <Tab label="📊 SOP" value="1" />
              <Tab label=" ⚡ Charting" value="2" />
            </TabList>
          </Box>

          {/* Tabs Content */}
          <TabPanel value="1">
            <div className="d-flex flex-wrap gap-3">
              {plansData.loading ? (
                <p className="allplan-loading">Loading...</p>
              ) : (
                getUpdatedPlans?.map((plan, index) => (
                  <div key={index} className="allplan-card ">
                    <div className="plan-header">
                      <h2 className="allplan-card-title">{plan.PlanName}</h2>
                      {isPlanPurchased(plan.PlanName) && (
                        <BadgeCheck className="purchased-badge" />
                      )}
                    </div>
                    <h3 className="allplan-card-subtitle">
                      <strong className="card-text-Color">Price:</strong>
                      <FaRupeeSign /> {plan.payment}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Duration: {plan["Plan Validity"]}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Scripts: {plan.NumberofScript}
                    </h3>
                    <div className="plan-details">
                      <p>
                        <strong className="card-text-Color">Scalping:</strong> {plan.Scalping?.join(", ")}
                      </p>
                      <p>
                        <strong className="card-text-Color">Options:</strong>{" "}
                        {plan["Option Strategy"]?.length > 1 ? (
                          <>
                            {expandedOptions.includes(index) ? (
                              <>
                                {plan["Option Strategy"].join(", ")}
                                <span
                                  className="show-more"
                                  onClick={() => toggleOptions(index)}
                                >
                                  {" "}🔼
                                </span>
                              </>
                            ) : (
                              <>
                                {plan["Option Strategy"][0]}
                                <span
                                  className="show-more"
                                  onClick={() => toggleOptions(index)}
                                >
                                  {" "}🔽
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          plan["Option Strategy"]?.join(", ")
                        )}
                      </p>


                      <p>
                        <strong className="card-text-Color">Patterns:</strong>{" "}
                        {plan.Pattern?.length > 1 ? (
                          <>
                            {expandedPatternItems.includes(index) ? (
                              <>
                                {plan.Pattern.join(", ")}
                                <span
                                  className="show-more"
                                  onClick={() => toggleExpand(index)}
                                >
                                  {" "}🔼
                                </span>
                              </>
                            ) : (
                              <>
                                {plan.Pattern[0]}
                                <span
                                  className="show-more"
                                  onClick={() => toggleExpand(index)}
                                >
                                  {" "}🔽
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          plan.Pattern?.join(", ")
                        )}
                      </p>


                    </div>
                    {isPlanPurchased(plan.PlanName) ? (
                      <button
                        className="allplan-button buy-again"
                        onClick={() => HandleBuyPlan(index, 0, false)}
                      >
                        {planExpired.includes(plan.PlanName) ?"Buy Now" : "🔄 Buy Again"}
                      </button>
                    ) : (
                      <button
                        className="allplan-button"
                        onClick={() => HandleBuyPlan(index, 1, false)}
                      >
                        🛒 Buy Now
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabPanel>

          <TabPanel value="2">
            <div className="d-flex flex-wrap gap-3">
              {plansData.loading ? (
                <p className="allplan-loading">Loading...</p>
              ) : (
                getUpdatedPlansCharting?.map((plan, index) => (
                  <div key={index} className="allplan-card">
                    <div className="plan-header">
                      <h2 className="allplan-card-title">{plan.PlanName}</h2>
                      {isPlanPurchased(plan.PlanName) && (
                        <BadgeCheck className="purchased-badge" />
                      )}
                    </div>
                    <h3 className="allplan-card-subtitle">
                      <FaRupeeSign /> {plan.payment}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Duration: {plan["Plan Validity"]}
                    </h3>
                    {/* <h3 className="allplan-card-subtitle">
                      Scripts: {plan.NumberofScript}
                    </h3> */}
                    <div className="plan-details">
                      <p>
                        <strong className="card-text-Color">Charting Signals:</strong>{" "}
                        {plan.ChartingSignal?.join(", ")}
                      </p>
                    </div>
                    {isPlanPurchased(plan.PlanName) ? (
                      <button
                        className="allplan-button buy-again"
                        onClick={() => HandleBuyPlan(index, 0, true)}
                      >
                        🔄 Buy Again
                      </button>
                    ) : (
                      <button
                        className="allplan-button"
                        onClick={() => HandleBuyPlan(index, 1, true)}
                      >
                        🛒 Buy Now
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </Content>
  );
};

export default ServicesList;
