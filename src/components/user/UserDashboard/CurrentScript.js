import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullDataTable from '../../../ExtraComponent/CommanDataTable(original)';
import { GetAllUserScript, DeleteUserScript, Discontinue, Continue, UpdateUserScript, GetUserScripts, getUserChartingScripts, DeleteSingleChartingScript, MatchPosition } from '../../CommonAPI/User';
import Loader from '../../../ExtraComponent/Loader';
import { getColumns3, getColumns4, getColumns5, getColumns6, getColumns8 } from './Columns';
import Swal from 'sweetalert2';
import Formikform from "../../../ExtraComponent/FormData2";
import { useFormik } from 'formik';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import { text } from '../../../ExtraComponent/IconTexts';


const Coptyscript = ({ tableType, data, selectedType, data2 }) => {
    const userName = localStorage.getItem('name')
    const adminPermission = localStorage.getItem('adminPermission')
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [EditDataScalping, setEditDataScalping] = useState({})
    const [EditDataOption, setEditDataOption] = useState({})
    const [EditDataPattern, setEditDataPattern] = useState({})
    const [allScripts, setAllScripts] = useState({ data: [], len: 0 })
    const [editCharting, setEditCharting] = useState();
    const [getCharting, setGetCharting] = useState([]);

    const [getAllService, setAllservice] = useState({
        loading: true,
        ScalpingData: [],
        OptionData: [],
        PatternData: [],
        PatternOption: [],
        Marketwise: [],
        PremiumRotation: []
    });

    console.log("getAllService", getAllService)

    useEffect(() => {
        GetUserAllScripts()

    }, [])



    useEffect(() => {
        if (data == "ChartingPlatform")
            getChartingScript();
    }, [data]);


    const getChartingScript = async () => {
        const req = { Username: userName, Planname: "Chart" }
        await getUserChartingScripts(req)
            .then((response) => {
                if (response.Status) {
                    setGetCharting(response.Client)
                }
                else {
                    setGetCharting([])
                }
            })
            .catch((err) => {
                console.log("Error in finding the User Scripts", err)
            })
    }

    const GetUserAllScripts = async () => {
        const data = { Username: userName }
        await GetUserScripts(data)
            .then((response) => {
                if (response.Status) {
                    setAllScripts({
                        data: response.data,
                        len: response.data?.length - 1
                    })
                }
                else {
                    setAllScripts({
                        data: [],
                        len: 0
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the User Scripts", err)
            })
    }

    const SweentAlertFun = (text) => {
        Swal.fire({
            title: "Error",
            text: text,
            icon: "error",
            timer: 10000,
            timerProgressBar: true
        });
    }
    console.log("getAllService", getAllService)

    const handleDelete = async (rowData, type) => {
        console.log("data", data)
        const index = rowData.rowIndex
        const req =
            data == 'Scalping' && type == 1 ?
                {
                    Username: userName,
                    MainStrategy: data,
                    Strategy: getAllService.ScalpingData[index].ScalpType,
                    Symbol: getAllService.ScalpingData[index].Symbol,
                    ETPattern: "",
                    Timeframe: "",
                    TType: "",
                    Group: getAllService.ScalpingData[index].GroupN,
                    TradePattern: "",
                    TSymbol: "",
                    PatternName: ""
                } : data == 'Option Strategy' ?
                    {
                        MainStrategy: data,
                        Strategy: getAllService.OptionData[index].STG,
                        Symbol: getAllService.OptionData[index].MainSymbol,
                        Username: userName,
                        ETPattern: getAllService.OptionData[index].Targettype,
                        Timeframe: "",
                        TType: "",
                        Group: getAllService.OptionData[index].GroupN,
                        TSymbol: "",
                        TradePattern: "",
                        PatternName: ""
                    }
                    : data == 'Pattern' || data == 'Pattern Script' ?
                        {

                            MainStrategy: "Pattern",
                            Strategy: getAllService.PatternData[index].TradePattern,
                            Symbol: getAllService.PatternData[index].Symbol,
                            Username: userName,
                            ETPattern: getAllService.PatternData[index].Pattern,
                            Timeframe: getAllService.PatternData[index].TimeFrame,
                            TType: getAllService.PatternData[index].TType,
                            Group: "",
                            TSymbol: "",
                            TradePattern: "",
                            PatternName: ""

                        } : data == 'Scalping' && type == 2 ?
                            {
                                Username: userName,
                                MainStrategy: "NewScalping",
                                Strategy: getAllService.NewScalping[index].Targetselection,
                                Symbol: getAllService.NewScalping[index].Symbol,
                                ETPattern: "",
                                Timeframe: "",
                                TType: "",
                                Group: getAllService.NewScalping[index].GroupN,
                                TradePattern: "",
                                TSymbol: "",
                                PatternName: ""
                            } : ''


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await DeleteUserScript(req)
                    .then((response) => {
                        if (response.Status) {
                            Swal.fire({
                                title: "Deleted Successfully!",
                                text: response.message,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true,
                                didClose: () => {
                                    setRefresh(!refresh);
                                }
                            });
                            setTimeout(() => {
                                window.location.reload()
                            }, 1500)
                        } else {
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
                        console.log("Error in delete script", err)
                    })
            }
        });

    }


    const handleMatchPosition = async (rowData, type) => {
        console.log("matchPosition", rowData.rowIndex)
        const index = rowData.rowIndex
        console.log("data is ", getAllService.NewScalping[index])

        const req = {
            // Username: userName,
            // MainStrategy: "NewScalping",
            // Strategy: getAllService.NewScalping[index].Targetselection,
            // Symbol: getAllService.NewScalping[index].Symbol,
            // ETPattern: "",
            // Timeframe: "",
            // TType: "",
            // Group: getAllService.NewScalping[index].GroupN,
            // TradePattern: "",
            // TSymbol: "",
            // PatternName: ""




            MainStrategy: "NewScalping",
            Strategy: getAllService.NewScalping[index].Targetselection,
            Symbol: getAllService.NewScalping[index].Symbol,
            Username: getAllService.NewScalping[index].Username,
            ETPattern: "",
            Timeframe: "",
            MatchPosition: true,
            Group: getAllService.NewScalping[index].GroupN,
            TSymbol: "",
            TradePattern: "",
            PatternName: "",
        }
        console.log("outside")
        if (req) {
            try {
                console.log("inside")
                const response = await MatchPosition(req);
                console.log("response is ", response)
                if (response.status) {
                    Swal.fire({
                        title: response.Status ? "Success" : "Error !",
                        text: response.message,
                        icon: response.Status ? "success" : "error",
                        timer: 1500,
                        timerProgressBar: true
                    });

                }
                else {
                    Swal.fire({
                        title: "Error !",
                        text: "Something went wrong!",
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }

            } catch (error) {
                Swal.fire({
                    title: "Error !",
                    text: error.message || "Something went wrong!",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                });
            }
        }

    }


    const handleEdit = async (rowData, type = 1) => {
        setShowEditModal(true)
        const index = rowData.rowIndex
        if (data == 'Scalping' && type == 1) {
            setEditDataScalping(getAllService.ScalpingData[index])

        }
        else if (data == "Scalping" && type == 2) {
            setEditDataScalping(getAllService.NewScalping[index])
            console.log("EditDataScalping.PositionType", EditDataScalping.PositionType);

        }
        else if (data == 'Option Strategy') {
            setEditDataOption(getAllService.OptionData[index])
        }
        else if (data == 'Pattern' || data == 'Pattern Script') {
            setEditDataPattern(getAllService.PatternData[index])
        }
        else {
            setEditDataPattern(getAllService.PatternData[index])
        }
    }
    const HandleContinueDiscontinue = async (rowData, type) => {
        console.log("rowData", rowData.rowIndex);


        const index = rowData.rowIndex
        let trading;


        if (data == 'Scalping' && type == 1) {
            trading = getAllService.ScalpingData[index].Trading
        }
        else if (data == 'Scalping' && type == 2) {
            trading = getAllService.NewScalping[index].Trading
        }
        else if (data == 'Pattern' || data == 'Pattern Script') {
            trading = getAllService.PatternData[index].Trading
        }
        else if (data == 'Option Strategy') {
            trading = getAllService.OptionData[index].Trading
        }
        else if (data == 'ChartingPlatform') {
            trading = getCharting[index].Trading
        }
        else {
            console.log("Error in finding the trading status")
            return
        }

        // console.log("getAllService.PatternData[index].Trading", getAllService.PatternData[index].Trading)
        if (trading) {
            Swal.fire({
                title: "Do you want to Discontinue",
                text: "You won't be able to revert this!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log("####", data, type)
                    const req =
                        data == 'Scalping' && type == 1 ?

                            {

                                Username: userName,
                                MainStrategy: data,
                                Strategy: getAllService.ScalpingData[index].ScalpType == "Multi_Conditional" ? getAllService.NewScalping[index].Targetselection : getAllService.ScalpingData[index].ScalpType,
                                Symbol: getAllService.ScalpingData[index].Symbol,
                                ETPattern: "",
                                Timeframe: "",
                                TType: "",
                                Group: getAllService.ScalpingData[index].GroupN,
                                TradePattern: "",
                                TSymbol: "",
                                PatternName: ""
                            } : data == 'Option Strategy' ?
                                {
                                    MainStrategy: data,
                                    Strategy: getAllService.OptionData[index].STG,
                                    Symbol: getAllService.OptionData[index].MainSymbol,
                                    Username: userName,
                                    ETPattern: getAllService.OptionData[index].Targettype,
                                    Timeframe: "",
                                    TType: "",
                                    Group: getAllService.OptionData[index].GroupN,
                                    TSymbol: "",
                                    TradePattern: "",
                                    PatternName: ""
                                }
                                : data == 'Pattern' || data == 'Pattern Script' ?
                                    {

                                        MainStrategy: data,
                                        Strategy: getAllService.PatternData[index].TradePattern,
                                        Symbol: getAllService.PatternData[index].Symbol,
                                        Username: userName,
                                        ETPattern: getAllService.PatternData[index].Pattern,
                                        Timeframe: getAllService.PatternData[index].TimeFrame,
                                        TType: getAllService.PatternData[index].TType,
                                        Group: "",
                                        TSymbol: "",
                                        TradePattern: "",
                                        PatternName: ""

                                    } : data == 'Scalping' && type == 2 ?
                                        {
                                            Username: userName,
                                            MainStrategy: "NewScalping",
                                            Strategy: getAllService.NewScalping[index].Targetselection,
                                            Symbol: getAllService.NewScalping[index].Symbol,
                                            ETPattern: "",
                                            Timeframe: "",
                                            TType: "",
                                            Group: getAllService.NewScalping[index].GroupN,
                                            TradePattern: "",
                                            TSymbol: "",
                                            PatternName: ""
                                        } : data == 'ChartingPlatform' ?
                                            {
                                                Username: userName,
                                                User: getCharting[index]?.AccType,
                                                Symbol: getCharting[index]?.TSymbol,
                                            } : ''


                    if (data == 'ChartingPlatform') {
                        await DeleteSingleChartingScript(req)
                            .then((response) => {
                                if (response.Status) {
                                    Swal.fire({
                                        // title: "Success",
                                        // text: response.message,
                                        // icon: "success",
                                        // timer: 2000,
                                        // timerProgressBar: true

                                        background: "#1a1e23 ",
                                        backdrop: "#121010ba",
                                        title: "Success",
                                        text: response.message,
                                        icon: "success",
                                        timer: 2000,
                                        timerProgressBar: true
                                    }).then(() => {
                                        setRefresh(!refresh)
                                    });
                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: "error",
                                        timer: 2000,
                                        timerProgressBar: true
                                    });
                                }
                            })
                    }
                    else {
                        await Discontinue(req)
                            .then((response) => {
                                console.log("response", response)
                                if (response.Status) {
                                    Swal.fire({
                                        // title: "Success",
                                        // text: response.message,
                                        // icon: "success",
                                        // timer: 2000,
                                        // timerProgressBar: true
                                        background: "#1a1e23 ",
                                        backdrop: "#121010ba",
                                        title: "Success",
                                        text: response.message,
                                        icon: "success",
                                        timer: 2000,
                                        timerProgressBar: true
                                    }).then(() => {
                                        setRefresh(!refresh)
                                    });

                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: "error",
                                        timer: 2000,
                                        timerProgressBar: true
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log("Error in delete script", err)
                            })

                    }

                }
            })
        }

        else if (data == 'ChartingPlatform') {
            return;
        }
        else {
            {
                Swal.fire({
                    title: "Do you want to Continue",
                    text: "You won't be able to revert this!",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const req =
                            data == 'Scalping' && type == 1 ?
                                {
                                    Username: userName,
                                    MainStrategy: data,
                                    Strategy: getAllService.ScalpingData[index].ScalpType,
                                    Symbol: getAllService.ScalpingData[index].Symbol,
                                    ETPattern: "",
                                    Timeframe: "",
                                    TType: "",
                                    Group: getAllService.ScalpingData[index].GroupN,
                                    TradePattern: "",
                                    TSymbol: "",
                                    PatternName: ""
                                } : data == 'Option Strategy' ?
                                    {
                                        MainStrategy: data,
                                        Strategy: getAllService.OptionData[index].STG,
                                        Symbol: getAllService.OptionData[index].MainSymbol,
                                        Username: userName,
                                        ETPattern: getAllService.OptionData[index].Targettype,
                                        Timeframe: "",
                                        TType: "",
                                        Group: getAllService.OptionData[index].GroupN,
                                        TSymbol: "",
                                        TradePattern: "",
                                        PatternName: ""
                                    }
                                    : data == 'Pattern' || data == "Pattern Script" ?
                                        {

                                            MainStrategy: data,
                                            Strategy: getAllService.PatternData[index].TradePattern,
                                            Symbol: getAllService.PatternData[index].Symbol,
                                            Username: userName,
                                            ETPattern: getAllService.PatternData[index].Pattern,
                                            Timeframe: getAllService.PatternData[index].TimeFrame,
                                            TType: getAllService.PatternData[index].TType,
                                            Group: "",
                                            TSymbol: "",
                                            TradePattern: "",
                                            PatternName: ""

                                        } : data == 'Scalping' && type == 2 ?

                                            {
                                                Username: userName,
                                                MainStrategy: "NewScalping",
                                                Strategy: getAllService.NewScalping[index].Targetselection,
                                                Symbol: getAllService.NewScalping[index].Symbol,
                                                ETPattern: "",
                                                Timeframe: "",
                                                TType: "",
                                                Group: getAllService.NewScalping[index].GroupN,
                                                TradePattern: "",
                                                TSymbol: "",
                                                PatternName: ""
                                            } : ''



                        await Continue(req)
                            .then((response) => {
                                if (response.Status) {
                                    // Swal.fire({
                                    //     title: "Success",
                                    //     text: response.message,
                                    //     icon: "success",
                                    //     timer: 1500,
                                    //     timerProgressBar: true
                                    // })
                                    Swal.fire({
                                        background: "#1a1e23 ",
                                        backdrop: "#121010ba",
                                        title: "Success",
                                        text: response.message,
                                        icon: "success",
                                        timer: 1500,
                                        timerProgressBar: true
                                    })
                                        .then(() => {
                                            setRefresh(!refresh)
                                        });
                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: 'error',
                                        timer: 1500,
                                        timerProgressBar: true
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log("Error in delete script", err)
                            })
                    }
                })
            }

        }


    }

    const AddScript = (data) => {
        if (data2.status == false) {
            Swal.fire({
                title: "Error",
                text: data2.msg,
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });
        }
        else {
            if (data === "Option Strategy") {
                if (allScripts?.data?.[allScripts.len]?.CombineOption?.length >= 1) {
                    navigate('/user/newscript/option', { state: { data: { selectStrategyType: 'Option Strategy', scriptType: allScripts } } });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "You don't have any valid plan to use this strategy",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });

                }
            }
            else if (data === "Pattern" || data === "Pattern Script") {
                if (allScripts?.data?.[allScripts.len]?.CombinePattern?.length >= 1) {
                    navigate('/user/newscript/pattern', { state: { data: { selectStrategyType: 'Pattern', scriptType: allScripts } } });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "You don't have any valid plan to use this strategy",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });
                }

            }
            else if (data === "ChartingPlatform") {
                if (allScripts?.data?.[allScripts.len]?.CombineChartingSignal?.length >= 1) {
                    navigate('/user/newscript/charting', { state: { data: { selectStrategyType: 'ChartingPlatform', scriptType: allScripts } } });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "You don't have any valid plan to use this strategy",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            }

            else {
                if (allScripts?.data?.[allScripts.len]?.CombineScalping?.length >= 1) {
                    navigate('/user/newscript/scalping', {
                        state: {
                            data: { selectStrategyType: 'Scalping', scriptType: allScripts }
                        },
                    });
                }
                else {
                    Swal.fire({
                        title: "Warning",
                        text: "You don't have any valid plan to use this strategy",
                        icon: "warning",
                        timer: 2000,
                        timerProgressBar: true
                    });
                }

            }
        }

    }

    const GetAllUserScriptDetails = async () => {
        const data = { userName: userName };

        await GetAllUserScript(data)
            .then((response) => {

                if (response.Status) {
                    setAllservice({
                        loading: false,
                        ScalpingData: response.Scalping,
                        OptionData: response.Option,
                        PatternData: response.Pattern,
                        PatternOption: response.PatternOption,
                        Marketwise: response.Marketwise,
                        PremiumRotation: response.PremiumRotation,
                        NewScalping: response.NewScalping
                    });
                } else {
                    setAllservice({
                        loading: false,
                        ScalpingData: [],
                        OptionData: [],
                        PatternData: [],
                        PatternOption: [],
                        Marketwise: [],
                        PremiumRotation: []
                    });
                }
            })
            .catch((err) => {
                console.log("Error in finding group service", err);
            });
    }

    useEffect(() => {
        GetAllUserScriptDetails();
    }, [selectedType, refresh, showEditModal]);



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {


            MainStrategy: "", // str
            Strategy: "", // str
            Symbol: "", // str
            Username: "", // str
            ETPattern: "", // str (Trade type)
            Timeframe: "", // str
            Targetvalue: 0.0, // float
            Slvalue: 0.0, // float
            TStype: "", // str
            LowerRange: 0.0, // float (Profit in scalping)
            HigherRange: 0.0, // float (Loss in scalping)
            HoldExit: "", // str
            EntryPrice: 0.0, // float
            EntryRange: 0.0, // float
            EntryTime: "",
            ExitTime: "",

            ExitDay: "", // str
            TradeExecution: "", // str
            Group: "", // str

            // Depth values for CE and PE options
            CEDepthLower: 0.0, // float
            CEDepthHigher: 0.0, // float
            PEDepthLower: 0.0, // float
            PEDepthHigher: 0.0, // float
            CEDeepLower: 0.0, // float
            CEDeepHigher: 0.0, // float
            PEDeepLower: 0.0, // float
            PEDeepHigher: 0.0, // float
            DepthofStrike: 0.0, // float
            TradeCount: 0, // int

            // Additional trade parameters
            tgp2: 0.0, // float
            tgp3: 0.0, // float
            RolloverTF: false, // bool
            RolloverDay: "", // str
            RolloverTime: "", // str
            TargetExit: false, // bool
            RepeatationCount: 0, // int
            Profit: 0.0, // float
            Loss: 0.0, // float
            WorkingDay: [], // list (array)

        },
        validate: (values) => {



            let errors = {};
            const mcxMaxTime = "23:29:59";
            const mcxMinTime = "08:59:59"
            const maxTime = "15:29:59";
            const minTime = "09:15:00";

            if (values.TStype == "" && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.TStype = "Please select Measurement Type";
            }
            if (!values.Quantity || values.Quantity == 0) {
                errors.Quantity = "Please enter Quantity";
            }
            if (values.Targetvalue == 0.0 || !values.Targetvalue) {
                errors.Targetvalue = "Please enter Target value";
            }
            if (values.Slvalue == 0 || !values.Slvalue) {
                errors.Slvalue = "Please enter SL value";
            }
            if (!values.EntryPrice && values.EntryPrice != 0 && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.EntryPrice = "Please enter Entry Price";
            }
            if (!values.EntryRange && values.EntryRange != 0 && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.EntryRange = "Please enter Entry Range";
            }
            if (EditDataScalping.PositionType === "Multiple" && !values.LowerRange && values.LowerRange != 0) {
                errors.LowerRange = "Please enter Lower Range";
            }
            if (EditDataScalping.PositionType === "Multiple" && !values.HigherRange && values.HigherRange != 0) {
                errors.HigherRange = "Please enter Higher Range";
            }
            if (values.HoldExit == "" && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.HoldExit = "Please select Hold/Exit";
            }





            if (values.EntryTime == "") {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < (EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.EntryTime = `Entry Time Must be After ${EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime}.`;
            } else if (values.EntryTime > (EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.EntryTime = `Entry Time Must be Before ${EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime}.`;
            }

            if (values.ExitTime == "") {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime < (EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.ExitTime = `Exit Time Must be After ${EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime}.`;
            } else if (values.ExitTime > (EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.ExitTime = `Exit Time Must be Before ${EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime}.`;
            }

            if (values.EntryTime && values.ExitTime && values.EntryTime >= values.ExitTime) {
                errors.ExitTime = "Exit Time should be greater than Entry Time.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }
            if (!values.TType) {
                errors.TType = "Please Select Transaction Type.";
            }
            // console.log("errors", errors)
            return errors;
        },
        onSubmit: async (values) => {
            const req = {

                MainStrategy: "NewScalping", // str
                Strategy: EditDataScalping.Targetselection, // str
                // Strategy:  , // str
                Symbol: EditDataScalping.Symbol, // str
                Username: userName, // str
                ETPattern: "", // str (Trade type)
                Timeframe: "", // str
                Targetvalue: parseFloat(EditDataScalping["Booking Point"]) || parseFloat(values.Targetvalue), // float
                Slvalue: parseFloat(values.Slvalue), // float
                TStype: EditDataScalping.ScalpType != "Fixed Price" ? values.TStype : EditDataScalping.TStype, // str
                LowerRange: 0.0, // float (Profit in scalping)
                HigherRange: 0.0, // float (Loss in scalping)
                HoldExit: EditDataScalping.HoldExit || "HoldExit", // str
                EntryPrice: parseFloat(EditDataScalping.EntryPrice) || 0.0, // float
                EntryRange: parseFloat(EditDataScalping.EntryRange) || 0.0, // float
                EntryTime: EditDataScalping.EntryTime, // str
                ExitTime: EditDataScalping?.ExitTime, // str
                ExitDay: EditDataScalping.ExitDay || "", // str
                TradeExecution: EditDataScalping.TradeExecution || "", // str
                Group: EditDataScalping.GroupN || "", // str

                // Depth values for CE and PE options
                CEDepthLower: 0.0, // float
                CEDepthHigher: 0.0, // float
                PEDepthLower: 0.0, // float
                PEDepthHigher: 0.0, // float
                CEDeepLower: 0.0, // float
                CEDeepHigher: 0.0, // float
                PEDeepLower: 0.0, // float
                PEDeepHigher: 0.0, // float
                DepthofStrike: 0.0, // float

                TradeCount: EditDataScalping.TradeCount || 0, // int

                // Additional trade parameters
                tgp2: EditDataScalping["Booking Point 2"] || 0.0,
                tgp3: EditDataScalping["Booking Point 3"] || 0.0,
                RolloverTF: EditDataScalping.RolloverTF || false, // bool
                RolloverDay: "", // str
                RolloverTime: "", // str
                TargetExit: values.TargetExit, // bool
                RepeatationCount: EditDataScalping.RepeatationCount || 0, // int
                Profit: EditDataScalping.Profit || 0.0, // float
                Loss: EditDataScalping.Loss || 0.0, // float
                WorkingDay: formik?.values?.WorkingDay?.map(day => day?.value || day) || [] // list (array)


            }
            if (Number(values.EntryPrice) > 0 && Number(values.EntryRange) && (Number(values.EntryPrice) >= Number(values.EntryRange))) {
                return SweentAlertFun(showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Higher Price should be greater than Lower Price" : "First Trade Higher Range should be greater than First Trade Lower Range")
            }

            if (Number(values.LowerRange) > 0 && Number(values.HigherRange) > 0 && (Number(values.LowerRange) >= Number(values.HigherRange))) {
                return SweentAlertFun("Higher Range should be greater than Lower Range")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Targetvalue) <= Number(values.Slvalue))) {
                return SweentAlertFun("Target Price should be greater than Stoploss")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Targetvalue) <= Number(values.EntryRange))) {
                return SweentAlertFun("Target Price should be greater than Higher price")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Slvalue) >= Number(values.EntryPrice))) {
                return SweentAlertFun("Lower Price should be greater than Stoploss")
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            // console.log("req", req)

            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const formik1 = useFormik({
        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: "",
            LowerRange: 0,
            HigherRange: 0,
            HoldExit: "",
            EntryPrice: 0,
            EntryRange: 0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0.0,
            CEDepthHigher: 0.0,
            PEDepthLower: 0.0,
            PEDepthHigher: 0.0,
            CEDeepLower: 0.0,
            CEDeepHigher: 0.0,
            PEDeepLower: 0.0,
            PEDeepHigher: 0.0,
            DepthofStrike: 0,
            TradeCount: 0,
            WorkingDay: [],

        },
        validate: (values) => {
            let errors = {};
            const mcxMaxTime = "23:29:59";
            const mcxMinTime = "08:59:59"
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype) {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.Targetvalue) {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue) {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.EntryTime == "") {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < (EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.EntryTime = `Entry Time Must be After ${EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime}.`;
            } else if (values.EntryTime > (EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.EntryTime = `Entry Time Must be Before ${EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime}.`;
            }

            if (values.ExitTime == "") {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime < (EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.ExitTime = `Exit Time Must be After ${EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime}.`;
            } else if (values.ExitTime > (EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.ExitTime = `Exit Time Must be Before ${EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime}.`;
            }

            if (values.EntryTime && values.ExitTime && values.EntryTime >= values.ExitTime) {
                errors.ExitTime = "Exit Time should be greater than Entry Time.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }

            if (
                !values?.WorkingDay?.length > 0) {
                errors.WorkingDay = "Please select Working day";
            }


            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                // MainStrategy: data,
                // Strategy: EditDataOption.STG,
                // Symbol: EditDataOption.MainSymbol,
                // Username: userName,
                // ETPattern: EditDataOption.Targettype,
                // Timeframe: "",
                // Targetvalue: values.Targetvalue,
                // Slvalue: Number(values.Slvalue),
                // TStype: values.TStype,
                // Quantity: Number(values.Quantity),
                // LowerRange: EditDataOption.LowerRange,
                // HigherRange: EditDataOption.HigherRange,
                // HoldExit: "",
                // EntryPrice: 0.0,
                // EntryRange: 0.0,
                // EntryTime: values.EntryTime,
                // ExitTime: values.ExitTime,
                // ExitDay: EditDataOption['Product Type'],
                // TradeExecution: EditDataOption.TradeExecution,
                // Group: EditDataOption.GroupN,
                // CEDepthLower: EditDataOption.CEDepthLower,
                // CEDepthHigher: EditDataOption.CEDepthHigher,
                // PEDepthLower: EditDataOption.PEDepthLower,
                // PEDepthHigher: EditDataOption.PEDepthHigher,
                // CEDeepLower: EditDataOption.CEDeepLower,
                // CEDeepHigher: EditDataOption.PEDeepHigher,
                // PEDeepLower: EditDataOption.PEDeepLower,
                // PEDeepHigher: EditDataOption.PEDeepHigher,
                // DepthofStrike: EditDataOption.DepthofStrike,
                // TradeCount: values.TradeCount,
                // WorkingDay: values.WorkingDay?.map(day => day?.value || day) || [] // list (array)

                // ------------------------------------------------------


                MainStrategy: data,
                Strategy: EditDataOption.STG,
                Symbol: EditDataOption.MainSymbol,
                Username: userName,
                ETPattern: EditDataOption.Targettype,
                Timeframe: "",
                Targetvalue: values.Targetvalue,
                Slvalue: Number(values.Slvalue),
                TStype: values.TStype,
                // Quantity: Number(values.Quantity),
                LowerRange: EditDataOption.LowerRange,
                HigherRange: EditDataOption.HigherRange,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataOption['Product Type'],
                TradeExecution: EditDataOption.TradeExecution,
                Group: EditDataOption.GroupN,
                CEDepthLower: EditDataOption.CEDepthLower,
                CEDepthHigher: EditDataOption.CEDepthHigher,
                PEDepthLower: EditDataOption.PEDepthLower,
                PEDepthHigher: EditDataOption.PEDepthHigher,
                CEDeepLower: EditDataOption.CEDeepLower,
                CEDeepHigher: EditDataOption.PEDeepHigher,
                PEDeepLower: EditDataOption.PEDeepLower,
                PEDeepHigher: EditDataOption.PEDeepHigher,
                DepthofStrike: EditDataOption.DepthofStrike,
                TradeCount: values.TradeCount,
                WorkingDay: values.WorkingDay?.map(day => day?.value || day) || [], // list (array)

                HoldExit: EditDataScalping.HoldExit || "HoldExit", // str
                EntryPrice: 0.0, // float
                EntryRange: 0.0, // float
                TradeCount: EditDataScalping.TradeCount || 0, // int
                tgp2: 0.0, // float
                tgp3: 0.0, // float
                RolloverTF: EditDataOption.RolloverTF || false, // bool
                RolloverDay: "", // str
                RolloverTime: "", // str
                TargetExit: false, // bool
                RepeatationCount: 0, // int
                Profit: 0.0, // float
                Loss: 0.0, // float


                // formik1.setFieldValue('TStype', EditDataOption.strategytype)
                // formik1.setFieldValue('Targetvalue', EditDataOption['Target value'])
                // formik1.setFieldValue('Slvalue', EditDataOption['SL value'])
                // formik1.setFieldValue('Quantity', EditDataOption['Lot Size'])
                // formik1.setFieldValue('EntryTime', EditDataOption['Entry Time'])
                // formik1.setFieldValue('ExitTime', EditDataOption['Exit Time'])
                // formik1.setFieldValue('TradeCount', EditDataOption.TradeCount)
                // formik1.setFieldValue('WorkingDay', WorkingDay)




            }


            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const formik2 = useFormik({
        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: 0,
            LowerRange: 0.0,
            HigherRange: 0.0,
            HoldExit: "",
            EntryPrice: 0.0,
            EntryRange: 0.0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0.0,
            CEDepthHigher: 0.0,
            PEDepthLower: 0.0,
            PEDepthHigher: 0.0,
            CEDeepLower: 0.0,
            CEDeepHigher: 0.0,
            PEDeepLower: 0.0,
            PEDeepHigher: 0.0,
            DepthofStrike: 0,
            TradeCount: "",
        },
        validate: (values) => {
            let errors = {};
            const mcxMaxTime = "23:29:59";
            const mcxMinTime = "08:59:59"
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype) {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.Targetvalue) {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue) {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.EntryTime == "") {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < (EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.EntryTime = `Entry Time Must be After ${EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime}.`;
            } else if (values.EntryTime > (EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.EntryTime = `Entry Time Must be Before ${EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime}.`;
            }

            if (values.ExitTime == "") {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime < (EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.ExitTime = `Exit Time Must be After ${EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime}.`;
            } else if (values.ExitTime > (EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.ExitTime = `Exit Time Must be Before ${EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime}.`;
            }

            if (values.EntryTime && values.ExitTime && values.EntryTime >= values.ExitTime) {
                errors.ExitTime = "Exit Time should be greater than Entry Time.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                MainStrategy: data,
                Strategy: EditDataPattern.TradePattern,
                Symbol: EditDataPattern.Symbol,
                Username: userName,
                ETPattern: EditDataPattern.Pattern,
                Timeframe: EditDataPattern.TimeFrame,
                Targetvalue: Number(values.Targetvalue),
                Slvalue: Number(values.Slvalue),
                TStype: EditDataPattern.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: 0.0,
                HigherRange: 0.0,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataPattern.ExitDay,
                TradeExecution: EditDataPattern.TradeExecution,
                Group: "",
                CEDepthLower: 0.0,
                CEDepthHigher: 0.0,
                PEDepthLower: 0.0,
                PEDepthHigher: 0.0,
                CEDeepLower: 0.0,
                CEDeepHigher: 0.0,
                PEDeepLower: 0.0,
                PEDeepHigher: 0.0,
                DepthofStrike: 1,
                TradeCount: Number(values.TradeCount)
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });


    const fields1 = [
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Quantity",
            label: showEditModal && EditDataScalping.Exchange == "NFO" ? "Lot" : "Quantity",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },



        {
            name: "WorkingDay",
            label: "Working Day ",
            type: "multiselect",
            options: [
                { label: "Monday", value: "Monday" },
                { label: "Tuesday", value: "Tuesday" },
                { label: "Wednesday", value: "Wednesday" },
                { label: "Thursday", value: "Thursday" },
                { label: "Friday", value: "Friday" },
                { label: "Saturday", value: "Saturday" },

            ],
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

    ];

    const fields2 = [
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percantage", value: "Percantage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Quantity",
            label: "Lot Size",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

    ];



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
            col_size: 4,
            disable: false,
        },

        {
            name: "EntryPrice",
            label: showEditModal && EditDataScalping.PositionType === "Single" ? "Lower Price" : "First Trade Lower Range",
            type: "text3",
            col_size: 4,
            disable: false,
            headingtype: 2,
            hiding: false,
        },

        {
            name: "EntryRange",
            label: showEditModal && EditDataScalping.PositionType === "Single" ? "Higher Price" : "First Trade Higher Range",
            type: "text3",
            label_size: 12,
            headingtype: 2,
            col_size: 4,
            disable: false,
            hiding: false,
        },


    ];


    const RiskManagementArr = [

        {
            name: "LowerRange",
            label: "Lower Range",
            type: "text3",
            label_size: 12,
            col_size: 4,
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
            // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            headingtype: 4,
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
            // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
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
            // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
            label_size: 12,
            col_size: 4,
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
            showWhen: (values) => showEditModal && EditDataScalping.PositionType === "Multiple",

            label_size: 12,
            col_size: 4,
            headingtype: 4,
            disable: false,
            // iconText: text.Increment_Type,
            hiding: false,
        },

        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text3",
            label_size: 12,
            headingtype: 4,
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple" && formik.values.TargetExit == "true",
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
            iconText: text.Trade_Count,
            disable: false,
            hiding: false,
        },

        {
            name: "RepeatationCount",
            label: "Repeatation Count",
            type: "text3",
            label_size: 12,
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
            headingtype: 4,
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
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
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
            label_size: 12,
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
            headingtype: 4,
            disable: false,
            hiding: false,
        },

        {
            name: "WorkingDay",
            label: "Working Day",
            type: "multiselect",
            options: [
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
            showWhen: () => showEditModal,
            disable: false,
            hiding: false
        },

        {
            name: "Profit",
            label: "Max Profit ",
            type: "text3",
            label_size: 12,
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
            headingtype: 4,
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
            disable: false,
            hiding: false,
        },
        {
            name: "Loss",
            label: "Max Loss ",
            type: "text3",
            label_size: 12,
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
            headingtype: 4,
            showWhen: () => showEditModal && EditDataScalping.PositionType === "Multiple",
            disable: false,
            hiding: false,
        },




    ];

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

    ];

    const ExitRuleArr = [



        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],
            // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            showWhen: () => showEditModal && EditDataScalping.PositionType !== "Multiple",
            label_size: 12,
            headingtype: 4,
            col_size: 4,
            hiding: false,
            disable: false,
        },

        {
            name: "Targetvalue",
            label: EditDataScalping.PositionType === "Single" ? "Target 1" : "Fixed Target",
            type: "text3",
            label_size: 12,
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
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
            showWhen: (values) => EditDataScalping.PositionType === "Single",
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
            showWhen: (values) => EditDataScalping.PositionType === "Single",
            headingtype: 3,
            disable: false,
            hiding: false,
        },

        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text3",
            label_size: 12,
            col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
            headingtype: 3,
            disable: false,
            hiding: false,
        },
    ];


    const fields = [
        {
            name: "Heading",
            label: "Entry_Rule",
            type: "heading",
            hiding: false,
            label_size: 12,
            headingtype: 2,
            col_size: 12,
            data: EntryRuleArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
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
            data: RiskManagementArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
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
            data: ExitRuleArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
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
            data: TimeDurationArr.filter(
                (item) => !item.showWhen || item.showWhen(formik.values)
            ),
            disable: false,
        },
        // {
        //     name: "Heading",
        //     label: "Other_Parameters",
        //     type: "heading",
        //     hiding: false,
        //     label_size: 12,
        //     col_size: 12,
        //     headingtype: 6,
        //     data: OtherParameterArr.filter(
        //         (item) => !item.showWhen || item.showWhen(formik.values)
        //     ),
        //     disable: false,
        // },
    ];



    useEffect(() => {
        if (data == "Scalping") {
            const WorkingDay = EditDataScalping?.WorkingDay?.map(day => {
                return { label: day, value: day }
            })
            console.log("EditDataScalping.TargetExit", EditDataScalping.TargetExit)

            formik.setFieldValue('EntryPrice', EditDataScalping.EntryPrice)
            formik.setFieldValue('EntryRange', EditDataScalping.EntryRange)
            formik.setFieldValue('Targetvalue', parseFloat(EditDataScalping['Booking Point']))
            formik.setFieldValue('tgp2', parseFloat(EditDataScalping['Booking Point2']))
            formik.setFieldValue('tgp3', parseFloat(EditDataScalping['Booking Point3']))
            formik.setFieldValue('Slvalue', parseFloat(EditDataScalping['Re-entry Point']))
            formik.setFieldValue('HoldExit', EditDataScalping.HoldExit)
            formik.setFieldValue('EntryTime', EditDataScalping.EntryTime)
            formik.setFieldValue('ExitTime', EditDataScalping.ExitTime)
            formik.setFieldValue('Quantity', EditDataScalping.Quantity)
            formik.setFieldValue('TradeCount', EditDataScalping.TradeCount)
            formik.setFieldValue("TType", EditDataScalping.TType)
            formik.setFieldValue("TStype", EditDataScalping.TStype)
            formik.setFieldValue("Quantity", EditDataScalping.Quantity)
            formik.setFieldValue("EntryPrice", parseFloat(EditDataScalping.EntryPrice))
            formik.setFieldValue("EntryRange", parseFloat(EditDataScalping.EntryRange))
            formik.setFieldValue("HoldExit", EditDataScalping.HoldExit)
            formik.setFieldValue("Symbol", EditDataScalping.Symbol)
            formik.setFieldValue("ExitDay", EditDataScalping.ExitDay)
            formik.setFieldValue("RepeatationCount", EditDataScalping.RepeatationCount)
            formik.setFieldValue("RolloverTF", EditDataScalping.RolloverTF)
            formik.setFieldValue("Profit", EditDataScalping.Profit)
            formik.setFieldValue("Loss", EditDataScalping.Loss)
            formik.setFieldValue("TargetExit", EditDataScalping.TargetExit)
            formik.setFieldValue('WorkingDay', WorkingDay);


        }
        else if (data == "Option Strategy") {

            const WorkingDay = EditDataOption?.WorkingDay?.map(day => {
                return { label: day, value: day }
            })
            formik1.setFieldValue('TStype', EditDataOption.strategytype)
            formik1.setFieldValue('Targetvalue', EditDataOption['Target value'])
            formik1.setFieldValue('Slvalue', EditDataOption['SL value'])
            formik1.setFieldValue('Quantity', EditDataOption['Lot Size'])
            formik1.setFieldValue('EntryTime', EditDataOption['Entry Time'])
            formik1.setFieldValue('ExitTime', EditDataOption['Exit Time'])
            formik1.setFieldValue('TradeCount', EditDataOption.TradeCount)
            formik1.setFieldValue('WorkingDay', WorkingDay)
        }
        else if (data == "Pattern") {

            formik2.setFieldValue('TStype', EditDataPattern.TStype)
            formik2.setFieldValue('Targetvalue', EditDataPattern['Target value'])
            formik2.setFieldValue('Slvalue', EditDataPattern['SL value'])
            formik2.setFieldValue('Quantity', EditDataPattern.Quantity)
            formik2.setFieldValue('EntryTime', EditDataPattern.EntryTime)
            formik2.setFieldValue('ExitTime', EditDataPattern.ExitTime)
            formik2.setFieldValue('TradeCount', EditDataPattern.TradeCount)

        }
    }, [showEditModal, data, EditDataScalping])


    const updatedFields = fields.filter((item) => {
        return item.hiding == false
    })

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-body" style={{ padding: '3px' }}>
                            <div className="tab-content" id="myTabContent-3">

                                <div className="tab-pane fade show active" id="home-justify" role="tabpanel" aria-labelledby="home-tab-justify">
                                    {data && (
                                        <>
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    {/* {console.log("data Is", data)} */}
                                                    {tableType === "MultiCondition" ? <h4 className="card-title">{"Multi Condition"}</h4> : <h4 className="card-title">{data}</h4>
                                                    }
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <button className='btn btn-primary mt-1' style={{ fontSize: '18px', padding: '6px 14px', height: "47px" }} onClick={() => AddScript(data)}>Add Script</button>
                                                </div>

                                            </div>
                                            <div className="iq-card-body " style={{ padding: '3px' }}>
                                                <div className="table-responsive">

                                                    {/* {
                                                        getAllService.loading ? (
                                                            <Loader />
                                                        ) : (
                                                            (() => {
                                                                const hasPrimaryTableData =
                                                                    tableType === "Scalping" &&
                                                                    (
                                                                        (data === "Scalping" && getAllService.ScalpingData?.length > 0) ||
                                                                        (data === "Option Strategy" && getAllService.OptionData?.length > 0) ||
                                                                        ((data === "Pattern" || data === "Pattern Script") && getAllService.PatternData?.length > 0) ||
                                                                        (data === "ChartingPlatform" && getCharting?.length > 0)
                                                                    );

                                                                const hasSecondaryTableData =
                                                                    data === "Scalping" &&
                                                                    tableType === "MultiCondition" &&
                                                                    getAllService.NewScalping?.length > 0;

                                                                if (!hasPrimaryTableData && !hasSecondaryTableData) {
                                                                    return (
                                                                       
                                                                        <NoDataFound />
                                                                    );
                                                                }

                                                                return (
                                                                    <>
                                                                        {hasPrimaryTableData && (
                                                                            <FullDataTable
                                                                                columns={
                                                                                    data === "Scalping" && tableType == "Scalping"
                                                                                        ? getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                        : data === "Option Strategy"
                                                                                            ? getColumns4(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                            : (data === "Pattern" || data === "Pattern Script")
                                                                                                ? getColumns5(handleDelete, handleEdit, HandleContinueDiscontinue,)
                                                                                                : data === "ChartingPlatform"
                                                                                                    ? getColumns8(HandleContinueDiscontinue)
                                                                                                    : getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                }
                                                                                data={
                                                                                    data === "Scalping"
                                                                                        ? getAllService.ScalpingData
                                                                                        : data === "Option Strategy"
                                                                                            ? getAllService.OptionData
                                                                                            : (data === "Pattern" || data === "Pattern Script")
                                                                                                ? getAllService.PatternData
                                                                                                : data === "ChartingPlatform"
                                                                                                    ? getCharting
                                                                                                    : []
                                                                                }
                                                                                checkBox={false}
                                                                            />
                                                                        )}

                                                                        {/* {console.log("getAllService", getAllService)} 


                                                                        {hasSecondaryTableData && (
                                                                            <div>
                                                                                
                                                                                <FullDataTable
                                                                                    columns={getColumns6(handleDelete, handleEdit, HandleContinueDiscontinue, handleMatchPosition,)}
                                                                                    data={getAllService.NewScalping}
                                                                                    checkBox={false}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })()
                                                        )
                                                    } */}


                                                    {getAllService.loading ? (
                                                        <Loader />
                                                    ) : (

                                                        (data === "Scalping" && getAllService.NewScalping?.length > 0) ||
                                                            (data === "Option Strategy" && getAllService.OptionData?.length > 0) ||
                                                            ((data === "Pattern" || data === "Pattern Script") && getAllService.PatternData?.length > 0) ||
                                                            (data === "ChartingPlatform" && getCharting?.length > 0) ? (
                                                            <FullDataTable
                                                                columns={
                                                                    data === "Scalping"
                                                                        ? getColumns6(handleDelete, handleEdit, HandleContinueDiscontinue, handleMatchPosition)
                                                                        : data === "Option Strategy"
                                                                            ? getColumns4(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                            : (data === "Pattern" || data === "Pattern Script")
                                                                                ? getColumns5(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                                : data === "ChartingPlatform"
                                                                                    ? getColumns8(HandleContinueDiscontinue)
                                                                                    : getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue)
                                                                }
                                                                data={
                                                                    data === "Scalping"
                                                                        ? getAllService.NewScalping
                                                                        : data === "Option Strategy"
                                                                            ? getAllService.OptionData
                                                                            : (data === "Pattern" || data === "Pattern Script")
                                                                                ? getAllService.PatternData
                                                                                : data === "ChartingPlatform"
                                                                                    ? getCharting
                                                                                    : []
                                                                }
                                                                checkBox={false}
                                                            />
                                                        ) : (
                                                            <NoDataFound />
                                                        )


                                                    )



                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showEditModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                <div className="modal-dialog modal-xl modal-dialog-centered p-2">
                    <div className="modal-content ">
                        <div className="modal-header ">
                            <h5 className="modal-title">Edit Script</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { setShowEditModal(false); formik.resetForm() }}
                            />
                        </div>
                        {
                            data == "Scalping" ? <>
                                <div className='p-4'>

                                    <Formikform
                                        fields={(EditDataScalping.PositionType !== "Multiple" ? updatedFields : fields).filter(
                                            (field) => !field.showWhen || field.showWhen(formik.values)
                                        )}

                                        btn_name="Update"
                                        formik={formik}
                                    />
                                </div>
                            </> :
                                data == "Option Strategy" ? <>

                                    <div className='p-4'>
                                        <Formikform
                                            fields={fields1}
                                            btn_name="Update"
                                            formik={formik1}
                                        />
                                    </div>
                                </>
                                    :
                                    <div className='p-4'>
                                        <Formikform
                                            fields={fields2.filter(
                                                (field) => !field.showWhen || field.showWhen(formik2.values)
                                            )}

                                            btn_name="Update"
                                            formik={formik2}
                                        />
                                    </div>
                        }
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Coptyscript;
