import { useLocation, useNavigate } from "react-router-dom"
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { Get_Symbol, Get_StrikePrice, GET_EXPIRY_DATE, AddAdminScript, GetExchange } from '../../CommonAPI/Admin'
import { iconButtonClasses } from "@mui/material";
import { text } from "../../../ExtraComponent/IconTexts";


const AddClient = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [getAllExchange, setAllExchange] = useState([])
  const [getSymbolData, setSymbolData] = useState({ loading: true, data: [] })
  const [getStricke, setStricke] = useState({ loading: true, data: [] })
  const [getExpiryDate, setExpiryDate] = useState({ loading: true, data: [] })

  const SweentAlertFun = (text) => {
    Swal.fire({
      title: "Warning !",
      text: text,
      icon: "warning",
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
      MainStrategy: location?.state?.data?.selectStrategyType,
      Username: "",
      Strategy: "",
      ETPattern: "",
      Timeframe: "",
      Exchange: "",
      Symbol: "",
      Instrument: "",
      Strike: "",
      Optiontype: "",
      Targetvalue: 1,
      Slvalue: 1,
      TStype: "Point",
      Quantity: 1,
      LowerRange: 0,
      HigherRange: 0,
      HoldExit: "Hold",
      EntryPrice: 0,
      EntryRange: 0,
      EntryTime: "09:15:00",
      ExitTime: "15:25:00",
      ExitDay: "",
      FixedSM: "Single",
      TType: "",
      serendate: "",
      expirydata1: "",
      Expirytype: "",
      Striketype: "",
      DepthofStrike: 0,
      DeepStrike: 0,
      Group: "",
      CEDepthLower: 0.0,
      CEDepthHigher: 0.0,
      PEDepthLower: 0.0,
      PEDepthHigher: 0.0,
      CEDeepLower: 0.0,
      CEDeepHigher: 0.0,
      PEDeepLower: 0.0,
      PEDeepHigher: 0.0,
      tgp2: 0,
      tgp3: 0,
      quantity2: 0,
      quantity3: 0,
      stepup: 1,
      quantityvalue: 0,
      Targetselection: "Fixed Target",
      position_type: "Single",
      quantityselection: "Addition",
      RepeatationCount: 0,
      Profit: 0,
      Loss: 0,
      RollOver: false,
      NumberOfDays: 0,
      RollOverExitTime: "00:00:00",
      TargetExit: false,
      WorkingDay: [],


    },
    validate: (values) => {
      let errors = {};
      const maxTime = "15:29:59";
      const minTime = "09:15:00";

      const mcxMaxTime = "23:29:59";
      const mcxMinTime = "08:59:59";
      if (!values.Strategy) {
        errors.Strategy = "Please Select Strategy Type.";
      }

      if (!values.Exchange) {
        errors.Exchange = "Please Select Exchange Type.";
      }
      if (!values.Instrument && values.Exchange !== 'NSE') {
        errors.Instrument = "Please Select Instrument Type.";
      }

      if (!values.Symbol) {
        errors.Symbol = "Please Select Symbol Type.";
      }
      if (!values.Quantity) {
        errors.Quantity = formik.values.Exchange == "NFO" && formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional" ? "Please Enter Quantity 1" : formik.values.Exchange == "NFO" ? "Please Enter Lot Value." : "Please Enter Quantity Value.";
      }
      if (!values.Optiontype && (values.Instrument === "OPTSTK" || values.Instrument === "OPTIDX")) {
        errors.Optiontype = "Please Select Option Type.";
      }
      if (!values.Strike && (values.Instrument === "OPTSTK" || values.Instrument === "OPTIDX")) {
        errors.Strike = "Please Select Strike Price.";
      }
      if (!values.expirydata1 && values.Exchange !== 'NSE') {
        errors.expirydata1 = "Select Expiry Date.";
      }
      if (!values.TType) {
        errors.TType = "Please Select Transaction Type.";
      }

      if (!values.TStype && values.Strategy != 'Fixed Price') {
        errors.TStype = "Please Select Measurement Type.";
      }


      // if (!values.ExitTime) {
      //   errors.ExitTime = "Please Select Exit Time.";
      // } else if (values.ExitTime > maxTime) {
      //   errors.ExitTime = "Exit Time Must be Before 15:29:59.";
      // }
      // else if (values.ExitTime < minTime) {
      //   errors.ExitTime = "Exit Time Must be After 09:15:00.";
      // }
      // if (!values.EntryTime) {
      //   errors.EntryTime = "Please Select Entry Time.";
      // } else if (values.EntryTime < minTime) {
      //   errors.EntryTime = "Entry Time Must be After 09:15:00.";
      // }
      // else if (values.EntryTime > maxTime) {
      //   errors.EntryTime = "Entry Time Must be Before 15:29:59.";
      // }

      if (!values.ExitTime) {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (values.ExitTime > (values.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
        errors.ExitTime = `Exit Time Must be Before ${values.Exchange === "MCX" ? "23:29:59" : "15:29:59"}.`;
      }

      if (!values.EntryTime) {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (values.EntryTime < (values.Exchange === "MCX" ? mcxMinTime : minTime)) {
        errors.EntryTime = `Entry Time Must be After ${values.Exchange === "MCX" ? "09:00:00" : "09:15:00"}.`;
      }


      if (!values.ExitDay) {
        errors.ExitDay = "Please Select Exit Day.";
      }


      if (!values.EntryPrice) {
        if (values.Strategy == "Fixed Price" && values.EntryPrice == 0) {
          errors.EntryPrice = "Please Enter The Lowest Price.";
        }
        else if (values.Strategy != "Fixed Price" && values.EntryPrice != 0) {
          errors.EntryPrice = "Please Enter The First Trade Lower Range";
        }

      }
      if (!values.Targetvalue) {
        errors.Targetvalue = values.position_type == "Single" && values.Strategy == "Multi_Conditional" ? "Please Enter  Target Price  1" : values.Strategy == "Fixed Price" ? "Please Enter A Target Price." : "Please Enter Target Value.";
      }
      if (
        !values.LowerRange &&
        (values.Strategy == "Multi Directional" ||
          values.Strategy == "One Directional") &&
        values.LowerRange == "" &&
        values.LowerRange !== 0
      ) {
        errors.LowerRange = "Please Enter The Lower Range.";
      }
      if (
        !values.HigherRange &&
        (values.Strategy == "Multi Directional" ||
          values.Strategy == "One Directional") &&
        values.HigherRange == "" &&
        values.HigherRange !== 0
      ) {
        errors.HigherRange = "Please Enter The Higher Range.";
      }
      if (!values.Group) {
        errors.Group = "Please Enter Unique Name.";
      }
      if (!values.HoldExit && values.Strategy != "Fixed Price") {
        errors.HoldExit = "Please Select Hold Or Exit.";
      }
      if (!values.Slvalue) {
        errors.Slvalue = values.Strategy == "Fixed Price" ? "Please Enter Stop Loss Price." : "Please Select Stop Loss Value.";
      }

      if (!values.EntryRange) {
        if (values.Strategy == "Fixed Price" && values.EntryRange == 0) {
          errors.EntryRange = "Please Enter The Highest Price.";
        }
        else if (values.Strategy != "Fixed Price" && values.EntryRange != 0) {
          errors.EntryRange = "Please Enter The First Trade Higher Range";
        }
      }

      if (values.Strategy == "Multi_Conditional" && values.position_type == "Multiple") {

        if (!values.stepup) {
          errors.stepup = "Please Enter Step Up";
        }
        if (!values.quantityvalue) {
          errors.quantityvalue = "Please Enter Increment Value";
        }
        if (!values.quantityselection) {
          errors.quantityselection = "Please Select Increment Type";
        }
        if (!values.Targetvalue) {
          errors.Targetvalue = "Please Enter Target Price";
        }
        if (!values.Targetselection) {
          errors.Targetselection = "Please Select Target Type";
        }
      }
      if (values.position_type == "Multiple" && values.Strategy == "Multi_Conditional" && !values.quantityselection) {
        errors.quantityselection = "Please Select Target Selection";
      }

      if (values.Strategy == "Multi_Conditional" && !values.position_type) {
        errors.position_type = "Please Select Position Type";
      }
      if (
        !values.RepeatationCount &&
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple"
      ) {
        errors.RepeatationCount = "Please Enter No. of Repeatation";
      }
      // if (
      //   !values.Loss &&
      //   values.Strategy == "Multi_Conditional" &&
      //   values.position_type == "Multiple"
      // ) {
      //   errors.Loss = "Please Enter Maximum Loss";
      // }

      // if (
      //   !values.Profit &&
      //   values.Strategy == "Multi_Conditional" &&
      //   values.position_type == "Multiple"
      // ) {
      //   errors.Profit = "Please Enter Maximum Loss";
      // }

      // if (
      //   !values.RollOver &&
      //   values.Strategy == "Multi_Conditional" &&
      //   values.position_type == "Multiple"
      // ) {
      //   errors.RollOver = "Please Enter No. of Repeatation";
      // }

      if (
        !values.NumberOfDays &&
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple" &&
        values.RollOver == true
      ) {
        errors.NumberOfDays = "Please Enter No. of Days";
      }

      if (
        !values.RollOverExitTime &&
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple" &&
        values.RollOver == true
      ) {
        errors.RollOverExitTime = "Please Enter RollOver Exit Time";
      }
      // if (

      //   values.Strategy == "Multi_Conditional" &&
      //   values.position_type == "Multiple"
      // ) {
      //   errors.TargetExit = "Please select Continue After Cycle Exit";
      // }
      if (
        !values.WorkingDay?.length > 0 &&
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple"
      ) {
        errors.WorkingDay = "Please select Working day";
      }
      console.log("errors", errors)

      // ScrollToViewFirstError(errors)

      return errors;
    },


    onSubmit: async (values) => {
      const req = {
        MainStrategy: formik.values.Strategy == "Multi_Conditional" ? "NewScalping" : location?.state?.data?.selectStrategyType,
        Username: location?.state?.data?.selectGroup,
        Strategy: values.Strategy,
        Exchange: values.Exchange,
        Instrument: values.Exchange === "NFO" ? values.Instrument : "",
        Symbol: values.Symbol,
        Optiontype: values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK" ? values.Optiontype : "",
        Strike: values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK" ? values.Strike : "",
        expirydata1: values.Exchange == "NSE" ? getExpiryDate.data[0] : values.expirydata1,
        TType: values.TType == 0 ? "" : values.TType,
        EntryPrice: values.EntryPrice,
        EntryRange: values.EntryRange,
        TStype: values.Strategy == "One Directional" || values.Strategy == "Multi Directional" || (values.Strategy == "Multi_Conditional") ? values.TStype : "",
        Targetvalue: values.Targetvalue,
        Slvalue: values.Slvalue,
        LowerRange:
          values.Strategy === "Fixed Price" ||
            values.Strategy == "Multi_Conditional"
            ? 0
            : Number(values.LowerRange),
        HigherRange:
          values.Strategy === "Fixed Price" ||
            values.Strategy == "Multi_Conditional"
            ? 0
            : Number(values.HigherRange),
        HoldExit: (values.Strategy === "Multi Directional" || values.Strategy === "One Directional" || values.Strategy == "Multi_Conditional") ? values.HoldExit : "",
        ExitDay: values.ExitDay,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ETPattern: "",
        Timeframe: "",
        Quantity: values.Quantity,
        FixedSM: formik.values.Strategy == "Multi_Conditional" ? formik.values.position_type : "Multiple",
        serendate: "",
        Expirytype: "",
        Striketype: "",
        DepthofStrike: 0,
        DeepStrike: 0,
        Group: values.Group,
        CEDepthLower: 0.0,
        CEDepthHigher: 0.0,
        PEDepthLower: 0.0,
        PEDepthHigher: 0.0,
        CEDeepLower: 0.0,
        CEDeepHigher: 0.0,
        PEDeepLower: 0.0,
        PEDeepHigher: 0.0,
        quantity2: values.position_type == "Single" && values.Strategy == "Multi_Conditional" ? Number(values.quantity2) : 0,
        quantity3: values.position_type == "Single" && values.Strategy == "Multi_Conditional" ? Number(values.quantity3) : 0,
        tgp2: values.position_type == "Single" && values.Strategy == "Multi_Conditional" ? Number(values.tgp2) : 0,
        tgp3: values.position_type == "Single" && values.Strategy == "Multi_Conditional" ? Number(values.tgp3) : 0,
        stepup: values.position_type == "Multiple" && values.Strategy == "Multi_Conditional" ? Number(values.stepup) : 0,
        quantityselection: values.position_type == "Multiple" && values.Strategy == "Multi_Conditional" ? values.quantityselection : "",
        quantityvalue: values.position_type == "Multiple" && values.Strategy == "Multi_Conditional" ? Number(values.quantityvalue) : 0,
        targetselection: values.position_type == "Multiple" && values.Strategy == "Multi_Conditional" ? values.Targetselection : "Single",
        RepeatationCount:
          values.position_type == "Multiple" &&
            values.Strategy == "Multi_Conditional"
            ? values.RepeatationCount
            : 0,
        Loss:
          values.position_type == "Multiple" &&
            values.Strategy == "Multi_Conditional"
            ? values.Loss
            : 0,

        Profit:
          values.position_type == "Multiple" &&
            values.Strategy == "Multi_Conditional"
            ? values.Profit
            : 0,
        RollOver: (values.position_type ==
          "Multiple" && values.Strategy == "Multi_Conditional"
          ? values.RollOver
          : false),
        NumberOfDays:
          values.position_type == "Multiple" &&
            values.Strategy == "Multi_Conditional" &&
            values.RollOver == true
            ? values.NumberOfDays
            : 0,
        RollOverExitTime:
          values.position_type == "Multiple" &&
            values.Strategy == "Multi_Conditional" &&
            values.RollOver == true
            ? values.RollOverExitTime
            : "00:00:00",
        // TargetExit:
        //   values.position_type == "Multiple" &&
        //     values.Strategy == "Multi_Conditional"
        //     ? values.TargetExit
        //     : false,
        WorkingDay:
          values.position_type == "Multiple" &&
            values.Strategy == "Multi_Conditional"
            ? values?.WorkingDay?.map((item) => item?.value || item)
            : [],
      };

      if ((Number(values.EntryPrice) > 0 || Number(values.EntryRange) > 0) &&
        (Number(values.EntryPrice) >= Number(values.EntryRange))) {
        return SweentAlertFun(
          values.Strategy === 'Fixed Price'
            ? "Higher Price should be greater than Lower Price"
            : "First Trade Higher Range should be greater than First Trade Lower Range"
        );
      }
      if (
        (values.Strategy !== "Fixed Price" ||
          values.Strategy !== "Multi_Conditional") &&
        Number(values.LowerRange) >= Number(values.HigherRange) &&
        (Number(values.LowerRange) > 0 || Number(values.HigherRange) > 0)
      ) {
        return SweentAlertFun(
          "Higher Price should be greater than Lower Range"
        );
      }
      if (
        values.Strategy === 'Fixed Price' &&
        values.TType === 'BUY' &&
        (
          Number(values.EntryPrice) >= Number(values.EntryRange) ||
          Number(values.Targetvalue) <= Number(values.EntryRange) ||
          Number(values.Slvalue) >= Number(values.EntryPrice)
        )
      ) {
        const alertMessage =
          Number(values.Targetvalue) <= Number(values.EntryRange)
            ? "Target should be greater than Higher Price"
            : Number(values.EntryRange) <= Number(values.EntryPrice)
              ? "Higher Price should be greater than Lower Price"
              : "Stoploss should be smaller than Lower Price";

        return SweentAlertFun(alertMessage);
      }
      if (
        values.Strategy === 'Fixed Price' &&
        values.TType === 'SELL' &&
        (
          Number(values.Targetvalue) >= Number(values.EntryPrice) ||
          Number(values.Slvalue) <= Number(values.EntryRange)
        )
      ) {
        const alertMessage =
          Number(values.Targetvalue) >= Number(values.EntryPrice)
            ? "Target should be smaller than Lower Price"
            : "Stoploss should be greater than Higher Price";

        return SweentAlertFun(alertMessage);
      }


      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time")
      }

      if (values.Strategy == "Multi_Conditional" && values.position_type == "Single") {
        if (Number(values.quantity2) == 0 && Number(values.quantity3) > 0) {
          return SweentAlertFun(formik.values.Exchange == "NFO" ? "Please Enter Lot 2" : "Please Enter Quantity 2")
        }
        if (Number(values.tgp2) == 0 && Number(values.tgp3) > 0) {
          return SweentAlertFun("Please Enter Target 2")
        }
      }
      await AddAdminScript(req)
        .then((response) => {
          if (response.Status) {
            Swal.fire({
              title: "Script Added !",
              text: response.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true
            });
            setTimeout(() => {
              navigate('/admin/allscript')
            }, 1500)
          }
          else {
            Swal.fire({
              title: "Error !",
              text: response.message,
              icon: "error",
              timer: 1500,
              timerProgressBar: true
            });
          }
        })
        .catch((err) => {
          console.log("Error in added new Script", err)
        })
    }
  });

  useEffect(() => {
    formik.setFieldValue('Strategy', "Fixed Price")
    formik.setFieldValue('Exchange', "NFO")
    formik.setFieldValue("TType", "BUY")
    formik.setFieldValue("ExitDay", "Intraday")
    formik.setFieldValue("EntryPrice", 0)
    formik.setFieldValue("EntryRange", 0)
    formik.setFieldValue("Instrument", "FUTIDX")
    formik.setFieldValue("HoldExit", "Hold")
    formik.setFieldValue("TStype", "Point")
  }, [])

  // useEffect(() => {
  //   console.log("testing")
  //   if (formik.values.Exchange === 'NSE') {
  //     formik.setFieldValue('ExitTime', '15:15:00');
  //   } else {
  //     formik.setFieldValue('ExitTime', '15:25:00');
  //   }
  // }, [formik.values.Exchange]);

  useEffect(() => {
    if (formik.values.Exchange !== 'MCX') {
      formik.setFieldValue('ExitTime', '15:14:00');
      formik.setFieldValue('EntryTime', '09:15:00');
    } else if (formik.values.Exchange === 'MCX') {
      formik.setFieldValue('ExitTime', '23:25:00');
      formik.setFieldValue('EntryTime', '09:00:00');
    }


  }, [formik.values.Exchange]);


  const SymbolSelectionArr = [
    {
      name: "Exchange",
      label: "Exchange",
      type: "select",
      options: getAllExchange && getAllExchange.map((item) => ({
        label: item,
        value: item,
      })),
      hiding: false,
      label_size: 12,
      headingtype: 1,
      col_size: formik.values.Exchange == 'NFO' && (formik.values.Instrument === "FUTSTK" || formik.values.Instrument === "FUTIDX") ? 3 : formik.values.Exchange == 'NFO' && (formik.values.Instrument === "OPTIDX" || formik.values.Instrument === "OPTSTK") ? 4 : formik.values.Exchange == 'NSE' && formik.values.Instrument == 'FUTIDX' ? 6 : 6,
      disable: false,
    },
    {
      name: "Instrument",
      label: "Instrument",
      type: "select",
      options: formik.values.Exchange === "NFO" ?
        [
          { label: "FUTIDX", value: "FUTIDX" },
          { label: "FUTSTK", value: "FUTSTK" },
          { label: "OPTIDX", value: "OPTIDX" },
          { label: "OPTSTK", value: "OPTSTK" },
        ]
        : formik.values.Exchange === "MCX" ?
          [
            { label: "OPTFUT", value: "OPTFUT" },
            { label: "FUTCOM", value: "FUTCOM" },
            { label: "FUTIDX", value: "FUTIDX" },
          ]
          : formik.values.Exchange == "CDS" ?
            [
              { label: "OPTCUR", value: "OPTCUR" },
              { label: "FUTCUR", value: "FUTCUR" },
            ]
            :
            [],
      showWhen: (values) => values.Exchange == "NFO" || values.Exchange == "CDS" || values.Exchange == "MCX",
      hiding: false,
      label_size: 12,
      headingtype: 1,
      col_size: formik.values.Instrument === "FUTSTK" || formik.values.Instrument === "FUTIDX" ? 3 : formik.values.Instrument === "OPTIDX" || formik.values.Instrument === "OPTSTK" ? 4 : 3,
      disable: false,
    },
    {
      name: "Symbol",
      label: "Symbol",
      type: "select",
      options: getSymbolData.data && getSymbolData.data.map((item) => ({
        label: item,
        value: item,
      })),
      showWhen: (values) => values.Exchange === "NFO" || values.Exchange === "NSE" || values.Exchange === "CDS" || values.Exchange === "MCX",
      label_size: 12,
      headingtype: 1,
      hiding: false,
      col_size: formik.values.Exchange == "NSE" ? 6 : formik.values.Instrument === "OPTIDX" || formik.values.Instrument === "OPTSTK" ? 4 : 3,
      disable: false,
    },
    {
      name: "Optiontype",
      label: "Option Type",
      type: "select",
      options: [
        { label: "CE", value: "CE" },
        { label: "PE", value: "PE" },
      ],
      showWhen: (values) => values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK",
      label_size: 12,
      hiding: false,
      col_size: 4,
      headingtype: 1,
      disable: false,
    },
    {
      name: "Strike",
      label: "Strike Price",
      type: "select",
      options: getStricke.data && getStricke.data.map((item) => ({
        label: item,
        value: item
      })),
      showWhen: (values) => values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK",
      label_size: 12,
      headingtype: 1,
      col_size: 4,
      hiding: false,
      disable: false,
    },
    {
      name: "expirydata1",
      label: "Expiry Date",
      type: "select",
      options: getExpiryDate && getExpiryDate.data.map((item) => ({
        label: item,
        value: item
      })),
      showWhen: (values) => values.Exchange === "NFO" || values.Exchange === "CDS" || values.Exchange === "MCX",
      label_size: 12,
      headingtype: 1,
      hiding: false,
      col_size: formik.values.Instrument === "FUTSTK" || formik.values.Instrument === "FUTIDX" ? 3 : 4,
      disable: false,
    },

  ]
  const EntryRuleArr = [
    {
      name: "position_type",
      label: "Position Type",
      type: "select1",
      options: [
        { label: "Single", value: "Single" },
        { label: "Multiple", value: "Multiple" },
      ],
      label_size: 12,
      headingtype: 2,
      hiding: false,
      col_size: formik.values.Strategy == 'Multi_Conditional' ? 3 : 4,
      showWhen: (values) => values.Strategy == "Multi_Conditional",
      disable: false,
    },
    {
      name: "TType",
      label: "Transaction Type",
      type: "select1",
      options: [
        { label: "BUY", value: "BUY" },
        { label: "SELL", value: "SELL" },
      ],
      label_size: 12,
      headingtype: 2,
      hiding: false,
      col_size: formik.values.Strategy == 'Fixed Price' || formik.values.Strategy == 'Multi_Conditional' ? 3 : 4,
      disable: false,
    },

    {
      name: "EntryPrice",
      label: formik.values.Strategy == 'Fixed Price' ? "Lower Price" : "First Trade Lower Range",
      type: "text3",
      col_size: formik.values.Strategy == 'Fixed Price' || formik.values.Strategy == 'Multi_Conditional' ? 3 : 4,
      disable: false,
      headingtype: 2,
      hiding: false,
    },

    {
      name: "EntryRange",
      label: formik.values.Strategy == 'Fixed Price' ? "Higher Price" : "First Trade Higher Range",
      type: "text3",
      label_size: 12,
      headingtype: 2,
      col_size: formik.values.Strategy == 'Fixed Price' || formik.values.Strategy == 'Multi_Conditional' ? 3 : 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Group",
      label: "Unique Name",
      type: "text",
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      hiding: false,
    },

  ]

  const ExitRuleArr = [
    {
      name: "Targetselection",
      label: "Target Type",
      type: "select",
      options: [
        { label: "Fixed Target", value: "Average Target" },
        { label: "Entry Wise Target", value: "Entry Wise Target" },
        { label: "Average Target", value: "Average Target" },
        { label: "Entry Wise SL", value: "Entry Wise SL" },


      ],
      showWhen: (values) => values.position_type == "Multiple" && values.Strategy == "Multi_Conditional",
      label_size: 12,
      col_size: formik.values.position_type == "Single" || formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Targetvalue",
      label: formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional" ? "Target  1" : formik.values.Strategy == "Fixed Price" ? "Target Price" : formik.values.Strategy == "One Directional" ? "Fixed Target" : formik.values.Strategy == "Multi_Conditional" && formik.values.position_type == "Multiple" && formik.values.Targetselection == "Fixed Target" ? "Fixed Target" : "Booking Point",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 3,
      disable: false,
      hiding: false,
    },
    {
      name: "tgp2",
      label: "Target 2",
      type: "text3",
      label_size: 12,
      col_size: 4,
      showWhen: (values) => values.position_type == "Single" && values.Strategy == "Multi_Conditional",
      headingtype: 3,
      disable: false,
      hiding: false,
    },
    {
      name: "tgp3",
      label: "Target 3",
      type: "text3",
      label_size: 12,
      col_size: 4,
      showWhen: (values) => values.position_type == "Single" && values.Strategy == "Multi_Conditional",
      headingtype: 3,
      disable: false,
      hiding: false,
    },
    {
      name: "TStype",
      label: "Measurement Type",
      type: "select",
      options: [
        { label: "Percentage", value: "Percentage" },
        { label: "Point", value: "Point" },
      ],
      showWhen: (values) => values.Strategy == "One Directional" || values.Strategy == "Multi Directional" || (values.Strategy == "Multi_Conditional"),
      label_size: 12,
      headingtype: 4,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      hiding: false,
      disable: false,
    },
    {
      name: "Slvalue",
      label: formik.values.Strategy == "Fixed Price" ? "Stoploss Price" : formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional" ? "Stoploss" : "Re-Entry Point",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 3,
      disable: false,
      hiding: false,
    },


  ]

  const RiskManagementArr = [
    {
      name: "Quantity",
      label: (formik.values.Exchange == "NFO" && formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional") ? "Lot 1" : (formik.values.Exchange == "NSE" && formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional") ? "Quantity 1" : formik.values.Exchange == "NFO" ? "Lot" : "Quantity",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      hiding: false,
      disable: false,
    },
    {
      name: "quantity2",
      label: formik.values.Exchange == "NFO" && formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional" ? "Lot 2" : "Quantity 2",
      type: "text3",
      label_size: 12,
      showWhen: (values) => values.position_type == "Single" && values.Strategy == "Multi_Conditional",
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "quantity3",
      label: formik.values.Exchange == "NFO" && formik.values.position_type == "Single" && formik.values.Strategy == "Multi_Conditional" ? "Lot 3" : "Quantity 3",
      type: "text3",
      label_size: 12,
      showWhen: (values) => values.position_type == "Single" && values.Strategy == "Multi_Conditional",
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "LowerRange",
      label: "Lower Range ",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi Directional" ||
        values.Strategy == "One Directional",
      disable: false,
      hiding: false,
    },
    {
      name: "HigherRange",
      label: "Higher Range",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi Directional" ||
        values.Strategy == "One Directional",
      disable: false,
      hiding: false,
    },
    {
      name: "HoldExit",
      label: "Hold/Exit",
      type: "select",
      options: [
        { label: "Hold", value: "Hold" },
        { label: "Exit", value: "Exit" },
      ],
      showWhen: (values) => (values.Strategy == "Multi Directional" || values.Strategy == "One Directional" || (values.Strategy == "Multi_Conditional" && values.position_type == "Multiple")),
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

    {
      name: "TargetExit",
      label: "Continue after cycle exit",
      type: "select",
      options: [
        { label: "True", value: true },
        { label: "False", value: false },
      ],
      showWhen: (values) => values.position_type == "Multiple" && values.Strategy == "Multi_Conditional",
      label_size: 12,
      col_size: formik.values.position_type == "Single" ? 3 : 3,
      headingtype: 4,
      disable: false,
      hiding: false,
      iconText : text.continueAfterCycleExit
    },
    {
      name: "RepeatationCount",
      label: "Repetition Count",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple",
      disable: false,
      hiding: false,
    },
    {
      name: "Loss",
      label: "Max Loss (in price)",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple",
      disable: false,
      hiding: false,
    },

    {
      name: "Profit",
      label: " Max Profit (in price) ",
      type: "text3",
      label_size: 12,
      col_size: formik.values.position_type == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple",
      disable: false,
      hiding: false,
    },


    {
      name: "WorkingDay",
      label: "Working Day",
      type: "multiselect",
      options: [
        { label: "Select All", value: "all" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

    {
      name: "stepup",
      label: "Step Up",
      type: "text3",
      label_size: 12,
      showWhen: (values) => values.position_type == "Multiple" && values.Strategy == "Multi_Conditional",
      col_size: 3,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "quantityselection",
      label: "Increment Type",
      type: "select",
      options: [
        { label: "Addition", value: "Addition" },
        { label: "Multiplication", value: "Multiplication" },
      ],
      showWhen: (values) => values.position_type == "Multiple" && values.Strategy == "Multi_Conditional",
      label_size: 12,
      col_size: formik.values.position_type == "Single" ? 3 : 3,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "quantityvalue",
      label: "Increment Value",
      type: "text3",
      label_size: 12,
      showWhen: (values) => values.position_type == "Multiple" && values.Strategy == "Multi_Conditional",
      col_size: 3,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
  ]

  const TimeDurationArr = [

    {
      name: "EntryTime",
      label: "Entry Time",
      type: "timepiker",
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
      hiding: false,
    },
    {
      name: "ExitTime",
      label: "Exit Time",
      type: "timepiker",
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
      hiding: false,
    },
    {
      name: "ExitDay",
      label: "Exit Day",
      type: "select",
      options: [
        { label: "Intraday", value: "Intraday" },
        { label: "Delivery", value: "Delivery" },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
      hiding: false,
    },
    {
      name: "RollOver",
      label: "RollOver",
      type: "select",
      options: [
        { label: "True", value: true },
        { label: "False", value: false },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      showWhen: (values) =>
        values.ExitDay == "Delivery" &&
        values.Strategy == "Multi_Conditional" &&
        values.position_type == "Multiple",
      disable: false,
      hiding: false,
    },

    {
      name: "NumberOfDays",
      label: "No. of Days",
      type: "text3",
      label_size: 12,
      showWhen: (values) => {
        const rollOverBoolean = values.RollOver == "true";
        return (
          rollOverBoolean &&
          values.Strategy == "Multi_Conditional" &&
          values.ExitDay == "Delivery" &&
          values.position_type == "Multiple"
        );
      },
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

    {
      name: "RollOverExitTime",
      label: "RollOver Exit Time",
      type: "timepiker",
      label_size: 12,
      showWhen: (values) => {
        const rollOverBoolean = values.RollOver == "true";
        return (
          rollOverBoolean &&
          values.Strategy == "Multi_Conditional" &&
          values.ExitDay == "Delivery" &&
          values.position_type == "Multiple"
        );
      },
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

  ]

  const fields = [
    {
      name: "Strategy",
      label: "Scalping Type",
      type: "radio2",
      title: [{ title: "Fixed Price", value: "Fixed Price" }, { title: "One Directional", value: "One Directional" }, { title: "Multi Directional", value: "Multi Directional" },
      { title: "Multi Conditional", value: "Multi_Conditional" }
      ],
      hiding: false,
      label_size: 12,
      col_size: 12,
      disable: false,
    },
    {
      name: "Heading",
      label: "Symbol_Selection",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 1,
      col_size: 12,
      data: SymbolSelectionArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
      disable: false,
    },
    {
      name: "Heading",
      label: "Entry_Rule",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 2,
      col_size: 12,
      data: EntryRuleArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
      disable: false,
    },
    {
      name: "Heading",
      label: "Risk_Management",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 4,
      col_size: 12,
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

  const getSymbol = async () => {
    if (formik.values.Exchange) {
      const data = { Exchange: formik.values.Exchange, Instrument: formik.values.Instrument }
      await Get_Symbol(data)
        .then((response) => {
          if (response.Status) {
            setSymbolData({
              loading: false,
              data: response.Symbol
            })
          }
          else {
            setSymbolData({
              loading: false,
              data: []
            })

          }
        })
        .catch((err) => {
          console.log("Error in fatching the Symbol", err)
        })
    }
  }

  useEffect(() => {
    getSymbol()
  }, [formik.values.Instrument, formik.values.Exchange])


  const getStrikePrice = async () => {
    if (formik.values.Instrument && formik.values.Exchange && formik.values.Symbol) {

      const data = {
        Exchange: formik.values.Exchange,
        Instrument: formik.values.Instrument,
        Symbol: formik.values.Symbol
      }
      await Get_StrikePrice(data)
        .then((response) => {
          if (response.Status) {
            setStricke({
              loading: false,
              data: response.Strike
            })
          }
        })
    }
  }

  useEffect(() => {
    getStrikePrice()
  }, [formik.values.Instrument, formik.values.Exchange, formik.values.Symbol])

  const get_Exchange = async () => {
    await GetExchange()
      .then((response) => {
        if (response.Status) {
          setAllExchange(response.Exchange)
        }
        else {
          setAllExchange([])
        }
      })
      .catch((err) => {
        console.log("Error to finding the Exchange value", err)

      })
  }

  useEffect(() => {
    get_Exchange()
  }, [])

  const getExpiry = async () => {
    if (formik.values.Instrument && formik.values.Exchange && formik.values.Symbol) {
      const data = {
        Exchange: formik.values.Exchange,
        Instrument: formik.values.Exchange == "NSE" ? "" : formik.values.Instrument,
        Symbol: formik.values.Exchange == "NSE" ? "" : formik.values.Symbol,
        Strike: formik.values.Exchange == "NSE" ? "" : formik.values.Strike
      }

      await GET_EXPIRY_DATE(data)
        .then((response) => {
          if (response.Status) {
            setExpiryDate({
              loading: false,
              data: response['Expiry Date']
            })

          } else {
            setExpiryDate({
              loading: false,
              data: []
            })

          }
        })
        .catch((err) => {
          console.log("Error in finding the Expiry date", err)
        })
    }

  }

  useEffect(() => {
    getExpiry()
  }, [formik.values.Instrument, formik.values.Exchange, formik.values.Symbol, formik.values.Strike])


  useEffect(() => {
    if (formik.values.Instrument == "FUTIDX" || formik.values.Instrument == "FUTSTK") {
      formik.setFieldValue('Optiontype', "")
      formik.setFieldValue('Strike', "")
    }

    if (formik.values.Exchange == "NSE") {
      formik.setFieldValue('Instrument', "FUTIDX")
      formik.setFieldValue('expirydata1', "")
      formik.setFieldValue('Strike', "")
      formik.setFieldValue('Optiontype', "")
    }
  }, [formik.values.Instrument, formik.values.Exchange])



  useEffect(() => {
    formik.setFieldValue('Group', "")
    formik.setFieldValue('HigherRange', 0)
    formik.setFieldValue('LowerRange', 0)
    formik.setFieldValue('EntryRange', 0)
    formik.setFieldValue('EntryPrice', 0)
  }, [formik.values.Strategy])

  useEffect(() => {
    formik.setFieldValue('expirydata1', "")
  }, [formik.values.Symbol])

  return (
    <>
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        page_title={`Add Script - Scalping  , Group Name : ${location?.state?.data?.selectGroup}`}
        btn_name="Add"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/admin/allscript"}
      />
    </>
  );
};
export default AddClient;
