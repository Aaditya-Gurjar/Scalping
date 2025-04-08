import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSidebar } from "./SidebarContext";
const Sidebar = ({ position }) => {
  const role = localStorage.getItem("Role");
  const { activeItem, setActiveItem } = useSidebar();

  const sidebarRef = useRef(null);
  const permission = localStorage.getItem("SubAdminPermission");
  const expire = localStorage.getItem("expire");

  const setImages = () => {
    $(".title_name").text(localStorage.getItem("pannel_name"));
    let favicon = $("link[rel='icon']").length
      ? $("link[rel='icon']")
      : $("<link rel='icon' type='image/x-icon' />");
    favicon.attr("href", localStorage.getItem("fevicon"));
    $("head").append(favicon);
  };

  useEffect(() => {
    setImages();
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const handleSidebarItemClick = (event) => {
      const li = event.currentTarget;
      const submenu = li.querySelector(".iq-submenu");

      if (submenu) {
        submenu.style.display = li.classList.toggle("menu-open")
          ? "block"
          : "none";
      }
    };

    const sidebarItems = sidebar?.querySelectorAll(".iq-sidebar-menu li") || [];
    sidebarItems.forEach((item) =>
      item.addEventListener("click", handleSidebarItemClick)
    );

    return () => {
      sidebarItems.forEach((item) =>
        item.removeEventListener("click", handleSidebarItemClick)
      );
    };
  }, []);

  const sidebarItems = {
    Admin: [
      {
        path: "/admin/tradehistory",
        icon: <i className="la la-history"></i>,
        label: "Trade History",
      },
      {
        path: "/admin/servicreport",
        icon: <i className="la la-cog" />, // Service Report icon
        label: "Service Report",
        // permission: [],
      },
      {
        path: "/admin/clientactivity",
        icon: <i className="la la-fingerprint"></i>,
        label: "Client Activity",
      },
      {
        path: "/admin/clientreport",
        icon: <i className="la la-briefcase"></i>,
        label: (<>Client Thread <br/> Report</>),
      },
      {
        path: "/admin/smtp",
        icon: <i className="la la-envelope"></i>,
        label: "SMTP Details",
      },
      {
        path: "/admin/system",
        icon: <i className="la la-desktop"></i>,
        label: "System",
      },
      {
        path: "/admin/api-create-info",
        icon: <i className="la la-rocket"></i>,
        label: "ApiCreateInfo",
      },

      // {
      //   path: "/admin/Master-Account",
      //   icon: <i className="la la-user-shield"></i>,  
      //   label: "Master Account",
      // },
    ],
    Superadmin: [
      {
        path: "/superadmin/client-trade-response",
        icon: <i className="la la-reply"></i>,
        label: (<>Client Trade <br/> Response</>),
      },
      {
        path: "/superadmin/update-client-details",
        icon: <i className="la la-user"></i>,
        label: (<>Update Client <br/> Details</>),
      },
      {
        path: "/superadmin/api-create-info",
        icon: <i className="la la-code"></i>,
        label: "ApiCreateInfo",
      },
      {
        path: "/superadmin/New-Update",
        icon: <i className="la la-bell"></i>,
        label: "New-Update",
      },
      
    ],
    Subadmin: [
      {
        path: "/subadmin/all-script",
        icon: <i className="ri-file-edit-fill"></i>,
        label: "Add Script",
      },
      {
        path: "/subadmin/signals",
        icon: <i className="ri-bar-chart-fill"></i>,
        label: "Trade Report",
        permission: ["TradeReport"],
      },
      {
        path: "/subadmin/trade-history",
        icon: <i className="ri-bar-chart-fill"></i>,
        label: "Trade History",
        permission: ["TradeHistory"],
      },
      {
        path: "/subadmin/change-password",
        icon: <i className="ri-lock-password-fill"></i>,
        label: "Change Password",
      },
    ],
    User: [
      {
        path: "tradehistory",
        icon: <i className="la la-history"></i>,
        label: "Trade History",
      },
      {
        path: "traderesponse",
        icon: <i className="la la-sellsy"></i>,
        label: "Trade Response",
      },
      {
        path: "profitandloss",
        icon: <i className="las la-universal-access"></i>,
        label: "Net P&L",
      },
      {
        path: "pannel",
        icon: <i className="lab la-ello"></i>,
        label: "Panel Track",
      },
      {
        path: "discription",
        icon: <i className="lab la-get-pocket"></i>,
        label: "Description",
      },
    ],
  };

  const getSidebarMenu = () => {
    if (role === "User" && expire?.includes(1)) {
      return [
        {
          path: "/user/all/plan",
          label: "Upgrade Plan",
          icon: "la la-shopping-cart",
        },
      ];
    }
    return (
      sidebarItems[role]?.filter(
        (item) =>
          !item.permission ||
          item.permission.some((p) => permission?.includes(p))
      ) || []
    );
  };

  return (
    <div className="iq-sidebar sidebar-right" ref={sidebarRef} onClick={() => sessionStorage.clear()}>
      <div id="sidebar-scrollbar" data-scrollbar="true">
        <nav className="iq-sidebar-menu">
          <ul className="iq-menu">
            {getSidebarMenu().map((item) => (
              <li
                key={item.path}
                className={`iq-menu-item-rightsidebar ${activeItem === item.path ? "active" : ""}`}
              >
                <Link to={item.path} onClick={() => setActiveItem(item.path)}>
               
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-${item.label}`}>
                        {item.label}
                      </Tooltip>
                    }
                  >

                    <div className="d-inline-block link-icon">{item.icon}</div>
                  </OverlayTrigger>

                 <span className="ms-0">{item.label}</span> 
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
