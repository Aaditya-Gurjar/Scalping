import React, { useEffect, useState } from 'react';
import { CopyPlus } from 'lucide-react';
import Checkbox from '@mui/material/Checkbox';
import { SquarePen, EllipsisVertical } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from "react-dom";



// DropdownComponent as a separate component
const DropdownComponent = ({ tableMeta, handleDelete, type, handleMatchPosition }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null); // Ref for the button trigger


    const handleDropdownToggle = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
            return;
        }

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const dropdownHeight = 200; // Approximate height of the dropdown

            let top = rect.bottom + window.scrollY;
            let left = rect.left + window.scrollX;

            // If dropdown will overflow below, position it above
            if (top + dropdownHeight > window.innerHeight) {
                top = rect.top + window.scrollY - dropdownHeight;
            }

            setDropdownPosition({ top, left });
        }

        setIsDropdownOpen(true);
    };


    const handleOutsideClick = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isDropdownOpen]);

    return (
        <>
            {/* Dropdown Trigger */}
            <button
                ref={buttonRef}
                onClick={handleDropdownToggle}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                }}
            >
                <EllipsisVertical style={{ color: "white" }} />
            </button>

            {/* Dropdown Menu using Portal to prevent clipping */}
            {isDropdownOpen &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={{
                            position: "absolute",
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            background: "#333",
                            color: "#fff",
                            border: "1px solid #555",
                            borderRadius: "4px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                            zIndex: 1000,
                            maxHeight: "200px",
                            overflowY: "auto",
                            minWidth: "150px",
                        }}
                    >
                        <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
                            <li
                                onClick={handleDelete}
                                style={{ padding: "8px 16px", cursor: "pointer", backgroundColor: "#333", color: "#fff" }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                            >
                                Square Off
                            </li>
                            {type == "MultiCondition" &&
                                <li
                                    onClick={handleMatchPosition}
                                    style={{ padding: "8px 16px", cursor: "pointer", color: "#fff" }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                                >
                                    Match Position
                                </li>}
                            <li
                                onClick={() => navigate("/user/tradehistory", { state: { type, RowIndex: tableMeta?.rowIndex, goto: "dashboard" } })}
                                style={{ padding: "8px 16px", cursor: "pointer", color: "#fff" }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                            >
                                Trade History
                            </li>
                            <li
                                onClick={() => navigate("/user/tradereport", { state: { type, RowIndex: tableMeta?.rowIndex, goto: "dashboard" } })}
                                style={{ padding: "8px 16px", cursor: "pointer", color: "#fff" }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                            >
                                Trade Report
                            </li>
                            <li
                                onClick={() => navigate("/user/traderesponse", { state: { type, RowIndex: tableMeta?.rowIndex, goto: "dashboard" } })}
                                style={{ padding: "8px 16px", cursor: "pointer", color: "#fff" }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                            >
                                Trade Response
                            </li>
                            <li
                                onClick={() => navigate("/user/profitandloss", { state: { type, RowIndex: tableMeta?.rowIndex, goto: "dashboard" } })}
                                style={{ padding: "8px 16px", cursor: "pointer", color: "#fff" }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                            >
                                Net P&L
                            </li>
                        </ul>
                    </div>,
                    document.body // Portal target
                )}
        </>
    );
};

export const getColumns = (handleAddScript1) => [
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
        name: "coptScript",
        label: "Copy Script",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <CopyPlus onClick={(e) => handleAddScript1(tableMeta, 1)} />
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
        label: "Re-entry",
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
    // {
    //     name: "LowerRange",
    //     label: "Lower Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "HigherRange",
    //     label: "Higher Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
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
        name: "GroupN",
        label: "Unique ID",
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

];

export const getColumns7 = (handleAddScript1) => [
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
        name: "coptScript",
        label: "Copy Script",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <CopyPlus onClick={(e) => handleAddScript1(tableMeta, 2)} />
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
        label: "Re-entry",
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
    // {
    //     name: "LowerRange",
    //     label: "Lower Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "HigherRange",
    //     label: "Higher Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
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
        name: "GroupN",
        label: "Unique ID",
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

];

export const getColumns1 = (handleAddScript2) => [
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
        name: "coptScript",
        label: "Copy Script",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <CopyPlus onClick={(e) => handleAddScript2(tableMeta)} />
            }
        }
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
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Targettype",
        label: "Target Type",
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
        label: "Strategy Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Target value",
        label: "Target value",
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
        name: "StrikeType",
        label: "Strike Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "DepthofStrike",
        label: "Strike Value",
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
    // {
    //     name: "LowerRange",
    //     label: "Lower Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "HigherRange",
    //     label: "Higher Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "TaskStatus",
        label: "TaskStatus",
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
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },
];

export const getColumns2 = (handleAddScript3) => [
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
        name: "coptScript",
        label: "Copy Script",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <CopyPlus onClick={(e) => handleAddScript3(tableMeta)} />
            }
        }
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
        name: "Pattern",
        label: "Pattern",
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
        name: "Instrument Name",
        label: "Instrument Name",
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
        label: "Target value",
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
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },


];

export const getColumns3 = (handleDelete, handleEdit, handleContinutyDiscontinuty) => [
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
        name: "Edit",
        label: "Edit",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                        <button className='btn' onClick={() => handleEdit(tableMeta)}>
                            <SquarePen style={{ color: "white" }} />
                        </button>
                    </>
                );
            }
        }
    },
    // {
    //     name: "Trading",
    //     label: "Trading",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             const isChecked = Boolean(value);

    //             return (
    //                 <Checkbox
    //                     checked={isChecked}
    //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
    //                 />

    //             );
    //         }
    //     }
    // },
    // {
    //     name: "Trading",
    //     label: "Trading",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             // console.log("page ma kya value aa rhe hai ", value);

    //             const label = value ? "Continue" : "Discontinue";
    //             const labelStyle = value ? { color: 'green' } : { color: 'red' };

    //             return (
    //                 <span
    //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
    //                     style={labelStyle}
    //                 >
    //                     {label}
    //                 </span>
    //             );
    //         }
    //     }
    // },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const label = value ? "Continue" : "Discontinue";
                const labelStyle = value ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' };

                return (
                    <button
                        onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
                        style={{ ...labelStyle, border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        {label}
                    </button>
                );
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
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div>
                        <DropdownComponent tableMeta={tableMeta} handleDelete={() => handleDelete(tableMeta, 1)} type="Scalping" />
                    </div>
                );
            },
        },
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
        name: "Booking Point",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        label: "Re-entry",
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
    // {
    //     name: "LowerRange",
    //     label: "Lower Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "HigherRange",
    //     label: "Higher Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
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
        name: "GroupN",
        label: "Unique ID",
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
];

export const getColumns4 = (handleDelete, handleEdit, handleContinutyDiscontinuty) => [
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
        name: "Edit",
        label: "Edit",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <><button className='btn' onClick={() => handleEdit(tableMeta)}>
                    <SquarePen style={{ color: "white" }} />
                </button>

                </>
            }
        }
    },
    // {
    //     name: "Trading",
    //     label: "Trading",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             const isChecked = Boolean(value);
    //             return (
    //                 <Checkbox
    //                     checked={isChecked}
    //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
    //                 />

    //             );
    //         }
    //     }
    // },
    // {
    //     name: "Trading",
    //     label: "Trading",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             // console.log("page ma kya value aa rhe hai ", value);

    //             const label = value ? "Continue" : "Discontinue";
    //             const labelStyle = value ? { color: 'green' } : { color: 'red' };

    //             return (
    //                 <button
    //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
    //                     style={labelStyle}
    //                 >
    //                     {label}
    //                 </button>
    //             );
    //         }
    //     }
    // },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const label = value ? "Continue" : "Discontinue";
                const labelStyle = value ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' };

                return (
                    <button
                        onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
                        style={{ ...labelStyle, border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        {label}
                    </button>
                );
            }
        }
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
        name: "Exchange",
        label: "Exchange",
        options: {
            filter: true,
            sort: true,
        }
    },

    {
        name: "Targettype",
        label: "Target Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div>
                        <DropdownComponent tableMeta={tableMeta} handleDelete={() => handleDelete(tableMeta, 1)} type="Option Strategy" />
                    </div>
                );
            }
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
        label: "Strategy Type",
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
        name: "DepthofStrike",
        label: "Strike Value",
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
    // {
    //     name: "LowerRange",
    //     label: "Lower Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "HigherRange",
    //     label: "Higher Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "TaskStatus",
        label: "TaskStatus",
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
        name: "TradeCount",
        label: "Trade Count",
        options: {
            filter: true,
            sort: true,
        }
    },
];

export const
    getColumns5 = (handleDelete, handleEdit, handleContinutyDiscontinuty) => [

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
            name: "Edit",
            label: "Edit",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <><button className='btn ' onClick={() => handleEdit(tableMeta)}>
                        <SquarePen style={{ color: "white" }} />
                    </button>

                    </>
                }
            }
        },
        // {
        //     name: "Trading",
        //     label: "Trading",
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             const isChecked = Boolean(value);
        //             return (
        //                 <Checkbox
        //                     checked={isChecked}
        //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
        //                 />
        //             );
        //         }
        //     }
        // },
        {
            name: "Trading",
            label: "Trading",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const label = value ? "Continue" : "Discontinue";
                    const labelStyle = value ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' };
    
                    return (
                        <button
                            onClick={() => handleContinutyDiscontinuty(tableMeta, 1)}
                            style={{ ...labelStyle, border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}
                        >
                            {label}
                        </button>
                    );
                }
            }
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
            name: "Pattern",
            label: "Pattern",
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
            name: "Action",
            label: "Action",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <DropdownComponent tableMeta={tableMeta} handleDelete={() => handleDelete(tableMeta, 2)} type="MultiCondition" />
                        </div>
                    );
                },
            },
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
            name: "Instrument Name",
            label: "Instrument Name",
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
            label: "Target value",
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
            name: "TradeCount",
            label: "Trade Count",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];


export const getColumns6 = (handleDelete, handleEdit, handleContinutyDiscontinuty, handleMatchPosition) => [
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
    //     name: "Action",
    //     label: "Action",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             return <><button className='btn btn-primary' onClick={() => handleDelete(tableMeta, 2)}>
    //                 Square Off
    //             </button>
    //             </>
    //         }
    //     }
    // },
    {
        name: "Edit",
        label: "Edit",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return <><button className='btn' onClick={() => handleEdit(tableMeta, 2)}>
                    <SquarePen style={{ color: "white" }} />

                </button>
                </>
            }
        }
    },
    // {
    //     name: "Trading",
    //     label: "Trading",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             const isChecked = Boolean(value);

    //             return (
    //                 <Checkbox
    //                     checked={isChecked}
    //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
    //                 />

    //             );
    //         }
    //     }
    // },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                const label = value ? "Continue" : "Discontinue";
                const labelStyle = value ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' };

                return (
                    <button
                        onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
                        style={{ ...labelStyle, border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}
                    >
                        {label}
                    </button>
                );
            }
        }
    },
    {
        name: "ScalpType",
        label: "Target Selection",
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
        name: "Action",
        label: "Action",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {

                return (
                    <div>
                        <DropdownComponent tableMeta={tableMeta} handleDelete={() => handleDelete(tableMeta, 2)} handleMatchPosition={() => handleMatchPosition(tableMeta, 2)} type="MultiCondition" />
                    </div>
                );


            },
        },
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
        name: "Booking Point",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Re-entry Point",
        label: "Re-entry",
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
    // {
    //     name: "LowerRange",
    //     label: "Lower Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    // {
    //     name: "HigherRange",
    //     label: "Higher Range",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
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
        name: "GroupN",
        label: "Unique ID",
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
        name: "StepUp",
        label: "StepUp",
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
        label: "Booking Point2",
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

export const getColumns8 = (handleContinutyDiscontinuty) => [
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
    //     name: "Trading",
    //     label: "Trading",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             const isChecked = Boolean(value);

    //             return (
    //                 <Checkbox
    //                     checked={isChecked}
    //                     onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
    //                 />

    //             );
    //         }
    //     }
    // },
    {
        name: "Trading",
        label: "Trading",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                // console.log("page ma kya value aa rhe hai ", value);

                const label = value ? "Continue" : "Discontinue";
                const labelStyle = value ? { color: 'green' } : { color: 'red' };

                return (
                    <span
                        onClick={() => handleContinutyDiscontinuty(tableMeta, 2)}
                        style={labelStyle}
                    >
                        {label}
                    </span>
                );
            }
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
        name: "TSymbol",
        label: "TSymbol",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Lotsize",
        label: "Lotsize",
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
        name: "Planname",
        label: "Plan Name",
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
        name: "Target",
        label: "Target",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Sl",
        label: "Re-entry",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Exittime",
        label: "Exittime",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Ordertype",
        label: "Ordertype",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "AccType",
        label: "Account Type",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Price",
        label: "Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "Optiontype",
        label: "Optiontype",
        options: {
            filter: true,
            sort: true,
        }
    },

];