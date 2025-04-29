import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSidebar } from "./SidebarContext";
import { HandCoins } from "lucide-react";

const Sidebar = ({ position }) => {
  const role = localStorage.getItem("Role");
  const { activeItem, setActiveItem } = useSidebar();

  const sidebarRef = useRef(null);
  const permission = localStorage.getItem("SubAdminPermission");
  const expire = localStorage.getItem("expire");
  const adminPermission = localStorage.getItem("adminPermission");

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
        label: (<>Trade <br /> history</>),

      },
      {
        path: "/admin/servicreport",
        icon: <i className="la la-cog" />, // Service Report icon
        label: (<>Service <br /> Report</>),
        // permission: [],
      },
      {
        path: "/admin/clientactivity",
        icon: <i className="la la-fingerprint"></i>,
        label: (<>Client <br /> Activity</>),

      },
      {
        path: "/admin/clientreport",
        icon: <i className="la la-briefcase"></i>,
        label: (<>Client Thread <br /> Report</>),
      },
      {
        path: "/admin/smtp",
        icon: <i className="la la-envelope"></i>,
        label: (<>SMTP <br /> Details</>),

      },

      {
        path: "/admin/system",
        icon: <i className="la la-desktop"></i>,
        label: "System",
      },
      {
        path: "/admin/api-create-info",
        icon: <i className="la la-rocket"></i>,
        label: (<>API<br />CreateInfo</>),

      },

    ],

    Superadmin: [
      {
        path: "/superadmin/client-trade-response",
        icon: <i className="la la-reply"></i>,
        label: (<>Client Trade <br /> Response</>),
      },
      {
        path: "/superadmin/update-client-details",
        icon: <i className="la la-user"></i>,
        label: (<>Update Client <br /> Details</>),
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
      {
        path: "/superadmin/admin-offer",
        icon: <HandCoins />, // Client Trade Report icon
        label: (
          <>
            Admin  <br /> Coupon Details
          </>
        ),
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
        path: "technical/pattern",
        icon: <i className="fa fa-puzzle-piece" />, // Technical Patterns icon
        label: "Tech Patterns",
      },
      {
        path: "lastpattern",
        icon: <i className="fa fa-random" />, // Last Patterns icon
        label: "Last Patterns",
      },
      {
        path: "all/plan",
        icon: <i className="ri-folder-chart-line" />, // All Plans icon
        label: "All Plans",
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

      // {
      //   path: "/api-create-info",
      //   icon: <i className="la la-rocket"></i>,
      //   label: "API Process",
      // },
    ],
  };

  if (adminPermission?.includes("ChartingPlatform")) {
    sidebarItems.Admin.push({
      path: "/admin/Strategy-tag",
      icon: <i className="la la-chess-knight"></i>,
      label: (
        <>
          Strategy<br />Tag
        </>
      ),
    },);
  }

  if (adminPermission?.includes("Copy Trading")) {
    sidebarItems.Admin.push({
      path: "/admin/Master-Account",
      icon: <i className="la la-user-shield"></i>,
      label: (
        <>
          Master<br />Account
        </>
      ),
    });
  }

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
      <div
        id="sidebar-scrollbar"
        data-scrollbar="true"
        tabIndex={-1}
        style={{ overflow: "hidden", outline: "none" }}
      >
        <div className="scroll-content">
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
          <div className="p-3" />
        </div>
        <div className="scrollbar-track scrollbar-track-y" style={{ display: "block" }}>
          <div className="scrollbar-thumb scrollbar-thumb-y" style={{ height: "84.57px" }} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
