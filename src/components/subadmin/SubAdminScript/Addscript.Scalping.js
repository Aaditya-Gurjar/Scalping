import { useLocation, useNavigate } from "react-router-dom"
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { Get_Symbol, Get_StrikePrice, GET_EXPIRY_DATE, AddAdminScript, GetExchange } from '../../CommonAPI/Admin'


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

  const formik = useFormik({
    initialValues: {
      MainStrategy: location.state.data.selectStrategyType,
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
    },

    validate: (values) => {
      let errors = {};
      const maxTime = "15:29:59";
      const minTime = "09:15:00";
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
      if (!values.Quantity) {
        errors.Quantity = formik.values.Exchange == "NFO" ? "Please Enter Lot Value." : "Please Enter Quantity Value.";
      }
      if (!values.TStype && values.Strategy != 'Fixed Price') {
        errors.TStype = "Please Select Measurement Type.";
      }
      if (!values.ExitTime) {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (values.ExitTime > maxTime) {
        errors.ExitTime = "Exit Time Must be Before 15:29:59.";
      }
      else if (values.ExitTime < minTime) {
        errors.ExitTime = "Exit Time Must be After 09:15:00.";
      }
      if (!values.EntryTime) {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (values.EntryTime < minTime) {
        errors.EntryTime = "Entry Time Must be After 09:15:00.";
      }
      else if (values.EntryTime > maxTime) {
        errors.EntryTime = "Entry Time Must be Before 15:29:59.";
      }
      if (!values.ExitDay) {
        errors.ExitDay = "Please Select Exit Day.";
      }

      if (!values.EntryPrice && values.EntryPrice != 0) {
        errors.EntryPrice = values.Strategy == "Fixed Price" ? "Please Enter The Lowest Price." : "Please Enter The First Trade Lower Range";
      }
      if (!values.EntryRange && values.EntryRange != 0) {
        errors.EntryRange = values.Strategy == "Fixed Price" ? "Please Enter The Highest Price." : "Please Enter The First Trade Higher Range";
      }
      if (!values.Targetvalue) {
        errors.Targetvalue = values.Strategy == "Fixed Price" ? "Please Enter A Target Price." : "Please Enter A Target Value.";
      }
      if (!values.LowerRange && values.Strategy != 'Fixed Price' && values.LowerRange != 0) {
        errors.LowerRange = "Please Enter The Lower Range.";
      }
      if (!values.HigherRange && values.Strategy != 'Fixed Price' && values.HigherRange != 0) {
        errors.HigherRange = "Please Enter The Higher Range.";
      }
      if (!values.Group && values.Strategy === "Fixed Price") {
        errors.Group = "Please Select A Unique ID.";
      }
      if (!values.HoldExit && values.Strategy != "Fixed Price") {
        errors.HoldExit = "Please Select Whether To Hold Or Exit.";
      }
      if (!values.Slvalue) {
        errors.Slvalue = values.Strategy == "Fixed Price" ? "Please Enter Stop Loss Price." : "Please Select A Stop Loss Value.";
      } 

      return errors;
    },


    onSubmit: async (values) => {
      const req = {
        MainStrategy: location.state.data.selectStrategyType,
        Username: location.state.data.selectGroup,
        Strategy: values.Strategy,
        Exchange: values.Exchange,
        Instrument: values.Exchange === "NFO" ? values.Instrument : "",
        Symbol: values.Symbol,
        Optiontype: values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK" ? values.Optiontype : "",
        Strike: values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK" ? values.Strike : "",
        expirydata1: values.Exchange == "NSE" ? getExpiryDate.data[0] : values.expirydata1,
        TType: values.TType,
        EntryPrice: values.EntryPrice,
        EntryRange: values.EntryRange,
        TStype: values.Strategy === "Fixed Price" ? "" : values.TStype,
        Targetvalue: values.Targetvalue,
        Slvalue: values.Slvalue,
        LowerRange: values.Strategy === "Fixed Price" ? 0 : values.LowerRange,
        HigherRange: values.Strategy === "Fixed Price" ? 0 : values.HigherRange,
        HoldExit: (values.Strategy === "Multi Directional" || values.Strategy === "One Directional") ? values.HoldExit : "",
        ExitDay: values.ExitDay,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ETPattern: "",
        Timeframe: "",
        Quantity: values.Quantity,
        FixedSM: "Single",
        serendate: "",
        Expirytype: "",
        Striketype: "",
        DepthofStrike: 0,
        DeepStrike: 0,
        Group: values.Strategy == "Fixed Price" ? values.Group : '',
        CEDepthLower: 0.0,
        CEDepthHigher: 0.0,
        PEDepthLower: 0.0,
        PEDepthHigher: 0.0,
        CEDeepLower: 0.0,
        CEDeepHigher: 0.0,
        PEDeepLower: 0.0,
        PEDeepHigher: 0.0,
      }

      if ((Number(values.EntryPrice) > 0 || Number(values.EntryRange) > 0) &&
        (Number(values.EntryPrice) >= Number(values.EntryRange))) {
        return SweentAlertFun(
          values.Strategy === 'Fixed Price'
            ? "Higher Price should be greater than Lower Price"
            : "First Trade Higher Range should be greater than First Trade Lower Range"
        );
      }
      if (
        values.Strategy !== 'Fixed Price' &&
        Number(values.LowerRange) >= Number(values.HigherRange) &&
        (Number(values.LowerRange) > 0 || Number(values.HigherRange) > 0)
      ) {
        return SweentAlertFun("Higher Price should be greater than Lower Range");
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
              navigate('/subadmin/all-script')
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
      col_size: formik.values.Strategy == 'Fixed Price' ? 3 : 4,
      disable: false,
    },
    {
      name: "EntryPrice",
      label: formik.values.Strategy == 'Fixed Price' ? "Lower Price" : "First Trade Lower Range",
      type: "text3",
      col_size: formik.values.Strategy == 'Fixed Price' ? 3 : 4,
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
      col_size: formik.values.Strategy == 'Fixed Price' ? 3 : 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Group",
      label: "Unique ID",
      type: "select",
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
      showWhen: (values) => values.Strategy == "Fixed Price",
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      hiding: false,
    },

  ]

  const ExitRuleArr = [
    {
      name: "Targetvalue",
      label: formik.values.Strategy == "Fixed Price" ? "Target Price" : formik.values.Strategy == "One Directional" ? "Fixed Target" : "Booking Point",
      type: "text3",
      label_size: 12,
      col_size: 3,
      headingtype: 3,
      disable: false,
      hiding: false,
    },
    {
      name: "Slvalue",
      label: formik.values.Strategy == "Fixed Price" ? "Stoploss Price" : "Re-Entry Point",
      type: "text3",
      label_size: 12,
      col_size: 3,
      headingtype: 3,
      disable: false,
      hiding: false,
    },

  ]

  const RiskManagementArr = [
    {
      name: "LowerRange",
      label: "Lower Range ",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      showWhen: (values) => values.Strategy != "Fixed Price",
      disable: false,
      hiding: false,
    },
    {
      name: "HigherRange",
      label: "Higher Range",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      showWhen: (values) => values.Strategy != "Fixed Price",
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
      showWhen: (values) => (values.Strategy == "Multi Directional" || values.Strategy == "One Directional"),
      label_size: 12,
      col_size: 4,
      headingtype: 4,
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
      showWhen: (values) => values.Strategy != "Fixed Price",
      label_size: 12,
      headingtype: 4,
      col_size: 4,
      hiding: false,
      disable: false,
    }, 
    {
      name: "Quantity",
      label: formik.values.Exchange == "NFO" ? "Lot" : "Quantity",
      type: "text3",
      label_size: 12,
      col_size: formik.values.Strategy == "Fixed Price" ? 4 : 4,
      headingtype: 4,
      hiding: false,
      disable: false,
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
    }

  ]


  const fields = [
    {
      name: "Strategy",
      label: "Scalping Type",
      type: "radio2",
      title: [{ title: "Fixed Price", value: "Fixed Price" }, { title: "One Directional", value: "One Directional" }, { title: "Multi Directional", value: "Multi Directional" }],
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
        page_title={`Add Script - Scalping  , Group Name : ${location.state.data.selectGroup}`}
        btn_name="Add"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/subadmin/all-script"}
      />
    </>
  );
};
export default AddClient;
