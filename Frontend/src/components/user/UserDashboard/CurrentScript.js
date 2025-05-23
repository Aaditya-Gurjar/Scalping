import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullDataTable from "../../../ExtraComponent/CommanDataTable(original)";
import {
  GetAllUserScript,
  DeleteUserScript,
  Discontinue,
  Continue,
  UpdateUserScript,
  GetUserScripts,
  getUserChartingScripts,
  DeleteSingleChartingScript,
  MatchPosition,
  chartAllotStrategyApi,
} from "../../CommonAPI/User";
import Loader from "../../../ExtraComponent/Loader";
import {
  getColumns3,
  getColumns4,
  getColumns5,
  getColumns6,
  getColumns8,
} from "./Columns";
import Swal from "sweetalert2";
import Formikform from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { text } from "../../../ExtraComponent/IconTexts";
import { connectWebSocket } from "./LivePrice";
import $ from "jquery";
import ChartingCardDashboard from "../UserScript/ChartingCard";
import { FaTable, FaTh } from "react-icons/fa"; // Update the import to use a different icon for card view
import { FixedOffsetZone } from "luxon";
import ChartingCard from "./ChartingCard";
import AddChartingScript from "../UserScript/AddChartingScript";

const Coptyscript = ({ tableType, data, selectedType, FromDate, ToDate }) => {


  const userName = localStorage.getItem("name");
  const strategyType = sessionStorage.getItem("StrategyType");

  const adminPermission = localStorage.getItem("adminPermission");
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [EditDataScalping, setEditDataScalping] = useState({});
  const [EditDataOption, setEditDataOption] = useState({});
  const [EditDataPattern, setEditDataPattern] = useState({});
  const [allScripts, setAllScripts] = useState({ data: [], len: 0 });
  const [allScripts2, setAllScripts2] = useState({ data: [], len: 0 });

  const [editCharting, setEditCharting] = useState();
  const [getCharting, setGetCharting] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [view, setView] = useState("table");
  const fixedRowPerPage = data === 'ChartingPlatform' ? 15 : 5;

  const [chartingSubTab, setChartingSubTab] = useState("Cash");

  const stg = sessionStorage.getItem("StrategyType");



  const [getAllService, setAllservice] = useState({
    loading: true,
    ScalpingData: [],
    OptionData: [],
    PatternData: [],
    PatternOption: [],
    Marketwise: [],
    PremiumRotation: [],
  });


  useEffect(() => {
    GetUserAllScripts();
    GetChartingAllotStg();
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      await GetUserAllScripts();
      await GetChartingAllotStg(); // Ensure allScripts2 is loaded properly on page load
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (data === "ChartingPlatform") {
      GetChartingAllotStg(); // Ensure data is refreshed for ChartingPlatform
      getChartingScript(); // Fetch charting scripts for the selected tab
    }
  }, [data, chartingSubTab]);

  useEffect(() => {
    if (data === "ChartingPlatform" && allScripts2.data.length === 0) {
      GetChartingAllotStg();
    }
  }, [strategyType]);

  useEffect(() => {
    if (data == "ChartingPlatform") getChartingScript();
  }, [data, chartingSubTab]);


  useEffect(() => {
    if (stg !== "ChartingPlatform") {
      setView("table")
    }
  }, [stg])


  useEffect(() => {
    let updatedList = "";

    if (data === "Scalping") {
      updatedList = getAllService.NewScalping?.map(item => `${item.Exchange}|${item.Token}`).join("#");
    } else if (data === "Option Strategy") {
      updatedList = getAllService.OptionData?.map(item => `${item.Exchange}|${item.Token}`).join("#");
    } else if (data === "Pattern" || data === "Pattern Script") {
      updatedList = getAllService.PatternData?.map(item => `${item.Exchange}|${item.Token}`).join("#");
    } else if (data === "ChartingPlatform") {
      updatedList = getCharting?.map(item => `${item.Exchange}|${item.Token}`).join("#");
    }

    setChannelList(updatedList);
  }, [data, getAllService, getCharting]);


  useEffect(() => {
    showLivePrice()
  }, [channelList]);


  const showLivePrice = async () => {
    connectWebSocket(channelList, (data) => {
      if (data.lp && data.tk) {
        $(".LivePrice_" + data.tk).html(data.lp);
        // console.log("Updated Price Data:", data);
      }
    });
  }


  const getChartingScript = async () => {
    const req = { Username: userName, Segment: chartingSubTab, From_date: FromDate, To_date: ToDate };
    await getUserChartingScripts(req)
      .then((response) => {

        if (response?.Status) {
          setGetCharting(response.Client);
        } else {
          setGetCharting([]);
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  useEffect(() => {
    getChartingScript();
  }, [FromDate, ToDate])


  // chartAllotStrategyApi

  const GetUserAllScripts = async () => {
    const data = { Username: userName };
    await GetUserScripts(data)
      .then((response) => {
        if (response.Status) {
          localStorage.setItem("Planname", response.data[0].Planname || "");
          setAllScripts({
            data: response.data,
            len: response.data?.length - 1,
            Planname: response.data[response.data?.length - 1].Planname,
          });
        } else {
          setAllScripts({
            data: [],
            len: 0,
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };



  const GetChartingAllotStg = async () => {
    const data = { Username: userName };
    await chartAllotStrategyApi(data)
      .then((response) => {
        if (response.Status) {
          setAllScripts2({
            data: response.data,
            len: response.data?.length - 1,
            Planname: response.data[response.data?.length - 1].Planname,
          });
          
          const res = response?.data?.[response.len]?.CombineChartingSignal?.length 
        } else {
          setAllScripts2({
            data: [],
            len: 0,
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const SweentAlertFun = (text) => {
    Swal.fire({
      title: "Error",
      text: text,
      icon: "error",
      timer: 10000,
      timerProgressBar: true,
    });
  };

  const handleDelete = async (rowData, type) => {
    const index = rowData.rowIndex;
    const req =
      data == "Scalping" && type == 1
        ? {
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
          PatternName: "",
        }
        : data == "Option Strategy"
          ? {
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
            PatternName: "",
          }
          : data == "Pattern" || data == "Pattern Script"
            ? {
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
              PatternName: "",
            }
            : data == "Scalping" && type == 2
              ? {
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
                PatternName: "",
              }
              : "";

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
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
                },
              });
              setTimeout(() => {
                sessionStorage.setItem("redirectStrategyType", data);
                // window.location.reload();
              }, 1500);
            } else {
              Swal.fire({
                title: "Error !",
                text: response.message,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              });
            }
          })
          .catch((err) => {
            console.log("Error in delete script", err);
          });
      }
    });
  };

  const handleMatchPosition = async (rowData, type) => {
    const index = rowData.rowIndex;

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
    };
    if (req) {
      try {
        const response = await MatchPosition(req);
        if (response.status) {
          Swal.fire({
            title: response.Status ? "Success" : "Error !",
            text: response.message,
            icon: response.Status ? "success" : "error",
            timer: 1500,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            title: "Error !",
            text: "Something went wrong!",
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error !",
          text: error.message || "Something went wrong!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    }
  };

  const handleEdit = async (rowData, type = 1) => {
    setShowEditModal(true);
    const index = rowData.rowIndex;
    if (data == "Scalping" && type == 1) {
      setEditDataScalping(getAllService.ScalpingData[index]);
    } else if (data == "Scalping" && type == 2) {
      setEditDataScalping(getAllService.NewScalping[index]);
    } else if (data == "Option Strategy") {
      setEditDataOption(getAllService.OptionData[index]);
    } else if (data == "Pattern" || data == "Pattern Script") {
      setEditDataPattern(getAllService.PatternData[index]);
    } else {
      setEditDataPattern(getAllService.PatternData[index]);
    }
  };
  const HandleContinueDiscontinue = async (rowData, type) => {

    const index = rowData.rowIndex;
    const isOpen = rowData.tableData[index][5];

    // if (isOpen !== undefined || isOpen !== null || isOpen !== "" || isOpen !== "Open") {
    //   Swal.fire({
    //     title: "Status is Not Open",
    //     text: "Unable to Exit",
    //     icon: "warning",
    //     timer: 2000,
    //     timerProgressBar: true,
    //   });
    //   return;
    // }

    let trading;

    if (data == "Scalping" && type == 1) {
      trading = getAllService.ScalpingData[index].Trading;
    } else if (data == "Scalping" && type == 2) {
      trading = getAllService.NewScalping[index].Trading;
    } else if (data == "Pattern" || data == "Pattern Script") {
      trading = getAllService.PatternData[index].Trading;
    } else if (data == "Option Strategy") {
      trading = getAllService.OptionData[index].Trading;
    } else if (data == "ChartingPlatform") {
      trading = getCharting[index].Trading;
    } else {
      console.log("Error in finding the trading status");
      return;
    }

    if (trading) {
      Swal.fire({
        title: "Do you want to Discontinue",
        text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const req =
            data == "Scalping" && type == 1
              ? {
                Username: userName,
                MainStrategy: data,
                Strategy:
                  getAllService.ScalpingData[index].ScalpType ==
                    "Multi_Conditional"
                    ? getAllService.NewScalping[index].Targetselection
                    : getAllService.ScalpingData[index].ScalpType,
                Symbol: getAllService.ScalpingData[index].Symbol,
                ETPattern: "",
                Timeframe: "",
                TType: "",
                Group: getAllService.ScalpingData[index].GroupN,
                TradePattern: "",
                TSymbol: "",
                PatternName: "",
              }
              : data == "Option Strategy"
                ? {
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
                  PatternName: "",
                }
                : data == "Pattern" || data == "Pattern Script"
                  ? {
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
                    PatternName: "",
                  }
                  : data == "Scalping" && type == 2
                    ? {
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
                      PatternName: "",
                    }
                    : data == "ChartingPlatform"
                      ? {
                        Username: userName,
                        User: getCharting[index]?.AccType,
                        Symbol: getCharting[index]?.TSymbol,
                      }
                      : "";

          await Discontinue(req) // Pass the req object here
            .then((response) => {
              if (response.Status) {
                Swal.fire({
                   // background: "#1a1e23 ",
                  backdrop: "#121010ba",
                  title: "Success",
                  text: response.message,
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                }).then(() => {
                  setRefresh(!refresh);
                });
              } else {
                Swal.fire({
                  title: "Error !",
                  text: response.message,
                  icon: "error",
                  timer: 2000,
                  timerProgressBar: true,
                });
              }
            })
            .catch((err) => {
              console.log("Error in delete script", err);
            });
        }
      });
    } else if (data == "ChartingPlatform") {

      if (data == "ChartingPlatform") {
        const req = {
          Username: userName,
          // User: getCharting[index]?.AccType,
          Symbol: getCharting[index]?.TSymbol,
        }
        await DeleteSingleChartingScript(req).then((response) => {

          if (response.Status) {
            Swal.fire({
               // background: "#1a1e23 ",
              backdrop: "#121010ba",
              title: "Success",
              text: response.message,
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            }).then(() => {

              setRefresh(!refresh);
            });
          } else {
            Swal.fire({
              title: "Error !",
              text: response.message,
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
            });
          }
        });
      } else {
        // await Discontinue(req)
        //   .then((response) => {
        //     if (response.Status) {
        //       Swal.fire({
        //         // title: "Success",
        //         // text: response.message,
        //         // icon: "success",
        //         // timer: 2000,
        //         // timerProgressBar: true
        //          // background: "#1a1e23 ",
        //         backdrop: "#121010ba",
        //         title: "Success",
        //         text: response.message,
        //         icon: "success",
        //         timer: 2000,
        //         timerProgressBar: true,
        //       }).then(() => {
        //         setRefresh(!refresh);
        //       });
        //     } else {
        //       Swal.fire({
        //         title: "Error !",
        //         text: response.message,
        //         icon: "error",
        //         timer: 2000,
        //         timerProgressBar: true,
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     console.log("Error in delete script", err);
        //   });
      }
      return;
    } else {
      {
        Swal.fire({
          title: "Do you want to Continue",
          text: "You won't be able to revert this!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const req =
              data == "Scalping" && type == 1
                ? {
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
                  PatternName: "",
                }
                : data == "Option Strategy"
                  ? {
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
                    PatternName: "",
                  }
                  : data == "Pattern" || data == "Pattern Script"
                    ? {
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
                      PatternName: "",
                    }
                    : data == "Scalping" && type == 2
                      ? {
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
                        PatternName: "",
                      }
                      : "";

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
                     // background: "#1a1e23 ",
                    backdrop: "#121010ba",
                    title: "Success",
                    text: response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                  }).then(() => {
                    setRefresh(!refresh);
                  });
                } else {
                  Swal.fire({
                    title: "Error !",
                    text: response.message,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                  });
                }
              })
              .catch((err) => {
                console.log("Error in delete script", err);
              });
          }
        });
      }
    }
  };

  const AddScript = (data) => {
    if (data === "ChartingPlatform") {
      if (allScripts2?.data?.[allScripts2.len]?.CombineChartingSignal?.length >= 1) {
        navigate("/user/newscript/charting2", {
          state: {
            data: {
              selectStrategyType: "ChartingPlatform",
              scriptType: allScripts2,
              tableType,
              data,
              selectedType,
              FromDate,
              ToDate,
              chartingSubTab, // Pass the current tab
              getCharting,
              view,
              fixedRowPerPage,
            },
          },
        });
      } else {
        Swal.fire({
          title: "Warning",
          text: "You don't have any valid plan to use this strategy",
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } else {
      if (data === "Option Strategy") {
        if (allScripts?.data?.[allScripts.len]?.CombineOption?.length >= 1) {
          navigate("/user/newscript/option", {
            state: {
              data: {
                selectStrategyType: "Option Strategy",
                scriptType: allScripts,
              },
            },
          });
        } else {
          Swal.fire({
            title: "Warning",
            text: "You don't have any valid plan to use this strategy",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      } else if (data === "Pattern" || data === "Pattern Script") {
        if (allScripts?.data?.[allScripts.len]?.CombinePattern?.length >= 1) {
          navigate("/user/newscript/pattern", {
            state: {
              data: { selectStrategyType: "Pattern", scriptType: allScripts },
            },
          });
        } else {
          Swal.fire({
            title: "Warning",
            text: "You don't have any valid plan to use this strategy",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      }
      else if (data === "ChartingPlatform") {


        console.log("chartinggggg: ", allScripts2?.data?.[allScripts2.len])

        if (allScripts2?.data?.[allScripts2.len]?.CombineChartingSignal?.length >= 1) {

          navigate("/user/newscript/charting", {
            state: {
              data: {
                selectStrategyType: "ChartingPlatform",
                scriptType: allScripts2,
              },
            },
          });
        } else {
          Swal.fire({
            title: "Warning",
            text: "You don't have any valid plan to use this strategy",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      } else {

        if (allScripts?.data?.[allScripts.len]?.CombineScalping?.length >= 1) {
          navigate("/user/newscript/scalping", {
            state: {
              data: { selectStrategyType: "Scalping", scriptType: allScripts },
            },
          });
              
        } else {
          Swal.fire({
            title: "Warning",
            text: "You don't have any valid plan to use this strategy",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      }
    }
  };

  const GetAllUserScriptDetails = async () => {
    const data = { userName: userName };

    await GetAllUserScript(data)
      .then((response) => {
        if (response.Status) {
          // console.log("GetAllUserScriptDetails",response);
          // const channelList = response.NewScalping.map(item => `${item.Exchange}|${item.Token}`).join("#");

          setAllservice({
            loading: false,
            ScalpingData: response.Scalping,
            OptionData: response.Option,
            PatternData: response.Pattern,
            PatternOption: response.PatternOption,
            Marketwise: response.Marketwise,
            PremiumRotation: response.PremiumRotation,
            NewScalping: response.NewScalping,
          });
        } else {
          setAllservice({
            loading: false,
            ScalpingData: [],
            OptionData: [],
            PatternData: [],
            PatternOption: [],
            Marketwise: [],
            PremiumRotation: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding group service", err);
      });
  };

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
      FinalTarget: 0.0,

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
      const mcxMinTime = "08:59:59";
      const maxTime = "15:29:59";
      const minTime = "09:15:00";

      if (
        values.TStype == "" &&
        showEditModal &&
        EditDataScalping.ScalpType != "Fixed Price"
      ) {
        errors.TStype = "Please select Measurement Type";
      }

      if (values.Targetvalue == 0.0 || !values.Targetvalue) {
        errors.Targetvalue = "Please enter Target value";
      }
      if (values.Slvalue == 0 || !values.Slvalue) {
        errors.Slvalue = "Please enter SL value";
      }
      if (
        !values.EntryPrice &&
        values.EntryPrice != 0 &&
        showEditModal &&
        EditDataScalping.ScalpType != "Fixed Price"
      ) {
        errors.EntryPrice = "Please enter Entry Price";
      }
      if (
        !values.EntryRange &&
        values.EntryRange != 0 &&
        showEditModal &&
        EditDataScalping.ScalpType != "Fixed Price"
      ) {
        errors.EntryRange = "Please enter Entry Range";
      }
      if (
        EditDataScalping.PositionType === "Multiple" &&
        !values.LowerRange &&
        values.LowerRange != 0
      ) {
        errors.LowerRange = "Please enter Lower Range";
      }
      if (
        EditDataScalping.PositionType === "Multiple" &&
        !values.HigherRange &&
        values.HigherRange != 0
      ) {
        errors.HigherRange = "Please enter Higher Range";
      }
      if (
        values.HoldExit == "" &&
        showEditModal &&
        EditDataScalping.ScalpType != "Fixed Price"
      ) {
        errors.HoldExit = "Please select Hold/Exit";
      }

      if (values.EntryTime == "") {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (
        values.EntryTime <
        (EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.EntryTime = `Entry Time Must be After ${EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.EntryTime >
        (EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.EntryTime = `Entry Time Must be Before ${EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (values.ExitTime == "") {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (
        values.ExitTime <
        (EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.ExitTime = `Exit Time Must be After ${EditDataScalping.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.ExitTime >
        (EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.ExitTime = `Exit Time Must be Before ${EditDataScalping.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (
        values.EntryTime &&
        values.ExitTime &&
        values.EntryTime >= values.ExitTime
      ) {
        errors.ExitTime = "Exit Time should be greater than Entry Time.";
      }

      if (!values.TradeCount) {
        errors.TradeCount = "Please Enter Trade Count.";
      }
      if (!values.RolloverTF && EditDataPattern.RolloverTF === true) {
        errors.RolloverDay = "Please Select RollOver"
      }

      if (!values.RolloverTF && values.ScalpType == "Multi_Conditional" &&
        values.PositionType == "Multiple") {
        errors.RolloverTF = "Please Select RollOver";
      }


      if (
        !values.RolloverDay &&
        values.ScalpType == "Multi_Conditional" &&
        values.PositionType == "Multiple" &&
        values.RolloverTF == true
      ) {
        errors.RolloverDay = "Please Enter No. of Days";
      }

      if (
        !values.RolloverTime &&
        values.ScalpType == "Multi_Conditional" &&
        values.PositionType == "Multiple" &&
        values.RolloverTF == true
      ) {
        errors.RolloverTime = "Please Enter RollOver Exit Time";
      }

      if (
        !values.PEDeepLower &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy") &&
        values.PEDeepLower == 0
      ) {
        errors.PEDeepLower =
          values.PEDeepLower == 0
            ? "PE Hedge Lower can not be Zero"
            : "Please Enter PE Hedge Lower.";
      }

      if (
        !values.PEDepthHigher &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy") &&
        values.PEDepthHigher == 0
      ) {
        errors.PEDepthHigher =
          values.PEDepthHigher == 0
            ? "PE Main Higher can not be Zero"
            : "Please Enter PE Main Higher.";
      }

      if (
        !values.PEDeepHigher &&
        values.PEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepHigher =
          values.PEDeepHigher == 0
            ? "PE Hedge Higher can not be Zero"
            : "Please Enter PE Hedge Higher.";
      }
      if (
        !values.CEDepthLower &&
        values.CEDepthLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDepthLower =
          values.CEDepthLower == 0
            ? "CE Main Lower can not be Zero"
            : "Please Enter CE Main Lower";
      }
      if (
        !values.CEDepthHigher &&
        values.CEDepthHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDepthHigher =
          values.CEDepthHigher == 0
            ? "CE Main Higher can not be Zero"
            : "Please Enter CE Main Higher";
      }
      if (
        !values.PEDepthLower &&
        values.PEDepthLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDepthLower =
          values.PEDepthLower == 0
            ? "PE Main Lower can not be Zero"
            : "Please Enter PE Main Lower";
      }
      if (
        !values.CEDeepLower &&
        values.CEDeepLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDeepLower =
          values.CEDeepLower == 0
            ? "CE Hedge Lower can not be Zero"
            : "Please Enter CE Hedge Lower";
      }
      if (
        !values.CEDeepHigher &&
        values.CEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDeepHigher =
          values.CEDeepHigher == 0
            ? "CE Hedge Higher can not be Zero"
            : "Please Enter CE Hedge Higher";
      }
      if (
        !values.PEDeepHigher &&
        values.PEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepHigher =
          values.PEDeepHigher == 0
            ? "PE Hedge Higher can not be Zero"
            : "Please Enter PE Hedge Higher";
      }

      if (EditDataScalping.Targetselection == "Entry Wise SL" &&
        values.FinalTarget == undefined ||
        (values.FinalTarget == "" &&
          formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional" &&
          formik.values.Targetselection == "Entry Wise SL")
      ) {
        errors.FinalTarget = "Please Enter Final Target Price";
      }


      return errors;
    },
    onSubmit: async (values) => {

      const req = {

        MainStrategy: "NewScalping", // str
        Strategy: values.Strategy || EditDataScalping.Targetselection,
        Symbol: values.Symbol || EditDataScalping.Symbol, // str
        Username: userName, // str
        ETPattern: values.ETPattern || EditDataScalping.TType, // str (Trade type)
        Timeframe: "", // str
        Targetvalue: parseFloat(values.Targetvalue) || parseFloat(EditDataScalping["Booking Point"]), // float
        Slvalue: parseFloat(values.Slvalue), // float
        TStype: EditDataScalping.ScalpType != "Fixed Price" ? values.TStype : EditDataScalping.TStype, // str
        LowerRange: values.LowerRange || 0.0, // float (Profit in scalping)
        HigherRange: values.HigherRange || 0.0, // float (Loss in scalping)
        HoldExit: values.HoldExit || EditDataScalping.HoldExit || "HoldExit", // str
        EntryPrice: values.EntryPrice || parseFloat(EditDataScalping.EntryPrice) || 0.0, // float
        EntryRange: values.EntryRange || parseFloat(EditDataScalping.EntryRange) || 0.0, // float
        EntryTime: values.EntryTime || EditDataScalping.EntryTime, // str
        ExitTime: values.ExitTime || EditDataScalping?.ExitTime, // str
        ExitDay: values.ExitDay || EditDataScalping.ExitDay || "", // str
        TradeExecution: values.TradeExecution || EditDataScalping.TradeExecution || "", // str
        Group: values.Group || EditDataScalping.GroupN || "", // str
        FinalTarget: values.FinalTarget || parseFloat(EditDataScalping.FinalTarget),
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

        TradeCount: values.TradeCount || EditDataScalping.TradeCount || 0, // int

        // Additional trade parameters
        tgp2: values.tgp2 || EditDataScalping["Booking Point 2"] || 0.0,
        tgp3: values.tgp3 || EditDataScalping["Booking Point 3"] || 0.0,
        RolloverTF: values.RolloverTF || EditDataScalping.RolloverTF, // bool
        RolloverDay: values.RolloverDay || EditDataScalping.RolloverDay, // str
        RolloverTime: values.RolloverTime || EditDataScalping.RolloverTime, // str
        TargetExit: values.TargetExit, // bool
        RepeatationCount: values.RepeatationCount || EditDataScalping.RepeatationCount || 0, // int
        Profit: values.Profit || EditDataScalping.Profit || 0.0, // float
        Loss: values.Loss || EditDataScalping.Loss || 0.0, // float
        WorkingDay: values.WorkingDay?.map(day => day?.value || day) || formik?.values?.WorkingDay?.map(day => day?.value || day) || [],

      }
      if (
        Number(values.EntryPrice) > 0 &&
        Number(values.EntryRange) &&
        Number(values.EntryPrice) >= Number(values.EntryRange)
      ) {
        return SweentAlertFun(
          showEditModal && EditDataScalping.ScalpType == "Fixed Price"
            ? "Higher Price should be greater than Lower Price"
            : "First Trade Higher Range should be greater than First Trade Lower Range"
        );
      }

      if (
        Number(values.LowerRange) > 0 &&
        Number(values.HigherRange) > 0 &&
        Number(values.LowerRange) >= Number(values.HigherRange)
      ) {
        return SweentAlertFun(
          "Higher Range should be greater than Lower Range"
        );
      }

      if (
        EditDataScalping.ScalpType == "Fixed Price" &&
        Number(values.Targetvalue) <= Number(values.Slvalue)
      ) {
        return SweentAlertFun("Target Price should be greater than Stoploss");
      }

      if (
        EditDataScalping.ScalpType == "Fixed Price" &&
        Number(values.Targetvalue) <= Number(values.EntryRange)
      ) {
        return SweentAlertFun(
          "Target Price should be greater than Higher price"
        );
      }

      if (
        EditDataScalping.ScalpType == "Fixed Price" &&
        Number(values.Slvalue) >= Number(values.EntryPrice)
      ) {
        return SweentAlertFun("Lower Price should be greater than Stoploss");
      }

      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time");
      }
      // console.log("req", req)

      await UpdateUserScript(req).then((response) => {
        if (response.Status) {
          Swal.fire({
            title: "Updated",
            text: response.message,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            setShowEditModal(false);
            formik.resetForm();
          }, 1500);
        } else {
          Swal.fire({
            title: "Error !",
            text: response.message,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      });
    },
  });


  const formik1 = useFormik({
    enableReinitialize: true,
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
      Profit: 0,
      Loss: 0,
      WorkingDay: [],
    },
    validate: (values) => {
      let errors = {};
      const mcxMaxTime = "23:29:59";
      const mcxMinTime = "08:59:59";
      const maxTime = "15:29:59";
      const minTime = "09:15:00";
      if (!values.TStype) {
        errors.TStype = "Please Select Measurement Type.";
      }

      if (!values.Targetvalue) {
        errors.Targetvalue = "Please Enter Target Value.";
      }
      if (!values.Slvalue && !(EditDataOption.STG === "ShortShifting" || EditDataOption.STG === "LongShifting")) {
        errors.Slvalue = "Please Enter Stoploss.";
      }

      if (values.EntryTime == "") {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (
        values.EntryTime <
        (EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.EntryTime = `Entry Time Must be After ${EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.EntryTime >
        (EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.EntryTime = `Entry Time Must be Before ${EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (values.ExitTime == "") {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (
        values.ExitTime <
        (EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.ExitTime = `Exit Time Must be After ${EditDataOption.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.ExitTime >
        (EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.ExitTime = `Exit Time Must be Before ${EditDataOption.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (
        values.EntryTime &&
        values.ExitTime &&
        values.EntryTime >= values.ExitTime
      ) {
        errors.ExitTime = "Exit Time should be greater than Entry Time.";
      }

      if (!values.TradeCount) {
        errors.TradeCount = "Please Enter Trade Count.";
      }

      if (!values?.WorkingDay?.length > 0) {
        errors.WorkingDay = "Please select Working day";
      }

      if (values.Loss !== 0 && (values.Loss == undefined || values.Loss == "" || values.Loss == null)) {
        errors.Loss = "Please Enter Maximum Loss";
      }

      if (values.Profit !== 0 && (values.Profit == undefined || values.Profit == "" || values.Profit == null)) {
        errors.Profit = "Please Enter Maximum Prifit";
      }
      console.log("Errr", errors)

      return errors;
    },
    onSubmit: async (values) => {
      const req = {

        MainStrategy: data,
        Strategy: EditDataOption.STG,
        Symbol: EditDataOption.MainSymbol,
        Username: userName,
        ETPattern: EditDataOption.Targettype,
        Timeframe: "",
        Targetvalue: values.Targetvalue,
        Slvalue: Number(values.Slvalue),
        TStype: values.TStype,
        LowerRange: EditDataOption.LowerRange,
        HigherRange: EditDataOption.HigherRange,
        HoldExit: "",
        EntryPrice: 0.0,
        EntryRange: 0.0,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ExitDay: EditDataOption["Product Type"],
        TradeExecution: EditDataOption.TradeExecution,
        Group: EditDataOption.GroupN,
        CEDepthLower: values.CEDepthLower || EditDataOption.CEDepthLower,
        CEDepthHigher: values.CEDepthHigher || EditDataOption.CEDepthHigher,
        PEDepthLower: values.PEDepthLower || EditDataOption.PEDepthLower,
        PEDepthHigher: values.PEDepthHigher || EditDataOption.PEDepthHigher,
        CEDeepLower: values.CEDeepLower || EditDataOption.CEDeepLower,
        CEDeepHigher: values.CEDeepHigher || EditDataOption.PEDeepHigher,
        PEDeepLower: values.PEDeepLower || EditDataOption.PEDeepLower,
        PEDeepHigher: values.PEDeepHigher || EditDataOption.PEDeepHigher,
        DepthofStrike: EditDataOption.DepthofStrike,
        TradeCount: values.TradeCount || EditDataOption.TradeCount,
        WorkingDay: values.WorkingDay?.map((day) => day?.value || day) || [], // list (array)

        HoldExit: EditDataScalping.HoldExit || "HoldExit", // str
        EntryPrice: 0.0, // float
        EntryRange: 0.0, // float
        tgp2: 0.0, // float
        tgp3: 0.0, // float
        RolloverTF: EditDataOption.RolloverTF || false, // bool
        RolloverDay: "", // str
        RolloverTime: "", // str
        TargetExit: false, // bool
        RepeatationCount: 0, // int
        Profit: Number(values.Profit || EditDataOption.Profit), // float
        Loss: Number(values.Loss || EditDataOption.Loss), // float


      };

      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time");
      }
      await UpdateUserScript(req).then((response) => {
        if (response.Status) {
          Swal.fire({
            title: "Updated",
            text: response.message,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            setShowEditModal(false);
            formik.resetForm();
          }, 1500);
        } else {
          Swal.fire({
            title: "Error !",
            text: response.message,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      });
    },
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
      WorkingDay: [],
      Profit: 0,
      Loss: 0,

    },
    validate: (values) => {
      let errors = {};
      const mcxMaxTime = "23:29:59";
      const mcxMinTime = "08:59:59";
      const maxTime = "15:29:59";
      const minTime = "09:15:00";
      if (!values.TStype) {
        errors.TStype = "Please Select Measurement Type.";
      }

      if (!values.Targetvalue) {
        errors.Targetvalue = "Please Enter Target Value.";
      }
      if (!values.Slvalue) {
        errors.Slvalue = "Please Enter Stoploss.";
      }

      if (values.EntryTime == "") {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (
        values.EntryTime <
        (EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.EntryTime = `Entry Time Must be After ${EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.EntryTime >
        (EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.EntryTime = `Entry Time Must be Before ${EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (values.ExitTime == "") {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (
        values.ExitTime <
        (EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.ExitTime = `Exit Time Must be After ${EditDataPattern.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.ExitTime >
        (EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.ExitTime = `Exit Time Must be Before ${EditDataPattern.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (
        values.EntryTime &&
        values.ExitTime &&
        values.EntryTime >= values.ExitTime
      ) {
        errors.ExitTime = "Exit Time should be greater than Entry Time.";
      }

      if (!values.TradeCount) {
        errors.TradeCount = "Please Enter Trade Count.";
      }
      if (
        (values.Loss === undefined ||
          values.Loss === null ||
          values.Loss === "") &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple"
      ) {
        errors.Loss = "Please Enter Maximum Loss";
      }

      if (
        (values.Profit === undefined ||
          values.Profit === null ||
          values.Profit === "") &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple"
      ) {
        errors.Profit = "Please Enter Maximum Loss";
      } if (!values.WorkingDay?.length > 0) {
        errors.WorkingDay = "Please select Working day";
      }
      // console.log("Errr", errors)


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
        TStype: values.TStype || EditDataPattern.TStype,
        LowerRange: 0.0,
        Quantity: Number(values.Quantity),
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
        TradeCount: Number(values.TradeCount),

        tgp2: values.tgp2 || 0.0,
        tgp3: values.tgp3 || 0.0,
        RolloverTF: values.RolloverTF || false, // bool
        RolloverDay: values.RolloverDay || "", // str
        RolloverTime: values.RolloverTime || "", // str
        TargetExit: values.TargetExit, // bool
        RepeatationCount: values.RepeatationCount || 0, // int
        Profit: values.Profit || EditDataScalping.Profit || 0.0, // float
        Loss: values.Loss || 0.0, // float
        WorkingDay: [],


      };

      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time");
      }
      await UpdateUserScript(req).then((response) => {
        if (response.Status) {
          Swal.fire({
            title: "Updated",
            text: response.message,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            setShowEditModal(false);
            formik.resetForm();
          }, 1500);
        } else {
          Swal.fire({
            title: "Error !",
            text: response.message,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      });
    },
  });
  const OptionRiskManagementArr = [
    {
      name: "TradeCount",
      label: "No. of Cycle",
      type: "text3",
      label_size: 12,
      headingtype: 4,
      showWhen: () =>
        showEditModal &&
        EditDataScalping.PositionType === "Multiple" &&
        formik.values.TargetExit == "true",
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      iconText: text.Trade_Count,
      disable: false,
      hiding: false,
    },
    {
      name: "Loss",
      label: "Max Loss (in price)",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

    {
      name: "Profit",
      label: " Max Profit (in price)",
      type: "text3",
      label_size: 12,
      col_size: 4,
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
      hiding: false,
    },


  ];

  const OptionEntryRuleArr = [
    {
      name: "CEDepthLower",
      label: "CE Main Lower",
      type: "text3",
      hiding: false,
      label_size: 12,
      col_size: 3,
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
      headingtype: 2,
      disable: false,
    },

    {
      name: "CEDepthHigher",
      label: "CE Main Higher",
      type: "text3",
      hiding: false,
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },

    {
      name: "CEDeepLower",
      label: "CE Hedge Lower",
      type: "text3",
      hiding: false,
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
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
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "PEDepthLower",
      label: "PE Main Lower",
      type: "text3",
      hiding: false,
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "PEDepthHigher",
      label: "PE Main Higher",
      type: "text3",
      hiding: false,
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
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
      showWhen: () =>
        showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
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
      showWhen: () =>
        showEditModal && (EditDataOption.STG === "ShortFourLegStretegy" || EditDataOption.STG === "LongFourLegStretegy"),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
  ];


  const OptionExitRuleArr = [
    {
      name: "TStype",
      label: "Measurement Type",
      type: "select",
      options: [
        { label: "Percentage", value: "Percentage" },
        { label: "Point", value: "Point" },
      ],
      // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
      showWhen: () =>
        showEditModal && !(EditDataOption.STG === "ShortShifting" || EditDataOption.STG === "LongShifting"),
      label_size: 12,
      headingtype: 4,
      col_size: 4,
      hiding: false,
      disable: false,
    },

    {
      name: "Targetvalue",
      label:
        (EditDataOption.STG === "ShortShifting" || EditDataOption.STG === "LongShifting") ? "Shifting Point" : "Target",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
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
      showWhen: () =>
        showEditModal && !(EditDataOption.STG === "ShortShifting" || EditDataOption.STG === "LongShifting"),
      headingtype: 3,
      disable: false,
      hiding: false,
    },
  ];

  const OptionTimeDurationArr = [
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

  const OptionFields = [

    {
      name: "Heading",
      label: "Risk_Management",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 4,
      col_size: 12,
      data: OptionRiskManagementArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
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
      showWhen: () => showEditModal && (EditDataOption.STG == "ShortFourLegStretegy" || EditDataOption.STG == "LongFourLegStretegy"),
      data: OptionEntryRuleArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },

    // {
    //   name: "Heading",
    //   label: "Entry_Rule",
    //   type: "heading",
    //   hiding: false,
    //   label_size: 12,
    //   headingtype: 4,
    //   col_size: 12,
    //   data: OptionEntryRuleArr.filter(
    //     (item) => !item.showWhen || item.showWhen(formik.values)

    //   ),
    //   disable: false,
    // },

    {
      name: "Heading",
      label: "Exit_Rule",
      type: "heading",
      hiding: false,
      label_size: 12,
      col_size: 12,
      headingtype: 3,
      data: OptionExitRuleArr.filter(
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
      data: OptionTimeDurationArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },

  ];


  const PatternRiskManagementArr = [

    {
      name: "TradeCount",
      label: "Trade Count",
      type: "text3",
      label_size: 12,
      col_size: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Profit",
      label: "Max Profit",
      type: "text3",
      label_size: 12,
      col_size: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Loss",
      label: "Max Loss",
      type: "text3",
      label_size: 12,
      col_size: 4,
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
      disable: false,
      hiding: false,
    },
  ];
  const PatternExitRuleArr = [
    // {
    //   name: "TStype",
    //   label: "Measurement Type",
    //   type: "select",
    //   options: [
    //     { label: "Percentage", value: "Percentage" },
    //     { label: "Point", value: "Point" },
    //   ],
    //   label_size: 12,
    //   col_size: 6,
    //   hiding: false,
    //   disable: false,
    // },

    {
      name: "Targetvalue",
      label: "Target",
      type: "text5",
      label_size: 12,
      col_size: 6,
      disable: false,
      hiding: false,
      headingtype: 3,
      type: "text3",
    },
    {
      name: "Slvalue",
      label: "Stoploss",
      type: "text5",
      label_size: 12,
      col_size: 6,
      disable: false,
      hiding: false,
      headingtype: 3,
      type: "text3",
    },

  ];

  const PatternTimeDurationArr = [
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


  const PatternFields = [

    {
      name: "Heading",
      label: "Risk_Management",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 4,
      col_size: 12,
      data: PatternRiskManagementArr.filter(
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
      data: PatternExitRuleArr.filter(
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
      data: PatternTimeDurationArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },

  ];


  const EntryRuleArr = [
    // {
    //   name: "TType",
    //   label: "Transaction Type",
    //   type: "select1",
    //   options: [
    //     { label: "BUY", value: "BUY" },
    //     { label: "SELL", value: "SELL" },
    //   ],
    //   label_size: 12,
    //   headingtype: 2,
    //   hiding: false,
    //   col_size: 4,
    //   disable: false,
    // },

    {
      name: "EntryPrice",
      label: "First Trade Lower Range",
      type: "text3",
      col_size: 4,
      disable: false,
      headingtype: 2,
      hiding: false,
    },

    {
      name: "EntryRange",
      label: "First Trade Higher Range",
      type: "text3",
      label_size: 12,
      headingtype: 2,
      col_size: 4,
      disable: false,
      hiding: false,
    },
  ];

  const RiskManagementArr = [
    // {
    //   name: "LowerRange",
    //   label: "Lower Range",
    //   type: "text3",
    //   label_size: 12,
    //   col_size: 4,
    //   showWhen: () =>
    //     showEditModal && EditDataScalping.PositionType === "Multiple",
    //   // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
    //   headingtype: 4,
    //   disable: false,
    //   hiding: false,
    // },

    // {
    //   name: "HigherRange",
    //   label: "Higher Range",
    //   type: "text3",
    //   label_size: 12,
    //   col_size: 4,
    //   headingtype: 4,
    //   // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
    //   showWhen: () =>
    //     showEditModal && EditDataScalping.PositionType === "Multiple",
    //   disable: false,
    //   hiding: false,
    // },

    {
      name: "HoldExit",
      label: "Hold/Exit",
      type: "select",
      options: [
        { label: "Hold", value: "Hold" },
        { label: "Exit", value: "Exit" },
      ],
      // showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
      showWhen: () =>
        showEditModal && EditDataScalping.PositionType === "Multiple",
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
      showWhen: (values) =>
        showEditModal && EditDataScalping.PositionType === "Multiple",

      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      // iconText: text.Increment_Type,
      hiding: false,
    },

    {
      name: "TradeCount",
      label: "No. of Cycle",
      type: "text3",
      label_size: 12,
      headingtype: 4,
      showWhen: () =>
        showEditModal &&
        EditDataScalping.PositionType === "Multiple" &&
        formik.values.TargetExit == "true",
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      iconText: text.Trade_Count,
      disable: false,
      hiding: false,
    },

    {
      name: "RepeatationCount",
      label: "Repetition Count",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: () =>
        showEditModal && EditDataScalping.PositionType === "Multiple",
      disable: false,
      hiding: false,
    },

    // {
    //   name: "HoldExit",
    //   label: "Hold/Exit",
    //   type: "select",
    //   options: [
    //     { label: "Hold", value: "Hold" },
    //     { label: "Exit", value: "Exit" },
    //   ],
    //   showWhen: () =>
    //     showEditModal && EditDataScalping.PositionType === "Multiple",
    //   label_size: 12,
    //   col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
    //   headingtype: 4,
    //   disable: false,
    //   hiding: false,
    // },

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
      hiding: false,
    },

    {
      name: "Profit",
      label: "Max Profit (in price) ",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: () =>
        showEditModal && EditDataScalping.PositionType === "Multiple",
      disable: false,
      hiding: false,
    },
    {
      name: "Loss",
      label: "Max Loss (in price)",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: () =>
        showEditModal && EditDataScalping.PositionType === "Multiple",
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
    {
      name: "RolloverTF",
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
        (EditDataScalping.ExitDay == "Delivery" &&
          EditDataScalping.ScalpType == "Multi_Conditional" &&
          EditDataScalping.PositionType == "Multiple") &&
        EditDataScalping["Instrument Type"] !== "FUTIDX",
      disable: false,
      hiding: false,
    },

    {
      name: "RolloverDay",
      label: "No. of Days",
      type: "select",
      label_size: 12,
      options: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" }
      ],
      showWhen: (values) => {
        const rollOverBoolean = formik.values.RolloverTF === "true" || formik.values.RolloverTF === true;

        return (
          rollOverBoolean &&
          (EditDataScalping.ExitDay == "Delivery" &&
            EditDataScalping.ScalpType == "Multi_Conditional" &&
            EditDataScalping.PositionType == "Multiple")
        );
      },
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

    {
      name: "RolloverTime",
      label: "RollOver Exit Time",
      type: "timepiker",
      label_size: 12,
      showWhen: (values) => {
        const rollOverBoolean = formik.values.RolloverTF === "true" || formik.values.RolloverTF === true;


        return (
          rollOverBoolean &&
          (EditDataScalping.ExitDay == "Delivery" &&
            EditDataScalping.ScalpType == "Multi_Conditional" &&
            EditDataScalping.PositionType == "Multiple")
        );
      },
      col_size: 4,
      headingtype: 4,
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
      showWhen: () =>
        showEditModal && EditDataScalping.PositionType !== "Multiple",
      label_size: 12,
      headingtype: 4,
      col_size: 4,
      hiding: false,
      disable: false,
    },

    {
      name: "FinalTarget",
      label: "Final Target Price",
      type: "text3",
      label_size: 12,
      showWhen: (values) =>
        EditDataScalping.Targetselection === "Entry Wise SL",
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 3,
      disable: false,
      hiding: false,
    },

    {
      name: "Targetvalue",
      label:
        EditDataScalping.Targetselection === "Fixed Target"
          ? "Fixed Target"
          : "Booking Point",
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
      label: "Re-entry",
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
      const WorkingDay = EditDataScalping?.WorkingDay?.map((day) => {
        return { label: day, value: day };
      });

      formik.setFieldValue("EntryPrice", EditDataScalping.EntryPrice);
      formik.setFieldValue("FinalTarget", EditDataScalping.FinalTarget);
      formik.setFieldValue("EntryRange", EditDataScalping.EntryRange);
      formik.setFieldValue(
        "Targetvalue",
        parseFloat(EditDataScalping["Booking Point"])
      );
      formik.setFieldValue(
        "tgp2",
        parseFloat(EditDataScalping["Booking Point2"])
      );
      formik.setFieldValue(
        "tgp3",
        parseFloat(EditDataScalping["Booking Point3"])
      );
      formik.setFieldValue(
        "Slvalue",
        parseFloat(EditDataScalping["Re-entry Point"])
      );
      formik.setFieldValue("HoldExit", EditDataScalping.HoldExit);
      formik.setFieldValue("EntryTime", EditDataScalping.EntryTime);
      formik.setFieldValue("ExitTime", EditDataScalping.ExitTime);
      formik.setFieldValue("TradeCount", EditDataScalping.TradeCount);
      formik.setFieldValue("ETPattern", EditDataScalping.TType);
      formik.setFieldValue("TStype", EditDataScalping.TStype);
      // formik.setFieldValue("Quantity", EditDataScalping.Quantity);
      formik.setFieldValue(
        "EntryPrice",
        parseFloat(EditDataScalping.EntryPrice)
      );
      formik.setFieldValue(
        "EntryRange",
        parseFloat(EditDataScalping.EntryRange)
      );
      formik.setFieldValue("HoldExit", EditDataScalping.HoldExit);
      formik.setFieldValue("Symbol", EditDataScalping.Symbol);
      formik.setFieldValue("ExitDay", EditDataScalping.ExitDay);
      formik.setFieldValue(
        "RepeatationCount",
        EditDataScalping.RepeatationCount
      );

      formik.setFieldValue("Profit", EditDataScalping.Profit);
      formik.setFieldValue("Loss", EditDataScalping.Loss);
      formik.setFieldValue("TargetExit", EditDataScalping.TargetExit);
      formik.setFieldValue("WorkingDay", WorkingDay);
      formik.setFieldValue("RolloverTF", EditDataScalping.RolloverTF);
      formik.setFieldValue("RolloverDay", EditDataScalping.RolloverDay);
      formik.setFieldValue("RolloverTime", EditDataScalping.RolloverTime);

    } else if (data == "Option Strategy") {
      const WorkingDay = EditDataOption?.WorkingDay?.map((day) => {
        return { label: day, value: day };
      });

      // Initialize CE/PE fields
      formik1.setFieldValue("CEDepthLower", EditDataOption.CEDepthLower);
      formik1.setFieldValue("CEDepthHigher", EditDataOption.CEDepthHigher);
      formik1.setFieldValue("PEDepthLower", EditDataOption.PEDepthLower);
      formik1.setFieldValue("PEDepthHigher", EditDataOption.PEDepthHigher);
      formik1.setFieldValue("CEDeepLower", EditDataOption.CEDeepLower);
      formik1.setFieldValue("CEDeepHigher", EditDataOption.PEDeepHigher);
      formik1.setFieldValue("PEDeepLower", EditDataOption.PEDeepLower);
      formik1.setFieldValue("PEDeepHigher", EditDataOption.PEDeepHigher);


      formik1.setFieldValue("TStype", EditDataOption.strategytype);
      formik1.setFieldValue("Targetvalue", EditDataOption["Target value"]);
      formik1.setFieldValue("Slvalue", EditDataOption["SL value"]);
      formik1.setFieldValue("Quantity", EditDataOption["Lot Size"]);
      formik1.setFieldValue("EntryTime", EditDataOption["Entry Time"]);
      formik1.setFieldValue("ExitTime", EditDataOption["Exit Time"]);
      formik1.setFieldValue("TradeCount", EditDataOption.TradeCount);
      formik1.setFieldValue("Profit", EditDataOption.Profit || 0);
      formik1.setFieldValue("Loss", EditDataOption.Loss || 0);
      formik1.setFieldValue("WorkingDay", WorkingDay);
    } else if (data == "Pattern") {
      formik2.setFieldValue("TStype", EditDataPattern.TStype);
      formik2.setFieldValue("Targetvalue", EditDataPattern["Target value"]);
      formik2.setFieldValue("Slvalue", EditDataPattern["SL value"]);
      // formik2.setFieldValue("Quantity", EditDataPattern.Quantity);
      formik2.setFieldValue("EntryTime", EditDataPattern.EntryTime);
      formik2.setFieldValue("ExitTime", EditDataPattern.ExitTime);
      formik2.setFieldValue("TradeCount", EditDataPattern.TradeCount);
    }

  }, [showEditModal, data, EditDataScalping, EditDataPattern]);

  useEffect(() => {
    if (data === "Scalping") {
      const WorkingDay = EditDataScalping?.WorkingDay?.map((day) => {
        return { label: day, value: day };
      });
      formik.setFieldValue("EntryPrice", EditDataScalping.EntryPrice);
      formik.setFieldValue("EntryRange", EditDataScalping.EntryRange);
      formik.setFieldValue("Targetvalue", parseFloat(EditDataScalping["Booking Point"]));
      formik.setFieldValue("tgp2", parseFloat(EditDataScalping["Booking Point2"]));
      formik.setFieldValue("tgp3", parseFloat(EditDataScalping["Booking Point3"]));
      formik.setFieldValue("Slvalue", parseFloat(EditDataScalping["Re-entry Point"]));
      formik.setFieldValue("HoldExit", EditDataScalping.HoldExit);
      formik.setFieldValue("EntryTime", EditDataScalping.EntryTime);
      formik.setFieldValue("ExitTime", EditDataScalping.ExitTime);
      formik.setFieldValue("TradeCount", EditDataScalping.TradeCount);
      formik.setFieldValue("TType", EditDataScalping.TType);
      formik.setFieldValue("TStype", EditDataScalping.TStype);
      formik.setFieldValue("EntryPrice", parseFloat(EditDataScalping.EntryPrice));
      formik.setFieldValue("EntryRange", parseFloat(EditDataScalping.EntryRange));
      formik.setFieldValue("HoldExit", EditDataScalping.HoldExit);
      formik.setFieldValue("Symbol", EditDataScalping.Symbol);
      formik.setFieldValue("ExitDay", EditDataScalping.ExitDay);
      formik.setFieldValue("RepeatationCount", EditDataScalping.RepeatationCount);
      formik.setFieldValue("RolloverTF", EditDataScalping.RolloverTF);
      formik.setFieldValue("Profit", EditDataScalping.Profit);
      formik.setFieldValue("Loss", EditDataScalping.Loss);
      formik.setFieldValue("TargetExit", EditDataScalping.TargetExit);
      formik.setFieldValue("WorkingDay", WorkingDay);
    } else if (data === "Option Strategy") {
      const WorkingDay = EditDataOption?.WorkingDay?.map((day) => {
        return { label: day, value: day };
      });
      formik1.setFieldValue("TStype", EditDataOption.strategytype);
      formik1.setFieldValue("Targetvalue", EditDataOption["Target value"]);
      formik1.setFieldValue("Slvalue", EditDataOption["SL value"]);
      // formik1.setFieldValue("Quantity", EditDataOption["Lot Size"])
      formik1.setFieldValue("EntryTime", EditDataOption["Entry Time"]);
      formik1.setFieldValue("ExitTime", EditDataOption["Exit Time"]);
      formik1.setFieldValue("TradeCount", EditDataOption.TradeCount);
      formik1.setFieldValue("WorkingDay", WorkingDay);
      formik1.setFieldValue("Profit", EditDataOption.Profit || 0);
      formik1.setFieldValue("Loss", EditDataOption.Loss || 0);

      formik1.setFieldValue("CEDepthLower", EditDataOption.CEDepthLower || 0.0);
      formik1.setFieldValue("CEDepthHigher", EditDataOption.CEDepthHigher || 0.0);
      formik1.setFieldValue("PEDepthLower", EditDataOption.PEDepthLower || 0.0);
      formik1.setFieldValue("PEDepthHigher", EditDataOption.PEDepthHigher || 0.0);
      formik1.setFieldValue("CEDeepLower", EditDataOption.CEDeepLower || 0.0);
      formik1.setFieldValue("CEDeepHigher", EditDataOption.CEDeepHigher || 0.0);
      formik1.setFieldValue("PEDeepLower", EditDataOption.PEDeepLower || 0.0);
      formik1.setFieldValue("PEDeepHigher", EditDataOption.PEDeepHigher || 0.0);

    } else if (data === "Pattern") {
      const WorkingDay = EditDataPattern?.WorkingDay?.map((day) => {
        return { label: day, value: day };
      });
      formik2.setFieldValue("TStype", EditDataPattern.TStype);
      formik2.setFieldValue("Targetvalue", EditDataPattern["Target value"]);
      formik2.setFieldValue("Slvalue", EditDataPattern["SL value"]);
      formik2.setFieldValue("EntryTime", EditDataPattern.EntryTime);
      formik2.setFieldValue("ExitTime", EditDataPattern.ExitTime);
      formik2.setFieldValue("TradeCount", EditDataPattern.TradeCount);
      formik2.setFieldValue("WorkingDay", WorkingDay);
      formik2.setFieldValue("Profit", EditDataPattern.Profit || 0);
      formik2.setFieldValue("Loss", EditDataPattern.Loss || 0);
    }
  }, [showEditModal, data, EditDataPattern]);

  const updatedFields = fields.filter((item) => {
    return item.hiding == false
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-body" style={{ padding: '3px' }}>
              <div className="tab-content2" id="myTabContent-3" style={{ marginTop: "1rem !important" }}>

                <div className="tab-pane fade show active" id="home-justify" role="tabpanel" aria-labelledby="home-tab-justify">
                  {data && (
                    <>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          {tableType === "MultiCondition" ? <h3 className="card-title">{data}</h3> : <h4 className="card-title">{data}</h4>}
                        </div>
                        <div className='d-flex justify-content-end'>
                          {/* <button className='addbtn btn btn-primary rounded mx-2 mt-1' onClick={() => AddScript(data)}>Add Script</button> */}
                          <button className='addbtn mx-2 mt-1' onClick={() => AddScript(data)}>{data === "ChartingPlatform" ? "Signals" : "Add Script"}</button>

                        </div>

                      </div>
                      <div className="iq-card-body" style={{ padding: "3px" }}>
                        {data !== "ChartingPlatform" && <div className="table-responsive">
                          {getAllService.loading ? (
                            <Loader />
                          ) : (
                            <>
                              {/* Tabs should always be visible when ChartingPlatform is selected */}
                              {/* {data === "ChartingPlatform" && (
                                <div className="d-flex justify-content-center my-3">
                                  <ul
                                    className="nav nav-pills shadow-lg rounded-pill p-2"
                                    style={{
                                      backgroundColor: "#f8f9fa",
                                      display: "flex",
                                      justifyContent: "center",
                                      gap: "10px",

                                    }}
                                  >
                                    {["Cash", "Future", "Option"].map((tab) => (
                                      <li className="nav-item flex-grow-1 text-center" key={tab}>
                                        <button
                                          className={`nav-link rounded-pill w-100 ${chartingSubTab === tab ? "active" : ""}`}
                                          onClick={() => setChartingSubTab(tab)}
                                          style={{
                                            padding: "14px 30px",
                                            fontSize: "18px",
                                            fontWeight: "600",
                                            transition: "all 0.3s ease-in-out",
                                            backgroundColor: chartingSubTab === tab ? "#007bff" : "#fff",
                                            color: chartingSubTab === tab ? "#fff" : "#333",
                                            boxShadow: chartingSubTab === tab ? "0px 4px 12px rgba(0, 123, 255, 0.4)" : "none",
                                            border: chartingSubTab === tab ? "2px solid #007bff" : "2px solid transparent",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#007bff";
                                            e.target.style.color = "#fff";
                                          }}
                                          onMouseLeave={(e) => {
                                            if (chartingSubTab !== tab) {
                                              e.target.style.backgroundColor = "#fff";
                                              e.target.style.color = "#333";
                                            }
                                          }}
                                        >
                                          {tab}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )} */}

                              {/* {data === "ChartingPlatform" && getCharting?.length > 0 && (
                                <div className="d-flex justify-content-end my-3">
                                  <ul
                                    className="nav nav-pills shadow-lg rounded-pill p-2"
                                    style={{
                                      backgroundColor: "#f8f9fa",
                                      display: "flex",
                                      justifyContent: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <li className="nav-item flex-grow-1 text-center">
                                      <button
                                        className={`nav-link rounded-pill w-100 ${view === "table" ? "active" : ""}`}
                                        onClick={() => setView("table")}
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: "3px",
                                          padding: "7px",
                                          fontSize: "10px",
                                          fontWeight: "600",
                                          transition: "all 0.3s ease-in-out",
                                          backgroundColor: view === "table" ? "#007bff" : "#fff",
                                          color: view === "table" ? "#fff" : "#333",
                                          boxShadow: view === "table" ? "0px 4px 12px rgba(0, 123, 255, 0.4)" : "none",
                                          border: view === "table" ? "2px solid #007bff" : "2px solid transparent",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.backgroundColor = "#007bff";
                                          e.target.style.color = "#fff";
                                        }}
                                        onMouseLeave={(e) => {
                                          if (view !== "table") {
                                            e.target.style.backgroundColor = "#fff";
                                            e.target.style.color = "#333";
                                          }
                                        }}
                                      >
                                        <FaTable /> Table View
                                      </button>
                                    </li>
                                    <li className="nav-item flex-grow-1 text-center">
                                      <button
                                        className={`nav-link rounded-pill w-100 ${view === "card" ? "active" : ""}`}
                                        onClick={() => setView("card")}
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: "3px",
                                          padding: "7px",
                                          fontSize: "10px",
                                          fontWeight: "600",
                                          transition: "all 0.3s ease-in-out",
                                          backgroundColor: view === "card" ? "#007bff" : "#fff",
                                          color: view === "card" ? "#fff" : "#333",
                                          boxShadow: view === "card" ? "0px 4px 12px rgba(0, 123, 255, 0.4)" : "none",
                                          border: view === "card" ? "2px solid #007bff" : "2px solid transparent",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.backgroundColor = "#007bff";
                                          e.target.style.color = "#fff";
                                        }}
                                        onMouseLeave={(e) => {
                                          if (view !== "card") {
                                            e.target.style.backgroundColor = "#fff";
                                            e.target.style.color = "#333";
                                          }
                                        }}
                                      >
                                        <FaTh /> Card View
                                      </button>
                                    </li>
                                  </ul>
                                </div>

                              )} */}

                              {view === "table" ? (
                                ((data === "Scalping" && getAllService.NewScalping?.length > 0) ||
                                  (data === "Option Strategy" && getAllService.OptionData?.length > 0) ||
                                  ((data === "Pattern" || data === "Pattern Script") && getAllService.PatternData?.length > 0)) ? (
                                  <FullDataTable
                                    columns={
                                      data === "Scalping"
                                        ? getColumns6(handleDelete, handleEdit, HandleContinueDiscontinue, handleMatchPosition)
                                        : data === "Option Strategy"
                                          ? getColumns4(handleDelete, handleEdit, HandleContinueDiscontinue)
                                          : (data === "Pattern" || data === "Pattern Script")
                                            ? getColumns5(handleDelete, handleEdit, HandleContinueDiscontinue)
                                            : data === "ChartingPlatform"
                                              ? getColumns8(HandleContinueDiscontinue, chartingSubTab, getChartingScript)
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
                                    FixedRowPerPage={data === "ChartingPlatform" ? fixedRowPerPage : null}

                                  />
                                ) : (
                                  (data !== "ChartingPlatform" || (data === "ChartingPlatform" && ["Cash", "Future", "Option"].includes(chartingSubTab))) && (
                                    <NoDataFound />
                                  )
                                )
                              ) : (
                                <ChartingCard
                                  data={getCharting}
                                />
                              )}

                            </>
                          )}
                        </div>}



                        {
                          data === "ChartingPlatform" && (
                            <AddChartingScript
                              selectStrategyType="ChartingPlatform"
                              scriptType={allScripts2}
                              tableType={tableType}
                              data={data}
                              selectedType={selectedType}
                              FromDate={FromDate}
                              ToDate={ToDate}
                              chartingSubTab={chartingSubTab}
                              getCharting={getCharting}
                              view={view}
                              fixedRowPerPage={fixedRowPerPage}
                              allScripts2={allScripts2} // Pass allScripts2 here
                            />
                          )
                        }

                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && <div className="modal show" id="exampleModal" style={{ display: "block", marginTop: "5rem" }}>
        <div className="modal-dialog modal-xl modal-dialog-centered p-2">
          <div className="modal-content ">
            <div className="modal-header card-bg-color ">
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
                      fields={OptionFields.filter(
                        (field) => !field.showWhen || field.showWhen(formik1.values)
                      )}
                      btn_name="Update"
                      formik={formik1}
                    />

                  </div>
                </>
                  :
                  <div className='p-4'>
                    <Formikform
                      fields={PatternFields.filter(
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

  )
};

export default Coptyscript;