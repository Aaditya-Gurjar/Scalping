// import React, { useState, useEffect } from 'react';
// import { GetClientService, get_User_Data, get_Trade_History, get_PnL_Data, get_EQuityCurveData, get_DrapDownData, get_FiveMostProfitTrade, get_FiveMostLossTrade, getStrategyType } from '../../CommonAPI/Admin'
// import Loader from '../../../ExtraComponent/Loader'
// import GridExample from '../../../ExtraComponent/CommanDataTable'
// import DatePicker from "react-datepicker";
// import { columns, columns1, columns2, columns3, columns7, columns5, columns6 } from './TradeHistoryColumn'
// import { AgChartsReact } from "ag-charts-react";
// import "ag-charts-enterprise";
// import ApexCharts from 'react-apexcharts';
// import Swal from 'sweetalert2';
// import "react-datepicker/dist/react-datepicker.css";
// import ChartComponent from '../AdvanceChart/ChartComponent'

// import NoDataFound from '../../../ExtraComponent/NoDataFound';

// import DrawdownChartComponent from '../AdvanceChart/DrawdownChartComponent';
// import ProfitAndLossGraph from '../AdvanceChart/ProfitAndLossGraph';



// const Tradehistory = () => {
//     const Username = sessionStorage.getItem('Username')
//     const StrategyType = sessionStorage.getItem('StrategyType')

//     const [selectGroup, setSelectGroup] = useState(Username || '')

//     const [selectStrategyType, setStrategyType] = useState(StrategyType || 'Scalping')
//     const [tableType, setTableType] = useState("Scalping");
//     const [tradeHistory, setTradeHistory] = useState({ loading: true, data: [], data1: [] })
//     const [selectedRowData, setSelectedRowData] = useState('');
//     const [ToDate, setToDate] = useState('');
//     const [FromDate, setFromDate] = useState('');
//     const [showTable, setShowTable] = useState(false)
//     const [strategyNames, setStrategyNames] = useState([]);
//     const [getAllTradeData, setAllTradeData] = useState({
//         loading: true,
//         data: [],
//         data1: "",
//         data2: "",
//         data3: "",
//         data4: "",
//         Overall: []
//     })
//     const [getPnLData, setPnlData] = useState({ loading: true, data: [], data2: [] })
//     const [getEquityCurveDetails, setEquityCurveDetails] = useState({ loading: true, data: [] })
//     const [getDropDownData, setDropDownData] = useState({ loading: true, data: [] })
//     const [getGroupData, setGroupData] = useState({ loading: true, data: [] })
//     const [getFiveLossTrade, setFiveLossTrade] = useState({ loading: true, data: [], data1: [] })
//     const [getFiveProfitTrade, setFiveProfitTrade] = useState({ loading: true, data: [], data1: [] })


//     // set Defult Date 
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate());
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     const formattedDate = `${year}.${month}.${day}`;


//     // from date
//     const DefultToDate = new Date();
//     DefultToDate.setDate(DefultToDate.getDate() + 1);
//     const year1 = DefultToDate.getFullYear();
//     const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
//     const day1 = String(DefultToDate.getDate()).padStart(2, '0');
//     const Defult_To_Date = `${year1}.${month1}.${day1}`;


//     // Date Formetor
//     const convertDateFormat = (date) => {
//         if (date == '') {
//             return ''
//         }
//         const dateObj = new Date(date);
//         const year = dateObj.getFullYear();
//         const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//         const day = String(dateObj.getDate()).padStart(2, '0');
//         return `${year}.${month}.${day}`;
//     };


//     const GetAllGroupDetails = async () => {
//         try {
//             await GetClientService()
//                 .then((response) => {

//                     if (response.Status) {
//                         setGroupData({
//                             loading: false,
//                             data: response.Data
//                         })
//                     }
//                     else {
//                         setGroupData({
//                             loading: false,
//                             data: []
//                         })
//                     }
//                 })
//                 .catch((err) => {
//                     console.log("Error Eroup data fetch", err)
//                 })
//         }
//         catch {
//             console.log("Error group data fetch")
//         }
//     }

//     useEffect(() => {
//         GetAllGroupDetails()
//     }, [])


//     const GetTradeHistory = async () => {
//         const data = { Data: selectStrategyType, Username: selectGroup }

//         //GET TRADEHISTORY
//         await get_User_Data(data)
//             .then((response) => {
//                 if (response.Status) {

//                     setTradeHistory({
//                         loading: false,
//                         data: response.Data,
//                         data1: response.NewScalping
//                     })
//                 }
//                 else {
//                     setTradeHistory({
//                         loading: false,
//                         data: [],
//                         data1: []
//                     })

//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the user data", err)
//             })
//     }

//     const strategyType = async () => {
//         try {
//             const res = await getStrategyType();
//             if (res.Data) {
//                 setStrategyNames(res.Data);
//             } else {
//                 console.log("Error in getting the StrategyType");
//             }
//         } catch (error) {
//             console.log("Error in getting the StrategyType", error);
//         }
//     };


//     useEffect(() => {
//         GetTradeHistory()
//     }, [selectStrategyType, selectGroup])

//     useEffect(() => {
//         strategyType()
//     }, [selectStrategyType])


//     const handleRowSelect = (rowData) => {
//         setSelectedRowData(rowData);
//     };


//     const handleSubmit = async () => {
//         const data = {
//             MainStrategy: selectStrategyType == "Scalping" && selectedRowData.ScalpType == "Multi_Conditional" ? "NewScalping" : selectStrategyType,
//             Strategy: selectStrategyType == "Scalping" && selectedRowData.ScalpType != "Multi_Conditional" ? selectedRowData && selectedRowData.ScalpType : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.STG : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TradePattern : selectStrategyType == "Scalping" && selectedRowData.ScalpType == "Multi_Conditional" ? selectedRowData && selectedRowData.Targetselection : "",
//             Symbol: selectStrategyType == "Scalping" || selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Symbol : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.IName : '',
//             Username: selectGroup,
//             ETPattern: selectStrategyType == "Scalping" ? selectStrategyType.TType : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.Targettype : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Pattern : '',
//             Timeframe: selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TimeFrame : '',
//             From_date: convertDateFormat(FromDate == '' ? formattedDate : FromDate),
//             To_date: convertDateFormat(ToDate == '' ? Defult_To_Date : ToDate),
//             Group: selectStrategyType == "Scalping" || selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.GroupN : "",
//             TradePattern: "",
//             PatternName: ""
//         }

//         await get_Trade_History(data)

//             .then((response) => {
//                 if (response.Status) {
//                     setAllTradeData({
//                         loading: false,
//                         data: response.data,
//                         data1: response.profitconsistant,
//                         data2: response.profitconcount,
//                         data3: response.lossconcount,
//                         data4: response.lossconsistant,
//                         Overall: response.Overall

//                     })
//                     setShowTable(true)
//                 }
//                 else {
//                     Swal.fire({
//                         background: "#1a1e23 ",
//                         backdrop: "#121010ba",
//                         confirmButtonColor: "#1ccc8a",
//                         title: "No Records found",
//                         icon: "info",
//                         timer: 1500,
//                         timerProgressBar: true
//                     });
//                     setAllTradeData({
//                         loading: false,
//                         data: [],
//                         data1: "",
//                         data2: "",
//                         data3: "",
//                         data4: "",
//                         Overall: []

//                     })
//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the All TradeData", err)
//             })

//         //GET PNL DATA
//         await get_PnL_Data(data)
//             .then((response) => {
//                 if (response.Status) {



//                     const newDataArray = response.Barchart.map(item => ({
//                         PnL: item.PnL,
//                         ETime: item.ETime.split(' ')[1].substring(0, 5)
//                     }));


//                     setPnlData({
//                         loading: false,
//                         data: newDataArray,
//                         data2: response.Barchart,
//                     })
//                 }
//                 else {
//                     setPnlData({
//                         loading: false,
//                         data: [],
//                         data2: []
//                     })

//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the user data", err)
//             })


//         //GET GetEquity CurveData
//         await get_EQuityCurveData(data)
//             .then((response) => {
//                 if (response.Status) {
//                     setEquityCurveDetails({
//                         loading: false,
//                         data: response.Equitycurve,
//                     })
//                 }
//                 else {
//                     setEquityCurveDetails({
//                         loading: false,
//                         data: [],
//                     })

//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the user data", err)
//             })

//         //GET GetEquity CurveData
//         await get_DrapDownData(data)
//             .then((response) => {
//                 if (response.Status) {
//                     setDropDownData({
//                         loading: false,
//                         data: response.Drawdown,
//                     })
//                 }
//                 else {
//                     setDropDownData({
//                         loading: false,
//                         data: [],
//                     })

//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the user data", err)
//             })


//         // GET 5 MONST PROFIT TRADE
//         await get_FiveMostLossTrade(data)
//             .then((response) => {
//                 if (response.Status) {
//                     setFiveLossTrade({
//                         loading: false,
//                         data: response.fivelosstrade,
//                         data1: response.fivelosstradeall,

//                     })
//                 }
//                 else {
//                     setFiveLossTrade({
//                         loading: false,
//                         data: [],
//                         data1: []
//                     })

//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the user data", err)
//             })

//         await get_FiveMostProfitTrade(data)
//             .then((response) => {
//                 if (response.Status) {
//                     setFiveProfitTrade({
//                         loading: false,
//                         data: response.fiveprofittrade,
//                         data1: response.fiveprofittradeall,
//                     })
//                 }
//                 else {
//                     setFiveProfitTrade({
//                         loading: false,
//                         data: [],
//                         data1: [],

//                     })

//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the user data", err)
//             })
//     }



//     useEffect(() => {
//         if (getGroupData && getGroupData.data.length > 0) {
//             setSelectGroup(Username || (getGroupData.data[0].Username))
//         }
//         setStrategyType(StrategyType || 'Scalping')
//     }, [getGroupData]);



//     const chartOptions = {
//         zoom: { enabled: true },
//         data: getPnLData && getPnLData.data,
//         series: [{ type: 'bar', xKey: 'ETime', yKey: 'PnL' }],
//     }

//     const chartOptions1 = {
//         zoom: { enabled: true },
//         data: getEquityCurveDetails && getEquityCurveDetails.data,
//         series: [{ type: 'line', xKey: selectStrategyType == "Pattern" ? "ETime" : 'ExitTime', yKey: selectStrategyType == "Scalping" ? "EquityCurve" : 'PnL' }],
//     }



//     const chartOptions2 = {
//         zoom: { enabled: true },
//         data: getDropDownData && getDropDownData.data,
//         series: [{ type: 'line', xKey: 'ETime', yKey: 'Drawdown' }],
//     }

//     const ETime = getFiveProfitTrade && getFiveProfitTrade.data.map(item => item.ETime);
//     const PnL = getFiveProfitTrade && getFiveProfitTrade.data.map(item => item.PnL);

//     const ETime1 = getFiveLossTrade && getFiveLossTrade.data.map(item => item.ETime);
//     const PnL1 = getFiveLossTrade && getFiveLossTrade.data.map(item => item.PnL < 0 ? -1 * (item.PnL) : item.PnL);


//     const options = {
//         series: PnL,
//         chart: {
//             width: 380,
//             type: 'pie',
//         },
//         labels: ETime,
//         responsive: [{
//             breakpoint: 480,
//             options: {
//                 chart: {
//                     width: 200
//                 },
//                 legend: {
//                     position: 'bottom'
//                 }
//             }
//         }]
//     };

//     const options1 = {
//         series: PnL1,
//         chart: {
//             width: 380,
//             type: 'pie',
//         },
//         labels: ETime1,
//         responsive: [{
//             breakpoint: 480,
//             options: {
//                 chart: {
//                     width: 200
//                 },
//                 legend: {
//                     position: 'bottom'
//                 }
//             }
//         }]
//     };

//     useEffect(() => {
//         setShowTable(false)
//     }, [selectStrategyType, selectGroup, selectedRowData])

//     const Accordion = ({ id, title, content }) => (
//         <div className="mb-3 mt-3">
//             <div className="accordion" id={id}>
//                 <div className="accordion-item">
//                     <h2 className="accordion-header" id={`heading-${id}`}>
//                         <button
//                             className="accordion-button collapsed"
//                             type="button"
//                             data-bs-toggle="collapse"
//                             data-bs-target={`#collapse-${id}`}
//                             aria-expanded="false"
//                             aria-controls={`collapse-${id}`}
//                             style={{ fontWeight: 'bold' }}
//                         >
//                             {title}
//                         </button>
//                     </h2>
//                     <div
//                         id={`collapse-${id}`}
//                         className="accordion-collapse collapse"
//                         aria-labelledby={`heading-${id}`}
//                         data-bs-parent={`#${id}`}
//                     >
//                         <div className="accordion-body">
//                             {content}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );


//     return (
//         <div>
//             <div className="container-fluid" style={{marginTop:"2rem"}}>
//                 <div className="row">
//                     <div className="iq-card">
//                         <div className="iq-card-header d-flex justify-content-between">
//                             <div className="iq-header-title">
//                                 <h4 className="card-title">Trade History</h4>
//                             </div>
//                         </div>

//                         <div className="iq-card-body">
//                             <div className="was-validated ">
//                                 <div className='row'>
//                                     <div
//                                         className={`form-group  ${ "col-lg-3"}`}>
//                                         <label>Select Username</label>
//                                         <select className="form-select" required=""
//                                             onChange={(e) => {
//                                                 setSelectGroup(e.target.value)
//                                                 sessionStorage.setItem('Username',e.target.value)
//                                             }}
//                                             value={selectGroup}
//                                         >
//                                             <option value="">Select Username</option>
//                                             {getGroupData.data && getGroupData.data.map((item) => {
//                                                 return <>
//                                                     <option value={item.Username}>{item.Username}</option>
//                                                 </>
//                                             })}
//                                         </select>
//                                     </div>
//                                     <div className={`form-group  ${ "col-lg-3"}`}>
//                                         <label>Select Strategy Type</label>
//                                         <select className="form-select" required=""
//                                             onChange={(e) => {
//                                                 setStrategyType(e.target.value)
//                                                 sessionStorage.setItem('StrategyType',e.target.value)
//                                             }}
//                                             value={selectStrategyType}>
//                                             {strategyNames.map((item, index) => {
//                                                 return (
//                                                     <option key={index} value={item}>
//                                                         {item}
//                                                     </option>
//                                                 );
//                                             })}

//                                         </select>
//                                     </div>

//                                     {/* {selectStrategyType == "Scalping" && (
//                                         <div className={`form-group  ${selectStrategyType == "Scalping" ? "col-lg-2" : "col-lg-3"}`}>
//                                             <label>Table Type</label>
//                                             <select
//                                                 className="form-select"
//                                                 required=""
//                                                 onChange={(e) => setTableType(e.target.value)}
//                                                 value={tableType}>
//                                                 <option value="Scalping">Scalping</option>
//                                                 <option value="MultiCondition">Multi Condition</option>
//                                             </select>
//                                         </div>
//                                     )} */}

//                                     <div className="form-group col-md-3 col-sm-6">
//                                         <label>Select form Date</label>
//                                         <DatePicker className="form-select" selected={FromDate == '' ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />

//                                     </div>
//                                     <div className="form-group col-md-3 col-sm-6">
//                                         <label>Select To Date</label>
//                                         <DatePicker className="form-select" selected={ToDate == "" ? Defult_To_Date : ToDate} onChange={(date) => setToDate(date)} />
//                                     </div>
//                                 </div>
//                             </div>


//                             {/* {tradeHistory?.data?.length > 0 && tradeHistory?.data1?.length > 0 ? (
//                                 <>
//                                     <div className="modal-body">
//                                         {tradeHistory.data && (
//                                             <GridExample
//                                                 columns={
//                                                     selectStrategyType === "Scalping"
//                                                         ? columns()
//                                                         : selectStrategyType === "Option Strategy"
//                                                             ? columns1()
//                                                             : selectStrategyType === "Pattern"
//                                                                 ? columns2()
//                                                                 : columns()
//                                                 }
//                                                 data={tradeHistory.data}
//                                                 onRowSelect={handleRowSelect}
//                                                 checkBox={true}
//                                             />
//                                         )}
//                                     </div>

//                                     {selectStrategyType === "Scalping" &&
//                                         adminPermission.includes("Charting Platform") &&
//                                         tradeHistory.data1 && (
//                                             <div>
//                                                 <div className="iq-header-title mt-4">
//                                                     <h4 className="card-title">Multi Conditional</h4>
//                                                 </div>
//                                                 <div className="modal-body">
//                                                     <GridExample
//                                                         columns={columns7()}
//                                                         data={tradeHistory.data1}
//                                                         onRowSelect={handleRowSelect}
//                                                         checkBox={true}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}

//                                     <button className="btn btn-primary mt-2" onClick={handleSubmit}>
//                                         Submit
//                                     </button>
//                                 </>
//                             ) : (
//                                 <NoDataFound />
//                             )} */}

//                             {tableType === "Scalping" ? (
//                                 tradeHistory?.data?.length > 0 ? (
//                                     <>
//                                         <h4 className="mt-3">{selectStrategyType}</h4>
//                                         <GridExample
//                                             columns={
//                                                 selectStrategyType === "Scalping"
//                                                     ? columns()
//                                                     : selectStrategyType === "Option Strategy"
//                                                         ? columns1()
//                                                         : selectStrategyType === "Pattern"
//                                                             ? columns2()
//                                                             : columns()
//                                             }
//                                             data={tradeHistory.data}
//                                             checkBox={false}
//                                         />
//                                     </>
//                                 ) : (
//                                     <NoDataFound />
//                                 )
//                             ) : (

//                                 tableType === "MultiCondition" && tradeHistory?.data1?.length > 0 ? (
//                                     <>
//                                         <h4 className="mt-3">Multi Condition</h4>
//                                         <GridExample columns={columns3()} data={tradeHistory.data1} checkBox={false} />
//                                     </>
//                                 ) : (
//                                     <NoDataFound />
//                                 )
//                             )}


//                             {showTable && (
//                                 <>
//                                     <Accordion
//                                         id="totalProfitLoss"
//                                         title="Total Profit and Loss Details"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-4" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     Total Profit and Loss:
//                                                     <span style={{ color: getAllTradeData && getAllTradeData.Overall[0].PnL < 0 ? 'red' : 'green' }}>
//                                                         {getAllTradeData && getAllTradeData.Overall[0].PnL}
//                                                     </span>
//                                                 </p>
//                                                 <GridExample columns={columns3(selectStrategyType)} data={getAllTradeData.data} onRowSelect={handleRowSelect} checkBox={false} />
//                                             </>
//                                         }
//                                     />

//                                     {/* import DrawdownChartComponent from '../DrawdownChartComponent/DrawdownChartComponent'; // Import the new component */}

//                                     <Accordion
//                                         id="drawdownGraph"
//                                         title="Drawdown Graph"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     Drawdown Graph
//                                                 </p>
//                                                 <div style={{ width: '100%', height: '500px' }}>
//                                                     <DrawdownChartComponent data={getDropDownData.data} /> {/* Pass the correct data here */}
//                                                 </div>
//                                             </>
//                                         }
//                                     />

//                                     {/* <Accordion
//                                         id="drawdownGraph1"
//                                         title="Drawdown Graph1"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     Drawdown Graph1
//                                                 </p>
//                                                 <div style={{ width: '100%', height: '500px' }}>
//                                                     <AgChartsReact options={chartOptions2} />
//                                                 </div>
//                                             </>
//                                         }
//                                     /> */}

//                                     <Accordion
//                                         id="drawdownTable"
//                                         title="Drawdown Table"
//                                         content={
//                                             <GridExample columns={columns6()} data={getDropDownData.data} onRowSelect={handleRowSelect} checkBox={false} />
//                                         }
//                                     />

//                                     {/* <Accordion
//                                         id="pnlGraph1"
//                                         title="Profit and Loss Graph 1"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     Profit and Loss Graph 1
//                                                 </p>
//                                                 <div style={{ width: '100%', height: '500px' }}>
//                                                     <AgChartsReact options={chartOptions} />
//                                                 </div>
//                                             </>
//                                         }
//                                     /> */}

//                                     <Accordion
//                                         id="pnlGraph"
//                                         title="Profit and Loss Graph"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     Profit and Loss Graph
//                                                 </p>
//                                                 <div style={{ width: '100%', height: '500px' }}>
//                                                     <ProfitAndLossGraph data={getPnLData.data} />
//                                                 </div>
//                                             </>
//                                         }
//                                     />
//                                     <Accordion
//                                         id="topTrades"
//                                         title="5 Most Profit and Loss Trades"
//                                         content={
//                                             <div className="d-flex">
//                                                 <div id="chart" style={{ width: '50%', height: '300px' }}>
//                                                     <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                         5 most Profit Trade
//                                                     </p>
//                                                     <ApexCharts options={options} series={options.series} type="pie" width={options.chart.width} />
//                                                 </div>
//                                                 <div id="chart" style={{ width: '50%', height: '300px' }}>
//                                                     <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                         5 most Loss Trade
//                                                     </p>
//                                                     <ApexCharts options={options1} series={options1.series} type="pie" width={options1.chart.width} />
//                                                 </div>
//                                             </div>
//                                         }
//                                     />

//                                     <Accordion
//                                         id="consistentTrades"
//                                         title="Consistent Loss & Profit-Making Trades"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     Consistent Loss & Profit-Making Trades:
//                                                 </p>
//                                                 <div className="row">
//                                                     <div className="col-lg-6">
//                                                         <p>Consistent Profit: <span>{getAllTradeData.data1}</span></p>
//                                                         <p>Count Consistent Profit: <span>{getAllTradeData.data2}</span></p>
//                                                     </div>
//                                                     <div className="col-lg-6">
//                                                         <p>Consistent Loss: <span>{getAllTradeData.data4}</span></p>
//                                                         <p>Count Consistent Loss: <span>{getAllTradeData.data3}</span></p>
//                                                     </div>
//                                                 </div>
//                                             </>
//                                         }
//                                     />

//                                     <Accordion
//                                         id="equityCurveGraph"
//                                         title="EquityCurve Graph"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     EquityCurve
//                                                 </p>
//                                                 <div style={{ width: '100%', height: '500px' }}>
//                                                     <ChartComponent data={getEquityCurveDetails.data} />
//                                                 </div>
//                                             </>
//                                         }
//                                     />

//                                     {/* <Accordion
//                                         id="equityCurveGraph"
//                                         title="EquityCurve Graph"
//                                         content={
//                                             <>
//                                                 <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
//                                                     EquityCurve
//                                                 </p>
//                                                 <div style={{ width: '100%', height: '500px' }}>
//                                                     <AgChartsReact options={chartOptions1} />
//                                                 </div>
//                                             </>
//                                         }
//                                     /> */}

//                                     <Accordion
//                                         id="equityCurveTable"
//                                         title="Equity Curve Table"
//                                         content={
//                                             <GridExample columns={columns5(selectStrategyType)} data={getEquityCurveDetails.data} onRowSelect={handleRowSelect} checkBox={false} />
//                                         }
//                                     />


//                                 </>
//                             )}



//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tradehistory;

import React, { useState, useEffect, useRef } from "react";
import {
    get_User_Data,
    get_Trade_History,
    get_PnL_Data,
    get_EQuityCurveData,
    get_DrapDownData,
    get_FiveMostProfitTrade,
    get_FiveMostLossTrade,
    getStrategyType,
    GetClientService,
} from "../../CommonAPI/Admin";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import {
    get_Trade_Data,
    ChartingPlatformsegment,
    getChargingPlatformDataApi,
} from "../../CommonAPI/User";
import DatePicker from "react-datepicker";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
    columns7,
    columns6,
    columns5,
    columns4,
    columns3,
    columns2,
    columns1,
    columns,
} from "./TradeHistoryColumn";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { useLocation } from "react-router-dom";
import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
import ChartComponent from "../../admin/AdvanceChart/ChartComponent";

const Tradehistory = () => {
    const StrategyType = sessionStorage.getItem("StrategyType");
    const location = useLocation();
    const sectionRefs = useRef({});
    const [selectStrategyType, setStrategyType] = useState(StrategyType || "Scalping");
    const [strategyNames, setStrategyNames] = useState([]);
    const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [checkedRows, setCheckedRows] = useState([]);
    const [ToDate, setToDate] = useState("");
    const [FromDate, setFromDate] = useState("");
    const [showReportSections, setShowReportSections] = useState(false);
    const [getCharting, setGetCharting] = useState([]);
    const [selectSegmentType, setSegmentType] = useState("");
    const [getChartingSegments, setChartingSegments] = useState([]);
    const [getGroupData, setGroupData] = useState({ loading: true, data: [] });
    const Username = sessionStorage.getItem("Username");
    const [selectGroup, setSelectGroup] = useState(Username || "");

    // Track if data for a section has been loaded.
    const [loadedSections, setLoadedSections] = useState({
        overview: false,
        pnlAnalysis: false,
        equity: false,
        drawdown: false,
        trades: false,
        profitLoss: false,
        consistent: false,
    });

    // Data states
    const [getAllTradeData, setAllTradeData] = useState({
        data: [],
        Overall: [],
    });
    const [getPnLData, setPnlData] = useState({ data: [] });
    const [getEquityCurveDetails, setEquityCurveDetails] = useState({ data: [] });
    const [getDropDownData, setDropDownData] = useState({ data: [] });
    const [getFiveLossTrade, setFiveLossTrade] = useState({
        data: [],
        data1: [],
    });
    const [getFiveProfitTrade, setFiveProfitTrade] = useState({
        data: [],
        data1: [],
    });

    // Date configuration
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    const Defult_To_Date = `${tomorrow.getFullYear()}.${String(
        tomorrow.getMonth() + 1
    ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

    useEffect(() => {
        if (getGroupData?.data?.length > 0) {
            setSelectGroup(Username || getGroupData.data[0].Username);
        }
        setStrategyType(StrategyType || "Scalping");
    }, [getGroupData, Username, StrategyType]);

    const fetchStrategyTypes = async () => {
        try {
            const res = await getStrategyType();
            setStrategyNames(res?.Data || []);
        } catch (error) {
            console.error("Error fetching strategy types:", error);
        }
    };

    useEffect(() => {
        fetchStrategyTypes();
    }, []);

    const GetAllGroupDetails = async () => {
        try {
            const response = await GetClientService();
            if (response?.Status) {
                setGroupData({
                    loading: false,
                    data: response.Data || [],
                });
            } else {
                setGroupData({
                    loading: false,
                    data: [],
                });
            }
        } catch (error) {
            console.error("Error fetching group data:", error);
            setGroupData({
                loading: false,
                data: [],
            });
        }
    };

    useEffect(() => {
        GetAllGroupDetails();
    }, []);

    const fetchTradeHistory = async () => {
        try {
            const response = await get_User_Data({
                Data: selectStrategyType && selectStrategyType =="Scalping" ? "NewScalping" : selectStrategyType ,
                Username: selectGroup,
            });
            setTradeHistory(
                response.Status
                    ? {
                        data: response?.Data || [],
                        data1: response?.NewScalping || [],
                    }
                    : { data: [], data1: [] }
            );
        } catch (err) {
            console.error("Error fetching trade history:", err);
        }
    };

    // Now fetch trade history whenever strategy type or selected group (name) changes.
    useEffect(() => {
        fetchStrategyTypes();
        fetchTradeHistory();
    }, [selectStrategyType, selectGroup]);

    const convertDateFormat = (date) => {
        if (!date) return "";
        const dateObj = new Date(date);
        return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
            2,
            "0"
        )}.${String(dateObj.getDate()).padStart(2, "0")}`;
    };

    // Modified handleRowSelect: on selecting a row, close all open dropdowns and hide report sections.
    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
        setOpenSections({}); // Close any open report sections
        setShowReportSections(false); // Hide report sections until "Generate History" is clicked
    };

    const handleSubmit = async () => {
        if (!selectedRowData) {
            Swal.fire({
                icon: "warning",
                title: "Please select a row first!",
                confirmButtonColor: "#1ccc8a",
            });
            return;
        }

        // Reset loaded sections so new data is fetched
        setLoadedSections({
            overview: false,
            pnlAnalysis: false,
            equity: false,
            drawdown: false,
            trades: false,
            profitLoss: false,
            consistent: false,
        });

        try {
            const basicData = {
                MainStrategy:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.ScalpType === "Multi_Conditional"
                            ? "NewScalping"
                            : selectStrategyType
                        : selectStrategyType,
                Strategy:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.ScalpType !== "Multi_Conditional"
                            ? selectedRowData.Targetselection
                            : selectedRowData.Targetselection
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.STG
                            : selectStrategyType === "Pattern"
                                ? selectedRowData.TradePattern
                                : "Cash",
                Symbol:
                    selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
                        ? selectedRowData.Symbol
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.IName
                            : selectStrategyType === "ChartingPlatform"
                                ? selectedRowData.TSymbol
                                : "",
                ETPattern:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.TType
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.Targettype
                            : selectStrategyType === "Pattern"
                                ? selectedRowData.Pattern
                                : "",
                Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
                    ? selectedRowData.GroupN
                    : "",
                Username,
                From_date: convertDateFormat(FromDate || formattedDate),
                To_date: convertDateFormat(ToDate || Defult_To_Date),
                Timeframe:
                    selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
                TradePattern: "",
                PatternName: "",
            };

            const tradeRes = await get_Trade_History(basicData);
            setAllTradeData({
                data: tradeRes.data || [],
                Overall: tradeRes.Overall || [],
            });
            setShowReportSections(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to load initial data",
                text: error.message,
                confirmButtonColor: "#1ccc8a",
            });
        }
    };

    // loadSectionData loads data for a report section if not already loaded.
    const loadSectionData = async (section) => {
        if (loadedSections[section]) return;
        try {
            // For "overview", data is assumed to be loaded via handleSubmit.
            if (section === "overview") {
                setLoadedSections((prev) => ({ ...prev, [section]: true }));
                return;
            }
            const params = {
                MainStrategy:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.ScalpType === "Multi_Conditional"
                            ? "NewScalping"
                            : selectStrategyType
                        : selectStrategyType,
                Strategy:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.ScalpType !== "Multi_Conditional"
                            ? selectedRowData.Targetselection
                            : selectedRowData.Targetselection
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.STG
                            : selectStrategyType === "Pattern"
                                ? selectedRowData.TradePattern
                                : "Cash",
                Symbol:
                    selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
                        ? selectedRowData.Symbol
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.IName
                            : selectStrategyType === "ChartingPlatform"
                                ? selectedRowData.TSymbol
                                : "",
                ETPattern:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.TType
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.Targettype
                            : selectStrategyType === "Pattern"
                                ? selectedRowData.Pattern
                                : "",
                Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
                    ? selectedRowData.GroupN
                    : "",
                Username,
                From_date: convertDateFormat(FromDate || formattedDate),
                To_date: convertDateFormat(ToDate || Defult_To_Date),
                Timeframe:
                    selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
                TradePattern: "",
                PatternName: "",
            };

            if (section === "pnlAnalysis") {
                const pnlRes = await get_PnL_Data(params);
                setPnlData({ data: pnlRes.Barchart || [] });
            } else if (section === "equity") {
                const equityRes = await get_EQuityCurveData(params);
                setEquityCurveDetails({ data: equityRes.Equitycurve || [] });
            } else if (section === "drawdown") {
                const drawdownRes = await get_DrapDownData(params);
                setDropDownData({ data: drawdownRes.Drawdown || [] });
            } else if (section === "trades") {
                const [lossRes, profitRes] = await Promise.all([
                    get_FiveMostLossTrade(params),
                    get_FiveMostProfitTrade(params),
                ]);
                setFiveLossTrade({ data: lossRes.fivelosstrade || [] });
                setFiveProfitTrade({ data: profitRes.fiveprofittrade || [] });
            }
            setLoadedSections((prev) => ({ ...prev, [section]: true }));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Failed to load ${section} data`,
                text: error.message,
                confirmButtonColor: "#1ccc8a",
            });
        }
    };

    // Track open/closed state for each report section.
    const [openSections, setOpenSections] = useState({});

    // ReportSection component for each section.
    const ReportSection = ({ title, section, children }) => {
        const isOpen = openSections[section] || false;

        const toggleSection = async () => {
            if (!isOpen) {
                setOpenSections((prev) => ({ ...prev, [section]: true }));
                await loadSectionData(section);
            } else {
                setOpenSections((prev) => ({ ...prev, [section]: false }));
            }
        };

        const renderButtonContent = () => {
            if (!isOpen) {
                return "Show Data";
            } else {
                return loadedSections[section] ? (
                    "Hide Data"
                ) : (
                    <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                    />
                );
            }
        };

        return (
            <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">{title}</h5>
                    <button className="btn btn-primary btn-sm" onClick={toggleSection}>
                        {renderButtonContent()}
                    </button>
                </div>
                {isOpen && (
                    <div className="card-body">
                        {loadedSections[section] ? (
                            children
                        ) : (
                            <div className="spinner-border text-primary" />
                        )}
                    </div>
                )}
            </div>
        );
    };

    const getColumnsForStrategy = () => {
        switch (selectStrategyType) {
            case "Scalping":
                return columns();
            case "Option Strategy":
                return columns1();
            case "Pattern":
                return columns2();
            case "ChartingPlatform":
                return columns7();
            default:
                return columns();
        }
    };

    return (
        <div className="container-fluid" style={{ marginTop: "2rem" }}>
            <div className="row">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">📊 Trade History Analysis</h4>
                        </div>
                    </div>

                    <div className="iq-card-body">
                        <div className="card-body">
                            <div className="row g-3 mb-4">
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div className="form-group">
                                        <label>Select Username</label>
                                        <select
                                            className="form-select mt-2"
                                            required=""
                                            onChange={(e) => {
                                                setSelectGroup(e.target.value);
                                                sessionStorage.setItem("Username", e.target.value);
                                            }}
                                            value={selectGroup}
                                        >
                                            <option value="">Select Username</option>
                                            {getGroupData.data &&
                                                getGroupData.data.map((item) => (
                                                    <option key={item.Username} value={item.Username}>
                                                        {item.Username}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div className="form-group">
                                        <label className="form-label">Strategy Type</label>
                                        <select
                                            className="form-select"
                                            value={selectStrategyType}
                                            onChange={(e) => {
                                                setStrategyType(e.target.value);
                                                sessionStorage.setItem("StrategyType", e.target.value);
                                            }}
                                        >
                                            {strategyNames.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div className="form-group">
                                        <label className="form-label">From Date</label>
                                        <DatePicker
                                            className="form-control"
                                            selected={FromDate || formattedDate}
                                            onChange={setFromDate}
                                            dateFormat="yyyy.MM.dd"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 col-lg-3">
                                    <div className="form-group">
                                        <label className="form-label">To Date</label>
                                        <DatePicker
                                            className="form-control"
                                            selected={ToDate || Defult_To_Date}
                                            onChange={setToDate}
                                            dateFormat="yyyy.MM.dd"
                                        />
                                    </div>
                                </div>
                            </div>
                            {selectStrategyType === "Scalping" ? (
                                <div className="mb-4">
                                    <h5>Multi Conditional Strategies</h5>
                                    {tradeHistory.data1?.length > 0 ? (
                                        <GridExample
                                            columns={getColumnsForStrategy()}
                                            data={tradeHistory.data1}
                                            onRowSelect={handleRowSelect}
                                            checkBox={true}
                                        />
                                    ) : (
                                        <NoDataFound />
                                    )}
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <h5>{selectStrategyType} Strategies</h5>
                                    {tradeHistory.data?.length > 0 ? (
                                        <GridExample
                                            columns={getColumnsForStrategy()}
                                            data={tradeHistory.data}
                                            onRowSelect={handleRowSelect}
                                            checkBox={true}
                                        />
                                    ) : (
                                        <NoDataFound />
                                    )}
                                </div>
                            )}
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={handleSubmit}
                                    disabled={!selectedRowData}
                                >
                                    Generate History
                                </button>
                            </div>
                            {showReportSections && (
                                <div className="mt-5">
                                    <ReportSection title="Total Profit/Loss Overview" section="overview">
                                        <div
                                            className="pnl-overview"
                                            style={{
                                                background:
                                                    "linear-gradient(to right, #1e3c72, #2a5298)",
                                                color: "#fff",
                                                padding: "20px",
                                                borderRadius: "8px",
                                                textAlign: "center",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    margin: 0,
                                                    fontSize: "1.75rem",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Total PnL: ₹
                                                {getAllTradeData.Overall[0]?.PnL?.toFixed(2) || "0.00"}
                                                <span
                                                    className={`badge ms-2 ${getAllTradeData.Overall[0]?.PnL >= 0
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                        }`}
                                                    style={{
                                                        fontSize: "1rem",
                                                        padding: "0.5rem 1rem",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    {getAllTradeData.Overall[0]?.PnL >= 0 ? "Profit" : "Loss"}
                                                </span>
                                            </h4>
                                        </div>
                                        <GridExample
                                            columns={columns3(selectStrategyType)}
                                            data={getAllTradeData.data}
                                            checkBox={false}
                                        />
                                    </ReportSection>

                                    <ReportSection title="Profit/Loss Analysis" section="pnlAnalysis">
                                        <ProfitAndLossGraph data={getPnLData.data} />
                                    </ReportSection>
                                    <ReportSection title="Equity Curve Analysis" section="equity">
                                        <div style={{ height: "350px", overflow: "hidden" }}>
                                            <ChartComponent data={getEquityCurveDetails.data} />
                                        </div>
                                        <GridExample
                                            columns={columns5(selectStrategyType)}
                                            data={getEquityCurveDetails.data}
                                            checkBox={false}
                                        />
                                    </ReportSection>
                                    <ReportSection title="Drawdown Analysis" section="drawdown">
                                        <div style={{ height: "350px", overflow: "hidden" }}>
                                            <DrawdownChartComponent data={getDropDownData.data} />
                                        </div>
                                        <GridExample
                                            columns={columns6()}
                                            data={getDropDownData.data}
                                            checkBox={false}
                                        />
                                    </ReportSection>
                                    <ReportSection title="Top Trades Analysis" section="trades">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card h-100">
                                                    <div className="card-header bg-success text-white">
                                                        Top Profitable Trades
                                                    </div>
                                                    <div className="card-body">
                                                        <ApexCharts
                                                            options={getChartOptions(
                                                                getFiveProfitTrade.data,
                                                                "Profit"
                                                            )}
                                                            series={getFiveProfitTrade.data.map((t) => t.PnL)}
                                                            type="pie"
                                                            height={350}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card h-100">
                                                    <div className="card-header bg-danger text-white">
                                                        Top Loss-making Trades
                                                    </div>
                                                    <div className="card-body">
                                                        <ApexCharts
                                                            options={getChartOptions(
                                                                getFiveLossTrade.data,
                                                                "Loss"
                                                            )}
                                                            series={getFiveLossTrade.data.map((t) =>
                                                                Math.abs(t.PnL)
                                                            )}
                                                            type="pie"
                                                            height={350}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ReportSection>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getChartOptions = (data, type) => ({
    chart: { type: "pie" },
    labels: data.map((t) => t.ETime.split(" ")[1].substring(0, 5)),
    colors:
        type === "Profit"
            ? ["#28a745", "#218838", "#1e7e34"]
            : ["#dc3545", "#c82333", "#bd2130"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
    tooltip: {
        y: {
            formatter: (value) => `₹${value.toFixed(2)}`,
        },
    },
});

export default Tradehistory;
