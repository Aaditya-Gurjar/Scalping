import React, { useEffect, useState } from 'react';
import { GetClientService, GetGroupNames, EditClientPanle, Get_Broker_Name, GETBrokerGroupRecord } from '../../CommonAPI/Admin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link, useNavigate } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import { useFormik } from 'formik';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import AddForm from '../../../ExtraComponent/FormData';
import Swal from 'sweetalert2';
import { Get_All_Plans, GetUserBalence } from "../../CommonAPI/User";
import Select from 'react-select';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';
import { Button } from 'react-bootstrap';



const Clientservice = () => {
    const [clientService, setClientService] = useState({ loading: true, data: [] });
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [optionsArray, setOptionsArray] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [groupData, setGroupData] = useState({ loading: true, data: [] });
    const [brokers, setBrokers] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [GetAllPlans, setAllPlans] = useState({ LivePlanName: [], DemoPlanName: [], data: [] });
    const [walletBalance, setWalletBalance] = useState('');
    const navigate = useNavigate();

    const [brokerRecordData, setBrokerRecordData] = useState([]);
    const [showBrokerModal, setShowBrokerModal] = useState(false);


    const adminPermission = localStorage.getItem("adminPermission");
    const permissionArray = [];

    if (adminPermission) {
        adminPermission.includes("Option Chain") && permissionArray.push({ label: "Option Chain", value: "Option Chain" });
    }

    useEffect(() => {
        fetchClientService();
    }, [searchInput]);




    const GetBalence = async (Username) => {
        const req = { userName: Username }
        await GetUserBalence(req)
            .then((response) => {
                if (response.Status) {
                    setWalletBalance(response.Balance)
                }
                else {
                    setWalletBalance('')
                }
            })
            .catch((error) => {
                console.error("Error in GetUserBalence request", error);
            });
    }


    const fetchBrokerName = async () => {
        try {
            const response = await Get_Broker_Name();
            if (response.Status) {
                const brokerList = response.Brokernamelist.filter(item => item.BrokerName !== 'DEMO');
                setBrokers(brokerList);
            } else {
                setBrokers([]);
            }
        } catch (error) {
            console.log('Error in fetching brokers', error);
        }
    };


    const fetchClientService = async () => {
        try {
            const response = await GetClientService();
            if (response.Status) {
                const filteredData = response.Data.filter(item => {
                    const searchInputMatch =
                        searchInput === '' ||
                        item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.BrokerName.toLowerCase().includes(searchInput.toLowerCase())
                    return searchInputMatch
                })

                setClientService({
                    loading: false,
                    data: searchInput ? filteredData : response.Data,
                });
            } else {
                setClientService({ loading: false, data: [] });
            }
        } catch (error) {
            console.log('Error in fetching client services', error);
        }
    };

    const fetchGroupDetails = async () => {
        try {
            const response = await GetGroupNames();
            if (response.Status) {
                const options = response.Data.map(item => ({
                    label: item.GroupName,
                    value: item.GroupName,
                }));
                setOptionsArray(options);
                setGroupData({ loading: false, data: response.Data });
            } else {
                setGroupData({ loading: false, data: [] });
            }
        } catch (error) {
            console.log('Error in fetching group data', error);
        }
    };


    const GetAllPlansData = async () => {
        await Get_All_Plans()
            .then((response) => {
                if (response.Status) {
                    const LivePlanName = response.Admin.filter((item) => item.Planname !== 'One Week Demo' && item.Planname !== 'Two Days Demo');
                    const DemoPlanName = response.Admin.filter((item) => item.Planname === 'One Week Demo' || item.Planname === 'Two Days Demo');
                    setAllPlans({ DemoPlanName: DemoPlanName, LivePlanName: LivePlanName, data: response.Admin });
                }
                else {
                    setAllPlans({ DemoPlanName: [], LivePlanName: [], data: [] });
                }
            })
            .catch((err) => {
                console.log("Error in fetching the plans", err)
            })
    };

    const handleBrokerRecord = async (rowData) => {
        const username = rowData[3]; // Make sure index 3 is correct for 'Username'
        console.log("Calling API for Username:", username);

        const response = await GETBrokerGroupRecord(username);

        if (response?.Status) {
            console.log("API Success:", response.Data);
            setBrokerRecordData(response.Data);
            setShowBrokerModal(true);
            // Aap yahan modal open kar sakte hain ya state update kar sakte hain
        } else {
            console.error("API Error:", response?.message || "Something went wrong");
        }
    };



    useEffect(() => {
        fetchBrokerName();
        fetchGroupDetails();
        GetAllPlansData();
    }, []);

    useEffect(() => {
    }, [GetAllPlans]);


    const formik = useFormik({
        initialValues: {
            User: "",
            Broker: "",
            GroupName: "",
            permissions: [],
        },
        validate: values => {
            const errors = {};
            if (!values.User && showModal) {
                errors.User = 'Please enter the User';
            }
            if (!values.Broker && showModal) {
                errors.Broker = 'Please Select the Broker';
            }


            return errors;
        },





        onSubmit: async (values) => {
            const req = {
                User: values.User,
                GroupName: selectedOptions?.map((item) => item?.value || item),
                Broker: values.Broker,
                Permission: formik.values.permissions || [], // Ensure permissions is always an array

            }

            try {
                const response = await EditClientPanle(req);
                if (response.Status) {
                    Swal.fire({
                        background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Updated",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        setShowModal(false);
                        formik.resetForm();
                        setSelectedOptions([]);
                    }, 1500);
                    fetchClientService();
                } else {
                    Swal.fire({
                        background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            } catch (err) {
                console.log("Error in update client", err);
            }
        },
    });

    const fields = [
        {
            name: 'Broker',
            label: 'Broker',
            type: 'select',
            options: brokers && brokers.map(item => ({ label: item.BrokerName, value: item.BrokerName })),
            label_size: 12,
            col_size: 12,
        },

    ];


    const columns = [
        {
            name: 'S.No',
            label: 'S.No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: 'Edit',
            label: 'Edit',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <SquarePen
                        onClick={() => {
                            setShowModal(true);
                            const rowDataWithKeys = {};
                            columns.forEach((column, index) => {
                                rowDataWithKeys[column.name] = tableMeta.rowData[index];
                            });
                            setSelectedIndex(rowDataWithKeys);
                            GetBalence(rowDataWithKeys.Username)
                        }}
                    />

                ),
            },
        },
        {
            name: 'BrokerRecord',
            label: 'Broker Record',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <button
                        style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => handleBrokerRecord(tableMeta.rowData)}
                    >
                        View
                    </button>
                )
            }
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'SubAdmin',
            label: 'Created by',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value == '' || value == null ? "Admin" : value,
            }
        },
        {
            name: 'BrokerName',
            label: 'Broker Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Planname',
            label: 'Plan Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <span>{Array.isArray(value) ? value.join(' , ') : value ? "-" : value || '-'}</span>
                ),


            }
        },
        {
            name: 'Group',
            label: 'Strategy Group',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <span>{value?.length ? value.join(' , ') : '-'}</span>
                ),
            }
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },

        {
            name: 'Mobile_No',
            label: 'Mobile Number',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'CreateDate',
            label: 'Account Create Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceStartDate',
            label: 'Service Start Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceEndDate',
            label: 'Service End Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Total Service Count',
            label: 'Total Service Count',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'License',
            label: 'License',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'LicenseStartDate',
            label: 'LicenseStartDate',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceCount',
            label: 'Service Count',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        // {
        //     name: 'AutoLogin',
        //     label: 'Auto Login',
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value) => value || '-'
        //     }
        // },

        // {
        //     name: 'Key',
        //     label: 'Key',
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value) => value || '-'
        //     }
        // },
    ];



    useEffect(() => {
        if (showModal) {
            formik.setFieldValue('Broker', selectedIndex.BrokerName == 'Demo' ? "" : selectedIndex.BrokerName);
            formik.setFieldValue('User', selectedIndex.Username);
            setSelectedOptions(showModal && selectedIndex?.Group?.map((item) => {
                return { value: item, label: item }
            }));
        }
    }, [showModal])


    return (
        <>

            <Content
                Page_title={" 📉 Client Service"}
                button_status={true}
                backbutton_status={true}
                route={"/admin/adduser"}
                button_title={"Create Account"}

            >



                <div className="iq-card-body d-flex justify-content-between">
                    <div className="mb-3 col-lg-3">
                        <input
                            type="text"
                            className=" form-control rounded p-1 px-2"
                            placeholder="Search..."
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />



                    </div>


                    <button
                        className='addbtn '
                        color="addbtn"
                        onClick={() => navigate("/admin/adduser")}
                    >
                        Create Account
                    </button>



                </div>

                {
                    clientService.data && clientService.data.length > 0 ?
                        (<FullDataTable
                            columns={columns}
                            data={clientService.data}
                            checkBox={false}
                        />)
                        :
                        (<NoDataFound />)
                }
                {showModal && (
                    <>
                        {/* Darkened background overlay */}
                        <div className="modal-backdrop fade show"></div>

                        <div
                            className="modal fade show"
                            id="add_vendor"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="modalLabel"
                            aria-hidden="true"
                            style={{ display: "block" }}>
                            <div className="modal-dialog modal-dialog-centered custom-modal-width">
                                <div className="modal-content card-bg-color">
                                    <div className="modal-header p-3">
                                        {" "}
                                        {/* Adjusted padding */}
                                        <h5 className="modal-title card-text-Color" id="modalLabel">
                                            Edit Client: {selectedIndex?.Username}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => {
                                                setShowModal(false);
                                                formik.resetForm();
                                                setSelectedOptions([]);
                                            }}
                                        />
                                    </div>
                                    <hr style={{ margin: "0" }} /> {/* Remove margin from hr */}
                                    <div className="modal-body p-1 card-bg-color">
                                        {" "}
                                        {/* Adjusted padding */}
                                        <AddForm
                                            fields={fields.filter(
                                                (field) =>
                                                    !field.showWhen || field.showWhen(formik.values)
                                            )}
                                            btn_name="Update"
                                            formik={formik}
                                            btn_name1_route="/admin/clientservice"
                                            additional_field={
                                                <div className="mt-2">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <h6 className="card-text-Color">Select Group</h6>

                                                            <Select
                                                                defaultValue={selectedIndex?.Group?.map((item) => {
                                                                    return { value: item, label: item }
                                                                })}
                                                                isMulti
                                                                options={optionsArray}
                                                                selected={showModal ? selectedIndex?.Group : ""}
                                                                onChange={(selected) =>
                                                                    setSelectedOptions(selected)
                                                                }
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                            />
                                                        </div>
                                                    </div>
                                                    {permissionArray.length > 0 && (
                                                        <div className="col-lg-12 mt-3">
                                                            <h6 className="card-text-Color">Permissions</h6>
                                                            <div className="checkbox-group">
                                                                {permissionArray.map((permission, index) => (
                                                                    <div key={index} className="form-check">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`permission-${index}`}
                                                                            className="form-check-input"
                                                                            value={permission.value}
                                                                            onChange={(e) => {
                                                                                const selectedPermissions = formik.values.permissions || [];
                                                                                if (e.target.checked) {
                                                                                    formik.setFieldValue('permissions', [...selectedPermissions, permission.value]);
                                                                                } else {
                                                                                    formik.setFieldValue(
                                                                                        'permissions',
                                                                                        selectedPermissions.filter((perm) => perm !== permission.value)
                                                                                    );
                                                                                }
                                                                            }}
                                                                            checked={formik.values.permissions.includes(permission.value)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`permission-${index}`}
                                                                            className="form-check-label card-text-Color"
                                                                        >
                                                                            {permission.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {showBrokerModal && (
                    <>
                        {/* Dark overlay */}
                        <div className="modal-backdrop fade show"></div>

                        <div
                            className="modal fade show"
                            id="broker_record_modal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="brokerModalLabel"
                            aria-hidden="true"
                            style={{ display: "block" }}
                        >
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content card-bg-color">
                                    <div className="modal-header p-3">
                                        <h5 className="modal-title card-text-Color" id="brokerModalLabel">
                                            Broker Group Record
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                                setShowBrokerModal(false);
                                                setBrokerRecordData([]);
                                            }}
                                        />
                                    </div>
                                    <hr style={{ margin: "0" }} />

                                    <div className="modal-body p-3 card-bg-color" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                                        {brokerRecordData?.length > 0 ? (
                                            brokerRecordData.map((item, index) => (
                                                <div key={index} className="mb-4 p-3 border rounded bg-light">
                                                    <div className="row">
                                                        <div className="col-md-6 mb-2">
                                                            <strong className="card-text-Color">Username:</strong> {item.Username}
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <strong className="card-text-Color">Date:</strong> {item.Date}
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <strong className="card-text-Color">Broker:</strong> {item.Broker}
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <strong className="card-text-Color">Group:</strong>{" "}
                                                            {item.Group?.length ? item.Group.join(', ') : "-"}
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <strong className="card-text-Color">SubAdmin:</strong>{" "}
                                                            {item.SubAdmin?.length ? item.SubAdmin.join(', ') || "Admin" : "Admin"}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted">No records found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </Content>
        </>
    );
};

export default Clientservice;
