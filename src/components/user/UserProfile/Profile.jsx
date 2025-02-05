import React, { useState, useEffect } from 'react'
import { Get_Profile_Data } from '../../CommonAPI/User'

const Profile = () => {
    var username = localStorage.getItem('name')
    const [data, setData] = useState({
        loading: false,
        data: []
    })
    console.log("chaking active plan name", data);


    const getprofiledata = async () => {
        const data = {
            username: username,
        }
        await Get_Profile_Data(data).then((response) => {
            console.log("Get_Profile_Data", response);

            if (response.Status) {
                console.log("Get_Profile_Data", response);

                localStorage.setItem("expire", false)
                setData({
                    loading: true,
                    data: response?.Data[0]
                })
            }
            else {
                if (response.message === "Client Expired") {
                    localStorage.setItem("expire", true)
                }
                setData({
                    loading: true,
                    data: []
                })
            }
        })
    }


    useEffect(() => {
        getprofiledata()
    }, []);


    return (
        <>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="iq-card">
                                <div className="iq-card-body ps-0 pe-0 pt-0">
                                    <div className="docter-details-block">
                                        <div
                                            className="doc-profile-bg bg-primary"
                                            style={{ height: "46px" }}
                                        ></div>
                                        <div className="docter-profile text-center">
                                            <img
                                                src="assets/images/user/11.png"
                                                alt="profile-img"
                                                className="avatar-130 img-fluid"
                                            />
                                        </div>
                                        <div className="text-center mt-3 ps-3 pe-3">
                                            <h4>
                                                <b>{data?.Username}</b>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Personal Information</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <div className="about-info m-0 p-0">
                                        <div className="row">
                                            <div className="col-4">Username:</div>
                                            <div className="col-8">{data && data?.data?.Username || "-"} </div>
                                            <div className="col-4">Mobile No :</div>
                                            <div className="col-8">{data && data?.data?.Mobile_No || "-"} </div>
                                            <div className="col-4">Email Id:</div>
                                            <div className="col-8">{data && data?.data?.EmailId || "-"}</div>
                                            <div className="col-4">BrokerName :</div>
                                            <div className="col-8">{data && data?.data?.BrokerName || "-"}</div>
                                            <div className="col-4">Number of Script :</div>
                                            <div className="col-8">{data && data?.data?.NumberofScript || "-"}</div>
                                            <div className="col-4">Group :</div>
                                            {
                                                data?.loading && data && data?.data?.Group?.length > 0 ? <div className="col-8">{data && data?.data?.Group.join(' , ')}</div> :
                                                    <div className="col-8">No Group Available</div>
                                            }
                                            <div className="col-4">Plan Name :</div>
                                            {
                                                data.loading && data && data?.data?.Planname?.length > 0 ? <div className="col-8">{data && data?.data?.Planname.join(' , ')}</div> :
                                                    <div className="col-8">No Plan Available</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="container mt-5">

                        <div
                            className="row"
                           
                        >

                            <div className="col-sm-6 mx-auto"  style={{
                                boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
                            }}>

                                <div

                                    className="card"

                                    style={{

                                        marginTop: "50px",

                                        // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"

                                    }}

                                >

                                    <div className="d-flex justify-content-between">

                                        <h6 className="card-title pt-2 ps-3">Contact</h6>

                                        <img

                                            className="rounded-circle"

                                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

                                            alt="Card image cap"

                                            style={{ height: 150, width: 150, marginTop: "-80px" }}

                                        />

                                        <h6 className="card-title pt-2 pe-3">Message</h6>

                                    </div>

                                    <div className="card-img-top">

                                        <div className="card-body text-center">

                                            <h5 className="card-title">Card title</h5>

                                            <p className="card-text w-50 mx-auto">

                                                Some quick example text to build on the card title and make up the

                                                bulk of the card's content.

                                            </p>

                                            <ul className="d-flex ps-0 justify-content-between w-50 mx-auto">

                                                <li className="list-unstyled">

                                                    <b>76</b>

                                                    <p>post</p>

                                                </li>

                                                <li className="list-unstyled">

                                                    <b>76</b>

                                                    <p>post</p>

                                                </li>

                                                <li className="list-unstyled">

                                                    <b>76</b>

                                                    <p>post</p>

                                                </li>

                                            </ul>

                                            <a href="#" className="btn btn-primary mb-3">

                                                Go somewhere

                                            </a>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div> */}


                </div>

            </div>





        </>


    )
}

export default Profile
