import React, { useEffect, useState } from 'react';
import Content from '../../../ExtraComponent/Content';
import { getAdminCouponDetails } from '../../CommonAPI/Admin';
import "./CouponPage.css";
import { useNavigate } from 'react-router-dom';

const CouponPage = () => {
    const [couponDetails, setCouponDetails] = useState([]);
    const navigatge = useNavigate();

    const fetchCouponDetails = async () => {
        try {
            const response = await getAdminCouponDetails();
            console.log("Coupon Details:", response.Data);
            setCouponDetails(response.Data);
        } catch (error) {
            console.error('Error fetching coupon details:', error);
        }
    };

    const handleAddCouponClick = () => {
        navigatge("/admin/addCoupon")
    };

    useEffect(() => {
        fetchCouponDetails();
    }, []);

    console.log("Coupon Details:", couponDetails);

    return (
        <>
            <Content
                Page_title={"🏷️ Coupon Page"}
                button_status={true}
                backbutton_status={true}
                 
            >
                <div className="add-coupon-btn-container">
                    <button className="addbtn" onClick={handleAddCouponClick}>
                        Add Coupon
                    </button>
                </div>
                <div className="coupon-container">
                    {couponDetails.map((coupon, index) => (
                        <div className="coupon-card" key={index}>
                            <h3 className="coupon-planname">{coupon.Planname}</h3>
                            <p>
                                <strong>Coupon Code:</strong> 
                                <span className="highlight"> {coupon.CouponCode}</span>
                            </p>
                            <p><strong>Discount:</strong> {coupon.DiscountPer}%</p>
                            <p><strong>Applicable Users:</strong> {coupon.User.join(", ")}</p>
                            <p><strong>Expiry Date:</strong> {coupon.ExpiryDate}</p>
                            <p><strong>Created On:</strong> {coupon.Datetime}</p>
                        </div>
                    ))}
                </div>
            </Content>
        </>
    );
};

export default CouponPage;
