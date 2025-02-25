import { Trash2 } from 'lucide-react';

export const columns = (handleDelete)=>[
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
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Trash2 onClick={() => handleDelete(tableMeta)} />
            }
        }
    },
    {
        name: "ScalpType",
        label: "Scalp Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TStype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        // label: "Re-entry",
        label: "Re-entry",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity",
        label: "Lot",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExpiryDate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "LowerRange",
        label: "Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HigherRange",
        label: "Higher Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HoldExit",
        label: "Hold/Exit",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryPrice",
        label: "Lower Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryRange",
        label: "Higher Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit  Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique ID",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Active" : "Inactive")
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "closescript",
        label: "close Script",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Active" : "Inactive")
        }
    },
    {
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Instrument Symbol",
        label: "Instrument Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitRule",
        label: "Exit Rule",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
            
        }
    },
    {
        name: "Profit",
        label: "Profits",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Loss",
        label: "Loss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "FixedSM",
        label: "Fixed SM",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "MTrade",
        label: "MTrade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "TaskStatus",
        label: "Task Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Strategy",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Strike Price",
        label: "Strike Price",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "option Type",
        label: "Option Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StepUp",
        label: "Step Up",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "IncrementType",
        label: "Increment Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "Incrementvalue",
        label: "Increment Value",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Targetselection",
        label: "Target Selection",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point2",
        label: "Booking Point 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point3",
        label: "Booking Point3",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity2",
        label: "Quantity2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity3",
        label: "Quantity3",
        options: {
            filter: true,
            sort: true,
        }
    },

    


];
export const columns2 = (handleDelete)=> [
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
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Trash2 onClick={() => handleDelete(tableMeta)} />
            }
        }
    },
    {
        name: "TradePattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expiry Date",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity",
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        // label: "Re-entry",
        label: "Re-entry",
        options: {
            filter: true,
            sort: true,
        }
    },



    {
        name: "TStype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ExitDay",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryTime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Active" : "Inactive")
        }
    },
    {
        name: "Instrument Name",
        label: "Instrument Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trend",
        label: "Trend",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "Strategy",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskStatus",
        label: "Task Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Strike Price",
        label: "Strike Price",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "option Type",
        label: "Option Type",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "Lot",
        label: "Lot size",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    


];

export const columns1 =(handleDelete)=> [
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
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <Trash2 onClick={() => handleDelete(tableMeta)} />
            }
        }
    },
    {
        name: "STG",
        label: "Option Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },


    {
        name: "Targettype",
        label: "Risk Handle",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Instrument Type",
        label: "Instrument Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Expirydate",
        label: "Expiry Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Expirytype",
        label: "Expiry Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "strategytype",
        label: "Measurement Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        // label: "Re-entry",
        label: "Re-entry",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeExecution",
        label: "Trade Execution",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lot Size",
        label: "Lot",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Product Type",
        label: "Exit Day",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Entry Time",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exit Time",
        label: "Exit Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StrikeType",
        label: "Strike Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskTime",
        label: "TaskTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? "Active" : "Inactive")
        }
    },
    {
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "LowerRange",
        label: "Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "HigherRange",
        label: "Higher Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "IName",
        label: "IName",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DepthofStrike",
        label: "Depth Of Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Spread",
        label: "Spread",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DeepStrike",
        label: "Deep Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskStatus",
        label: "Task Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Strategy",
        label: "Strategy",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "CEDepthLower",
        label: "CEDepthLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CEDepthHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PEDepthLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PEDepthHigher",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "CEDeepLower",
        label: "CEDeepLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CEDeepHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PEDeepLower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PEDeepHigher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "FixedSM",
        label: "FixedSM",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "GroupN",
        label: "GroupN",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },
    {
        name: "Lot",
        label: "Lot size",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitRuleO",
        label: "ExitRuleO",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => (value ? value : "NA")
        }
    },



];