import React, { useEffect, useState } from 'react'
import { Get_Client_Report } from '../../CommonAPI/Admin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { ClientReportColumn } from './UserAllColumn'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';


const Clientreport = () => {
    const Username = sessionStorage.getItem("Username")
    const [selectUserName, setSelectUserName] = useState(Username || 'AllUser')
    const [getTableData, setTableData] = useState({ loading: true, data: [] })

    const GetClientData = async () => {
        const data = { User: selectUserName }
        await Get_Client_Report(data)
            .then((response) => {
                if (response.Status) {
                    setTableData({
                        loading: false,
                        data: response.Data
                    })
                    setSelectUserName(Username || 'AllUser')
                }
                else {
                    setTableData({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the client details", err)
            })
    }

    useEffect(() => {
        GetClientData()
    }, [selectUserName])

    useEffect(() => {
        setSelectUserName(Username || 'AllUser')
    }, [])
    
    return (
        <Content
            Page_title={" 📉 Client Thread Response"}
            button_status={false}
            backbutton_status={true}
        >

            <div className="iq-card-body">
                <div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="validationDefault01" className='mb-1'>Select Username</label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setSelectUserName(e.target.value)
                                    sessionStorage.setItem("Username", e.target.value)
                                }}
                                value={selectUserName}>
                                <option value={"AllUser"}>AllUser</option>
                                <option value={"ReadData"}>ReadData</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    {
                        getTableData.data && getTableData.data.length > 0 ?
                            (<FullDataTable
                                columns={ClientReportColumn()}
                                data={getTableData.data}
                                checkBox={false}
                            />)
                            :
                            (<NoDataFound />)
                    }

                </div>
            </div>

        </Content>
    )
}

export default Clientreport
