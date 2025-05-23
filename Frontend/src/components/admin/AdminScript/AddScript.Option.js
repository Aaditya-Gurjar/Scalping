import { useLocation, useNavigate } from "react-router-dom"
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { AddAdminScript, GET_EXPIRY_DATE } from '../../CommonAPI/Admin'
import axios from "axios";
import * as Config from "../../../Utils/Config";
import Content from "../../../ExtraComponent/Content";
import { text } from "../../../ExtraComponent/IconTexts";





const AddClient = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [getExpiry, setExpiry] = useState({ loading: true, data: [] })
    const [exchangeOptions, setExchangeOptions] = useState([]);

    const SweentAlertFun = (text) => {
        Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Error",
            text: text,
            icon: "error",
            timer: 5000,
            timerProgressBar: true
        });

    }

    const ScrollToViewFirstError = (newErrors) => {
        if (Object.keys(newErrors).length !== 0) {
            const errorField = Object.keys(newErrors)[0];

            const errorElement = document.getElementById(errorField);
            if (errorElement) {
                const elementPosition = errorElement.getBoundingClientRect().top + window.pageYOffset;

                const offset = 100;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            MainStrategy: location.state.data.selectStrategyType,
            Username: location.state.data.selectGroup,
            Strategy: "",
            ETPattern: "",
            Timeframe: "",
            Exchange: "",
            Symbol: "",
            Instrument: "FUTIDX",
            Strike: "",
            Optiontype: "",
            Targetvalue: 1.0,
            Slvalue: 1.0,
            TStype: "",
            Quantity: 0,
            Higher_Range: 0.0,
            Lower_Range: 0.0,
            HoldExit: "",
            EntryPrice: 0.0,
            EntryRange: 0.0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            FixedSM: "",
            TType: "",
            expirydata1: "",
            Expirytype: "",
            Striketype: "",
            DepthofStrike: "",
            DeepStrike: "",
            Group: "",
            CEDepthLower: 1,
            CEDepthHigher: 1,
            PEDepthLower: 1,
            PEDepthHigher: 1,
            CEDeepLower: 1,
            CEDeepHigher: 1,
            PEDeepLower: 1,
            PEDeepHigher: 1,
            Unique_ID: "",
            ExitType: "",
            // WorkingDay: [],
        },

        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.Strategy) {
                errors.Strategy = "Please Select a Strategy Type oggg.";
            }
            if (!values.Measurment_Type) {
                errors.Measurment_Type = "Please select Option type.";
            }
            if (!values.ETPattern) {
                errors.ETPattern = "Please Select Risk Handle Type.";
            }
            if (!values.Symbol) {
                errors.Symbol = "Please Select a Symbol Type.";
            }
            if ((!values.Targetvalue || values.Targetvalue == 0) && (values.Measurment_Type != "Shifting/FourLeg" || (values.Measurment_Type == "Shifting/FourLeg" && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')))) {
                errors.Targetvalue = values.Targetvalue == 0 ? "Target Can Not be Zero" : "Please Enter a Target Value.";
            }
            if ((!values.Slvalue || values.Slvalue == 0) && (values.Measurment_Type != "Shifting/FourLeg" || (values.Measurment_Type == "Shifting/FourLeg" && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')))) {
                errors.Slvalue = values.Slvalue == 0 ? "Stoploss Can Not be Zero" : "Please Enter a Stop Loss Value.";
            }
            if (!values.TStype) {
                errors.TStype = "Please Select a Measurement Type.";
            }
            if (values.Quantity == 0 || values.Quantity === undefined || values.Quantity == "") {
                errors.Quantity = "Please enter the Lot.";
            }
            if (!values.ExitTime) {
                errors.ExitTime = "Please Select Exit Time.";
            }
            else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (!values.EntryTime) {
                errors.EntryTime = "Please Select Entry Time.";
            }
            else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }
            if (!values.ExitDay) {
                errors.ExitDay = "Please Select an Exit Day.";
            }
            if (!values.Expirytype) {
                errors.Expirytype = "Please Select an Expiry Type.";
            }
            if (!values.Lower_Range && values.Striketype === 'Premium_Range') {
                errors.Lower_Range = "Please Enter the Lower Range.";
            }
            if (!values.Higher_Range && values.Striketype === 'Premium_Range') {
                errors.Higher_Range = "Please Enter the Higher Range.";
            }
            if (!values.Striketype) {
                errors.Striketype = "Please Select a Strike Type.";
            }
            if (!values.Unique_ID && (values.Strategy == "LongFourLegStretegy" || values.Strategy == "ShortFourLegStretegy")) {
                errors.Unique_ID = "Please Select Unique Name.";
            }
            if (!values.PEDeepLower && values.PEDeepLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDeepLower = values.PEDeepLower == 0 ? "PE Hedge Lower Cannot Be Zero." : "Please Enter PE Hedge Lower.";
            }
            if (!values.PEDeepHigher && values.PEDeepLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDeepHigher = values.PEDeepHigher == 0 ? "PE Hedge Higher Cannot Be Zero." : "Please Enter PE Hedge Higher.";
            }
            if (!values.CEDepthLower && values.CEDepthLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDepthLower = values.CEDepthLower == 0 ? "CE Main Lower Cannot Be Zero." : "Please Enter CE Main Lower.";
            }
            if (!values.CEDepthHigher && values.CEDepthHigher == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDepthHigher = values.CEDepthHigher == 0 ? "CE Main Higher Cannot Be Zero." : "Please Enter CE Main Higher.";
            }
            if (!values.PEDepthLower && values.PEDepthLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDepthLower = values.PEDepthLower == 0 ? "PE Main Lower Cannot Be Zero." : "Please Enter PE Main Lower.";
            }
            if (!values.CEDeepLower && values.CEDeepLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDeepLower = values.CEDeepLower == 0 ? "CE Hedge Lower Cannot Be Zero." : "Please Enter CE Hedge Lower.";
            }
            if (!values.CEDeepHigher && values.CEDeepHigher == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDeepHigher = values.CEDeepHigher == 0 ? "CE Hedge Higher Cannot Be Zero." : "Please Enter CE Hedge Higher.";
            }
            if (!values.PEDeepHigher && values.PEDeepHigher == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDeepHigher = values.PEDeepHigher == 0 ? "PE Hedge Higher Cannot Be Zero." : "Please Enter PE Hedge Higher.";
            }
            if (!values.PEDepthHigher && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy') && values.PEDepthHigher == 0) {
                errors.PEDepthHigher = values.PEDepthHigher == 0 ? "PE Main Higher can not be Zero" : "Please Enter PE Main Higher.";
            }
            if (values.Striketype == "Depth_of_Strike" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'LongStraddle' && values.Strategy != 'ShortStraddle') {
                if (values.DepthofStrike > 5 || values.DepthofStrike < -5 || values.DepthofStrike == 0) {
                    errors.DepthofStrike = values.DepthofStrike == 0 ? "Depth of Strike Cannot Be Zero." : "Enter Depth of Strike Value Between -5 to 5.";
                }
            }
            if (values.Striketype == "Straddle_Width" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'LongStraddle' && values.Strategy != 'ShortStraddle') {
                if (values.DepthofStrike > 250 || values.DepthofStrike < -250 || values.DepthofStrike == 0) {
                    errors.DepthofStrike = values.DepthofStrike == 0 ? "Straddle Width Cannot Be Zero." : "Enter Straddle Width Between -250 to 250.";
                }
            }
            if (values.Striketype == "Per_ATM" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'LongStraddle' && values.Strategy != 'ShortStraddle') {
                if (values.DepthofStrike > 2.5 || values.DepthofStrike < -2.5 || values.DepthofStrike == 0) {
                    errors.DepthofStrike = values.DepthofStrike == 0 ? "% of ATM Cannot Be Zero." : "Please Enter % of ATM Value Between -2.5 to 2.5.";
                }
            }
            if ((values.Measurment_Type == "Ladder/Coverd" && values.Measurment_Type != "Shifting/FourLeg" && (values.Strategy == 'BullCallLadder' || values.Strategy == "BullPutLadder")) || values.Strategy == "LongIronCondor" || values.Strategy == "ShortIronCondor") {
                if (values.DeepStrike > 10 || values.DeepStrike < -10 || values.DeepStrike == 0 || values.DeepStrike == 1 || values.DeepStrike == -1) {
                    errors.DeepStrike = values.DeepStrike == 0 ? "Deep Strike Cannot Be Zero." : values.DeepStrike == 1 ? "Deep Strike Cannot Be 1." : values.DeepStrike == -1 ? "Deep Strike Cannot Be -1." : "Enter Deep Strike Between -10 to 10.";
                }
            }
            if (values.Measurment_Type == "Shifting/FourLeg" && (values.Strategy == 'ShortShifting' || values.Strategy == 'LongShifting')) {
                if (values.Shifting_Point > 1000 || values.Shifting_Point < 100) {
                    errors.Shifting_Point = "Please Enter in Range 100-1000.";
                }
            }
            if (values.Measurment_Type == "Shifting/FourLeg" && values.Strategy != 'ShortFourLegStretegy' && values.Strategy != 'LongFourLegStretegy') {
                if (values.Shifting_Value > 5 || values.Shifting_Value < 1) {
                    errors.Shifting_Value = "Please Enter Number of Shifts Between 1-5.";
                }
            }



            if (
                !values.ExitType &&
                values.Measurment_Type != "Shifting/FourLeg" &&
                values.ETPattern == "Leg vice"
            ) {
                errors.ExitType = "Please Select Exit Type";
            }

            // if (!values.WorkingDay?.length > 0) {
            //     errors.WorkingDay = "Please select Working day";
            // }

            // ScrollToViewFirstError(errors)

            return errors;
        },

        onSubmit: async (values) => {
            const req = {
                MainStrategy: location.state.data.selectStrategyType,
                Username: location.state.data.selectGroup,
                Strategy: values.Strategy,
                ETPattern: values.Measurment_Type != "Shifting/FourLeg" ? values.ETPattern : values.Strategy == "ShortShifting" || values.Strategy == "LongShifting" ? "Future" : "",
                Timeframe: "",
                Exchange: "NFO",
                Symbol: values.Symbol,
                Instrument: "FUTIDX",
                Strike: "",
                Optiontype: "",
                Targetvalue: values.Measurment_Type == "Shifting/FourLeg" && (values.Strategy == 'ShortShifting' || values.Strategy == 'LongShifting') ? values.Shifting_Point : values.Targetvalue,
                Slvalue: values.Slvalue,
                TStype: values.TStype,
                Quantity: values.Quantity,
                LowerRange: values.Striketype == "Premium_Range" && values.Measurment_Type != "Shifting/FourLeg" ? values.Lower_Range : 0,
                HigherRange: values.Striketype == "Premium_Range" && values.Measurment_Type != "Shifting/FourLeg" ? values.Higher_Range : 0,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: values.ExitDay,
                FixedSM: "",
                TType: "",
                expirydata1: getExpiry && getExpiry.data[0] || "",
                Expirytype: values.Expirytype,
                Striketype: formik.values.Strategy != "ShortStraddle" && formik.values.Strategy != "LongStraddle" && formik.values.Measurment_Type != "Shifting/FourLeg" && formik.values.Strategy != 'ShortStraddle' && formik.values.Strategy != 'LongStraddle' ? values.Striketype : '',
                DepthofStrike: (formik.values.Striketype != "Premium_Range" && formik.values.Measurment_Type != "Shifting/FourLeg" && formik.values.Strategy != 'LongStraddle' && formik.values.Strategy != 'ShortStraddle') ? Number(values.DepthofStrike) : formik.values.Measurment_Type == "Shifting/FourLeg" && formik.values.Strategy != 'ShortFourLegStretegy' && formik.values.Strategy != 'LongFourLegStretegy' ? values.Shifting_Value : 0,
                DeepStrike: ((formik.values.Measurment_Type == "Ladder/Coverd" && formik.values.Measurment_Type != "Shifting/FourLeg" && (formik.values.Strategy == 'BullCallLadder' || formik.values.Strategy == "BullPutLadder")) || formik.values.Strategy == "LongIronCondor" || formik.values.Strategy == "ShortIronCondor") ? Number(values.DeepStrike) : 0,
                Group: values.Unique_ID,
                CEDepthLower: Number(values.CEDepthLower),
                CEDepthHigher: Number(values.CEDepthHigher),
                PEDepthLower: Number(values.PEDepthLower),
                PEDepthHigher: Number(values.PEDepthHigher),
                CEDeepLower: Number(values.CEDeepLower),
                CEDeepHigher: Number(values.CEDeepHigher),
                PEDeepLower: Number(values.PEDeepLower),
                PEDeepHigher: Number(values.PEDeepHigher),

                ExitRuleO:
                    values.Measurment_Type != "Shifting/FourLeg" &&
                        values.ETPattern == "Leg vice"
                        ? values.ExitType
                        : "",

                // WorkingDay: values.WorkingDay ? values?.WorkingDay?.map((item) => item?.value || item) : [],

            }

            if (values.Striketype == "Depth_of_Strike" && (Number(values.DepthofStrike) < 0 || Number(values.DepthofStrike) > 10)) {
                return SweentAlertFun("Enter Depth of Strike's Range between 1 - 10")
            }

            if (values.Striketype == "Premium_Range" && (Number(values.Lower_Range) >= Number(values.Higher_Range))) {

                return SweentAlertFun("Higher Range should be Greater than Lower Range")
            }

            else if (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy') {
                if (req.CEDepthHigher <= req.CEDepthLower) {

                    return SweentAlertFun("Enter CE Main Higher Greater Than CE Main Lower")
                }
                else if (req.PEDepthLower >= req.PEDepthHigher) {

                    return SweentAlertFun("Enter PE Main Higher Greater Than PE Main Lower")
                }
                else if (req.CEDeepLower >= req.CEDeepHigher) {

                    return SweentAlertFun("Enter CE Hedge Higher Greater Than CE Hedge Lower")
                }
                else if (req.PEDeepLower >= req.PEDeepHigher) {

                    return SweentAlertFun("Enter PE Hedge Higher Greater Than PE Hedge Lower")
                }

                else if ((req.CEDepthLower <= req.CEDeepLower) || (req.CEDepthLower <= req.CEDeepHigher)) {

                    return SweentAlertFun("Enter CE Hedge Lower & CE Hedge Higher Smaller than CE Main Lower")
                }
                else if (req.PEDepthLower <= req.PEDeepLower || req.PEDepthLower <= req.PEDeepHigher) {

                    return SweentAlertFun("Enter PE Hedge Lower & PE Hedge Higher Smaller than PE Main Lower")
                }
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }


            try {
                const response = await AddAdminScript(req);
                if (response.Status) {
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Script Added !",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        navigate('/admin/allscript')
                    }, 1500)
                } else {
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Error !",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            } catch (err) {
                console.log("Error in adding new Script", err);
            }
        }
    });
    useEffect(() => {
        if (formik.values.Symbol == 'NIFTY') {
            formik.setFieldValue("Expirytype", "Weekly");
        }
        else {
            formik.setFieldValue("Expirytype", "Monthly");
        }

    }, [formik.values.Symbol])

    useEffect(() => {
        formik.setFieldValue('Measurment_Type', "Straddle/Strangle")
        formik.setFieldValue('Symbol', "NIFTY")
        formik.setFieldValue('Expirytype', "Weekly")
        formik.setFieldValue('ETPattern', "Future")
        formik.setFieldValue('TStype', "Percentage")
        formik.setFieldValue('Targetvalue', 1.00)
        formik.setFieldValue('Slvalue', 1.00)
        formik.setFieldValue('Quantity', 1)
        formik.setFieldValue('ExitDay', "Intraday")
        formik.setFieldValue('Striketype', "Depth_of_Strike")
        formik.setFieldValue('DepthofStrike', 1)
        formik.setFieldValue('DeepStrike', 2)
        formik.setFieldValue('Lower_Range', 0)
        formik.setFieldValue('Higher_Range', 0)
        formik.setFieldValue('EntryTime', "09:15:00")
        formik.setFieldValue('ExitTime', "15:25:00")
        formik.setFieldValue('TStype', "Point")
        formik.setFieldValue('Shifting_Point', 1)
        formik.setFieldValue('Shifting_Value', 1)
        formik.setFieldValue("ExitType", "Normal");

    }, [])

    useEffect(() => {
        formik.setFieldValue('Strategy', formik.values.Measurment_Type == "Straddle/Strangle" ? "LongStrangle" : formik.values.Measurment_Type == "Butterfly/Condor" ? "LongIronButterfly" : formik.values.Measurment_Type == "Spread" ? "BearCallSpread" : formik.values.Measurment_Type == "Ladder/Coverd" ? "BullCallLadder" : formik.values.Measurment_Type == "Collar/Ratio" ? "LongCollar" : formik.values.Measurment_Type == "Shifting/FourLeg" ? "ShortShifting" : "")
    }, [formik.values.Measurment_Type])

    useEffect(() => {
        axios
            .get(`${Config.base_url}OptionExchange`)
            .then((response) => {
                if (response.data && response.data.Exchange) {
                    const formattedExchangeOptions = response.data.Exchange.map(
                        (exchange) => ({
                            label: exchange,
                            value: exchange,
                        })
                    );

                    // Update the state with the formatted options
                    setExchangeOptions(formattedExchangeOptions);
                    formik.setFieldValue(
                        "Exchange",
                        formattedExchangeOptions[0]?.value || ""
                    );
                } else {
                    console.error("Unexpected API response:", response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching symbols:", error);
            });
    }, []);

    const SymbolSelectionArr = [
        {
            name: "Exchange", // New field name for Exchange
            label: "Exchange", // Label for the new field
            type: "select",
            options: exchangeOptions.map((symbol) => ({
                label: symbol.label,
                value: symbol.value,
            })),
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 1,
            disable: false,
        },
        {
            name: "Symbol",
            label: "Symbol",
            type: "select",
            options: [
                { label: "BANKNIFTY", value: "BANKNIFTY" },
                { label: "NIFTY", value: "NIFTY" },
            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 1,
            disable: false,
        },
        {
            name: "Expirytype",
            label: "Expiry Type",
            type: "select",
            options: formik.values.Symbol == "NIFTY" ?
                [
                    { label: "Weekly", value: "Weekly" },
                    { label: "Monthly", value: "Monthly" },
                ] :
                [
                    { label: "Monthly", value: "Monthly" },
                ]
            ,
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 1,
            disable: false,
        },

    ]

    const EntryRuleArr = [
        {
            name: "Striketype",
            label: "Strike Type",
            type: "select",
            options: [
                { label: "Depth of Strike", value: "Depth_of_Strike" },
                { label: "Straddle Width", value: "Straddle_Width" },
                { label: "Premium Range", value: "Premium_Range" },
                { label: "% of ATM", value: "Per_ATM" },
            ],
            showWhen: (value) => value.Strategy != "ShortStraddle" && value.Strategy != "LongStraddle" && value.Measurment_Type != "Shifting/FourLeg" && value.Strategy != 'ShortStraddle' && value.Strategy != 'LongStraddle',
            headingtype: 1,
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 2,
            disable: false,
            iconText: text.strikeType
        },
        {
            name: "DepthofStrike",
            label: formik.values.Striketype == "Depth_of_Strike" ? "Depth of Strike" : formik.values.Striketype == "Straddle_Width" ? "Percentage" : formik.values.Striketype == "Premium_Range" ? "Premium Range" : formik.values.Striketype == "Per_ATM" ? "% of ATM" : "Depth of Strike",
            type: formik.values.Striketype == "Per_ATM" || formik.values.Striketype == "Straddle_Width" || formik.values.Striketype == "Depth_of_Strike" ? "number" : "text4",
            hiding: false,
            showWhen: (value) => formik.values.Striketype != "Premium_Range" && value.Measurment_Type != "Shifting/FourLeg" && value.Strategy != 'LongStraddle' && value.Strategy != 'ShortStraddle',
            label_size: 12,
            col_size: 4,
            headingtype: 2,
            disable: false,
        },
        {
            name: "DeepStrike",
            label: "Deep Strike",
            type: "number",
            showWhen: (value) => (value.Measurment_Type == "Ladder/Coverd" && value.Measurment_Type != "Shifting/FourLeg" && (value.Strategy == 'BullCallLadder' || value.Strategy == "BullPutLadder")) || value.Strategy == "LongIronCondor" || value.Strategy == "ShortIronCondor",
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 2,
            disable: false,
        },
        {
            name: "Lower_Range",
            label: "Lower Range",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Striketype == "Premium_Range" && value.Measurment_Type != "Shifting/FourLeg",
            label_size: 12,
            col_size: 4,
            headingtype: 2,
            disable: false,
        },
        {
            name: "Higher_Range",
            label: "Higher Range",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Striketype == "Premium_Range" && value.Measurment_Type != "Shifting/FourLeg",
            label_size: 12,
            col_size: 4,
            headingtype: 2,
            disable: false,
        },

        {
            name: "Shifting_Point",
            label: "Shifting Point",
            type: "text3",
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortShifting' || value.Strategy == 'LongShifting'),
            col_size: 4,
            headingtype: 2,
            disable: false,
        },

        {
            name: "CEDepthLower",
            label: "CE Main Lower",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "CEDepthHigher",
            label: "CE Main Higher",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },

        {
            name: "CEDeepLower",
            label: "CE Hedge Lower",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "CEDeepHigher",
            label: "CE Hedge Higher",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "PEDepthLower",
            label: "PE Main Lower",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "PEDepthHigher",
            label: "PE Main Higher",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "PEDeepLower",
            label: "PE Hedge Lower",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "PEDeepHigher",
            label: "PE Hedge Higher",
            type: "number",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },
        {
            name: "Unique_ID",
            label: "Unique Name",
            type: "select1",
            options: [
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
                { label: "D", value: "D" },
                { label: "E", value: "E" },
                { label: "F", value: "F" },
                { label: "G", value: "G" },
                { label: "H", value: "H" },
                { label: "I", value: "I" },
                { label: "J", value: "J" },

            ],
            showWhen: (value) => value.Strategy == "LongFourLegStretegy" || value.Strategy == "ShortFourLegStretegy",
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 2,
            disable: false,
        },

    ]

    const ExitRuleArr = [

        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: formik.values.ETPattern == "Premium Addition" ?
                [
                    { label: "Point", value: "Point" },
                ] :
                [
                    { label: "Point", value: "Point" },
                    { label: "Percentage", value: "Percentage" },
                ],
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg" || (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),
            col_size: 3,
            headingtype: 4,
            disable: false,
            iconText: text.measurementType
        },
        {
            name: "ETPattern",
            label: "Risk Handle",
            type: "select1",
            options: formik.values.Strategy == "CoveredPut" || formik.values.Strategy == "CoveredCall" || formik.values.Strategy == "ShortCollar" || formik.values.Strategy == "LongCollar" ?
                [
                    { label: "Future", value: "Future" },
                    { label: "Leg vice", value: "Leg vice" },
                ] :
                [
                    { label: "Future", value: "Future" },
                    { label: "Leg vice", value: "Leg vice" },
                    { label: "Premium Addition", value: "Premium Addition" },
                ],
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg",
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 3,
            disable: false,
            iconText: text.riskHandle
        },
        {
            name: "ExitType",
            label: "Exit Type",
            type: "select1",
            options: [
                { label: "Normal", value: "Normal" },
                { label: "Cost to Cost", value: "Cost to Cost" },
            ],
            showWhen: (value) =>
                value.Measurment_Type != "Shifting/FourLeg" &&
                value.ETPattern == "Leg vice",
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 3,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target Value",
            type: "text3",
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg" || (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),
            headingtype: 3,
            col_size: 3,
            disable: false,
        },
        {
            name: "Slvalue",
            label: "StopLoss Value",
            type: "text3",
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg" || (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),
            col_size: 3,
            headingtype: 3,
            disable: false,

        },
        {
            name: "Shifting_Value",
            label: "Number of Shifts",
            type: "text3",
            showWhen: (value) => value.Measurment_Type == "Shifting/FourLeg" && value.Strategy != 'ShortFourLegStretegy' && value.Strategy != 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 3,
            disable: false,
        },

    ]

    const RiskManagementArr = [

        {
            name: "Quantity",
            label: "Lot",
            type: "text3",
            hiding: false,
            label_size: 12,
            col_size: 3,
            headingtype: 4,
            disable: false,
        },


        // {
        //     name: "WorkingDay",
        //     label: "Working Day",
        //     type: "multiselect",
        //     options: [
        //         { label: "Monday", value: "Monday" },
        //         { label: "Tuesday", value: "Tuesday" },
        //         { label: "Wednesday", value: "Wednesday" },
        //         { label: "Thursday", value: "Thursday" },
        //         { label: "Friday", value: "Friday" },
        //         { label: "Saturday", value: "Saturday" },
        //     ],
        //     label_size: 12,
        //     col_size: 3,
        //     headingtype: 4,
        //     disable: false,
        //     // iconText: text.Increment_Type,
        //     hiding: false,
        // },


    ]

    const TimeDurationArr = [

        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 5,
            disable: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 5,

            disable: false,
        },
        {
            name: "ExitDay",
            label: "Exit Day",
            type: "select",
            options: [
                { label: "Intraday", value: "Intraday" },
                { label: "Delivery", value: "Delivery" },
            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            headingtype: 5,
            disable: false,
        },



    ]

    const fields = [
        {
            name: "Measurment_Type",
            label: "Option Type",
            type: "select",
            options: [
                { label: "Straddle/Strangle", value: "Straddle/Strangle" },
                { label: "Butterfly/Condor", value: "Butterfly/Condor" },
                { label: "Spread", value: "Spread" },
                { label: "Ladder/Coverd", value: "Ladder/Coverd" },
                { label: "Collar/Ratio", value: "Collar/Ratio" },
                { label: "Shifting/FourLeg", value: "Shifting/FourLeg" },

            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Strategy",
            label: "Strategy",
            type: "radio1",
            title: formik.values.Measurment_Type == "Straddle/Strangle" ?
                [{ title: "Long Strangle", value: "LongStrangle" }, { title: "Short Strangle", value: "ShortStrangle" }, { title: "Long Straddle", value: "LongStraddle" }, { title: "Short Straddle", value: "ShortStraddle" }] :

                formik.values.Measurment_Type == "Butterfly/Condor" ?
                    [{ title: "Long Iron Butterfly", value: "LongIronButterfly" }, { title: "Short Iron Butterfly", value: "ShortIronButterfly" }, { title: "Long Iron Condor", value: "LongIronCondor" }, { title: "Short Iron Condor", value: "ShortIronCondor" }] :

                    formik.values.Measurment_Type == "Spread" ?
                        [{ title: "Bear Call Spread", value: "BearCallSpread" }, { title: "Bear Put Spread", value: "BearPutSpread" }, { title: "Bull Call Spread", value: "BullCallSpread" }, { title: "Bull Put Spread", value: "BullPutSpread" }] :

                        formik.values.Measurment_Type == "Ladder/Coverd" ?
                            [{ title: "Bull Call Ladder", value: "BullCallLadder" }, { title: "Bull Put Ladder", value: "BullPutLadder" }, { title: "Covered Call", value: "CoveredCall" }, { title: "Covered Put", value: "CoveredPut" }] :

                            formik.values.Measurment_Type == "Collar/Ratio" ?
                                [{ title: "Long Collar", value: "LongCollar" }, { title: "Short Collar", value: "ShortCollar" }, { title: "Ratio Call Spread", value: "RatioCallSpread" }, { title: "Ratio Put Spread", value: "RatioPutSpread" }] :

                                formik.values.Measurment_Type == "Shifting/FourLeg" ?
                                    [{ title: "Short Shifting", value: "ShortShifting" }, { title: "Long Shifting", value: "LongShifting" }, { title: "ShortFourLegStrategy", value: "ShortFourLegStretegy" }, { title: "LongFourLegStrategy", value: "LongFourLegStretegy" }] :
                                    ""

            ,
            label_size: 12,
            col_size: 8,
            disable: false,
            hiding: false,
        },
        {
            name: "Heading",
            label: "Symbol_Selection",
            type: "heading",
            hiding: false,
            label_size: 12,
            headingtype: 1,
            data: SymbolSelectionArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            col_size: 12,
            disable: false,
        },
        {
            name: "Heading",
            label: "Entry_Rule",
            type: "heading",
            hiding: false,
            label_size: 12,
            col_size: 12,
            headingtype: 2,
            data: EntryRuleArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            showWhen: () => formik.values.Strategy != "ShortStraddle" && formik.values.Strategy != "LongStraddle",
            disable: false,
        },
        {
            name: "Heading",
            label: "Risk_Management",
            type: "heading",
            hiding: false,
            label_size: 12,
            col_size: 12,
            headingtype: 4,
            data: RiskManagementArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            disable: false,
        },
        {
            name: "Heading",
            label: "Exit_Rule",
            type: "heading",
            hiding: false,
            label_size: 12,
            col_size: 12,
            headingtype: 3,
            data: ExitRuleArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            disable: false,
        },
        {
            name: "Heading",
            label: "Time_Duration",
            type: "heading",
            hiding: false,
            label_size: 12,
            col_size: 12,
            headingtype: 5,
            data: TimeDurationArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            disable: false,
        },


    ];

    const getExpriyData = async () => {
        const data = { Exchange: "NFO", Instrument: "FUTIDX", Symbol: formik.values.Symbol, Strike: "" }

        await GET_EXPIRY_DATE(data)
            .then((response) => {
                if (response.Status) {
                    setExpiry({
                        loading: false,
                        data: response['Expiry Date']
                    })
                }
                else {
                    setExpiry({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the Expriy Data", err)
            })

    }

    useEffect(() => {
        getExpriyData()

    }, [formik.values.Symbol])

    useEffect(() => {

        if (formik.values.Strategy == "LongStraddle" || formik.values.Strategy == "ShortStraddle") {
            formik.setFieldValue('Striketype', "Depth_of_Strike")
        }
        if (formik.values.Striketype != "Premium_Range") {
            formik.setFieldValue('Higher_Range', 1)
            formik.setFieldValue('Lower_Range', 1)
        }

        if (!((formik.values.Measurment_Type == "Ladder/Coverd" && formik.values.Measurment_Type != "Shifting/FourLeg" && (formik.values.Strategy == 'BullCallLadder' || formik.values.Strategy == "BullPutLadder")) || formik.values.Strategy == "LongIronCondor" || formik.values.Strategy == "ShortIronCondor")) {

            formik.setFieldValue('DeepStrike', 2)
        }

        if (!(formik.values.Measurment_Type == "Shifting/FourLeg" && (formik.values.Strategy == 'ShortShifting' || formik.values.Strategy == 'LongShifting'))) {

            formik.setFieldValue('Shifting_Value', 1)

        }

        if (!(formik.values.Measurment_Type != "Shifting/FourLeg" || (formik.values.Measurment_Type == "Shifting/FourLeg" && (formik.values.Strategy == 'ShortFourLegStretegy' || formik.values.Strategy == 'LongFourLegStretegy')))) {
            formik.setFieldValue('TStype', "Point")
            formik.setFieldValue('Targetvalue', 0)
            formik.setFieldValue('Slvalue', 0)
        }
        if (formik.values.Measurment_Type == "Shifting/FourLeg") {
            formik.setFieldValue('ETPattern', "Premium Addition")
        }


        if (formik.values.Strategy != 'ShortFourLegStretegy' || formik.values.Strategy != 'LongFourLegStretegy') {
            formik.setFieldValue('Unique_ID', '')
            formik.setFieldValue('CEDepthLower', 0)
            formik.setFieldValue('CEDepthHigher', 0)
            formik.setFieldValue('PEDepthLower', 0)
            formik.setFieldValue('PEDepthHigher', 0)
            formik.setFieldValue('CEDeepLower', 0)
            formik.setFieldValue('CEDeepHigher', 0)
            formik.setFieldValue('PEDeepLower', 0)
            formik.setFieldValue('PEDeepHigher', 0)
        }

    }, [formik.values.Strategy, formik.values.Striketype, formik.values.Measurment_Type])

    return (
        <>
            <Content
                Page_title={`Add Script - Option Strategy  , Group Name : ${location.state.data.selectGroup}`}
                button_status={false}
                backbutton_status={false}
            >
                <AddForm
                    fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}
                    btn_name="Add"
                    btn_name1="Cancel"
                    formik={formik}
                    btn_name1_route={"/admin/allscript"}
                />
            </Content>
        </>
    );
};
export default AddClient;























