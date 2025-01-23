import React, { useEffect, useState } from 'react';
import { GetAllSubadminClient } from '../../CommonAPI/SubAdmin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link, useNavigate } from 'react-router-dom';
import { GetGroupNames, EditClientPanle, Get_Broker_Name } from '../../CommonAPI/Admin';
import { SquarePen } from 'lucide-react';
import AddForm from '../../../ExtraComponent/FormData';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';



const AllClient = () => {
    const userName = localStorage.getItem('name');
    const navigate = useNavigate();
    const [clientService, setClientService] = useState({ loading: true, data: [] });
    const [searchInput, setSearchInput] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [brokers, setBrokers] = useState([]);
    const [optionsArray, setOptionsArray] = useState([]);
    const permission = localStorage.getItem('SubAdminPermission');

    useEffect(() => {
        fetchAllSubadmin();
    }, [searchInput]);

    useEffect(() => {
        fetchBrokerName();
        fetchGroupDetails();
    }, []);


    const fetchAllSubadmin = async () => {
        const req = { userName: userName }
        try {
            const response = await GetAllSubadminClient(req);
            if (response.Status) {
                const filteredData = response.Data.filter(item => {
                    const searchInputMatch =
                        searchInput === '' ||
                        item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.BrokerName.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase())
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
            console.log('Error in fetching Subadmin', error);
        }
    };

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

    const fetchGroupDetails = async () => {
        try {
            const response = await GetGroupNames();
            if (response.Status) {
                const options = response.Data.map(item => ({
                    label: item.GroupName,
                    value: item.GroupName,
                }));
                setOptionsArray(options);

            } else {
                setOptionsArray([]);
            }
        } catch (error) {
            console.log('Error in fetching group data', error);
        }
    };


    const EditSubadmindetail = (value, tableMeta) => {
        setShowModal(true);
        setSelectedIndex(clientService.data[tableMeta.rowIndex]);
    };

    const viewClient = permission.includes('ViewClient')
    const editClient = permission.includes('EditClient')



    const columns = [
        {
            name: 'S.No',
            label: 'S.No',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: 'Edit',
            label: 'Edit',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    editClient ? <SquarePen
                        onClick={() => EditSubadmindetail(value, tableMeta)} /> : "*****"
                ),
            },
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
        {
            name: 'Mobile_No',
            label: 'Mobile Number',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
        {
            name: 'BrokerName',
            label: 'Broker Name',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
     
        {
            name: 'CreateDate',
            label: 'Create Date',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
        {
            name: 'ServiceStartDate',
            label: 'Service Start Date',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
        {
            name: 'ServiceEndDate',
            label: 'Service End Date',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value || '-' : '*****'
            }
        },
        {
            name: 'Group',
            label: 'Group',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value?.join(', ') || '-' : '*****'
            }
        },
        {
            name: 'Planname',
            label: 'Plan Name',
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => viewClient ? value?.join(', ') || '-' : '*****'
            }
        },


    ];

    const formik = useFormik({
        initialValues: {
            User: "",
            Broker: "",
            GroupName: "",
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
                GroupName: selectedOptions.map(item => item.value),
                Broker: values.Broker,
                SubAdmin : userName
            }
            try {
                const response = await EditClientPanle(req);
                if (response.Status) {
                    Swal.fire({
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
                    fetchAllSubadmin();
                } else {
                    Swal.fire({
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

    useEffect(() => {
        if (showModal) {
            formik.setFieldValue('Broker', selectedIndex?.BrokerName == 'Demo' ? "" : selectedIndex?.BrokerName);
            formik.setFieldValue('User', selectedIndex?.Username);
            setSelectedOptions(showModal && selectedIndex?.Group.map(item => ({ label: item, value: item })));
        }
    }, [showModal])


    return (
        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>All Client</h4>
                            </div>
                            {permission.includes('AddClient') && (
                                <Link to='/subadmin/addclient' className='btn btn-primary rounded'>
                                    Add Client
                                </Link>
                            )}
                        </div>
                        <div className='iq-card-body'>
                            <div className='mb-3 col-lg-3'>
                                <input type="text" className=' form-control rounded p-1 px-2' placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                            </div>
                            <FullDataTable columns={columns} data={clientService.data} checkBox={false} />
                        </div>
                    </div>
                </div>
                {showModal && (
                    <div className='modal custom-modal d-flex' id='add_vendor' role='dialog'>
                        <div className='modal-dialog modal-dialog-centered modal-lg'>
                            <div className='modal-content'>
                                <div className='modal-header clientheader border-0 pb-0'>
                                    <div className='form-header modal-header-title text-start mb-0'>
                                        <h4 className='mb-0'>Edit Client : {selectedIndex?.Username}</h4>
                                    </div>
                                    <button
                                        type='button'
                                        className='btn-close'
                                        data-bs-dismiss='modal'
                                        aria-label='Close'
                                        onClick={() => {
                                            setShowModal(false);
                                            formik.resetForm();
                                            setSelectedOptions([]);
                                        }}
                                    ></button>
                                </div>
                                <hr />
                                <AddForm
                                    fields={fields.filter(
                                        field => !field.showWhen || field.showWhen(formik.values)
                                    )}
                                    btn_name='Update'
                                    formik={formik}
                                    btn_name1_route='/admin/clientservice'
                                    additional_field={
                                        <div className='mt-2'>
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <h6>Select Group</h6>
                                                    <Select
                                                        value={selectedOptions}
                                                        isMulti
                                                        name="colors"
                                                        options={optionsArray}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        onChange={(selected) => setSelectedOptions(selected)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default AllClient;
