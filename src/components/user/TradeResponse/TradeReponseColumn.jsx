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
      },
    },
  },
  {
    name: "ScalpType",
    label: "ScalpType",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity",
    label: "Quantity",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "ExpiryDate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const columns6 = [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },

  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Targetselection",
    label: "Target Selection",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Quantity",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Re-entry Point",
    label: "Re-Entry",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //     name: "ScalpType",
  //     label: "ScalpType",
  //     options: {
  //         filter: true,
  //         sort: true,
  //     }
  // },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "ExpiryDate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SSDate",
    label: "SSDate",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SEDate",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TargetExit",
    label: "Continue after cycle exit",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },
  {
    name: "TradeCount",
    label: "No. of Cycle",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "StepUp",
    label: "Step Up",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "IncrementType",
    label: "Increment Type",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },
  {
    name: "Incrementvalue",
    label: "Increment Value",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Booking Point2",
    label: "Target 2",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Booking Point3",
    label: "Target 3",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity2",
    label: "Lot 2",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity3",
    label: "Lot 3",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          return (
            <span>
              {value.map((day, index) => (
                <>
                  {index > 0 && index % 3 === 0 ? <br /> : ""}
                  {typeof day === "object" && day.label ? day.label : day}
                  {index % 3 !== 2 && index !== value.length - 1 ? ", " : ""}
                </>
              ))}
            </span>
          );
        }
        return value;
      },
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Profit",
    label: "Profit",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Loss",
    label: "Loss",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryPrice",
    label: "First Trade Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EntryRange",
    label: "First Trade Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Instrument Type",
    label: "Instrument Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "MainSymbol",
    label: "Main Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "OrderType",
    label: "OrderType",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "RolloverTF",
    label: "Rollover",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },
  {
    name: "RolloverDay",
    label: "Rollover Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },
  {
    name: "RolloverTime",
    label: "Rollover Time",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },

  {
    name: "RepeatationCount",
    label: "Repeatation Count",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "HoldExit",
    label: "Hold / Exit",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "MatchPosition",
    label: "Match Position",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },

  {
    name: "FinalTarget",
    label: "Final Target",
    options: {
      filter: true,
      sort: true,
    },
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
      },
    },
  },
  {
    name: "STG",
    label: "Strategy",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Targettype",
    label: "Risk Handle",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "strategytype",
    label: "Measurment Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target value",
    label: "Target value",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL value",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Lot Size",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Entry Time",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exit Time",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Product Type",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StrikeType",
    label: "Strike Type",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },
  {
    name: "DepthofStrike",
    label: "Depth of Strike",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DeepStrike",
    label: "Deep Strike",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SSDate",
    label: "SS Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SEDate",
    label: "SE Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "LowerRange",
    label: "Lower Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "HigherRange",
    label: "Higher Range",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "CEDepthLower",
    label: "CE Main Lower",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "CEDepthHigher",
    label: "CE Main Higher",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "CEDeepLower",
    label: "CE Hedge Lower",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "CEDeepHigher",
    label: "CE Hedge Higher",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PEDepthLower",
    label: "PE Main Lower",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PEDepthHigher",
    label: "PE Main Higher",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "PEDeepLower",
    label: "PE Hedge Lower",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PEDeepHigher",
    label: "PE Hedge Higher",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "WorkingDay",
    label: "Working Day",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "-";
        }
        if (Array.isArray(value)) {
          return (
            <span>
              {value.map((day, index) => (
                <>
                  {index > 0 && index % 3 === 0 ? <br /> : ""}
                  {typeof day === "object" && day.label ? day.label : day}
                  {index % 3 !== 2 && index !== value.length - 1 ? ", " : ""}
                </>
              ))}
            </span>
          );
        }
        return value;
      },
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitRuleO",
    label: "Exit Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Expirydate",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Expirytype",
    label: "Expiry type",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? value : "-"),
    },
  },

  {
    name: "Instrument Type",
    label: "Instrument Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Profit",
    label: "Profit",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Loss",
    label: "Loss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "MainSymbol",
    label: "Main Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Spread",
    label: "Spread",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "No. of Cycle",
    options: {
      filter: true,
      sort: true,
    },
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
      },
    },
  },
  {
    name: "TradePattern",
    label: "Pattern Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Pattern",
    label: "Pattern Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TimeFrame",
    label: "Time Frame",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TType",
    label: "TransactionType",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TStype",
    label: "Measurement Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Target value",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SL value",
    label: "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Quantity",
    label: "Lot",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeExecution",
    label: "Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitDay",
    label: "Exit Day",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "SSDate",
    label: "SS Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "SEDate",
    label: "SE Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Expiry Date",
    label: "Expiry Date",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Instrument Type",
    label: "Instrument Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "MainSymbol",
    label: "Main Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TaskTime",
    label: "Task Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeCount",
    label: "Trade Count",
    options: {
      filter: true,
      sort: true,
    },
  },

  // {
  //   name: "Trend",
  //   label: "Trend",
  //   options: {
  //     filter: true,
  //     sort: true,
  //   },
  // },
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
      },
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "User_Id",
    label: "User ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StrategyType",
    label: "Strategy Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Orderdetail",
    label: "Order Detail",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Response",
    label: "Response",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Reason",
    label: "Reason",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Order",
    label: "Order",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateTime",
    label: "DateTime",
    options: {
      filter: true,
      sort: true,
    },
  },
   
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitResponse",
    label: "Exit Response",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
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
      },
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "User_Id",
    label: "User ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StrategyType",
    label: "Strategy Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TargetType",
    label: "Target Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Orderdetail",
    label: "Order Detail",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Order",
    label: "Order",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateTime",
    label: "DateTime",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateTime",
    label: "Date Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Response",
    label: "Response",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
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
      },
    },
  },
  {
    name: "Symbol",
    label: "Symbol",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "User_Id",
    label: "User ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "StrategyType",
    label: "Strategy Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TargetType",
    label: "Target Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Orderdetail",
    label: "Order Detail",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Order",
    label: "Order",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateTime",
    label: "DateTime",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateTime",
    label: "Date Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ExitResponse",
    label: "Exit Response",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Response",
    label: "Response",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "GroupN",
    label: "Unique Name",
    options: {
      filter: true,
      sort: true,
    },
  },
];

// charting

export const columns8 = [
  {
    name: "S.No",
    label: "S.No",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        const rowIndex = tableMeta.rowIndex;
        return rowIndex + 1;
      },
    },
  },

  {
    name: "AccType",
    label: "Account Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "EntryTime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Exchange",
    label: "Exchange",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Exittime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Lotsize",
    label: "Lot Size",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Optiontype",
    label: "Option Type ",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Ordertype",
    label: "Order Type",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Planname",
    label: "Plan Name",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Price",
    label: "Price",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Sl",
    label: "Sl",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TSymbol",
    label: "TSymbol",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "TType",
    label: "TType",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Target",
    label: "Target",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Token",
    label: "Token",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Trading",
    label: "Trading",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "Username",
    label: "Username",
    options: {
      filter: true,
      sort: true,
    },
  },
];
