import React, { useState, useEffect } from 'react'
import { getCompanyName, companyDetails } from '../../CommonAPI/SuperAdmin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'

const AmountDetails = () => {

    const [getAmountDetails, setAmountDetails] = useState([])
    const [comapnyName, setCompanyName] = useState('')
    const [getAllComapny, setAllComapny] = useState([])

    useEffect(() => {
        ComapnyDetails()
    }, [])

    useEffect(() => {
        getCompanyDetails()
    }, [comapnyName])


    const ComapnyDetails = async () => {
        await getCompanyName()
            .then((response) => {
                if (response.Status) {
                    setAllComapny(response.Data)
                }
                else {
                    setAllComapny([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }

    const getCompanyDetails = async () => {
        if (comapnyName == '') {
            return
        }
        const req = { comapnyName: comapnyName }
        await companyDetails(req)
            .then((response) => {
                if (response.Status) {
                    setAmountDetails(response.AmmountDetails)
                }
                else {
                    setAmountDetails([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }

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
            name: "AmountDetails",
            label: "Amount Details",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "mobilenumber",
            label: "Mobile Number",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Payment Date",
            label: "Payment Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "IP Detail",
            label: "IP Detail",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },

    ];

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Amount Details</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="was-validated ">
                                <div className='d-flex'>
                                    <div className="form-group col-md-4 ms-2">
                                        <label>Select Company</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            value={comapnyName}
                                        >
                                            {getAllComapny && getAllComapny.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>{item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <FullDataTable
                                columns={columns}
                                data={getAmountDetails}
                                checkBox={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AmountDetails
