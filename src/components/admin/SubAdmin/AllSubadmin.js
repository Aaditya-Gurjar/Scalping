import React, { useEffect, useState } from 'react';
import { GetAllSubadmin } from '../../CommonAPI/Admin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import { useFormik } from 'formik';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import AddForm from '../../../ExtraComponent/FormData';
import Swal from 'sweetalert2';
import NoDataFound from '../../../ExtraComponent/NoDataFound';



const AllSubadmin = () => {

    const navigate = useNavigate();

    const [clientService, setClientService] = useState({ loading: true, data: [] });


    const [searchInput, setSearchInput] = useState('')



    useEffect(() => {
        fetchAllSubadmin();
    }, [searchInput]);

    useEffect(() => {
        // console.log("ClientService Updated:", clientService); // Debug clientService after state update
    }, [clientService]);






    const fetchAllSubadmin = async () => {
        try {
            const response = await GetAllSubadmin();
            if (response.Status) {
                const filteredData = response.Data.filter(item => {
                    const searchInputMatch =
                        searchInput === '' ||
                        item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
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



    const EditSubadmindetail = (value, tableMeta) => {
        // console.log("clientService",value);


        const rowIndex = tableMeta.rowIndex;

        const rowData = tableMeta.rowData;
        // return

        navigate(`/admin/editSubadmin`, {
            state: { rowIndex, rowData },
        });
    };






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
        // {
        //     name: 'Edit',
        //     label: 'Edit',
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value, tableMeta) => (
        //             console.log("value",value),

        //             <SquarePen
        //             onClick={() => EditSubadmindetail(value, tableMeta)}  />

        //         ),
        //     },
        // },
        {
            name: 'Edit',
            label: 'Edit',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    // console.log("rowData nnnnnnnn",clientService);

                    const rowData = clientService.data[tableMeta.rowIndex]; // Row ka pura object
                    // console.log("clientService clientService clientService",rowData);


                    return (
                        <SquarePen
                            onClick={() => {
                                console.log("Row Data:", rowData); // Row ka pura object log karna
                                EditSubadmindetail(value, tableMeta); // Navigate karna ya handle karna
                            }}
                        />
                    );
                },
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
            name: 'Name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
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



    ];



    return (
        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>SubAdmin</h4>
                            </div>
                            <Link to='/admin/addSubadmin' className='btn btn-primary rounded'>
                                Add SubAdmin
                            </Link>
                        </div>
                        <div className='iq-card-body'>
                            <div className='mb-3 col-lg-3'>
                                <input type="text" className=' form-control rounded p-1 px-2' placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                            </div>
                            {
                                clientService.data && clientService.data.length > 0 ?
                                    (<FullDataTable columns={columns} data={clientService.data} checkBox={false} />)
                                    :
                                    (<NoDataFound />)
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AllSubadmin;