import React, { useState, useEffect } from 'react';
import { GetClientService, get_User_Data, get_Trade_History, get_PnL_Data, get_EQuityCurveData, get_DrapDownData, get_FiveMostProfitTrade, get_FiveMostLossTrade, getStrategyType } from '../../CommonAPI/Admin'
import Loader from '../../../ExtraComponent/Loader'
import GridExample from '../../../ExtraComponent/CommanDataTable'
import DatePicker from "react-datepicker";
import { columns, columns1, columns2, columns3, columns7, columns5, columns6 } from './TradeHistoryColumn'
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import ApexCharts from 'react-apexcharts';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import ChartComponent from '../AdvanceChart/ChartComponent'

import NoDataFound from '../../../ExtraComponent/NoDataFound';

import DrawdownChartComponent from '../AdvanceChart/DrawdownChartComponent';
import ProfitAndLossGraph from '../AdvanceChart/ProfitAndLossGraph';



const Tradehistory = () => {
    const Username = sessionStorage.getItem('Username')
    const StrategyType = sessionStorage.getItem('StrategyType')

    const [selectGroup, setSelectGroup] = useState(Username || '')
    
    const [selectStrategyType, setStrategyType] = useState(StrategyType || 'Scalping')
    const [tableType, setTableType] = useState("Scalping");
    const [tradeHistory, setTradeHistory] = useState({ loading: true, data: [], data1: [] })
    const [selectedRowData, setSelectedRowData] = useState('');
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false)
    const [strategyNames, setStrategyNames] = useState([]);
    const [getAllTradeData, setAllTradeData] = useState({
        loading: true,
        data: [],
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        Overall: []
    })
    const [getPnLData, setPnlData] = useState({ loading: true, data: [], data2: [] })
    const [getEquityCurveDetails, setEquityCurveDetails] = useState({ loading: true, data: [] })
    const [getDropDownData, setDropDownData] = useState({ loading: true, data: [] })
    const [getGroupData, setGroupData] = useState({ loading: true, data: [] })
    const [getFiveLossTrade, setFiveLossTrade] = useState({ loading: true, data: [], data1: [] })
    const [getFiveProfitTrade, setFiveProfitTrade] = useState({ loading: true, data: [], data1: [] })


    // set Defult Date 
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;


    // from date
    const DefultToDate = new Date();
    DefultToDate.setDate(DefultToDate.getDate() + 1);
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(DefultToDate.getDate()).padStart(2, '0');
    const Defult_To_Date = `${year1}.${month1}.${day1}`;


    // Date Formetor
    const convertDateFormat = (date) => {
        if (date == '') {
            return ''
        }
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };


    const GetAllGroupDetails = async () => {
        try {
            await GetClientService()
                .then((response) => {

                    if (response.Status) {
                        setGroupData({
                            loading: false,
                            data: response.Data
                        })
                    }
                    else {
                        setGroupData({
                            loading: false,
                            data: []
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error Eroup data fetch", err)
                })
        }
        catch {
            console.log("Error group data fetch")
        }
    }

    useEffect(() => {
        GetAllGroupDetails()
    }, [])


    const GetTradeHistory = async () => {
        const data = { Data: selectStrategyType, Username: selectGroup }

        //GET TRADEHISTORY
        await get_User_Data(data)
            .then((response) => {
                if (response.Status) {

                    setTradeHistory({
                        loading: false,
                        data: response.Data,
                        data1: response.NewScalping
                    })
                }
                else {
                    setTradeHistory({
                        loading: false,
                        data: [],
                        data1: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })
    }

    const strategyType = async () => {
        try {
            const res = await getStrategyType();
            if (res.Data) {
                setStrategyNames(res.Data);
            } else {
                console.log("Error in getting the StrategyType");
            }
        } catch (error) {
            console.log("Error in getting the StrategyType", error);
        }
    };


    useEffect(() => {
        GetTradeHistory()
    }, [selectStrategyType, selectGroup])

    useEffect(() => {
        strategyType()
    }, [selectStrategyType])


    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
    };


    const handleSubmit = async () => {
        const data = {
            MainStrategy: selectStrategyType == "Scalping" && selectedRowData.ScalpType == "Multi_Conditional" ? "NewScalping" : selectStrategyType,
            Strategy: selectStrategyType == "Scalping" && selectedRowData.ScalpType != "Multi_Conditional" ? selectedRowData && selectedRowData.ScalpType : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.STG : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TradePattern : selectStrategyType == "Scalping" && selectedRowData.ScalpType == "Multi_Conditional" ? selectedRowData && selectedRowData.Targetselection : "",
            Symbol: selectStrategyType == "Scalping" || selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Symbol : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.IName : '',
            Username: selectGroup,
            ETPattern: selectStrategyType == "Scalping" ? selectStrategyType.TType : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.Targettype : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Pattern : '',
            Timeframe: selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TimeFrame : '',
            From_date: convertDateFormat(FromDate == '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate == '' ? Defult_To_Date : ToDate),
            Group: selectStrategyType == "Scalping" || selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.GroupN : "",
            TradePattern: "",
            PatternName: ""
        }

        await get_Trade_History(data)

            .then((response) => {
                if (response.Status) {
                    setAllTradeData({
                        loading: false,
                        data: response.data,
                        data1: response.profitconsistant,
                        data2: response.profitconcount,
                        data3: response.lossconcount,
                        data4: response.lossconsistant,
                        Overall: response.Overall

                    })
                    setShowTable(true)
                }
                else {
                    Swal.fire({
                        background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "No Records found",
                        icon: "info",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setAllTradeData({
                        loading: false,
                        data: [],
                        data1: "",
                        data2: "",
                        data3: "",
                        data4: "",
                        Overall: []

                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the All TradeData", err)
            })

        //GET PNL DATA
        await get_PnL_Data(data)
            .then((response) => {
                if (response.Status) {



                    const newDataArray = response.Barchart.map(item => ({
                        PnL: item.PnL,
                        ETime: item.ETime.split(' ')[1].substring(0, 5)
                    }));


                    setPnlData({
                        loading: false,
                        data: newDataArray,
                        data2: response.Barchart,
                    })
                }
                else {
                    setPnlData({
                        loading: false,
                        data: [],
                        data2: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })


        //GET GetEquity CurveData
        await get_EQuityCurveData(data)
            .then((response) => {
                if (response.Status) {
                    setEquityCurveDetails({
                        loading: false,
                        data: response.Equitycurve,
                    })
                }
                else {
                    setEquityCurveDetails({
                        loading: false,
                        data: [],
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })

        //GET GetEquity CurveData
        await get_DrapDownData(data)
            .then((response) => {
                if (response.Status) {
                    setDropDownData({
                        loading: false,
                        data: response.Drawdown,
                    })
                }
                else {
                    setDropDownData({
                        loading: false,
                        data: [],
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })


        // GET 5 MONST PROFIT TRADE
        await get_FiveMostLossTrade(data)
            .then((response) => {
                if (response.Status) {
                    setFiveLossTrade({
                        loading: false,
                        data: response.fivelosstrade,
                        data1: response.fivelosstradeall,

                    })
                }
                else {
                    setFiveLossTrade({
                        loading: false,
                        data: [],
                        data1: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })

        await get_FiveMostProfitTrade(data)
            .then((response) => {
                if (response.Status) {
                    setFiveProfitTrade({
                        loading: false,
                        data: response.fiveprofittrade,
                        data1: response.fiveprofittradeall,
                    })
                }
                else {
                    setFiveProfitTrade({
                        loading: false,
                        data: [],
                        data1: [],

                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })
    }



    useEffect(() => {
        if (getGroupData && getGroupData.data.length > 0) {
            setSelectGroup(Username || (getGroupData.data[0].Username))
        }
        setStrategyType(StrategyType || 'Scalping')
    }, [getGroupData]);



    const chartOptions = {
        zoom: { enabled: true },
        data: getPnLData && getPnLData.data,
        series: [{ type: 'bar', xKey: 'ETime', yKey: 'PnL' }],
    }

    const chartOptions1 = {
        zoom: { enabled: true },
        data: getEquityCurveDetails && getEquityCurveDetails.data,
        series: [{ type: 'line', xKey: selectStrategyType == "Pattern" ? "ETime" : 'ExitTime', yKey: selectStrategyType == "Scalping" ? "EquityCurve" : 'PnL' }],
    }



    const chartOptions2 = {
        zoom: { enabled: true },
        data: getDropDownData && getDropDownData.data,
        series: [{ type: 'line', xKey: 'ETime', yKey: 'Drawdown' }],
    }

    const ETime = getFiveProfitTrade && getFiveProfitTrade.data.map(item => item.ETime);
    const PnL = getFiveProfitTrade && getFiveProfitTrade.data.map(item => item.PnL);

    const ETime1 = getFiveLossTrade && getFiveLossTrade.data.map(item => item.ETime);
    const PnL1 = getFiveLossTrade && getFiveLossTrade.data.map(item => item.PnL < 0 ? -1 * (item.PnL) : item.PnL);


    const options = {
        series: PnL,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ETime,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const options1 = {
        series: PnL1,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ETime1,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    useEffect(() => {
        setShowTable(false)
    }, [selectStrategyType, selectGroup, selectedRowData])

    const Accordion = ({ id, title, content }) => (
        <div className="mb-3 mt-3">
            <div className="accordion" id={id}>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={`heading-${id}`}>
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${id}`}
                            style={{ fontWeight: 'bold' }}
                        >
                            {title}
                        </button>
                    </h2>
                    <div
                        id={`collapse-${id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading-${id}`}
                        data-bs-parent={`#${id}`}
                    >
                        <div className="accordion-body">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div>
            <div className="container-fluid" style={{marginTop:"2rem"}}>
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Trade History</h4>
                            </div>
                        </div>

                        <div className="iq-card-body">
                            <div className="was-validated ">
                                <div className='row'>
                                    <div
                                        className={`form-group  ${selectStrategyType == "Scalping" ? "col-lg-2" : "col-lg-3"}`}>
                                        <label>Select Username</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => {
                                                setSelectGroup(e.target.value)
                                                sessionStorage.setItem('Username',e.target.value)
                                            }}
                                            value={selectGroup}
                                        >
                                            <option value="">Select Username</option>
                                            {getGroupData.data && getGroupData.data.map((item) => {
                                                return <>
                                                    <option value={item.Username}>{item.Username}</option>
                                                </>
                                            })}
                                        </select>
                                    </div>
                                    <div className={`form-group  ${selectStrategyType == "Scalping" ? "col-lg-2" : "col-lg-3"}`}>
                                        <label>Select Strategy Type</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => {
                                                setStrategyType(e.target.value)
                                                sessionStorage.setItem('StrategyType',e.target.value)
                                            }}
                                            value={selectStrategyType}>
                                            {strategyNames.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                );
                                            })}

                                        </select>
                                    </div>
                                    {selectStrategyType == "Scalping" && (
                                        <div className={`form-group  ${selectStrategyType == "Scalping" ? "col-lg-2" : "col-lg-3"}`}>
                                            <label>Table Type</label>
                                            <select
                                                className="form-select"
                                                required=""
                                                onChange={(e) => setTableType(e.target.value)}
                                                value={tableType}>
                                                <option value="Scalping">Scalping</option>
                                                <option value="MultiCondition">Multi Condition</option>
                                            </select>
                                        </div>
                                    )}
                                    <div className="form-group col-md-3 col-sm-6">
                                        <label>Select form Date</label>
                                        <DatePicker className="form-select" selected={FromDate == '' ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />

                                    </div>
                                    <div className="form-group col-md-3 col-sm-6">
                                        <label>Select To Date</label>
                                        <DatePicker className="form-select" selected={ToDate == "" ? Defult_To_Date : ToDate} onChange={(date) => setToDate(date)} />
                                    </div>
                                </div>
                            </div>


                            {/* {tradeHistory?.data?.length > 0 && tradeHistory?.data1?.length > 0 ? (
                                <>
                                    <div className="modal-body">
                                        {tradeHistory.data && (
                                            <GridExample
                                                columns={
                                                    selectStrategyType === "Scalping"
                                                        ? columns()
                                                        : selectStrategyType === "Option Strategy"
                                                            ? columns1()
                                                            : selectStrategyType === "Pattern"
                                                                ? columns2()
                                                                : columns()
                                                }
                                                data={tradeHistory.data}
                                                onRowSelect={handleRowSelect}
                                                checkBox={true}
                                            />
                                        )}
                                    </div>

                                    {selectStrategyType === "Scalping" &&
                                        adminPermission.includes("Charting Platform") &&
                                        tradeHistory.data1 && (
                                            <div>
                                                <div className="iq-header-title mt-4">
                                                    <h4 className="card-title">Multi Conditional</h4>
                                                </div>
                                                <div className="modal-body">
                                                    <GridExample
                                                        columns={columns7()}
                                                        data={tradeHistory.data1}
                                                        onRowSelect={handleRowSelect}
                                                        checkBox={true}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                    <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </>
                            ) : (
                                <NoDataFound />
                            )} */}

                            {tableType === "Scalping" ? (
                                tradeHistory?.data?.length > 0 ? (
                                    <>
                                        <h4 className="mt-3">{selectStrategyType}</h4>
                                        <GridExample
                                            columns={
                                                selectStrategyType === "Scalping"
                                                    ? columns()
                                                    : selectStrategyType === "Option Strategy"
                                                        ? columns1()
                                                        : selectStrategyType === "Pattern"
                                                            ? columns2()
                                                            : columns()
                                            }
                                            data={tradeHistory.data}
                                            checkBox={false}
                                        />
                                    </>
                                ) : (
                                    <NoDataFound />
                                )
                            ) : (

                                tableType === "MultiCondition" && tradeHistory?.data1?.length > 0 ? (
                                    <>
                                        <h4 className="mt-3">Multi Condition</h4>
                                        <GridExample columns={columns3()} data={tradeHistory.data1} checkBox={false} />
                                    </>
                                ) : (
                                    <NoDataFound />
                                )
                            )}


                            {showTable && (
                                <>
                                    <Accordion
                                        id="totalProfitLoss"
                                        title="Total Profit and Loss Details"
                                        content={
                                            <>
                                                <p className="bold mt-4" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Total Profit and Loss:
                                                    <span style={{ color: getAllTradeData && getAllTradeData.Overall[0].PnL < 0 ? 'red' : 'green' }}>
                                                        {getAllTradeData && getAllTradeData.Overall[0].PnL}
                                                    </span>
                                                </p>
                                                <GridExample columns={columns3(selectStrategyType)} data={getAllTradeData.data} onRowSelect={handleRowSelect} checkBox={false} />
                                            </>
                                        }
                                    />

                                    {/* import DrawdownChartComponent from '../DrawdownChartComponent/DrawdownChartComponent'; // Import the new component */}

                                    <Accordion
                                        id="drawdownGraph"
                                        title="Drawdown Graph"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Drawdown Graph
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <DrawdownChartComponent data={getDropDownData.data} /> {/* Pass the correct data here */}
                                                </div>
                                            </>
                                        }
                                    />

                                    {/* <Accordion
                                        id="drawdownGraph1"
                                        title="Drawdown Graph1"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Drawdown Graph1
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <AgChartsReact options={chartOptions2} />
                                                </div>
                                            </>
                                        }
                                    /> */}

                                    <Accordion
                                        id="drawdownTable"
                                        title="Drawdown Table"
                                        content={
                                            <GridExample columns={columns6()} data={getDropDownData.data} onRowSelect={handleRowSelect} checkBox={false} />
                                        }
                                    />

                                    {/* <Accordion
                                        id="pnlGraph1"
                                        title="Profit and Loss Graph 1"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Profit and Loss Graph 1
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <AgChartsReact options={chartOptions} />
                                                </div>
                                            </>
                                        }
                                    /> */}

                                    <Accordion
                                        id="pnlGraph"
                                        title="Profit and Loss Graph"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Profit and Loss Graph
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <ProfitAndLossGraph data={getPnLData.data} />
                                                </div>
                                            </>
                                        }
                                    />
                                    <Accordion
                                        id="topTrades"
                                        title="5 Most Profit and Loss Trades"
                                        content={
                                            <div className="d-flex">
                                                <div id="chart" style={{ width: '50%', height: '300px' }}>
                                                    <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                        5 most Profit Trade
                                                    </p>
                                                    <ApexCharts options={options} series={options.series} type="pie" width={options.chart.width} />
                                                </div>
                                                <div id="chart" style={{ width: '50%', height: '300px' }}>
                                                    <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                        5 most Loss Trade
                                                    </p>
                                                    <ApexCharts options={options1} series={options1.series} type="pie" width={options1.chart.width} />
                                                </div>
                                            </div>
                                        }
                                    />

                                    <Accordion
                                        id="consistentTrades"
                                        title="Consistent Loss & Profit-Making Trades"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Consistent Loss & Profit-Making Trades:
                                                </p>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <p>Consistent Profit: <span>{getAllTradeData.data1}</span></p>
                                                        <p>Count Consistent Profit: <span>{getAllTradeData.data2}</span></p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <p>Consistent Loss: <span>{getAllTradeData.data4}</span></p>
                                                        <p>Count Consistent Loss: <span>{getAllTradeData.data3}</span></p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    />

                                    <Accordion
                                        id="equityCurveGraph"
                                        title="EquityCurve Graph"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    EquityCurve
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <ChartComponent data={getEquityCurveDetails.data} />
                                                </div>
                                            </>
                                        }
                                    />

                                    {/* <Accordion
                                        id="equityCurveGraph"
                                        title="EquityCurve Graph"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    EquityCurve
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <AgChartsReact options={chartOptions1} />
                                                </div>
                                            </>
                                        }
                                    /> */}

                                    <Accordion
                                        id="equityCurveTable"
                                        title="Equity Curve Table"
                                        content={
                                            <GridExample columns={columns5(selectStrategyType)} data={getEquityCurveDetails.data} onRowSelect={handleRowSelect} checkBox={false} />
                                        }
                                    />


                                </>
                            )}



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tradehistory;
