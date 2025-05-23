import React, { useState, useEffect } from 'react'
import { GetClientService, GetClientLogs } from '../../CommonAPI/Admin'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { ClientActivityPage } from './UserAllColumn'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';

const Clientactivity = () => {
    const Username = sessionStorage.getItem('Username')
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [getClientActivityDetails, setClientActivityDetails] = useState({ loading: true, data: [] })
    const [getUserName, setUserName] = useState({ loading: true, data: [] })
    const [selectUserName, setSelectUserName] = useState(Username || '')

    // set Defult Date 
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Select From Date
    const DefultToDate = new Date();
    DefultToDate.setDate(DefultToDate.getDate() + 1);
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(DefultToDate.getDate()).padStart(2, '0');
    const Defult_To_Date = `${year1}-${month1}-${day1}`;


    const GetAllUserDetails = async () => {
        try {
            await GetClientService()
                .then((response) => {

                    if (response.Status) {
                        setUserName({
                            loading: false,
                            data: response.Data
                        })
                    }
                    else {
                        setUserName({
                            loading: false,
                            data: []
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error in Group data fetch", err)
                })
        }
        catch {
            console.log("Error in Group data fetch")
        }
    }

    useEffect(() => {
        GetAllUserDetails()
    }, [])

    const getClientTetails = async () => {
        const data = { User: selectUserName, From_date: FromDate == "" ? formattedDate : FromDate, To_date: ToDate == "" ? Defult_To_Date : ToDate }
        await GetClientLogs(data)
            .then((response) => {
                if (response.Status) {
                    setClientActivityDetails({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setClientActivityDetails({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error In finding the client details", err)
            })
    }

    useEffect(() => {
        getClientTetails()
    }, [selectUserName, ToDate, FromDate])



    return (
        <Content
            Page_title={" 📉 Client Activity"}
            button_status={false}
            backbutton_status={true}
        >

            <div className="iq-card-body">

                <form>
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label htmlFor="validationDefault01">Select Username </label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setSelectUserName(e.target.value)
                                    sessionStorage.setItem("Username", e.target.value)
                                }}
                                value={selectUserName}
                            >
                                <option value="">Select Username</option>

                                {getUserName.data && getUserName.data.map((item, index) =>

                                    <option value={item.Username} key={index}>{item.Username}</option>




                                )}
                            </select>
                        </div>
                        <div className="form-group col-lg-4 ">
                            <label>Select From Date</label>
                            <DatePicker className="form-select" selected={FromDate == "" ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />

                        </div>
                        <div className="form-group col-lg-4">
                            <label>Select To Date</label>
                            <DatePicker className="form-select" selected={ToDate == "" ? Defult_To_Date : ToDate} onChange={(date) => setToDate(date)} />
                        </div>
                    </div>

                </form>
                <div className="modal-body">
                    {
                        getClientActivityDetails.data && getClientActivityDetails.data.length > 0 ?
                            (<FullDataTable
                                columns={ClientActivityPage()}
                                data={getClientActivityDetails.data}
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

export default Clientactivity
