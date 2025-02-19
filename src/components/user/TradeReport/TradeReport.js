import React, { useState, useEffect } from 'react';
import { get_User_Data, getStrategyType } from '../../CommonAPI/Admin';
import {
    get_Trade_Report,
    getChargingPlatformDataApi,
    getUserChartingScripts,
    getChartingReport,
} from '../../CommonAPI/User';
import { Eye, Tablet } from "lucide-react";
import GridExample from '../../../ExtraComponent/CommanDataTable(original)';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import {
    getColumns3,
    getColumns2,
    getColumns1,
    getColumns,
    getColumns4,
    getColumns5,
    getColumns8,
    getColumns7,
    getColumns6,
    getColumns9,
    getColumns10,
    getColumns12
} from './ReportColumn';
import { useLocation } from 'react-router-dom';
import NoDataFound from '../../../ExtraComponent/NoDataFound';

const TradeReport = () => {
    const location = useLocation();
    const StrategyType = sessionStorage.getItem('StrategyType')

    const userName = localStorage.getItem("name");
    const [selectStrategyType, setStrategyType] = useState(StrategyType || 'Scalping');
    const [strategyNames, setStrategyNames] = useState([]);
    const [tradeReport, setTradeReport] = useState({ data: [], data1: [] });
    const [getCharting, setGetCharting] = useState([]);
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [getAllTradeData, setAllTradeData] = useState({ loading: true, data1: [], data2: [] });
    const [chartingData, setChartingData] = useState([]);
    // Default tableType is set based on Scalping; if not, it can be changed to "MultiCondition"
    const [tableType, setTableType] = useState('MultiCondition');
    const Username = localStorage.getItem('name');
    const adminPermission = localStorage.getItem('adminPermission');

    // State for default auto-select redirected from dashboard
    const [selectedRowData, setSelectedRowData] = useState("");
    const [checkedRows, setCheckedRows] = useState([]);
    const [preSelectTableType, setPreSelectTableType] = useState("");
    const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });

    // Set Default Date 
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;

    // Set Default To Date (next day)
    const DefultToDate = new Date();
    DefultToDate.setDate(DefultToDate.getDate() + 1);
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(DefultToDate.getDate()).padStart(2, '0');
    const Defult_To_Date = `${year1}.${month1}.${day1}`;

    // Date Formatter function
    const convertDateFormat = (date) => {
        if (date === '') {
            return '';
        }
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const GetTradeReport = async () => {
        const data = { Data: selectStrategyType, Username: Username };
        await get_User_Data(data)
            .then((response) => {
                if (response.Status) {
                    setTradeReport({
                        data: response?.Data,
                        data1: response?.NewScalping,
                    });
                } else {
                    setTradeReport({ data: [], data1: [] });
                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err);
            });
    };

    const strategyTypeFn = async () => {
        try {
            const res = await getStrategyType();
            if (res.Data && Array.isArray(res.Data)) {
                setStrategyNames(res.Data);
            } else {
                setStrategyNames([]);
            }
        } catch (error) {
            console.log("Error in getStrategyType", error);
        }
    };

    useEffect(() => {
        setStrategyType(StrategyType || "Scalping");
    }, []);

    useEffect(() => {
        if (selectStrategyType !== "ChartingPlatform") {
            GetTradeReport();
        }
    }, [selectStrategyType]);

    console.log("tradeHistory.data1? ", tradeReport.data1)

    useEffect(() => {
        if (location?.state?.goto && location?.state?.goto === "dashboard") {
            if (location?.state?.type === "MultiCondition") {
                setSelectedRowData(tradeReport.data1?.[location?.state?.RowIndex]);
            } else {
                setSelectedRowData(tradeReport.data?.[location?.state?.RowIndex]);
            }
            setPreSelectTableType(location?.state?.type);
        }
    }, [tradeReport, location?.state?.RowIndex]);

    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
    };

    useEffect(() => {
        if (!location?.state?.type) {
            if (selectStrategyType === "Scalping") {
                setTableType("MultiCondition");
            }
        } else if (location?.state?.type && location?.state?.type !== "MultiCondition") {
            setStrategyType(location?.state?.type);
        } else if (location?.state?.type === "MultiCondition") {
            setTableType("MultiCondition");
            setStrategyType(StrategyType || "Scalping");
        }
    }, [preSelectTableType]);

    const getChartingData = async () => {
        const res = await getChargingPlatformDataApi(userName);
        setChartingData(res.Client);
    };

    useEffect(() => {
        strategyTypeFn();
        getChartingData();
        setStrategyType(StrategyType || 'Scalping');
    }, []);

    useEffect(() => {
        if (selectStrategyType === "Scalping") {
            setTableType("MultiCondition");
        } else {
            setTableType("Scalping");
        }
    }, [selectStrategyType]);

    console.log("selectedRowData", selectedRowData);

    const handleSubmit = async (rowData) => {
        const data = {
            MainStrategy:
                selectStrategyType === "Scalping" && selectedRowData.ScalpType === "Multi_Conditional"
                    ? "NewScalping"
                    : selectStrategyType,
            Strategy:
                selectStrategyType === "Scalping" && selectedRowData.ScalpType !== "Multi_Conditional"
                    ? selectedRowData?.ScalpType
                    : selectStrategyType === "Option Strategy"
                        ? selectedRowData?.STG
                        : selectStrategyType === "Pattern"
                            ? selectedRowData?.TradePattern
                            : selectStrategyType === "Scalping" && selectedRowData.ScalpType === "Multi_Conditional"
                                ? selectedRowData?.Targetselection
                                : selectStrategyType === "ChartingPlatform"
                                    ? rowData?.Segment
                                    : "",
            Symbol:
                selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
                    ? selectedRowData?.Symbol
                    : selectStrategyType === "Option Strategy"
                        ? selectedRowData?.IName
                        : selectStrategyType === "ChartingPlatform"
                            ? ""
                            : selectedRowData?.Symbol,
            Username: Username,
            ETPattern:
                selectStrategyType === "Scalping"
                    ? selectedRowData.TType
                    : selectStrategyType === "Option Strategy"
                        ? selectedRowData?.Targettype
                        : selectStrategyType === "Pattern"
                            ? selectedRowData?.Pattern
                            : "",
            Timeframe: selectStrategyType === "Pattern" ? selectedRowData?.TimeFrame : '',
            From_date: convertDateFormat(FromDate === '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate === '' ? Defult_To_Date : ToDate),
            Group:
                selectStrategyType === "Scalping" || selectStrategyType === "Option Strategy"
                    ? selectedRowData?.GroupN
                    : "",
            TradePattern: "",
            PatternName: ""
        };
        await get_Trade_Report(data)
            .then((response) => {
                if (response.Status) {
                    console.log("response", response.CloseData);
                    setAllTradeData({
                        loading: false,
                        data1: response.CloseData ? response.CloseData : [],
                        data2: response.OpenData ? response.OpenData : []
                    });
                    setShowTable(true);
                } else {
                    Swal.fire({
                        background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "No Records found",
                        icon: "info",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setAllTradeData({ loading: false, data1: [], data2: [] });
                }
            })
            .catch((err) => {
                console.log("Error in finding the All TradeData", err);
            });
    };

    useEffect(() => {
        setShowTable(false);
    }, [selectStrategyType, FromDate, ToDate, selectedRowData]);

    const handleViewchartingReport = async (rowData) => {
        console.log("rowData", rowData);
        const req = {
            MainStrategy: "ChartingPlatform",
            Strategy: rowData?.Segment,
            Symbol: "",
            Username: Username,
            ETPattern: "",
            Timeframe: "",
            From_date: convertDateFormat(FromDate === '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate === '' ? Defult_To_Date : ToDate),
            Group: "",
            TradePattern: "",
            PatternName: ""
        };
        await getChartingReport(req)
            .then((res) => {
                if (res.Status) {
                    setShowTable(true);
                    setGetCharting(res.Client);
                } else {
                    setGetCharting([]);
                }
            })
            .catch((err) => {
                console.log("Error in getting the charting report", err);
            });
    };

    const getColumns11 = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "Segment",
            label: "Segment",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "View",
            label: "View",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                            onClick={() => {
                                const rowIndex = tableMeta.rowIndex;
                                const data = chartingData[rowIndex];
                                handleSubmit(data);
                                window.scrollTo({
                                    top: document.body.scrollHeight,
                                    behavior: "smooth",
                                });
                            }}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <Eye color="#007BFF" size={20} />
                        </button>
                    );
                },
            },
        },
        {
            name: "Username",
            label: "Username",
            options: { filter: true, sort: true }
        },
        {
            name: "Status",
            label: "Status",
            options: { filter: true, sort: true }
        },
        {
            name: "Fund",
            label: "Fund",
            options: { filter: true, sort: true }
        },
        {
            name: "Quantity",
            label: "Quantity",
            options: { filter: true, sort: true }
        },
        {
            name: "TradeCount",
            label: "TradeCount",
            options: { filter: true, sort: true }
        },
    ];

    return (
     
            <div className="container-fluid" style={{marginTop:"2rem"}}>
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">📑 Trade Report</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="was-validated ">
                                <div className="row">
                                    {/* Select Strategy Type */}
                                    <div className={`form-group ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                                        <label>Select Strategy Type</label>
                                        <select
                                            className="form-select"
                                            required=""
                                            onChange={(e) => {
                                                setStrategyType(e.target.value)
                                                sessionStorage.setItem('StrategyType', e.target.value)
                                            }}
                                            value={selectStrategyType}
                                        >
                                            <option value="">Select Strategy Type</option>
                                            {strategyNames.map((type, index) => (
                                                <option key={index} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Removed: Select Table Type */}

                                    {/* Select From Date */}
                                    <div className={`form-group ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                                        <label>Select form Date</label>
                                        <DatePicker
                                            className="form-select"
                                            selected={FromDate === '' ? formattedDate : FromDate}
                                            onChange={(date) => setFromDate(date)}
                                        />
                                    </div>

                                    {/* Select To Date */}
                                    <div className={`form-group ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                                        <label>Select To Date</label>
                                        <DatePicker
                                            className="form-select"
                                            selected={ToDate === '' ? Defult_To_Date : ToDate}
                                            onChange={(date) => setToDate(date)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="iq-header-title">
                                {tableType === "Scalping" ? (<h4 className="card-title">{selectStrategyType}</h4>) : ""}
                            </div>

                            { /* Render table only if tableType is Scalping */}
                            {tableType === "Scalping" && (
                                <div className="modal-body">
                                    {(selectStrategyType === "ChartingPlatform" ? chartingData : tradeReport?.data)?.length > 0 ? (
                                        <GridExample
                                            columns={
                                                selectStrategyType === "Scalping" ? getColumns() :
                                                    selectStrategyType === "Option Strategy" ? getColumns1() :
                                                        (selectStrategyType === "Pattern" || selectStrategyType === "Pattern Script") ? getColumns2() :
                                                            selectStrategyType === "ChartingPlatform" ? getColumns11 :
                                                                getColumns9()
                                            }
                                            data={selectStrategyType === "ChartingPlatform" ? chartingData : tradeReport?.data}
                                            onRowSelect={handleRowSelect}
                                            checkBox={selectStrategyType !== "ChartingPlatform"}
                                            isChecked={location?.state?.RowIndex}
                                        />
                                    ) : (
                                        <NoDataFound />
                                    )}
                                </div>
                            )}

                            { /* Render MultiCondition table only if tableType is MultiCondition */}
                            {tableType === "MultiCondition" && selectStrategyType === "Scalping" && (
                                <div>
                                    <div className="iq-header-title mt-4">
                                        <h4 className="card-title">Multi Conditional</h4>
                                    </div>
                                    {tradeReport?.data1 && tradeReport?.data1?.length > 0 ? (
                                        <div className="modal-body">
                                            <GridExample
                                                columns={getColumns9()}
                                                data={tradeReport?.data1}
                                                onRowSelect={handleRowSelect}
                                                checkBox={true}
                                                isChecked={location?.state?.RowIndex}
                                            />
                                        </div>
                                    ) : (
                                        <NoDataFound />
                                    )}
                                </div>
                            )}

                            {selectStrategyType === "ChartingPlatform" ? "" :
                                <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>
                            }

                            {showTable && (getAllTradeData?.data2?.length > 0 || getAllTradeData?.data1?.length > 0) ? (
                                <>
                                    {getAllTradeData?.data2?.length > 0 && (
                                        <>
                                            <h4 className='mt-4 mb-2'>Open Trade</h4>
                                            <GridExample
                                                columns={
                                                    selectStrategyType === "Scalping"
                                                        ? getColumns3()
                                                        : selectStrategyType === "Option Strategy"
                                                            ? getColumns4()
                                                            : (selectStrategyType === "Pattern" || selectStrategyType === "Pattern Script")
                                                                ? getColumns5()
                                                                : selectStrategyType === "ChartingPlatform"
                                                                    ? getColumns12()
                                                                    : getColumns3()
                                                }
                                                data={getAllTradeData.data2}
                                                onRowSelect={handleRowSelect}
                                                checkBox={false}
                                            />
                                        </>
                                    )}

                                    {getAllTradeData?.data1?.length > 0 && (
                                        <div className='mt-3'>
                                            <h4 className='mt-3 mb-2'>Close Trade</h4>
                                            <GridExample
                                                columns={
                                                    selectStrategyType === "Scalping"
                                                        ? getColumns6()
                                                        : selectStrategyType === "Option Strategy"
                                                            ? getColumns7()
                                                            : (selectStrategyType === "Pattern" || selectStrategyType === "Pattern Script")
                                                                ? getColumns8()
                                                                : selectStrategyType === "ChartingPlatform"
                                                                    ? getColumns10()
                                                                    : getColumns6()
                                                }
                                                data={getAllTradeData.data1}
                                                onRowSelect={handleRowSelect}
                                                checkBox={false}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                showTable &&
                                <NoDataFound />
                            )}


                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default TradeReport;
