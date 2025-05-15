import React, { useEffect, useState } from 'react';
import Content from '../../../../ExtraComponent/Content';
import { useNavigate } from 'react-router-dom';
import { getChartingStrategyTag } from '../../../CommonAPI/Admin';
import './StrategyTag.css'; // Import the external CSS file
import NoDataFound from '../../../../ExtraComponent/NoDataFound'; // Import NoDataFound component

const AllStrategyTag = () => {
    const navigate = useNavigate();
    const [strategyTags, setStrategyTags] = useState([]);

    const fetchStarategyTag = async () => {
        const res = await getChartingStrategyTag();
        if (res && res.data) {
            setStrategyTags(res.data); // Store the data in state
        }
    };

    useEffect(() => {
        fetchStarategyTag();
    }, []);


    return (
        <Content
            Page_title={"📄 All Strategy"}
            button_status={false}
            backbutton_status={true}>
            <div className='d-flex justify-content-between align-items-center allStrategy-header'>
                <p></p>
                <button className='addbtn' onClick={() => navigate('/admin/add-Strategy-tag')}>Add Strategy</button>
            </div>
            <div className="strategy-container">
                {strategyTags.length === 0 ? (
                    <NoDataFound /> // Render NoDataFound if no data
                ) : (
                    strategyTags.map((tag, index) => (
                        <div className="strategy-card" key={index}>
                            <div className="strategy-image-container pclass">
                                <img
                                    src={
                                        tag.Image.startsWith('data:image') 
                                            ? tag.Image 
                                            : `data:image/jpeg;base64,${tag.Image}`
                                    }
                                    alt="Strategy"
                                    className="strategy-image"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                />
                            </div>
                            <div className="strategy-content pclass">
                                <div className="strategy-row ">
                                    <p className="strategy-label">Strategy Tag:</p>
                                    <p className="strategy-value">{tag.Strategytag}</p>
                                </div>
                                <div className="strategy-row">
                                    <p className="strategy-label">Indicator:</p>
                                    <p className="strategy-value">{tag.Indicatorname}</p>
                                </div>
                                <div className="strategy-row">
                                    <p className="strategy-label">Description:</p>
                                    <p className="strategy-value">{tag.Description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Content>
    );
};

export default AllStrategyTag;