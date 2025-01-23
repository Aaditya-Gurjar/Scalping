import React, { useState, useEffect } from "react";
import { Get_Broker_Name, viewBrokerDetails } from '../../CommonAPI/Admin';
import { Eye, Trash2, BarChart2 } from 'lucide-react';
import Modal from '../../../ExtraComponent/Modal1';

const ApiCreateInfo = () => {
    const [brokers, setBrokers] = useState([]);
    const [show, setShow] = useState(false);
    const [brokerName, setBrokerName] = useState('');
    const [brokerDetails, setBrokerDetails] = useState({});

    const [showModal, setshowModal] = useState(false)



    useEffect(() => {
        fetchBrokerName();
    }, []);

    const fetchBrokerName = async () => {
        try {
            const response = await Get_Broker_Name();
            if (response.Status) {
                const brokerList = response?.Brokernamelist?.filter(item => item.BrokerName !== 'DEMO');
                setBrokers(brokerList);
            } else {
                setBrokers([]);
            }
        } catch (error) {
            console.log('Error in fetching brokers', error);
        }
    };

    useEffect(() => {
        getBrokerAlldetails()
    }, [brokerName]);


    const getBrokerAlldetails = async () => {
        if (brokerName === '') return;
        const req = { BrokerName: brokerName };
        try {
            await viewBrokerDetails(req)
                .then((response) => {
                    if (response.status) {
                        setBrokerDetails(response.data);
                    } else {
                        setBrokerDetails({});
                    }
                });

        } catch (error) {
            console.log('Error in fetching brokers', error);
        }
    };


    const handleShow = () => {
        setshowModal(true);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {brokers.map((item, index) => (
                        <div className="col" key={index}>
                            <div className="card broker-card">
                                <div className="trading-icon">
                                    <BarChart2 size={20} />
                                </div>

                                <div className="card-body text-center">
                                    <h5 className="card-title">{item.BrokerName}</h5>
                                    <div className="card-actions mt-3">
                                        <Eye size={24} className="action-icon edit-icon" onClick={() => { handleShow(); setBrokerName(item.BrokerName) }} />
                                        <Trash2 size={24} className="action-icon delete-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                <Modal isOpen={showModal} size="lg" title={`${brokerDetails.Brokername}  API Create Information.`} hideBtn={true}
                    handleClose={() => setshowModal(false)}
                >
                    <h4>API Process of {brokerDetails.Brokername}: -</h4>
                    {brokerDetails.description ?
                        <ul>
                            {brokerDetails.description && brokerDetails.description.split("\n").map((line, index) => (
                                <>
                                    <li key={index}>{line}</li><br />
                                </>
                            ))}
                        </ul>
                        : ""
                    }

                    {brokerDetails.Step1Text || brokerDetails.Step1Image ? <>
                        <h4 className="text-decoration-underline">Step 1: </h4>
                        <p>{brokerDetails.Step1Text}</p>
                        <br />
                        {brokerDetails.Step1Image ? <img src={brokerDetails.Step1Image} alt="" className="w-100 my-3 border border-dark" /> : ""}

                    </> : ""}

                    {brokerDetails.Step2Text || brokerDetails.Step2Image ? <>
                        <h4 className="text-decoration-underline">Step 2: </h4>
                        <p>{brokerDetails.Step2Text}</p>
                        <br />
                        {brokerDetails.Step2Image ? <img src={brokerDetails.Step2Image} alt="" className="w-100 my-3 border border-dark" /> : ""}

                    </> : ""}

                    {brokerDetails.Step3Text || brokerDetails.Step3Image ? <>
                        <h4 className="text-decoration-underline">Step 1: </h4>
                        <p>{brokerDetails.Step3Text}</p>
                        <br />
                        {brokerDetails.Step3Image ? <img src={brokerDetails.Step3Image} alt="" className="w-100 my-3 border border-dark" /> : ""}

                    </> : ""}

                    {brokerDetails.Step4Text || brokerDetails.Step4Image ? <>
                        <h4 className="text-decoration-underline">Step 1: </h4>
                        <p>{brokerDetails.Step4Text}</p>
                        <br />
                        {brokerDetails.Step4Image ? <img src={brokerDetails.Step4Image} alt="" className="w-100 my-3 border border-dark" /> : ""}

                    </> : ""}

                    {brokerDetails.Step5Text || brokerDetails.Step5Image ? <>
                        <h4 className="text-decoration-underline">Step 1: </h4>
                        <p>{brokerDetails.Step5Text}</p>
                        <br />
                        {brokerDetails.Step5Image ? <img src={brokerDetails.Step5Image} alt="" className="w-100 my-3 border border-dark" /> : ""}

                    </> : ""}

                </Modal>
            }

        </>

    );
};

export default ApiCreateInfo;
