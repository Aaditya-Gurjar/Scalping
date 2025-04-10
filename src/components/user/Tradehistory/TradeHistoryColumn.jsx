export const columns = () => [
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
    label: "Transaction Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Targetselection",
    label: "Target Type",
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
    name: "TStype",
    label: "Measurement Type",
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
    label: "Re-entry",
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
    name: "Exchange",
    label: "Exchange",
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
    name: "FinalTarget",
    label: "Final Target",
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
    name: "StepUp",
    label: "StepUp",
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
    name: "MatchPosition",
    label: "Match Position",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value) => (value ? "true" : "false"),
    },
  },
  {
    name: "OrderType",
    label: "Order Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PositionType",
    label: "Position Type",
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
    name: "TaskStatus",
    label: "Task Status",
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

  // {
  //   name: "Trading",
  //   label: "Trading",
  //   options: {
  //     filter: true,
  //     sort: true,
  //     customBodyRender: (value) => (value ? "true" : "false"),
  //   },
  // },
];

export const columns1 = () => [
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

export const columns2 = () => [
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

export const columns3 = (selectStrategyType) => [
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
    name: "ETime",
    label: "Entry Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EPrice",
    label: "Entry Price",
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
    name: "ExitPrice",
    label: "Exit Price",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeType",
    label: "Trade Type",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name:
      selectStrategyType == "Option Strategy"
        ? "LotSize"
        : selectStrategyType == "Scalping"
        ? "Quantity"
        : "Quantity",
    label:
      selectStrategyType == "Option Strategy"
        ? "Lot"
        : selectStrategyType == "Scalping"
        ? "Quantity"
        : "Quantity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Trade",
    label: "Trade",
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
    name: "SL",
    label: selectStrategyType == "Scalping" ? "Re-entry" : "Stoploss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PnL",
    label: "PnL",

    options: {
      filter: true,
      sort: true,
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
    },
  },
];

export const columns4 = () => [
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
    name: "ETime",
    label: "Entry Time",

    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "PnL",

    label: "PnL",

    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
];

export const columns5 = (selectStrategyType) => [
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
    name: selectStrategyType == "Pattern" ? "ETime" : "ExitTime",
    label: "Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: selectStrategyType == "Scalping" ? "EquityCurve" : "PnL",
    label: "Equity Curve",
    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
];

export const columns6 = () => [
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
    name: "ETime",
    label: "Entry Time",

    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Drawdown",

    label: "Drawdown",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const columns7 = () => [
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
    name: "Max Open Trade",
    label: "EMax Open Trade",

    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Profit",
    label: "Max Profit (in price)",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Drawdown",
    label: "Max Drawdown",
    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
  {
    name: "profit at Max Draw Down",
    label: "profit at Max Draw Down",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Current Price",
    label: "Current Price",
    options: {
      filter: true,
      sort: true,
    },
  },
];

export const columns8 = () => [
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
    name: "Current Runing loss",
    label: "Current Runing loss",

    options: {
      // customBodyRender: (value, tableMeta, updateValue) => {
      //     return parseFloat(value).toFixed(4);
      // },
      filter: true,
      sort: true,
    },
  },
  {
    name: "Current open Trade",

    label: "Current open Trade",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Price of Trade Execution",
    label: "Max Price of Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Min Price of Trade Execution",
    label: "Min Price of Trade Execution",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Max Involved fund",
    label: "Max Involved fund",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Last trade open price",
    label: "Last trade open price",
    options: {
      filter: true,
      sort: true,
    },
  },
];

// export const getColumns10 = () => [
//   {
//     name: "S.No",
//     label: "S.No",
//     options: {
//       filter: true,
//       sort: true,
//       customBodyRender: (value, tableMeta, updateValue) => {
//         const rowIndex = tableMeta.rowIndex;
//         return rowIndex + 1;
//       },
//     },
//   },

//   {
//     name: "Token",
//     label: "Token",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "TSymbol",
//     label: "TSymbol",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Lotsize",
//     label: "Lotsize",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Exchange",
//     label: "Exchange",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Planname",
//     label: "Plan Name",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "TType",
//     label: "Trade Type",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Target",
//     label: "Target",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Sl",
//     label: "Re-entry",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Exittime",
//     label: "Exittime",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Ordertype",
//     label: "Ordertype",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "AccType",
//     label: "Account Type",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Price",
//     label: "Price",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "Optiontype",
//     label: "Optiontype",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
// ];

export const getColumns10 = () => [
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
    name: "DayExittime",
    label: "Day Exit Time",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "EPrice",
    label: "Entry Price",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "ETime",
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
    name: "ExitPrice",
    label: "Exit Price",
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
    name: "ManuallyExit",
    label: "Manually Exit",
    options: {
      filter: true,
      sort: true,
      // Display "Yes" or "No" instead of true/false
      customBodyRender: (value) => (value ? "Yes" : "No"),
    },
  },
  {
    name: "PnL",
    label: "PnL",
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
    name: "SL",
    label: "Stop Loss",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Segment",
    label: "Segment",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Stretegy",
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
    name: "Trade",
    label: "Trade",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "TradeType",
    label: "Trade Type",
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
