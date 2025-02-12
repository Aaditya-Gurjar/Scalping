// import styled from "styled-components";
// import { FaRupeeSign, FaEye, FaEdit } from "react-icons/fa";
// import { useState } from "react";
// import { BadgeCheck } from "lucide-react";
// import { Link } from 'react-router-dom'
// import { Get_All_Plans, Get_All_Buyed_Plans, BuyPlan, AddBalance } from "../../CommonAPI/User";
// import Swal from "sweetalert2";
// import NewsTicker from "./Expair";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";

// import { useEffect } from "react";

// const Card = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 10px;
//   width: 300px; /* Reduced width for better horizontal scrolling */
//   padding: 15px;y
//   background-color: #fff;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out,
//     background-color 0.3s ease-in-out, color 0.3s ease-in-out;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;

//   &:hover {
//     background: linear-gradient(to right, #3f414d 0%, #3f414d 100%) !important;
//     color: #fff;
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
//   }

//   &:hover h2,
//   &:hover h4,
//   &:hover p {
//     color: #fff;
//   }
// `;


// const Button = styled.button`
//   padding: 10px 15px;
//   font-size: 1rem;
//   color: #fff;
//   background-color: ${(props) => (props.primary ? "#007BFF" : "#28a745")};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin: 5px;
//   transition: background-color 0.3s ease-in-out;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background-color: ${(props) => (props.primary ? "#0056b3" : "#218838")};
//   }

//   svg {
//     margin-right: 5px;
//   }
// `;
// const ServicesList = () => {
//     const username = localStorage.getItem("name")
//     const expire = localStorage.getItem('expire');
//     const [GetAllPlans, setAllPlans] = useState({ loading: true, data: [] });

//     const [BuyedPlan, setBuyedPlan] = useState({ loading: true, data: [] });

//     const [getAlreadyBoughtPlans, setAlreadyBoughtPlans] = useState({ loading: true, data: [] });

//     useEffect(() => {
//         GetAllPlansData();
//         AllBuyedPlans();
//     }, []);


//     const GetAllPlansData = async () => {
//         await Get_All_Plans().then((response) => {
//             if (response.Status) {
//                 const filterPlan = response?.Admin?.filter(
//                     (plan) =>
//                         plan.PlanName !== "Three Days Live" &&
//                         plan.PlanName !== "Two Days Demo" &&
//                         plan.PlanName !== "One Week Demo"
//                 );
//                 const filterplanforCharting = response?.Charting?.filter(
//                     (plan) =>
//                         plan.PlanName !== "Three Days Live" &&
//                         plan.PlanName !== "Two Days Demo" &&
//                         plan.PlanName !== "One Week Demo"
//                 );
//                 setAllPlans({
//                     loading: false,
//                     data: filterPlan,
//                     data1: filterplanforCharting,
//                 });
//             }
//         });
//     };

//     const AllBuyedPlans = async () => {
//         const req = { userName: username }
//         await Get_All_Buyed_Plans(req)
//             .then((response) => {
//                 if (response.Status) {
//                     setBuyedPlan({
//                         loading: false,
//                         data: response.Allotplan,
//                     })
//                 }
//                 else {
//                     setBuyedPlan({
//                         loading: false,
//                         data: [],
//                     })
//                 }
//             })
//             .catch((error) => {
//                 console.log(error)
//             }
//             )


//     }

//     const SetPlan = (name) => {
//         if (BuyedPlan?.data.length === 0) {
//             return null;
//         }

//         const plan = BuyedPlan?.data.find((plan) => plan.Planname === name);
//         if (plan) {
//             return <BadgeCheck size={24} color="green" />;
//         }
//         return null;

//     };

//     const HandleBuyPlan = async (index, type, isCharting) => {
//         try {
//             const planDetails = isCharting ? GetAllPlans?.data1[index] : GetAllPlans?.data[index];

//             console.log("planDetails", planDetails);
//             const req1 = { Username: username, transactiontype: 'Purchase', money: planDetails.payment };
//             const result = await Swal.fire({
//                 title: 'Are you sure?',
//                 text: `Do you want to buy the plan: ${planDetails.PlanName} for ₹${planDetails.payment}?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonText: 'Yes, Buy it!',
//                 cancelButtonText: 'No, Cancel',
//                 reverseButtons: true
//             });

//             if (result.isConfirmed) {
//                 const CheckBalanceResponse = await AddBalance(req1);
//                 if (CheckBalanceResponse.Status && type == 0) {
//                     const result = await Swal.fire({
//                         title: 'What do you want to do?',
//                         text: `This is your Scubscribed Script so what do you do Extend the EndDate or Extend the Number of Scripts`,
//                         icon: 'warning',
//                         showCancelButton: true,
//                         confirmButtonText: 'Extend End Date',
//                         cancelButtonText: 'Extend Number of Scripts',
//                         reverseButtons: true
//                     });
//                     if (result.isConfirmed) {
//                         const req = {
//                             Username: username,
//                             Scalping: planDetails.Scalping,
//                             Option: planDetails['Option Strategy'],
//                             PatternS: planDetails.Pattern,
//                             NumberofScript: planDetails.NumberofScript,
//                             Duration: planDetails['Plan Validity'],
//                             Planname: planDetails.PlanName,
//                             payment: planDetails.payment,
//                             Extendtype: "ExtendServiceEndDate",
//                             Charting: planDetails.ChartingSignal
//                         };
//                         const buyPlanResponse = await BuyPlan(req);
//                         if (buyPlanResponse.Status) {
//                             AllBuyedPlans();
//                             Swal.fire({
//                                 title: "Success!",
//                                 text: buyPlanResponse.message,
//                                 icon: "success",
//                                 timer: 1500,
//                                 timerProgressBar: true,
//                             });
//                         } else {
//                             Swal.fire({
//                                 title: "Error!",
//                                 text: buyPlanResponse.message,
//                                 icon: "error",
//                                 timer: 1500,
//                                 timerProgressBar: true,
//                             });
//                         }

//                     }
//                     else {
//                         const req = {
//                             Username: username,
//                             Scalping: planDetails.Scalping,
//                             Option: planDetails['Option Strategy'],
//                             PatternS: planDetails.Pattern,
//                             NumberofScript: planDetails.NumberofScript,
//                             Duration: planDetails['Plan Validity'],
//                             Planname: planDetails.PlanName,
//                             payment: planDetails.payment,
//                             Extendtype: "ExtendServiceCount",
//                             Charting: planDetails.ChartingSignal
//                         };
//                         const buyPlanResponse = await BuyPlan(req);
//                         if (buyPlanResponse.Status) {
//                             AllBuyedPlans();
//                             Swal.fire({
//                                 title: "Success!",
//                                 text: buyPlanResponse.message,
//                                 icon: "success",
//                                 timer: 1500,
//                                 timerProgressBar: true,
//                             });
//                         } else {
//                             Swal.fire({
//                                 title: "Error!",
//                                 text: buyPlanResponse.message,
//                                 icon: "error",
//                                 timer: 1500,
//                                 timerProgressBar: true,
//                             });
//                         }
//                     }
//                 }
//                 else if (CheckBalanceResponse.Status && type == 1) {
//                     const req = {
//                         Username: username,
//                         Scalping: planDetails.Scalping,
//                         Option: planDetails['Option Strategy'],
//                         PatternS: planDetails.Pattern,
//                         NumberofScript: planDetails.NumberofScript,
//                         Duration: planDetails['Plan Validity'],
//                         Planname: planDetails.PlanName,
//                         payment: planDetails.payment,
//                         Extendtype: "",
//                         Charting: planDetails.ChartingSignal
//                     };
//                     const buyPlanResponse = await BuyPlan(req);
//                     if (buyPlanResponse.Status) {
//                         AllBuyedPlans();
//                         Swal.fire({
//                             title: "Success!",
//                             text: buyPlanResponse.message,
//                             icon: "success",
//                             timer: 1500,
//                             timerProgressBar: true,
//                         });
//                         setTimeout(() => {
//                             window.location.reload();
//                         }, 1500);
//                     } else {
//                         Swal.fire({
//                             title: "Error!",
//                             text: buyPlanResponse.message,
//                             icon: "error",
//                             timer: 1500,
//                             timerProgressBar: true,
//                         });
//                     }
//                 }
//                 else {
//                     Swal.fire({
//                         title: "Error!",
//                         text: CheckBalanceResponse.message,
//                         icon: "worning",
//                         timer: 1500,
//                         timerProgressBar: true,
//                     });
//                 }

//             } else {
//                 Swal.fire({
//                     title: 'Cancelled',
//                     text: 'Your purchase has been cancelled.',
//                     icon: 'info',
//                     timer: 1500,
//                     timerProgressBar: true,
//                 });
//             }
//         } catch (error) {
//             console.error('Error in transaction:', error);
//             Swal.fire({
//                 title: "Error",
//                 text: "An unexpected error occurred",
//                 icon: "error",
//                 timer: 1500,
//                 timerProgressBar: true,
//             });
//         }
//     };

//     const getUpdatedPlans = GetAllPlans.data?.filter((plan) => {
//         if (plan.PlanName == "Three Days Live" || plan.PlanName == "Two Days Demo" || plan.PlanName == "One Week Demo") {
//             if (BuyedPlan.data && BuyedPlan.data.length > 0) {
//                 const isBuyed = BuyedPlan.data.find((buyedPlan) => buyedPlan.Planname == plan.PlanName);
//                 return isBuyed != undefined && isBuyed
//             }
//         } else {
//             return plan
//         }
//     });

//     const getUpdatedPlans1 = GetAllPlans.data1?.filter((plan) => {
//         if (plan.PlanName == "Three Days Live" || plan.PlanName == "Two Days Demo" || plan.PlanName == "One Week Demo") {
//             if (BuyedPlan.data && BuyedPlan.data.length > 0) {
//                 const isBuyed = BuyedPlan.data.find((buyedPlan) => buyedPlan.Planname == plan.PlanName);
//                 return isBuyed != undefined && isBuyed
//             }
//         } else {
//             return plan
//         }
//     });
//     const getUpdatedPlans2 = GetAllPlans.data2?.filter((plan) => {
//         if (plan.PlanName == "Three Days Live" || plan.PlanName == "Two Days Demo" || plan.PlanName == "One Week Demo") {
//             if (BuyedPlan.data && BuyedPlan.data.length > 0) {
//                 const isBuyed = BuyedPlan.data.find((buyedPlan) => buyedPlan.Planname == plan.PlanName);
//                 return isBuyed != undefined && isBuyed
//             }
//         } else {
//             return plan
//         }
//     });

//     return (
//         <>
//             <div className='row'>
//                 <div className='col-sm-12'>
//                     <div className='iq-card'>
//                         <div className='iq-card-header row'>
//                             <div className='iq-header-title col-lg-3'>
//                                 <h4 className='card-title'>All Plans</h4>
//                             </div>
//                             {
//                                 expire?.includes(1) ? <div className="col-lg-9">
//                                     <NewsTicker />
//                                 </div> : ""
//                             }
//                         </div>


//                         <div className="iq-card-body">
//                             <div className="container mt-4">
//                                 <Tabs
//                                     defaultActiveKey="Scalping"
//                                     id="fill-tab-example"
//                                     className="mb-3 custom-tabs w-90"
//                                     fill>
//                                     <Tab eventKey="Scalping" title="Scalping" style={{ margin: "100px" }}>
//                                         <div className="">
//                                             <h5 className="mb-4">
//                                                 <div className="iq-card-body">
//                                                     <div style={styles.container} className="row">
//                                                         {getUpdatedPlans?.map((plan, index) => (
//                                                             plan.PlanName == "Three Days Live" || plan.PlanName == "One Week Demo" || plan.PlanName == "Two Days Demo" ? "" :
//                                                                 <Card key={index} className="col-lg-3 col-md-6 mb-3 all-plan-card">
//                                                                     <div className="d-flex flex-column justify-content-between h-100 p-3 border">
//                                                                         <div>
//                                                                             <div style={styles.content}>
//                                                                                 <h2 style={styles.title}>
//                                                                                     {plan.PlanName} {SetPlan(plan.PlanName)}
//                                                                                 </h2>
//                                                                                 <h4 style={styles.subtitle}><FaRupeeSign className="m-1" /><strong>{plan.payment}</strong></h4>
//                                                                                 <h4 style={styles.subtitle}>Duration: {plan?.['Plan Validity']}</h4>
//                                                                                 <h4 style={styles.subtitle}>No of Scripts: {plan?.NumberofScript}</h4>

//                                                                                 <div style={styles.prices}>
//                                                                                     <p style={styles.priceItem}>
//                                                                                         <strong>Scalping Strategy:</strong> {plan?.Scalping?.join(", ")}
//                                                                                     </p>
//                                                                                     <p style={styles.priceItem}>
//                                                                                         <strong>Option Strategy:</strong> {plan?.['Option Strategy']?.join(", ")}
//                                                                                     </p>
//                                                                                     <p style={styles.priceItem}>
//                                                                                         <strong>Pattern Strategy:</strong> {plan?.Pattern?.join(", ")}
//                                                                                     </p>

//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div style={styles.buttonContainer}>
//                                                                             {SetPlan(plan.PlanName) == null ? (
//                                                                                 <Button primary style={styles.button} onClick={() => HandleBuyPlan(index, 1, false)}>
//                                                                                     BUY NOW
//                                                                                 </Button>
//                                                                             )
//                                                                                 :
//                                                                                 <Button style={styles.subscribedButton} onClick={() => HandleBuyPlan(index, 0, false)}>
//                                                                                     BUY AGAIN
//                                                                                 </Button>
//                                                                             }
//                                                                         </div>
//                                                                     </div>
//                                                                 </Card>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </h5>
//                                         </div>
//                                     </Tab>
//                                     <Tab eventKey="Charting" title="Charting" style={{ margin: "100px" }}>

//                                         <div className="iq-card-body">
//                                             <div style={styles.container} className="row">
//                                                 {getUpdatedPlans1?.map((plan, index) => (
//                                                     plan.PlanName == "Three Days Live" || plan.PlanName == "One Week Demo" || plan.PlanName == "Two Days Demo" ? "" :
//                                                         <Card key={index} style={styles.card} className="col-lg-3 col-md-6 mb-3 all-plan-card">
//                                                             <div className="d-flex flex-column justify-content-between h-100 p-3 border">
//                                                                 <div>
//                                                                     <div style={styles.content}>
//                                                                         <h2 style={styles.title}>
//                                                                             {plan.PlanName} {SetPlan(plan.PlanName)}
//                                                                         </h2>
//                                                                         <h4 style={styles.subtitle}><FaRupeeSign className="m-1" /><strong>{plan.payment}</strong></h4>
//                                                                         <h4 style={styles.subtitle}>Duration: {plan?.['Plan Validity']}</h4>
//                                                                         <h4 style={styles.subtitle}>No of Scripts: {plan?.NumberofScript}</h4>

//                                                                         <div style={styles.prices}>

//                                                                             <p style={styles.priceItem}>
//                                                                                 <strong>Charting Script:</strong> {plan?.ChartingSignal?.join(", ")}
//                                                                             </p>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div style={styles.buttonContainer}>
//                                                                     {SetPlan(plan.PlanName) == null ? (
//                                                                         <Button primary style={styles.button} onClick={() => HandleBuyPlan(index, 1, true)}>
//                                                                             BUY NOW
//                                                                         </Button>
//                                                                     )
//                                                                         :
//                                                                         <Button style={styles.subscribedButton} onClick={() => HandleBuyPlan(index, 0, true)}>
//                                                                             BUY AGAIN
//                                                                         </Button>
//                                                                     }
//                                                                 </div>
//                                                             </div>
//                                                         </Card>
//                                                 ))}
//                                             </div>
//                                         </div>

//                                     </Tab>
//                                     {/* New Already Buy Plan Tab */}
//                                     <Tab eventKey="AlreadyBuy" title="Already Buy Plan" style={{ margin: "100px" }}>
//                                         <div className="iq-card-body">
//                                             <div style={styles.container} className="row">
//                                                 {BuyedPlan.data?.length > 0 ? (
//                                                     BuyedPlan.data?.map((plan, index) => (


//                                                         <Card key={index} className="col-lg-3 col-md-6 mb-3 all-plan-card">
//                                                             <div className="d-flex flex-column justify-content-between h-100 p-3 border">
//                                                                 <div>
//                                                                     <div style={styles.content}>
//                                                                         {/* {console.log("plan kya aa rha hai", plan)} */}

//                                                                         <h2 style={styles.title}>{plan.Planname}</h2>


//                                                                         <h4 style={styles.subtitle}>No of Scripts: {plan?.NumberofScript}</h4>
//                                                                         <div style={styles.prices}>
//                                                                             <p style={styles.priceItem}>
//                                                                                 <strong>Scalping Strategy:</strong> {plan?.Scalping?.join(", ")}
//                                                                             </p>
//                                                                             <p style={styles.priceItem}>
//                                                                                 <strong>Option Strategy:</strong> {plan?.['Option Strategy']?.join(", ")}
//                                                                             </p>
//                                                                             <p style={styles.priceItem}>
//                                                                                 <strong>Pattern Strategy:</strong> {plan?.Pattern?.join(", ")}
//                                                                             </p>

//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div style={styles.buttonContainer}>
//                                                                     <Button style={styles.subscribedButton} disabled>
//                                                                         ALREADY PURCHASED
//                                                                     </Button>
//                                                                 </div>
//                                                             </div>
//                                                         </Card>
//                                                     ))
//                                                 ) : (
//                                                     <p>No Plans Purchased Yet</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </Tab>
//                                 </Tabs>
//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };


// const styles = {

//     image: {
//         width: "100%",
//         height: "150px",
//         objectFit: "cover",
//         borderRadius: "8px",
//         marginBottom: "15px",
//     },
//     title: {
//         fontSize: "1.5rem",
//         margin: "10px 0",
//         color: "rgb(15 164 32)",
//         fontWeight: "bold",
//     },
//     subtitle: {
//         fontSize: "1.2rem",
//         margin: "5px 0",
//     },
//     description: {
//         fontSize: "1rem",
//         margin: "10px 0",
//     },
//     prices: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//         margin: "10px 0",
//         color: "#555",
//         padding: "0",
//         listStyle: "none",
//         fontSize: "1rem",
//     },
//     priceItem: {
//         margin: "5px 0",
//         textAlign: "left",
//     },
//     buttonContainer: {
//         marginTop: "15px",
//         display: "flex",
//         textAlign: "center",
//         justifyContent: "center",
//         alignItems: "center",
//     }

// };

// export default ServicesList;


//ye wala update wala code hai iske niche se

import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import { Get_All_Plans, Get_All_Buyed_Plans, BuyPlan, AddBalance } from "../../CommonAPI/User";
import Swal from "sweetalert2";
import NewsTicker from "./Expair";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button } from "react-bootstrap";

const ServicesList = () => {
    const username = localStorage.getItem("name");
    const expire = localStorage.getItem("expire");
    const [GetAllPlans, setAllPlans] = useState({ loading: true, data: [], chartingData: [] });
    const [BuyedPlan, setBuyedPlan] = useState({ loading: true, data: [] });

    useEffect(() => {
        GetAllPlansData();
        AllBuyedPlans();
    }, []);

    const GetAllPlansData = async () => {
        const response = await Get_All_Plans();
        if (response.Status) {
            setAllPlans({
                loading: false,
                data: response.Admin.filter(plan => !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(plan.PlanName)),
                chartingData: response.Charting.filter(plan => !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(plan.PlanName))
            });
        }
    };

    const AllBuyedPlans = async () => {
        const req = { userName: username };
        const response = await Get_All_Buyed_Plans(req);
        setBuyedPlan({ loading: false, data: response.Status ? response.Allotplan : [] });
    };

    const SetPlan = useCallback((name) => {
        return BuyedPlan?.data.some(plan => plan.Planname === name) ? <BadgeCheck size={24} color="green" /> : null;
    }, [BuyedPlan]);

    const HandleBuyPlan = async (index, isCharting = false) => {
        try {
            const planDetails = isCharting ? GetAllPlans.chartingData[index] : GetAllPlans.data[index];
            const result = await Swal.fire({
                title: "Confirm Purchase",
                text: `Buy ${planDetails.PlanName} for ₹${planDetails.payment}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Buy it!",
            });
            if (!result.isConfirmed) return;

            const req = { Username: username, transactiontype: 'Purchase', money: planDetails.payment };
            const CheckBalanceResponse = await AddBalance(req);

            if (!CheckBalanceResponse.Status) {
                return Swal.fire({ title: "Error", text: CheckBalanceResponse.message, icon: "error" });
            }

            const buyPlanResponse = await BuyPlan({ ...planDetails, Username: username, Extendtype: "" });
            if (buyPlanResponse.Status) {
                AllBuyedPlans();
                Swal.fire({ title: "Success", text: buyPlanResponse.message, icon: "success", timer: 1500 });
            } else {
                Swal.fire({ title: "Error", text: buyPlanResponse.message, icon: "error", timer: 1500 });
            }
        } catch (error) {
            Swal.fire({ title: "Error", text: "An unexpected error occurred", icon: "error" });
        }
    };

    return (
        <>
            {expire?.includes(1) && <NewsTicker />}
            <Tabs defaultActiveKey="Scalping" className="mb-3 custom-tabs">
                <Tab eventKey="Scalping" title="Scalping">
                    <PlanGrid>
                        {GetAllPlans.data.map((plan, index) => (
                            <Card key={index}>
                                <h2>{plan.PlanName} {SetPlan(plan.PlanName)}</h2>
                                <p><FaRupeeSign /> {plan.payment}</p>
                                <p>Duration: {plan['Plan Validity']}</p>
                                <p>No of Scripts: {plan.NumberofScript}</p>
                                <div>
                                    <p><strong>Scalping Strategy:</strong> {plan?.Scalping?.join(", ")}</p>
                                    <p><strong>Option Strategy:</strong> {plan?.['Option Strategy']?.join(", ")}</p>
                                    <p><strong>Pattern Strategy:</strong> {plan?.Pattern?.join(", ")}</p>
                                </div>
                                <Button primary onClick={() => HandleBuyPlan(index)}>
                                    BUY NOW
                                </Button>
                            </Card>
                        ))}
                    </PlanGrid>
                </Tab>
                <Tab eventKey="Charting" title="Charting">
                    <PlanGrid>
                        {GetAllPlans.chartingData.map((plan, index) => (
                            <Card key={index}>
                                <h2>{plan.PlanName} {SetPlan(plan.PlanName)}</h2>
                                <p><FaRupeeSign /> {plan.payment}</p>
                                <p>Duration: {plan['Plan Validity']}</p>
                                <p>No of Scripts: {plan.NumberofScript}</p>
                                <div>
                                    <p><strong>Scalping Strategy:</strong> {plan?.Scalping?.join(", ")}</p>
                                    <p><strong>Option Strategy:</strong> {plan?.['Option Strategy']?.join(", ")}</p>
                                    <p><strong>Pattern Strategy:</strong> {plan?.Pattern?.join(", ")}</p>
                                </div>
                                <Button primary onClick={() => HandleBuyPlan(index, true)}>
                                    BUY NOW
                                </Button>
                            </Card>
                        ))}
                    </PlanGrid>
                </Tab>
                <Tab eventKey="AlreadyBuy" title="Already Buy Plan">
                    <PlanGrid>
                        {BuyedPlan.data.map((plan, index) => (
                            <Card key={index}>
                                <h2>{plan.Planname}</h2>
                                {/* <p><FaRupeeSign /> {plan.payment}</p> */}
                                {/* <p>Duration: {plan['Plan Validity']}</p> */}
                                <p>No of Scripts: {plan.NumberofScript}</p>
                                <div>
                                    <p><strong>Scalping Strategy:</strong> {plan?.Scalping?.join(", ")}</p>
                                    <p><strong>Option Strategy:</strong> {plan?.['Option Strategy']?.join(", ")}</p>
                                    <p><strong>Pattern Strategy:</strong> {plan?.Pattern?.join(", ")}</p>
                                </div>
                                <Button disabled>ALREADY PURCHASED</Button>
                            </Card>
                        ))}
                    </PlanGrid>
                </Tab>
            </Tabs>
        </>
    );
};

const PlanGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 100px auto;
    max-width: 1200px;
    justify-content: center;
`;

const Card = styled.div`
    border: 2px solid rgba(0, 255, 255, 0.3);
    border-radius: 15px;
    padding: 30px;
    background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
    color: #fff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    text-align: center;
    transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    margin: 25px;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: scale(1.1) rotate(-1deg);
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
    }

    h2 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 15px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #00ffff;
    }

    p {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: #bbb;
    }

    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 60%);
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.5s ease-in-out;
    }

    &:hover:before {
        transform: translate(-50%, -50%) scale(1.2);
    }
`;

export default ServicesList;



