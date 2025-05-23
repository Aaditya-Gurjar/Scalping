
// Scalping
export const columns = [
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
        name: "Quantity",
        label: "Quantity",
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
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskTime",
        label: "Task Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeCount",
        label: "Trade Count",
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
        label: "Booking Point",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        label: "Re-entry Point",
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
            customBodyRender: (value) => value ? "true" : "false"
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
        label: "Hold / Exit",
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
            customBodyRender: (value) => value ? "true" : "false"
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
        name: "Username",
        label: "Username",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryRange",
        label: "Entry Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },
    {
        name: "ExitRule",
        label: "Exit Rule",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },
    {
        name: "Profit",
        label: "Profit",
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
        label: "FixedSM",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
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
            customBodyRender: (value) => value ? value : "-"
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
        name: "Instrument Type",
        label: "Instrument Type",
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

// Option
export const columns1 = [
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
        name: "STG",
        label: "Strategy Type",
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
        label: "Measurment Type",
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
        label: "Quantity",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Product Type",
        label: "Product Type",
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
        name: "DeepStrike",
        label: "Deep Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DepthofStrike",
        label: "Depth of Strike",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SSDate",
        label: "SSDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SEDate",
        label: "SEDate",
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
        name: "CEDepthLower",
        label: "CEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CEDepth Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PEDepth Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PEDepth Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepLower",
        label: "CEDeep Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CEDeep Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepHigher",
        label: "PEDeep Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PEDeep Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },
    {
        name: "TradeCount",
        label: "Trade Count",
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
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : "false"
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
        name: "IName",
        label: "IName",
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
        name: "TaskStatus",
        label: "Task Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TaskTime",
        label: "Task Time",
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
            customBodyRender: (value) => value ? value : "-"
        }
    },
];

// Pattern
export const columns2 = [
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
        name: "TradePattern",
        label: "Trade Pattern",
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
        name: "Target value",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL value",
        label: "Re-entry",
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
        name: "Expiry Date",
        label: "Expiry Date",
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
        name: "Pattern",
        label: "Pattern",
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
        name: "SEDate",
        label: "SEDate",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SSDate",
        label: "SSDate",
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
        }
    },
    {
        name: "TradeCount",
        label: "Trade Count",
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
            customBodyRender: (value) => value ? "true" : "false"
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
            customBodyRender: (value) => value ? value : "-"
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
        name: "TaskTime",
        label: "Task Time",
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
        name: "MainSymbol",
        label: "Main Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },

];

// scalping
export const columns3 = [
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
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "User_Id",
        label: "User ID",
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
        name: "StrategyType",
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Orderdetail",
        label: "Order Detail",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Response",
        label: "Response",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Reason",
        label: "Reason",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Order",
        label: "Order",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateTime",
        label: "DateTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateTime",
        label: "Date Time",
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
        name: "ExitResponse",
        label: "Exit Response",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
        }
    },

];

// option
export const columns4 = [
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
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "User_Id",
        label: "User ID",
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
        name: "StrategyType",
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TargetType",
        label: "Target Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Orderdetail",
        label: "Order Detail",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Order",
        label: "Order",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateTime",
        label: "DateTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateTime",
        label: "Date Time",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Response",
        label: "Response",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
        }
    },

];

// pattern
export const columns5 = [
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
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "User_Id",
        label: "User ID",
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
        name: "StrategyType",
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TargetType",
        label: "Target Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Orderdetail",
        label: "Order Detail",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Order",
        label: "Order",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateTime",
        label: "DateTime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DateTime",
        label: "Date Time",
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
        name: "ExitResponse",
        label: "Exit Response",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Response",
        label: "Response",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "GroupN",
        label: "Unique Name",
        options: {
            filter: true,
            sort: true,
        }
    },

];