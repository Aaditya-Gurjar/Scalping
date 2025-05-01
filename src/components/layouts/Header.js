import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateBrokerKey from "./Update_Broker_Key";
import Loginwihapi from "./log_with_api";
import * as Config from "../../Utils/Config";
import axios from "axios";
import { TradingStatus } from "../CommonAPI/User";
import Swal from "sweetalert2";
import { IndianRupee, Eye, Wallet } from "lucide-react";
import {
  LastPattern,
  DataStart,
  AutoLogin,
  getAdminPermission,
} from "../CommonAPI/Admin";
import { addBroker } from "../CommonAPI/SuperAdmin";
import { jwtDecode } from "jwt-decode";
import { GetUserBalence, Get_Profile_Data } from "../CommonAPI/User";
import { useTheme } from "../../ThemeContext";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFunds, setShowFunds] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("userProfileImage") || null
  );

  const navigate = useNavigate();
  const role = localStorage.getItem("Role");
  const Username = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [isActive, setIsActive] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getTradingStatus, setTradingStatus] = useState(false);

  const [getBrokerName, setBrokerName] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [showAddBrokerModal, setShowAddBrokerModal] = useState(false);
  const [addBrokerName, setAddBrokerName] = useState("");
  const [userName, setUserName] = useState("");
  const [permissionData, setPermissionData] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [autoLoginLoading, setAutoLoginLoading] = useState(false);
  const [dataStartloading, setDataStartLoading] = useState(false);
  const [lastPatternloading, setLastPatternLoading] = useState(false);

  // const [tradingStatusToggle,setTradingStatus]

  const AdminPermission = async () => {
    try {
      await getAdminPermission()
        .then((response) => {
          if (response.Status) {
            localStorage.setItem(
              "adminPermission",
              JSON.stringify(response.Data)
            );
          } else {
            setPermissionData({
              data: [],
            });
          }
        })
        .catch((err) => {
          console.log("Error Group data fetch", err);
        });
    } catch {
      console.log("Error Group data fetch");
    }
  };

  useEffect(() => {
    AdminPermission();
  }, []);

  const currentTradeMode = getTradingStatus ? "Live Trading" : "Paper Trading";


  const handleToggle = async (value) => {
    // Prevent toggling to the same state
    if (value === getTradingStatus) {
      return; // Exit early if user clicks the currently active mode
    }

    const newStatus = value;

    if (newStatus == true) {
      const requestData = {
        Username: Username,
        session: "",
        AccToken: "",
        usrid: "",
        sid: "",
        jwt_Token: "",
        BrokerName: getBrokerName,
      };
      Loginwihapi(requestData);
    } else {
      var data = {
        Username: Username,
        session: "",
        AccToken: "",
        usrid: "",
        sid: "",
        jwt_Token: "",
      };

      try {
        const response = await axios.post(
          `${Config.base_url}ConnectBroker`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.Status) {
          // Assuming the status is in response.data.Status
          Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Success!",
            text: "Trading On successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        } else {
          Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Success!",
            text: "Trading Off successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        }
      } catch (err) {
        console.error("Error in ConnectBroker request", err);
        Swal.fire({
           // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "Error!",
          text: "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleClick = (event, id) => {
    event.preventDefault();

    if (activeElement === id) {
      setActiveElement(null);
    } else {
      setActiveElement(id);
    }
  };

  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const expireClient = localStorage.getItem("expire_client");

    if (role === "User" && expireClient === "true") {
      navigate("/user/all/plan"); // Redirect if expire_client is true
    }

    if (name) {
      setUserName(name);
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 75) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clearSession = () => {
    var decoded = jwtDecode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      localStorage.clear();
      window.location.reload();
    }
  };

  useEffect(() => {
    GetBalence();
    clearSession();
  }, []);

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".search-toggle") &&
        !event.target.classList.contains("search-input")
      ) {
        setActiveElement(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("sidebar-main");
    } else {
      document.body.classList.remove("sidebar-main");
    }
  }, [isActive]);

  const fetchData = async () => {
    if (role == "User") {
      const requestData = { userName: Username };
      const response = await TradingStatus(requestData);

      if (response) {
        setBrokerName(response.Brokername);
        if (response.Status) {
          setTradingStatus(true);
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAutoLoginbtn = async () => {
    setAutoLoginLoading(true); // Loader start
    try {
      const response = await AutoLogin();
      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: response.Status ? "Auto Login On!" : "Error!",
        text: response.message,
        icon: response.Status ? "success" : "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setAutoLoginLoading(false); // Loader stop
    }
  };

  const handleDataStart = async () => {
    setDataStartLoading(true); // Loader start
    try {
      const response = await DataStart(); // API call

      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: response.Status ? "Data Start!" : "Error!",
        text: response.message,
        icon: response.Status ? "success" : "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setDataStartLoading(false); // Loader stop
    }
  };

  const handleLastPattern = async () => {
    setLastPatternLoading(true);
    try {
      const response = await LastPattern(); // API call
      Swal.fire({
         // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Last Pattern On !",
        text: response.message,
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
         // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error !",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setLastPatternLoading(false); // Loader stop
    }
  };

  const GetBalence = async () => {
    const req = { userName: Username };
    await GetUserBalence(req)
      .then((response) => {
        if (response.Status) {
          // console.log("response.Balance",response.Balance);

          setWalletBalance(response.Balance);
        } else {
          setWalletBalance("");
        }
      })
      .catch((error) => {
        console.error("Error in GetUserBalence request", error);
      });
  };

  function formatNumber(value) {
    if (value < 1000) {
      return value.toString();
    } else if (value < 10000) {
      return (value / 1000).toFixed(0) + "k";
    } else if (value < 1000000) {
      return (value / 1000).toFixed(0) + "k";
    } else if (value < 10000000) {
      return (value / 1000000).toFixed(0) + "M";
    } else if (value < 1000000000) {
      return (value / 1000000).toFixed(0) + "M";
    } else if (value < 10000000000) {
      return (value / 1000000000).toFixed(0) + "B";
    } else if (value < 1000000000000) {
      return (value / 1000000000).toFixed(0) + "B";
    } else if (value < 10000000000000) {
      return (value / 1000000000000).toFixed(0) + "T";
    } else {
      return (value / 1000000000000).toFixed(0) + "T";
    }
  }

  const walletmodal = () => {
    navigate("/user/all/transection");
  };

  const toggleFundsVisibility = () => {
    setShowFunds(!showFunds);
    walletmodal(showFunds);
  };

  const handleSetApiKey = async (e) => {
    e.preventDefault();
    const broker = localStorage.getItem("Broker");
    if (broker == "DEMO") {
      return Swal.fire({
         // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning!",
        text: "You are using a demo account. You Can't set API key.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
    setIsModalVisible(true)
  };

  const handleAddBroker = async () => {
    const req = { BrokerName: addBrokerName };

    if (addBrokerName == "") {
      Swal.fire({
         // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning!",
        text: "Please enter Broker Name.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    await addBroker(req)
      .then((response) => {
        if (response.Status) {
          Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Success!",
            text: "Broker Added successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1000,
          });
          setAddBrokerName("");
          setShowAddBrokerModal(false);
        } else {
          Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error in GetUserBalence request", error);
      });
  };

  const getprofiledata = async () => {
    if (role != "User") {
      return;
    }
    const data = {
      username: Username,
    };
    await Get_Profile_Data(data).then((response) => {
      if (response.Status) {
        localStorage.setItem("expire", 0);
        // console.log("response", response);
        localStorage.setItem("Broker", response.Data[0].BrokerName)
      } else {
        if (response.message === "Client Expired") {
          localStorage.setItem("expire", 1);
          navigate("/user/all/plan");
        }
      }
    });
  };



  useEffect(() => {
    getprofiledata();
  }, []);

  return (
    <>
      <div className="iq-top-navbar ">
        <div className="iq-navbar-custom">
          <div className="iq-sidebar-logo">
            <img className="header_img2 header-logo-img" alt="Logo" id="header_img2" />
            {/* <div className="top-logo"> */}
            {/* <img className="header_img1" alt="Logo" id="header_img1" /> */}

            {/* </div> */}
          </div>
          {role === "Admin" ? (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <button
                className="addbtn mx-4"
                onClick={() => setShowModal(true)}
              >
                🔑 Auto Login
              </button>

              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>
              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  <li className="nav-item">
                    <button
                      type="button"
                      className="addbtn mx-3 btn1"
                      onClick={(e) => setIsModalVisible(true)}
                    >
                      🔐 Set API Key
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className="addbtn  mx-3 btn1"
                      onClick={(e) => navigate("/admin/transectionrequest")}
                    >
                      💵 Transaction Requests
                    </button>
                  </li>

                  <li
                    className="nav-item iq-full-screen"
                    onClick={toggleFullscreen}
                  >
                    <a href="#" className="iq-waves-effect" id="btnFullscreen">
                      <i
                        className={
                          isFullscreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        }
                      />
                    </a>
                  </li>
                  <li className="nav-item iq-full-screen">
                    <button
                      onClick={toggleTheme}
                      className={`addbtn  ms-auto`}
                      style={{
                        // backgroundColor: theme === "light" ? "#222" : "#f8f9fa",
                        // color: theme === "light" ? "#fff" : "#000",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                  </li>

                  <li
                    className={`nav-item ${activeElement === "profile" ? "iq-show" : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === "profile" ? "active" : ""
                        }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <div className="caption">
                        <button
                          className="addbtn iq-sign-btn"
                          onClick={logout}
                          role="button"
                        >
                          Log out
                          <i className="iconcol ri-login-box-line ms-2" />
                        </button>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          ) : role === "Subadmin" ? (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>
              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  <li className="nav-item">
                    <button
                      className="addbtn mx-3 btn1"
                      style={{ pointerEvents: "none" }}
                    >
                      Hello, {Username}
                    </button>
                  </li>

                  <li
                    className="nav-item iq-full-screen"
                    onClick={toggleFullscreen}
                  >
                    <a href="#" className="iq-waves-effect" id="btnFullscreen">
                      <i
                        className={
                          isFullscreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        }
                      />
                    </a>
                  </li>

                  <li className="nav-item iq-full-screen">
                    <button
                      onClick={toggleTheme}
                      className={`addbtn  ms-auto`}
                      style={{
                        // backgroundColor: theme === "light" ? "#222" : "#f8f9fa",
                        // color: theme === "light" ? "#fff" : "#000",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                  </li>

                  <li
                    className={`nav-item ${activeElement === "profile" ? "iq-show" : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === "profile" ? "active" : ""
                        }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <div className="caption">
                        <button
                          className="addbtn iq-sign-btn"
                          onClick={logout}
                          role="button"
                        >
                          Log out
                          <i className="iconcol ri-login-box-line ms-2" />
                        </button>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          ) : role === "User" ? (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>

              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div
                  className="btn-group"
                  role="group"
                  style={{
                    backgroundColor: "#2a2e32",
                    borderRadius: "20px",
                    padding: "2px",
                    height: "36px",
                    marginLeft: "1rem",
                  }}
                >
                  <button
                    type="button"
                    className="btn border-0"
                    style={{
                      width: "120px",
                      backgroundColor: getTradingStatus ? "#2a2e32" : "#7367f0",
                      color: getTradingStatus ? "#6c7293" : "white",
                      fontWeight: "500",
                      padding: "6px 12px",
                      fontSize: "13px",
                      transition: "all 0.3s ease",
                      borderRadius: "18px",
                      boxShadow: getTradingStatus
                        ? "none"
                        : "0 2px 6px rgba(115,103,240,0.4)",
                    }}
                    onClick={() => handleToggle(false)}
                  >
                    Paper Trading
                  </button>
                  <button
                    type="button"
                    className="btn border-0"
                    style={{
                      width: "120px",
                      backgroundColor: getTradingStatus ? "#7367f0" : "#2a2e32",
                      color: "white",
                      fontWeight: "500",
                      padding: "6px 12px",
                      fontSize: "13px",
                      transition: "all 0.3s ease",
                      borderRadius: "18px",
                      boxShadow: getTradingStatus
                        ? "0 2px 6px rgba(115,103,240,0.4)"
                        : "none",
                    }}
                    onClick={() => handleToggle(true)}
                  >
                    Live Trading
                  </button>
                </div>

                <ul className="navbar-nav ms-auto navbar-list align-items-center">

                  {getBrokerName && getBrokerName == "Demo" ? (
                    <li className="nav-item">
                      <button type="button" className="addbtn  btn1">
                        Demo Account
                      </button>
                    </li>
                  ) : (
                    <></>
                  )}

                  <li className="nav-item mx-3 btn-text-color" onClick={toggleFundsVisibility}>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="addbtn mt-0 btn1 "
                    >
                       <span className="btn-text-color" >
                          <span>
                            <Wallet className="iconcol" />
                          </span>
                        </span>
                    </button>
                  </li>

                  <li
                    className="nav-item iq-full-screen"
                    onClick={toggleFullscreen}
                  >
                    <a href="#" className="iq-waves-effect" id="btnFullscreen">
                      <i
                        className={
                          isFullscreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        }
                      />
                    </a>
                  </li>

                  <li className="nav-item iq-full-screen">
                    <button
                      onClick={toggleTheme}
                      className={`addbtn  ms-auto`}
                      style={{
                        // backgroundColor: theme === "light" ? "#222" : "#f8f9fa",
                        // color: theme === "light" ? "#fff" : "#000",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                  </li>

                  <li
                    className={`nav-item ${activeElement === "profile" ? "iq-show" : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`text-decoration-none search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === "profile" ? "active" : ""
                        }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      {/* <img
                        src="/assets/images/user/1.jpg"
                        className="img-fluid rounded-circle me-3"
                        alt="user"
                      /> */}
                      <img
                        src={selectedImage || "/assets/images/user/demo.jpg"}
                        className="img-fluid rounded-circle me-3"
                        alt="user"
                      />
                      <div className="caption">
                        <h6 className="mb-0 line-height card-text-Color">{Username}</h6>
                        {/* <span className="font-size-12 card-text-Color">online</span> */}
                      </div>
                    </a>
                    <div className="iq-sub-dropdown iq-user-dropdown">
                      <div className="iq-card shadow-none m-0">
                        <div className="iq-card-body p-0 ">
                          <div className="bg-primary p-3">
                            <h5 className="text-white-important">{Username}</h5>
                            {/* <span className="text-white-important">online</span> */}
                          </div>
                          <Link
                            to="/user/profile"
                            className="iq-sub-card iq-bg-primary-hover text-decoration-none"
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-primary">
                                <i className="ri-file-user-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">My Profile</h6>
                                <p className="mb-0 font-size-12 text-decoration-none">
                                  View personal profile details.
                                </p>
                              </div>
                            </div>
                          </Link>

                          <Link
                            to="/user/plans"
                            className="iq-sub-card iq-bg-primary-hover text-decoration-none"
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-primary">
                                <i className="ri-file-user-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">My Plans</h6>
                                <p className="mb-0 font-size-12 text-decoration-none">
                                  View Purchased Plan details.
                                </p>
                              </div>
                            </div>
                          </Link>

                          <Link
                            className="iq-sub-card iq-bg-warning-hover text-decoration-none"
                            onClick={(e) => handleSetApiKey(e)}
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-warning">
                                <i className="ri-profile-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">Set API Key</h6>
                              </div>
                            </div>
                          </Link>
                          <Link
                            to="/user/editprofile"
                            className="iq-sub-card iq-bg-warning-hover text-decoration-none"
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-warning">
                                <i className="ri-profile-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">Change Password</h6>
                              </div>
                            </div>
                          </Link>

                          <div className="d-inline-block w-100 text-center p-3">
                            <button
                              className="addbtn iq-sign-btn"
                              onClick={logout}
                              role="button"
                            >
                              Log out
                              <i className="iconcol ri-login-box-line ms-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          ) : (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <div className="nav-item mx-5">
                <button
                  type="button"
                  className="addbtn "
                  onClick={(e) => setShowAddBrokerModal(true)}
                >
                  Add Broker
                </button>
              </div>
              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>
              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  <li className="nav-item">
                    <button
                      className="addbtn  mx-3 btn1"
                      style={{ pointerEvents: "none" }}
                    >
                      Hello, {userName}
                    </button>
                  </li>

                  <li
                    className="nav-item iq-full-screen"
                    onClick={toggleFullscreen}
                  >
                    <a href="#" className="iq-waves-effect" id="btnFullscreen">
                      <i
                        className={
                          isFullscreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        }
                      />
                    </a>
                  </li>

                  <li className="nav-item iq-full-screen">
                    <button
                      onClick={toggleTheme}
                      className={`addbtn  ms-auto`}
                      style={{
                        // backgroundColor: theme === "light" ? "#222" : "#f8f9fa",
                        // color: theme === "light" ? "#fff" : "#000",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                  </li>

                  <li
                    className={`nav-item ${activeElement === "profile" ? "iq-show" : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === "profile" ? "active" : ""
                        }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <div className="caption">
                        <button
                          className="addbtn iq-sign-btn"
                          onClick={logout}
                          role="button"
                        >
                          Log out
                          <i className="iconcol ri-login-box-line ms-2" />
                        </button>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal show"
          id="exampleModal"
          style={{ display: "block" }}
        >
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          ></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-4">
              <div className="modal-header card-bg-color">
                <h5 className="modal-title card-text-Color" id="exampleModalLabel">
                  🔑 Auto Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <div className="d-flex flex-column align-items-center gap-3">
                  {/* Auto Login Button */}
                  <button
                    className="addbtn w-75 py-2 shadow-sm btn btn-outline-primary"
                    onClick={handleAutoLoginbtn}
                    disabled={autoLoginLoading}
                  >
                    {autoLoginLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🔑 <strong className="btn-text-color">Auto Login</strong>
                      </>
                    )}
                  </button>


                  {/* Data Start Button */}
                  <button
                    className="addbtn w-75 py-2 shadow-sm btn btn-outline-success"
                    onClick={handleDataStart}
                    disabled={dataStartloading}
                  >
                    {dataStartloading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🚀 <strong className="btn-text-color">Data Start</strong>
                      </>
                    )}
                  </button>

                  {/* Last Pattern Button */}
                  <button
                    className="addbtn w-75 py-2 shadow-sm btn btn-outline-warning"
                    onClick={handleLastPattern}
                    disabled={lastPatternloading}
                  >
                    {lastPatternloading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🔍 <strong className="btn-text-color">Last Pattern</strong>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddBrokerModal && (
        <div
          className="modal show"
          id="exampleModal"
          style={{ display: "block" }}
        >
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          ></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Broker
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setAddBrokerName("");
                    setShowAddBrokerModal(false);
                  }}
                />
              </div>
              <div>
                <div className="mx-4">
                  <label className="mt-4">Broker Name</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Enter Broker Name"
                    onChange={(e) => setAddBrokerName(e.target.value)}
                    value={addBrokerName}
                  />
                </div>
                <div className="d-flex justify-content-end mb-4 mx-4">
                  <button className="addbtn" onClick={handleAddBroker}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <UpdateBrokerKey
        isVisible={isModalVisible}
        closeModal={handleCloseModal}
        Role={role}
      />
    </>
  );
};

export default Header;
