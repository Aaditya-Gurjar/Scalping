import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { adminDetails, addFund, closePanel, updateAdmin, pm2Reload, allClientListDetails, superToAdminPermission, superToAdminBrokerPermission, superToAdminGetNewPermission, seeAllSubAdminList, deleteSubAdminData } from '../../CommonAPI/SuperAdmin';
import GridExample from '../../../ExtraComponent/CommanDataTable'
import { SquarePen, RotateCcw, Eye, UserPlus, Earth, UserSearch, Trash2 } from 'lucide-react';
import { useFormik } from "formik";
import AddForm from "../../../ExtraComponent/FormData";




const Strategygroup = () => {
    const [getAdminDetails, setAdminDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState('');
    const [amount, setAmount] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);
    const [singleAdminData, setSingleAdminData] = useState([]);

    const [showBroker, setShowAddBroker] = useState([])
    const [showBroker1, setShowAddBroker1] = useState(false)

    const [showPermission, setShowAddPermission] = useState([])
    const [showPermission1, setShowAddPermission1] = useState(false)


    const [allClientList, setAllClientList] = useState([])
    const [companyName, setCompanyName] = useState(""); // State to store company name
    const [showAllClientList, setShowAllClientList] = useState(false)

    const [allSubAdminList, setAllSubAdminList] = useState([])
    const [subAdminCompanyName, setSubAdminCompanyName] = useState("")
    const [showAllSubAdminList, setShowAllSubAdminList] = useState(false)


    const [optionsArrayBroker, setOptionsArrayBroker] = useState([
        { "value": "ICICI", "label": "ICICI" },
        { "value": "UPSTOX", "label": "UPSTOX" },
        { "value": "5PAISA", "label": "5 PAISA" },
        { "value": "ANGEL", "label": "ANGEL" },
        { "value": "MASTERTRUST", "label": "MASTERTRUST" },
        { "value": "FYERS", "label": "FYERS" },
        { "value": "ALICEBLUE", "label": "ALICEBLUE" },
        { "value": "ZEBULL", "label": "ZEBULL" },
        { "value": "MANDOT", "label": "MANDOT" },
        { "value": "INDIRA", "label": "INDIRA" },
        { "value": "DHAN", "label": "DHAN" },
        { "value": "MARKETHUB", "label": "MARKETHUB" },
        { "value": "FINVASIA", "label": "FINVASIA" },
        { "value": "KOTAK", "label": "KOTAK" },
    ]);


    // for update permission

    const [permissionArray, setPermissionArray] = useState([
        {
            "value": "MT4Trade", "label": "MT4Trade"
        },
        { "value": "SignalGenerating", "label": "Signal Generating" },
        { "value": "MakeStrategy", "label": "Make Strategy" },

    ]);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);




    useEffect(() => {
        adminDetailsData();
    }, []);

    const adminDetailsData = async () => {
        await adminDetails()
            .then((response) => {
                if (response.Status) {
                    setAdminDetails(response.AdminDetails)
                }
                else {
                    setAdminDetails([])
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    };




    const handleChangeStatus = (row, e, status) => {

        const index = row.rowIndex;
        let Companyname = getAdminDetails[index].Companyname;

        Swal.fire({
            title: "Are you sure?",
            text: "You want to change the status?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req = { Companyname: Companyname, status: status ? "On" : "Off" }

                await closePanel(req)
                    .then((response) => {
                        if (response.Status) {
                            adminDetailsData();
                            e.target.checked = status;
                            Swal.fire({
                                title: "Changed!",
                                text: "Your status has been changed.",
                                icon: "success",
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating charge basis:", error);
                    });
            } else {
                e.target.checked = !status;
                adminDetailsData();
            }
        });
    };

    const handleChangePm2Reload = (row, e, status) => {
        const index = row.rowIndex;
        let Companyname = getAdminDetails[index].Companyname;

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Reload server",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req = { Companyname: Companyname }

                await pm2Reload(req)
                    .then((response) => {
                        if (response.Status) {
                            adminDetailsData();

                            Swal.fire({
                                title: "Changed!",
                                text: "Your Server has been Reloaded.",
                                icon: "success",
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating charge basis", error);
                    })
            } else {

                adminDetailsData();
            }
        })
    }



    const handleUpdate = (tableMeta) => {
        setShowUpdate(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
        setCompanyName(getAdminDetails[index].Companyname)
    }


    //get new permission
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await superToAdminGetNewPermission();
                if (response?.Status) {
                    const formattedPermissions = Array.from(
                        new Set(response.Data.map(item => item.NewUpdate)) // Get unique NewUpdate values
                    ).map(uniqueValue => ({
                        value: uniqueValue,
                        label: uniqueValue,
                    }));

                    setPermissionArray(formattedPermissions);

                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }

            } catch (error) {
                console.error("Error fetching new permissions", error)
            }
        }
        fetchPermissions()
    }, [])

    // Update Permission function
    const handleAddPermission = (tableMeta) => {
        setShowAddPermission1(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
        formik2.setFieldValue("Permission", getAdminDetails[index].Permission || []);
    }


    // Update broker function
    const handleAddBroker = (tableMeta) => {
        setShowAddBroker1(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
        setShowAddBroker(getAdminDetails[index].BrokerPermission)
        formik1.setFieldValue("BrokerPermission", getAdminDetails[index].BrokerPermission || []);
    }


    //See All client list api
    const handleClientList = async (tableMeta) => {
        setShowAllClientList(true)
        const index = tableMeta.rowIndex; // Get the row index
        const Companyname = getAdminDetails[index].Companyname; // Get the Companyname for the selected row
        setCompanyName(Companyname); // Save company name for modal title
        try {
            const response = await allClientListDetails(Companyname); // Fetch client list
           
            setAllClientList(response.Data); // Update the state with fetched data
        } catch (error) {
            setAllClientList([])
            console.log("Error To Fetch data", error);
        }
    };

    //See All Sub Admin list api
    const handleSubAdminList = async (tableMeta) => {
        setShowAllSubAdminList(true)
        const index = tableMeta.rowIndex; // Get the row index
        const Companyname = getAdminDetails[index].Companyname; // Get the Companyname for the selected row

       
        setCompanyName(Companyname); 
        try {
            const response = await seeAllSubAdminList(Companyname); 
            setAllSubAdminList(response.Data || []); 
        } catch (error) {
            setAllSubAdminList([])
            console.log("Error To Fetch data", error);
        }
    };

    //delete sub admin api
    const handleSubAdminDelete = async (Username, tableMeta) => {

        let dataRequest = { Companyname: companyName, Username: Username }
        try {
            const response = await deleteSubAdminData(dataRequest);
            if (response.Status) {
                Swal.fire({
                    title: "Deleted!",
                    text: response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true
                });
                setShowAllSubAdminList(false)

            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: response.message,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                });
            }

        }
        catch (error) {
            console.error("Error deleting sub-admin:", error);
        }
    }







    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "Companyname",
            label: "Company Name",
            options: {
                filter: true,
                sort: false,
                width: '20%'
            }
        },
        {
            name: "AddFund",
            label: "Add Fund",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <button className="btn btn-primary" onClick={() => handleAddFound(tableMeta)}>AddFund</button>;
                }

            }
        },
        {
            name: "Update",
            label: "Update",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <SquarePen size={20} style={{ cursor: "pointer" }} onClick={() => handleUpdate(tableMeta)} />;
                }

            }
        },
        {
            name: "Add_Permission",
            label: "Add Permission",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    ;
                    return <Earth size={20} style={{ cursor: "pointer" }} onClick={() => handleAddPermission(tableMeta)} />;
                }
            }
        },
        {
            name: "Add_Broker",
            label: "Add Broker",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    // return <SquarePen size={20} style={{ cursor: "pointer" }} />;
                    return <UserPlus size={20} style={{ cursor: "pointer" }} onClick={() => handleAddBroker(tableMeta)} />;

                }
            }
        },
        {
            name: "All Clients",
            label: "All Clients",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Eye
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClientList(tableMeta)} // Pass tableMeta
                        />
                    );
                },
            },
        },
        {
            name: "All SubAdmin",
            label: "All SubAdmin",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <UserSearch
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSubAdminList(tableMeta)} // Pass tableMeta
                        />
                    );
                },
            },
        },

        // {
        //     name: "username",
        //     label: "Username",
        //     options: {
        //         filter: true,
        //         sort: false,
        //     }
        // },
        // {
        //     name: "password",
        //     label: "Password",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return "********";
        //         }

        //     }
        // },
        {
            name: "SignEmail",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "SignMobileNo",
            label: "Mobile No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Create Date",
            label: "Created Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        // {
        //     name: "AmountDetails",
        //     label: "Amount Details",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         width: '20%'
        //     }
        // },
        // {
        //     name: "IP Detail",
        //     label: "IP Address",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         width: '20%'
        //     }
        // },
        {
            name: "Status",
            label: "Temporary Close Panel",
            options: {
                filter: true,
                sort: false,
                width: '20%',
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div className="form-switch">
                        <input
                            className="form-check-input"
                            style={{ cursor: "pointer", width: "61px", height: "27px" }}
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            defaultChecked={value == "On" ? true : false}
                            onClick={(e) => handleChangeStatus(tableMeta, e, e.target.checked)}
                        />
                    </div>
                }

            }
        },
        {
            name: "Status",
            label: "Live Data",
            options: {
                filter: true,
                sort: false,
                width: '20%',
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <RotateCcw onClick={(e) => handleChangePm2Reload(tableMeta, e, e.target.checked)} />
                }

            }
        },
    ];

    const handleAddFound = (index) => {
        setIndex(index.rowIndex);
        setShowModal(true);
    }

    const handleSubmitFund = async () => {
        if (amount === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the amount',
            })
        }
        else {
            setAmount('');
            setShowModal(false);
        }
        const req = { Companyname: getAdminDetails?.[index]?.Companyname, AmmountDetails: amount }

        await addFund(req)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.Message,
                    })
                    adminDetailsData();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.Message,
                    })
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }

    useEffect(() => {
        formik.setValues({
            Companyname: singleAdminData?.Companyname,
            Username: singleAdminData?.username,
            mobile_no: singleAdminData?.SignMobileNo,
            SignEmail: singleAdminData?.SignEmail,
            Url: "",
        })
    }, [singleAdminData])


    const formik = useFormik({
        initialValues: {
            Companyname: '',
            Username: '',
            mobile_no: '',
            SignEmail: '',
            Url: '',
        },
        validate: (values) => {
            let errors = {};

            if (!values.mobile_no) {
                errors.mobile_no = "Please enter mobile number";
            }
            if (!values.SignEmail) {
                errors.SignEmail = "Please enter email";
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.SignEmail)) {
                errors.SignEmail = "Invalid email address";
            }

            return errors;
        },
        onSubmit: async (values) => {

            const req = {
                Companyname: singleAdminData?.Companyname,
                Username: singleAdminData?.username,
                mobile_no: values.mobile_no,
                SignEmail: values.SignEmail,
                Url: "",
            }

            await updateAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Admin Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowUpdate(false);
                        formik.resetForm();
                    }
                    else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((err) => {

                    console.log("Error in fatching the Dashboard Details", err)
                })
        },
    });

    const fields = [
        {
            name: "mobile_no",
            label: "Mobile Number",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 12,
            disable: false,
        },
        {
            name: "SignEmail",
            label: "Email",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 12,
            disable: false,
        },
    ]

    const formik1 = useFormik({
        initialValues: {
            BrokerPermission: [],
        },

        onSubmit: async (values) => {

            const req = {
                // BrokerPermission: showBroker.BrokerPermission,
                Companyname: singleAdminData?.Companyname,
                // Companyname: "Pnp",
                Brokername: values.BrokerPermission,

            }

            await superToAdminBrokerPermission(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Broker Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowAddBroker1(false);
                        formik1.resetForm();
                    }
                    else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in fatching the Broker Details", err);

                })
        }
    });



    const fields1 = [
        {
            name: "BrokerPermission",
            label: "Broker Permission",
            type: "select2", // Custom dropdown for brokers
            label_size: 12,
            col_size: 6,
            disable: false,
            options: optionsArrayBroker,
            //this is added
            value: formik1.values.BrokerPermission, // Bind to formik value
            onChange: (selectedValues) => {
                formik1.setFieldValue("BrokerPermission", selectedValues);
            },
        },
    ]

    //broker permission end

    //code for update permission
    const formik2 = useFormik({
        initialValues: {
            Permission: [],
        },


        onSubmit: async (values) => {
            const req = {
                Companyname: singleAdminData?.Companyname,
                Permission: values.Permission,
            }
            await superToAdminPermission(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Permission Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowAddPermission1(false)
                        formik2.resetForm();
                    }
                    else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
        }
    })

    const fields2 = [
        {
            name: "Permission",
            label: "Permission",
            type: "select2",
            label_size: 12,
            col_size: 6,
            disable: false,
            options: permissionArray,
            //added data
            value: formik2.values.Permission,
            onChange: (selectedValues) => {
                formik2.setFieldValue("Permission", selectedValues)
            }
        },
    ]



    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Admin Details</h4>
                            </div>

                        </div>

                        <div className="iq-card-body">
                            <div className="table-responsive customtable">
                                <GridExample
                                    columns={columns}
                                    data={getAdminDetails}
                                    checkBox={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                showModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Add Fund
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setAmount(''); setShowModal(false) }}
                                />
                            </div>
                            <div>
                                <div className='mx-4'>
                                    <label className='mt-4'>Enter Fund</label>
                                    <input type="number"
                                        className='form-control mb-4'
                                        placeholder='Enter Fund'
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
                                    />
                                </div>
                                <div className='d-flex justify-content-end mb-4 mx-4'>
                                    <button className='btn btn-primary' onClick={handleSubmitFund}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                showUpdate && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Admin : {singleAdminData?.Companyname}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setShowUpdate(false); formik.resetForm() }}
                                />
                            </div>
                            <div>
                                <AddForm
                                    fields={fields}
                                    btn_name="Update"
                                    formik={formik}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                showPermission1 && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Permission : {singleAdminData?.Companyname}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    // onClick={() => { setShowAddBroker1(false); formik1.resetForm() }}
                                    onClick={() => { setShowAddPermission1(false); formik2.resetForm() }}

                                />
                            </div>
                            <div>
                                <AddForm
                                    fields={fields2}
                                    btn_name="Update"
                                    formik={formik2}


                                />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                showBroker1 && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Broker : {singleAdminData?.Companyname}
                                
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setShowAddBroker1(false); formik1.resetForm() }}
                                />
                            </div>
                            <div>
                                <AddForm
                                    fields={fields1}
                                    btn_name="Update"
                                    formik={formik1}


                                />
                            </div>
                        </div>
                    </div>
                </div>
            }


            {
                showAllClientList && (
                    <div
                        className="modal show"
                        id="exampleModal"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Client List: {companyName}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowAllClientList(false)} // Close modal on button click
                                    />
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allClientList?.length > 0 ? (
                                                allClientList.map((client, index) => (
                                                    <tr key={index}>
                                                        <td>{client.Username}</td>
                                                        <td>{client.EmailId}</td>
                                                        <td>{client.Mobile_No}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No clients found for {singleAdminData?.Companyname}.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => setShowAllClientList(false)} // Close modal on button click
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            {
                showAllSubAdminList && (
                    <div
                        className="modal show"
                        id="exampleModal"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Sub Admin List: {companyName}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowAllSubAdminList(false)} // Close modal on button click
                                    />
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allSubAdminList?.length > 0 ? (
                                                allSubAdminList.map((subAdmin, index) => (
                                                    <tr key={index}>
                                                        <td>{subAdmin.Username}</td>
                                                        <td>{subAdmin.EmailId}</td>
                                                        <td>{subAdmin.Mobile_No}</td>
                                                        <button onClick={(e) => handleSubAdminDelete(subAdmin.Username, index)}><Trash2 /></button>

                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No Sub Admin List found for {singleAdminData?.Companyname}.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => setShowAllSubAdminList(false)} // Close modal on button click
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}




        </div>
    );
};

export default Strategygroup;
