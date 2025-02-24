import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { ListCollapse, Users, BadgeDollarSign, Pyramid } from "lucide-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSidebar } from "./SidebarContext";

const Sidebar = ({ position }) => {
  const role = localStorage.getItem("Role");
  const [isActive, setIsActive] = useState(true);
  //   const [activeItem, setActiveItem] = useState("");
  const sidebarRef = useRef(null);
  const fevicon = localStorage.getItem("fevicon");
  const header_img1 = localStorage.getItem("header_img1");
  const header_img2 = localStorage.getItem("header_img2");
  const logo = localStorage.getItem("logo");
  const pannel_name = localStorage.getItem("pannel_name");
  const permission = localStorage.getItem("SubAdminPermission");
  const expire = localStorage.getItem("expire");

  const { activeItem, setActiveItem } = useSidebar();

  const setImages = async () => {
    $(".header_img1").attr("src", header_img1);
    $(".header_img2").attr("src", header_img2);
    $(".title_name").text(pannel_name);
    $(".set_Favicon");
    let favicon = $("link[rel='icon']").length
      ? $("link[rel='icon']")
      : $("<link rel='icon' type='image/x-icon' />");
    favicon.attr("href", fevicon && fevicon);
    $("head").append(favicon);
  };
  useEffect(() => {
    setImages();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sidebar-main", isActive);
  }, [isActive]);

  const handleSidebarClick = (event, item) => {
    setActiveItem(item);
  };

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

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const handleSidebarItemClick = (event) => {
      const li = event.currentTarget;
      const submenu = li.querySelector(".iq-submenu");

      if (li.classList.contains("menu-open")) {
        if (submenu) {
          submenu.style.display = "none";
        }
        li.classList.remove("menu-open");
        const openItems = li.querySelectorAll(".menu-open");
        openItems.forEach((item) => {
          item.classList.remove("menu-open");
        });
      } else if (submenu) {
        submenu.style.display = "block";
        li.classList.add("menu-open");
        submenu.classList.add("menu-open");
      }
    };

    const activeItems = sidebar.querySelectorAll(".iq-sidebar-menu .active");
    activeItems.forEach((item) => {
      const submenu = item.querySelector(".iq-submenu");
      if (submenu) {
        item.classList.add("menu-open");
        submenu.classList.add("menu-open");
      }
    });

    const sidebarItems = sidebar.querySelectorAll(".iq-sidebar-menu li");
    sidebarItems.forEach((item) => {
      item.addEventListener("click", handleSidebarItemClick);
    });

    return () => {
      sidebarItems.forEach((item) => {
        item.removeEventListener("click", handleSidebarItemClick);
      });
    };
  }, []);

  const subadminSideBaar = [
    {
      path: "/subadmin/dashboard",
      icon: <i className="ri-dashboard-fill" />, // Dashboard icon
      label: "Dashboard",
      permission: [], // No restriction
    },
    {
      path: "/subadmin/allclient",
      icon: <i className="ri-group-fill" />, // Group or users icon for All Clients
      label: "All Clients",
      permission: [],
    },
    {
      path: "/subadmin/groups",
      icon: <i className="ri-group-fill" />, // Teams icon for Sub Admin Groups
      label: "Sub Admin Groups",
      permission: [],
    },
  ];

  const adminSideBaar = [
    {
      path: "/admin/dashboard",
      icon: <i className="ri-home-8-line" />, // Dashboard icon
      label: "Dashboard",
      permission: [],
    },
    {
      path: "/admin/strategygroup",
      icon: <i className="la la-sellsy" />, // Strategy Group icon
      label: "Strategy Group",
      permission: [],
    },
    {
      path: "/admin/clientservice",
      icon: <i className="fa fa-users" />, // Client Service icon
      label: "Client Service",
      permission: [],
    },
    {
      path: "/admin/allSubadmin",
      icon: <i className="ri-group-fill" />, // SubAdmin icon
      label: "SubAdmin",
      permission: [],
    },
    {
      path: "/admin/allplan",
      icon: <i className="fa fa-list-alt" />, // Plan icon
      label: "Plan",
      permission: [],
    },
    {
      path: "/admin/allscript",
      icon: <i className="fa fa-code" />, // Add Script icon
      label: "Add Script",
      permission: [],
    },
    {
      path: "/admin/userlogs",
      icon: <i className="fa fa-history" />, // User Panel Log icon
      label: "User Panel Log",
      permission: [],
    },

  ];

  const superAdmin = [
    {
      path: "/superadmin/dashboard",
      icon: <i className="ri-home-fill" />, // Dashboard icon
      label: "Dashboard",
      permission: [],
    },
    {
      path: "/superadmin/create-admin",
      icon: <Users />, // Create Admin icon
      label: "Create Admin",
      permission: [],
    },
    {
      path: "/superadmin/admin-details",
      icon: <ListCollapse />, // Admin Details icon
      label: "Admin Details",
      permission: [],
    },
    {
      path: "/superadmin/amount-details",
      icon: <BadgeDollarSign />, // Amount Details icon
      label: "Amount Details",
      permission: [],
    },
    {
      path: "/superadmin/client-thread-report",
      icon: <Pyramid />, // Client Trade Report icon
      label: "Client Trade Report",
      permission: [],
    },
  ];

  const userSidebarItems = [
    {
      path: "/user/dashboard",
      icon: <i className="ri-home-8-line" />, // Dashboard icon
      label: "Dashboard",
      permission: [],
    },
    {
      path: "technical/pattern",
      icon: <i className="fa fa-puzzle-piece" />, // Technical Patterns icon
      label: "Technical Patterns",
      permission: [],
    },
    {
      path: "lastpattern",
      icon: <i className="fa fa-random" />, // Last Patterns icon
      label: "Last Patterns",
      permission: [],
    },
    {
      path: "all/plan",
      icon: <i className="ri-folder-chart-line" />, // All Plans icon
      label: "All Plans",
      permission: [],
    },
    {
      path: "tradereport",
      icon: <i className="la la-sellsy" />, // Trade Report icon
      label: "Trade Report",
      permission: [],
    },
    //   {
    //     path: 'Group',
    //     icon: <i className="la la-users" />,
    //     label: 'Group',
    //     permission: [] // No restriction
    // },
  ];


  const renderSidebarItems = (items) =>
    items
      .filter(
        (item) =>
          item.permission.length === 0 ||
          item.permission.some((p) => permission?.includes(p))
      )
      .map((item) => (
        <li
          key={item.path}
          className={activeItem === item.path ? "active" : ""}
          onClick={(e) => handleSidebarClick(e, item.path)}
        >
          <Link to={expire?.includes(1) ? "/user/all/plan" : item.path} className="iq-waves-effect">
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id={`tooltip-${item.label}`}>{item.label}</Tooltip>}
            >
              <div className="d-inline-block">{item.icon}</div>
            </OverlayTrigger>
            <span style={{ marginLeft: "8px" }}>{item.label}</span>
          </Link>
        </li>
      ));

  const getSidebarItems = () => {



    switch (role) {
      case "Admin":
        return renderSidebarItems(adminSideBaar);
      case "Superadmin":
        return renderSidebarItems(superAdmin);
      case "Subadmin":
        return renderSidebarItems(subadminSideBaar);
      default:
        return renderSidebarItems(userSidebarItems);
    }
  };

  return (
    <div className="iq-sidebar" onClick={() => sessionStorage.clear()}>
      <div className="iq-sidebar-logo d-flex justify-content-between"></div>
      <div
        id="sidebar-scrollbar"
        data-scrollbar="true"
        tabIndex={-1}
        style={{ overflow: "hidden", outline: "none" }}
      >
        <div className="scroll-content">
          <nav ref={sidebarRef} className="iq-sidebar-menu">
            <ul className="iq-menu">{getSidebarItems()}</ul>
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
