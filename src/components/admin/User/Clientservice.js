import React, { useEffect, useState } from 'react';
import { GetClientService, GetGroupNames, EditClientPanle, Get_Broker_Name } from '../../CommonAPI/Admin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import { useFormik } from 'formik';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import AddForm from '../../../ExtraComponent/FormData';
import Swal from 'sweetalert2';
import { Get_All_Plans, GetUserBalence } from "../../CommonAPI/User";


const Clientservice = () => {
    const [clientService, setClientService] = useState({ loading: true, data: [] });
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [optionsArray, setOptionsArray] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [groupData, setGroupData] = useState({ loading: true, data: [] });
    const [brokers, setBrokers] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [GetAllPlans, setAllPlans] = useState({ LivePlanName: [], DemoPlanName: [], data: [] });
    const [walletBalance, setWalletBalance] = useState('');

    useEffect(() => {
        fetchBrokerName();
        fetchGroupDetails();
        GetAllPlansData();
    }, []);

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
                    key: item.GroupName,
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
                    const LivePlanName = response.Admin.filter((item) => item.PlanName !== 'One Week Demo' && item.PlanName !== 'Two Days Demo');
                    const DemoPlanName = response.Admin.filter((item) => item.PlanName === 'One Week Demo' || item.PlanName === 'Two Days Demo');
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
                GroupName: selectedOptions,
                Broker: values.Broker,
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
                    fetchClientService();
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
                customBodyRender: (value) => value == '' || value==null ? "Admin" : value,
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
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Group',
            label: 'Strategy Group',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (

                    <span>{Array.isArray(value) ? value.join(' , ') : value ? "-" : value || '-'}</span>
                ),
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
    ];



    useEffect(() => {
        if (showModal) {
            formik.setFieldValue('Broker', selectedIndex.BrokerName == 'Demo' ? "" : selectedIndex.BrokerName);
            formik.setFieldValue('User', selectedIndex.Username);
            setSelectedOptions(showModal && selectedIndex.Group)
        }
    }, [showModal])


    return (
      <>
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Client Service</h4>
                </div>
                <Link to="/admin/adduser" className="btn btn-primary rounded">
                  Create Account
                </Link>
              </div>
              <div className="iq-card-body">
                <div className="mb-3 col-lg-3">
                  <input
                    type="text"
                    className=" form-control rounded p-1 px-2"
                    placeholder="Search..."
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                  />
                </div>
                <FullDataTable
                  columns={columns}
                  data={clientService.data}
                  checkBox={false}
                />
              </div>
            </div>
          </div>
        </div>
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
                <div className="modal-content">
                  <div className="modal-header p-3">
                    {" "}
                    {/* Adjusted padding */}
                    <h5 className="modal-title" id="modalLabel">
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
                  <div className="modal-body p-1">
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
                              <h6>Select Group</h6>
                              <DropdownMultiselect
                                options={optionsArray}
                                name="groupName"
                                handleOnChange={(selected) =>
                                  setSelectedOptions(selected)
                                }
                                selected={showModal ? selectedIndex.Group : ""}
                              />
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
};

export default Clientservice;
