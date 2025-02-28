import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Add_Group, GetGroupNames } from '../../CommonAPI/Admin';
import GridExample from '../../../ExtraComponent/CommanDataTable'
import AddForm from '../../../ExtraComponent/FormData'
import { useFormik } from 'formik';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Contnet from '../../../ExtraComponent/Content';

const Strategygroup = () => {
    const [getGroupData, setGroupData] = useState({
        loading: true,
        data: []
    });
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "GroupName",
            label: "Group Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SubAdmin",
            label: "Created by",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value == '' ? "Admin" : value,
            }
        },
        {
            name: "Fund_Requierment",
            label: "Fund Requirement",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Risk",
            label: "Risk in %",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Time",
            label: "Time",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "PRtype",
            label: "Product Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Message",
            label: "Message",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },
       
    ];

    const GetAllGroupDetails = async () => {
        try {
            await GetGroupNames()
                .then((response) => {
                    if (response.Status) {
                        setGroupData({
                            loading: false,
                            data: response.Data
                        });
                    } else {
                        setGroupData({
                            loading: false,
                            data: []
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error Group data fetch error", err);
                });
        } catch {
            console.log("Error Group data fetch error");
        }
    };

    useEffect(() => {
        GetAllGroupDetails();
    }, [refresh]);

    const formik = useFormik({
        initialValues: {
            Message: "",
            ProductType: "Intraday",
            TimeOrigin: "Weekly",
            Risk: "",
            FundReuirement: "",
            GroupName: "",
        },
        validate: values => {
            const errors = {};
            if (!values.Message) {
                errors.Message = 'Please Enter Message';
            } else if (!/^[A-Za-z\s]+$/.test(values.Message)) {
                errors.Message = 'Only letters are allowed in Message';
            }
            // Check ProductType (if it is selected, don't show error)
            if (!values.ProductType || values.ProductType === "") {
                errors.ProductType = 'Please Select Product Type';
            }

            // Check TimeOrigin (if it is selected, don't show error)
            if (!values.TimeOrigin || values.TimeOrigin === "") {
                errors.TimeOrigin = 'Please Select Time Origin';
            }
            if (!values.Risk) {
                errors.Risk = 'Please Enter Risk %';
            }
            if (!values.FundReuirement) {
                errors.FundReuirement = 'Please enter Fund Requirement.';
            } else if (values.FundReuirement <= 0) {
                errors.FundReuirement = 'Fund Requirement must be greater than zero.';
            }


            if (!values.GroupName) {
                errors.GroupName = 'Please enter Group Name.';
            } else if (values.GroupName <= 0) {
                errors.GroupName = 'Group Name cannot be zero.';
            }


            return errors;
        },
        onSubmit: async (values) => {
            const data = {
                GroupName: values.GroupName,
                FundReuirement: values.FundReuirement,
                Risk: values.Risk.toString(),
                TimeOrigin: values.TimeOrigin,
                ProductType: values.ProductType,
                Message: values.Message
            };
            await Add_Group(data)
                .then((response) => {
                    if (response.Status) {
                        setRefresh(!refresh)
                        Swal.fire({
                            background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: 'Created successfully!',
                            text: response.message,
                            icon: 'success',
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            setShowModal(false);
                            formik.resetForm();
                        }, 1500);
                    } else {
                        Swal.fire({
                            background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: 'Error',
                            text: response.message,
                            icon: 'error',
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
                .catch((err) => {
                    console.log('Error in group creation...');
                    Swal.fire({
                        background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: 'Error',
                        text: 'Group creation error!',
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    });
                });
        },
    });

    const handleCloseModal = () => {
        setShowModal(false);
        formik.resetForm();
    };

    const fields = [
        {
            name: 'GroupName',
            label: 'Group Name',
            type: 'text',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'FundReuirement',
            label: 'Fund Requirement',
            type: 'text3',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Risk',
            label: 'Risk in %',
            type: 'text4',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'TimeOrigin',
            label: 'Time Origin',
            type: 'select',
            options: [
                { label: 'Weekly', value: 'Weekly' },
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Half Yearly', value: 'Half_Yearly' },
                { label: 'Yearly', value: 'Yearly' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'ProductType',
            label: 'Product Type',
            type: 'select',
            options: [
                { label: 'Intraday', value: 'Intraday' },
                { label: 'Delivery', value: 'Delivery' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Message',
            label: 'Message',
            type: 'msgbox',
            label_size: 12,
            col_size: 6,
        },
    ];

    return (
        <Contnet
            Page_title={"📈 Strategy Group"}
            button_status={false}
            backbutton_status={true}
        >
            <button
                type="button"
                className='addbtn mx-3'
                onClick={() => setShowModal(true)}
            >
                Add New Group
            </button>
            <div>


                <div className="iq-card-body">
                    {
                        getGroupData.data && getGroupData.data.length > 0 ?
                            (<div className="table-responsive customtable">
                                <GridExample
                                    columns={columns}
                                    data={getGroupData.data}
                                    checkBox={false}
                                />
                            </div>)
                            :
                            (<NoDataFound />)
                    }

                </div>
            </div>



            {showModal && (
                <div className="modal custom-modal d-flex" id="add_vendor" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add New Group</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <hr />

                            <AddForm
                                fields={fields.filter(
                                    field => !field.showWhen || field.showWhen(formik.values)
                                )}
                                btn_name='Add Group'
                                formik={formik}
                                btn_name1_route='/admin/clientservice'
                            />
                        </div>
                    </div>
                </div>
            )}
        
        </Contnet >
    );
};

export default Strategygroup;
