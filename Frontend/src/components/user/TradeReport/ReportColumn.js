


export const getColumns = () => [
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
        label: "ScalpType",
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
        name: "Lot",
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

]
export const getColumns1 = () => [
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
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
        }
    },
    {
        name: "SL value",
        // label: "Re-entry",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => { 
            //     return parseFloat(value).toFixed(4);
            // },
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
        name: "Product Type",
        label: "Exit Day",
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
        name: "DepthofStrike",
        label: "Strike value",
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
        label: "CE Main Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDepthHigher",
        label: "CE Main Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepLower",
        label: "CE Hedge Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "CEDeepHigher",
        label: "CE Hedge Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthLower",
        label: "PE Main Lower",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDepthHigher",
        label: "PE Main Higher",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "PEDeepLower",
        label: "PE Hedge Lower",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "PEDeepHigher",
        label: "PE Hedge Higher",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeCount",
        label: "No. of Cycle",
        options: {
            filter: true,
            sort: true,
        }
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

]
export const getColumns2 = () => [
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
        name: "TimeFrame",
        label: "Time Frame",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Pattern",
        label: "Pattern Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TType",
        label: "Transaction Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradePattern",
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
        label: "Stoploss",
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
        name: "ExitDay",
        label: "Exit Day",
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
        name: "TradeCount",
        label: "TradeCount",
        options: {
            filter: true,
            sort: true,
        }
    },

];

export const getColumns9 = () => [
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
        name: "TType",
        label: "Trade Type",
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
        name: "Quantity",
        label: "Lot",
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
        label: "Re-Entry",
        options: {
            filter: true,
            sort: true,
        }
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
        name: "ExitDay",
        label: "Exit Day",
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
        name: "TargetExit",
        label: "Continue after cycle exit",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : "false"
        }
    },
    {
        name: "TradeCount",
        label: "No. of Cycle",
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
            customBodyRender: (value) => value ? value : "-"
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
        name: "Booking Point2",
        label: "Target 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Booking Point3",
        label: "Target 3",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity2",
        label: "Lot 2",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Quantity3",
        label: "Lot 3",
        options: {
            filter: true,
            sort: true,
        }
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
        name: "EntryPrice",
        label: "First Trade Lower Range",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EntryRange",
        label: "First Trade Higher Range",
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

    {
        name: "OrderType",
        label: "OrderType",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "RolloverTF",
        label: "Rollover",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : "false"
        }
    },
    {
        name: "RolloverDay",
        label: "Rollover Day",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },
    {
        name: "RolloverTime",
        label: "Rollover Time",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? value : "-"
        }
    },

    {
        name: "RepeatationCount",
        label: "Repetition Count",
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
        name: "MatchPosition",
        label: "Match Position",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => value ? "true" : "false"
        }
    },

    {
        name: "FinalTarget",
        label: "Final Target",
        options: {
            filter: true,
            sort: true,
        }
    },


]


export const getColumns3 = (Targetselection) => {
    const columns = [{
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
        label: "Target Type",
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
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "Transaction Type",
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
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
   
    {
        name: "Trade",
        label: "Trade",
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
    ]

    if (Targetselection === "Single") {
        columns.splice(8, 0, {
            name: "SL",
            label: "Stoploss",
            options: {
                filter: true,
                sort: true,
            }
        });
    } else {
        columns.splice(8, 0, {
            name: "SL",
            label: "Re-entry",
            options: {
                filter: true,
                sort: true,
            }
        });
    }
    return columns;
}
export const getColumns6 = (Targetselection) => {
    const columns = [
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
            label: "Target Type",
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
            name: "ETime",
            label: "Entry Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "EPrice",
            label: "Entry Price",
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
            name: "ExitPrice",
            label: "Exit Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TradeType",
            label: "Transaction Type",
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
            name: "Target",
            label: "Target",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Trade",
            label: "Trade",
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
    ]
    if (Targetselection === "Single") {
        columns.splice(10, 0, {
            name: "SL",
            label: "Stoploss",
            options: {
                filter: true,
                sort: true,
            }
        });
    } else {
        columns.splice(10, 0, {
            name: "SL",
            label: "Re-entry",
            options: {
                filter: true,
                sort: true,
            }
        });
    }

    return columns;

}


// Option
// export const getColumns4 = (STG) => [
//     {
//         name: "S.No",
//         label: "S.No",
//         options: {
//             filter: true,
//             sort: true,
//             customBodyRender: (value, tableMeta, updateValue) => {

//                 const rowIndex = tableMeta.rowIndex;

//                 return rowIndex + 1;

//             }
//         },
//     },
//     {
//         name: "STG",
//         label: "Strategy",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Symbol",
//         label: "Symbol",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "ETime",
//         label: "Entry Time",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "EPrice",
//         label: "Entry Price",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "TradeType",
//         label: "Transaction Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "LotSize",
//         label: "Lot",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Option Type",
//         label: "Option Type",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Target",
//         label: "Target",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "SL",
//         label: "Stoploss",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "Targettype",
//         label: "Risk Handle",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },

//     {
//         name: "Spot Price",
//         label: "Spot Price",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },
//     {
//         name: "Hashing",
//         label: "Hashing",
//         options: {
//             filter: true,
//             sort: true,
//         }
//     },


// ]

export const getColumns4 = (STG) => {

    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return tableMeta.rowIndex + 1;
                }
            },
        },
        {
            name: "STG",
            label: "Strategy",
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
            name: "ETime",
            label: "Entry Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "EPrice",
            label: "Entry Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TradeType",
            label: "Transaction Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LotSize",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Option Type",
            label: "Option Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Target",
            label: "Target",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SL",
            label: "Stoploss",
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
            name: "Hashing",
            label: "Hashing",
            options: {
                filter: true,
                sort: true,
            }
        }
    ];

    if (STG !== "LongShifting" && STG !== "ShortShifting") {
        columns.splice(12, 0, {
            name: "Spot Price",
            label: "Spot Price",
            options: {
                filter: true,
                sort: true,
            }
        });
    }

    if (STG === "LongShifting" || STG == "ShortShifting") {
        columns.push({
            name: "EnFPrice",
            label: "Future Entry Price",
            options: {
                filter: true,
                sort: true,
            }
        });

        // columns.push({
        //     name: "ExFPrice",
        //     label: "Future Exit Price",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // });
    }

    return columns;
};



export const getColumns7 = (STG) => {
    const columns = [
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
            label: "Strategy",
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
            name: "ETime",
            label: "Entry Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "EPrice",
            label: "Entry Price",
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
            name: "ExitPrice",
            label: "Exit Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TradeType",
            label: "Transaction Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LotSize",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Option Type",
            label: "Option Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Target",
            label: "Target",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SL",
            label: "Stoploss",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Trade",
            label: "Trade",
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
            name: "Token",
            label: "Token",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Hashing",
            label: "Hashing",
            options: {
                filter: true,
                sort: true,
            }
        },
    ]
    if (STG !== "LongShifting" && STG !== "ShortShifting") {
        columns.splice(12, 0, {
            name: "Spot Price",
            label: "Spot Price",
            options: {
                filter: true,
                sort: true,
            }
        });
    }

    if (STG === "LongShifting" || STG == "ShortShifting") {
        columns.push({
            name: "EnFPrice",
            label: "Future Entry Price",
            options: {
                filter: true,
                sort: true,
            }
        });

        columns.push({
            name: "ExFPrice",
            label: "Future Exit Price",
            options: {
                filter: true,
                sort: true,
            }
        });
    }



    return columns

}
//Pattern
export const getColumns5 = () => [
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
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "SPattern",
        label: "Pattern Name",
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
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeType",
        label: "Transaction Type",
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
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
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
        name: "PatternTime",
        label: "Pattern Time",
        options: {
            filter: true,
            sort: true,
        }
    },


]

export const getColumns8 = () => [
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
        label: "Pattern Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SPattern",
        label: "Pattern Name",
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
        name: "PatternTime",
        label: "Pattern Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ETime",
        label: "Entry Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "EPrice",
        label: "Entry Price",
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
        name: "ExitPrice",
        label: "Exit Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
        label: "Transaction Type",
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
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        label: "Stoploss",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Trade",
        label: "Trade",
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

    // {
    //     name: "Token",
    //     label: "Token",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },

]


// close
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


    // {
    //     name: "AccType",
    //     label: "AccType",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },

    // {
    //     name: "Segmenttype",
    //     label: "Segmenttype",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },

    {
        name: "Token",
        label: "Token",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "EPrice",
        label: "EPrice",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "ETime",
        label: "ETime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitPrice",
        label: "ExitPrice",
        options: {
            filter: true,
            sort: true,
        }
    },
   
    {
        name: "ExitTime",
        label: "ExitTime",
        options: {
            filter: true,
            sort: true,
        }
    },
  
    {
        name: "ManuallyExit",
        label: "Manually Exit",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "TradeType",
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
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        // label: "Re-entry",
        label: "Re-entry",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "StrategyTag",
        label: "Strategy Tag",
        options: {
            filter: true,
            sort: true,
        }
    },

];


// open
export const getColumns12 = () => [
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


    // {
    //     name: "AccType",
    //     label: "AccType",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },

    // {
    //     name: "Segmenttype",
    //     label: "Segmenttype",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "Symbol",
        label: "Symbol",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "EPrice",
        label: "EPrice",
        options: {
            filter: true,
            sort: true,
        }
    },
   
    {
        name: "ETime",
        label: "ETime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitPrice",
        label: "ExitPrice",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "ExitTime",
        label: "ExitTime",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "TradeType",
        label: "Trade Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "SL",
        // label: "Re-entry",
        label: "Re-entry",
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
        name: "StrategyTag",
        label: "Strategy Tag",
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
        name: "Trade",
        label: "Trade",
        options: {
            filter: true,
            sort: true,
        }
    },
    



];





