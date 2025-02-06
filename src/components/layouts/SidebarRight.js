import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { ListCollapse, Users, BadgeDollarSign, Pyramid, MessageCircleReply, BookUser, Webhook, BadgePlus } from 'lucide-react';

const Sidebar = () => {
    const role = localStorage.getItem("Role");
    const [isActive, setIsActive] = useState(true);
    const [activeItem, setActiveItem] = useState('');
    const sidebarRef = useRef(null);
    const fevicon = localStorage.getItem("fevicon");
    const header_img1 = localStorage.getItem("header_img1");
    const header_img2 = localStorage.getItem("header_img2");
    const logo = localStorage.getItem("logo");
    const pannel_name = localStorage.getItem("pannel_name");
    const permission = localStorage.getItem('SubAdminPermission');
    const expire = localStorage.getItem('expire');

    const setImages = async () => {
        $(".header_img1").attr('src', header_img1);
        $(".header_img2").attr('src', header_img2);
        $(".title_name").text(pannel_name);
        $(".set_Favicon")
        let favicon = $("link[rel='icon']").length
            ? $("link[rel='icon']")
            : $("<link rel='icon' type='image/x-icon' />");
        favicon.attr('href', fevicon && fevicon);
        $('head').append(favicon);
    }
    useEffect(() => {
        setImages();
    }, []);


    // const closeSidebarOnSmallScreen = () => {
    //     if (window.innerWidth <= 991) {
    //         document.body.classList.remove('sidebar-main');
    //     }
    // };


    // useEffect(() => {
    //     const sidebar = sidebarRef.current;
    //     const handleAnchorClick = (event) => {
    //         closeSidebarOnSmallScreen();
    //     };

    //     const anchors = sidebar.querySelectorAll('a');
    //     anchors.forEach((anchor) => {
    //         anchor.addEventListener('click', handleAnchorClick);
    //     });

    //     return () => {
    //         anchors.forEach((anchor) => {
    //             anchor.removeEventListener('click', handleAnchorClick);
    //         });
    //     };

    // }, [isActive]);


    useEffect(() => {
        document.body.classList.toggle('sidebar-main', isActive);
    }, [isActive]);

    const handleClick = () => setIsActive(prevState => !prevState);

    const handleSidebarClick = (event, item) => {
        setActiveItem(item);
    };

    useEffect(() => {
        const sidebar = sidebarRef.current;
        const handleSidebarItemClick = (event) => {
            const li = event.currentTarget;
            const submenu = li.querySelector('.iq-submenu');

            if (submenu) {
                submenu.style.display = li.classList.toggle('menu-open') ? 'block' : 'none';
            }
        };

        const sidebarItems = sidebar?.querySelectorAll('.iq-sidebar-menu li') || [];
        sidebarItems.forEach(item => item.addEventListener('click', handleSidebarItemClick));

        return () => {
            sidebarItems.forEach(item => item.removeEventListener('click', handleSidebarItemClick));
        };
    }, []);


    useEffect(() => {
        const sidebar = sidebarRef.current;
        const handleSidebarItemClick = (event) => {
            const li = event.currentTarget;
            const submenu = li.querySelector('.iq-submenu');

            if (li.classList.contains('menu-open')) {
                if (submenu) {
                    submenu.style.display = 'none';
                }
                li.classList.remove('menu-open');
                const openItems = li.querySelectorAll('.menu-open');
                openItems.forEach((item) => {
                    item.classList.remove('menu-open');
                });
            } else if (submenu) {
                submenu.style.display = 'block';
                li.classList.add('menu-open');
                submenu.classList.add('menu-open');
            }
        };

        const activeItems = sidebar.querySelectorAll('.iq-sidebar-menu .active');
        activeItems.forEach((item) => {
            const submenu = item.querySelector('.iq-submenu');
            if (submenu) {
                item.classList.add('menu-open');
                submenu.classList.add('menu-open');
            }
        });

        const sidebarItems = sidebar.querySelectorAll('.iq-sidebar-menu li');
        sidebarItems.forEach((item) => {
            item.addEventListener('click', handleSidebarItemClick);
        });

        return () => {
            sidebarItems.forEach((item) => {
                item.removeEventListener('click', handleSidebarItemClick);
            });
        };
    }, []);


    const subadminSideBaar = [
    
        {
            path: '/subadmin/all-script',
            icon: 'ri-file-edit-fill', // Script icon for Add Script
            label: 'Add Script',
            permission: [] // No restriction
        },
        {
            path: '/subadmin/signals',
            icon: 'ri-bar-chart-fill', // Chart or report icon for Trade Report
            label: 'Trade Report',
            permission: ['TradeReport']
        },
        {
            path: '/subadmin/trade-history',
            icon: 'ri-bar-chart-fill', // History icon for Trade History
            label: 'Trade History',
            permission: ['TradeHistory']
        },
        {
            path: '/subadmin/change-password',
            icon: 'ri-lock-password-fill', // Lock or password icon for Change Password
            label: 'Change Password',
            permission: [] // No restriction
        }
    ];


    const adminSideBaar = [
       
        {
            path: '/admin/tradehistory',
            icon: 'la la-history', // Trade History icon
            label: 'Trade History',
            permission: [] // No restriction
        },
        {
            path: '/admin/clientactivity',
            icon: 'la la-fingerprint', // Client Activity icon
            label: 'Client Activity',
            permission: [] // No restriction
        },
        {
            path: '/admin/clientreport',
            icon: 'la la-briefcase', // Client Thread Report icon
            label: 'Client Trade Report',
            permission: [] // No restriction
        },
        {
            path: '/admin/smtp',
            icon: 'la la-envelope', // SMTP Details icon
            label: 'SMTP Details',
            permission: [] // No restriction
        },
        {
            path: '/admin/system',
            icon: 'la la-desktop', // System icon
            label: 'System',
            permission: [] // No restriction
        },
        {
            path: '/admin/api-create-info',
            icon: 'la la-rocket', // API Create Info icon
            label: 'ApiCreateInfo',
            permission: [] // No restriction
        }
    ];


    const superAdmin = [
       
       
        {
            path: '/superadmin/client-trade-response',
            icon: <MessageCircleReply />, // Custom icon
            label: 'Client Trade Response',
            permission: [] // No restriction
        },
        {
            path: '/superadmin/update-client-details',
            icon: <BookUser />, // Custom icon
            label: 'Update Client Details',
            permission: [] // No restriction
        },
        {
            path: '/superadmin/api-create-info',
            icon: <Webhook />, // Custom icon
            label: 'ApiCreateInfo',
            permission: [] // No restriction
        },
        {
            path: '/superadmin/New-Update',
            icon: <BadgePlus />, // Custom icon
            label: 'New-Update',
            permission: [] // No restriction
        }
    ];


    const userSidebarItems = [
       
        {
            path: 'tradehistory',
            icon: <i className="la la-history" />,
            label: 'Trade History',
            permission: [] // No restriction
        },
        {
            path: 'traderesponse',
            icon: <i className="la la-sellsy" />,
            label: 'Trade Response',
            permission: [] // No restriction
        },
        {
            path: 'profitandloss',
            icon: <i className="las la-universal-access" />,
            label: 'Net P&L',
            permission: [] // No restriction
        },
        {
            path: 'pannel',
            icon: <i className="lab la-ello" />,
            label: 'Panel Track',
            permission: [] // No restriction
        },
        {
            path: 'discription',
            icon: <i className="lab la-get-pocket" />,
            label: 'Description',
            permission: [] // No restriction
        }
    ];


    return (
        <div className="iq-sidebar sidebar-right">
            <div className="iq-sidebar-logo d-flex justify-content-between">
              
                {/* <div className="iq-menu-bt-sidebar">
                    <div className="iq-menu-bt align-self-center">
                        <div onClick={handleClick} className={`wrapper-menu ${isActive ? 'open' : ''}`}>
                            <div className="main-circle">
                                <i className="ri-more-fill" />
                            </div>
                            <div className="hover-circle">
                                <i className="ri-more-2-fill" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div
                id="sidebar-scrollbar"
                data-scrollbar="true"
                tabIndex={-1}
                style={{ overflow: 'hidden', outline: 'none' }}
            >
                <div className="scroll-content">
                    <nav ref={sidebarRef} className="iq-sidebar-menu">
                        <ul className="iq-menu">
                            {role === 'Admin' ? (
                                <>
                                    {adminSideBaar
                                        .filter(item =>
                                            item.permission.length === 0 || item.permission.some(p => permission?.includes(p))
                                        )
                                        .map(item => (
                                            <li
                                                key={item.path}
                                                className={activeItem === item.path ? 'active' : ''}
                                                onClick={(e) => handleSidebarClick(e, item.path)}
                                            >
                                                <Link to={item.path} className="iq-waves-effect">
                                                <div data-toggle="tooltip" data-placement="left" title={item.label}>
                                                <i className={item.icon} />
                                                        </div>
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                </>
                            ) : role === 'Superadmin' ?
                                (
                                    <>
                                        {superAdmin
                                            .filter(item =>
                                                item.permission.length === 0 || item.permission.some(p => permission?.includes(p))
                                            )
                                            .map(item => (
                                                <li
                                                    key={item.path}
                                                    className={activeItem === item.path ? 'active' : ''}
                                                    onClick={(e) => handleSidebarClick(e, item.path)}
                                                >
                                                    <Link to={item.path} className="iq-waves-effect">
                                                    <div data-toggle="tooltip" data-placement="left" title={item.label}>
                                                   <i className={item.icon}> {item.icon} </i>
                                                        </div>
                                                       
                                                        <span style={{ marginLeft: '8px' }}>{item.label}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                    </>
                                )
                                : role === 'Subadmin' ?
                                    (
                                        <>
                                            {subadminSideBaar
                                                .filter(item =>
                                                    item.permission.length === 0 || item.permission.some(p => permission?.includes(p))
                                                )
                                                .map(item => (
                                                    <li
                                                        key={item.path}
                                                        className={activeItem === item.path ? 'active' : ''}
                                                        onClick={(e) => handleSidebarClick(e, item.path)}
                                                    >
                                                        <Link to={item.path} className="iq-waves-effect">
                                                            <i className={item.icon} />
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                        </>
                                    )
                                    : (
                                        <>
                                            {userSidebarItems.map(item => (
                                                <li
                                                    key={item.path}
                                                    className={activeItem === item.path ? 'active' : ''}
                                                    onClick={(e) => handleSidebarClick(e, item.path)}
                                                >
                                                    <Link to={expire?.includes(1) ? "/user/all/plan" : item.path} className="iq-waves-effect">
                                                    <div  data-toggle="tooltip" data-placement="left" title={item.label}>
{item.icon}
</div>
                                                        <span style={{ marginLeft: '8px' }}>{item.label}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}
                        </ul>
                    </nav>
                    <div className="p-3" />
                </div>
                <div className="scrollbar-track scrollbar-track-x" style={{ display: 'none' }}>
                    <div
                        className="scrollbar-thumb scrollbar-thumb-x"
                        style={{ width: 80, transform: 'translate3d(0px, 0px, 0px)' }}
                    />
                </div>
                <div className="scrollbar-track scrollbar-track-y" style={{ display: 'block' }}>
                    <div
                        className="scrollbar-thumb scrollbar-thumb-y"
                        style={{
                            height: '84.5734px',
                            transform: 'translate3d(0px, 0px, 0px)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
