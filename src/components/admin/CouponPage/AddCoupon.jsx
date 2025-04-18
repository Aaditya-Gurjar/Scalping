import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import Content from '../../../ExtraComponent/Content';
import Select from 'react-select';
import './AddCoupon.css'; // Optional: Add styling if needed

const AddCoupon = () => {
    const [userOptions, setUserOptions] = useState([]);

    useEffect(() => {
        // Populate user options
        const options = [
            { label: "All Users", value: "all" },
            { label: "Select Users", value: "select" },
            { label: "New Users", value: "new" },
        ];
        setUserOptions(options);
    }, []);

    const formik = useFormik({
        initialValues: {
            planName: '',
            couponCode: '',
            discountPer: '',
            user: '',
            expiry: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.planName) {
                errors.planName = 'Plan name is required';
            }
            if (!values.couponCode) {
                errors.couponCode = 'Coupon code is required';
            }
            if (!values.discountPer) {
                errors.discountPer = 'Discount percentage is required';
            } else if (values.discountPer < 1) {
                errors.discountPer = 'Discount must be at least 1%';
            } else if (values.discountPer > 100) {
                errors.discountPer = 'Discount cannot exceed 100%';
            }
            if (!values.user) {
                errors.user = 'User selection is required';
            }
            if (!values.expiry) {
                errors.expiry = 'Expiry date is required';
            }
            return errors;
        },
        onSubmit: (values) => {
            Swal.fire({
                title: 'Coupon Created!',
                text: `Coupon details: ${JSON.stringify(values, null, 2)}`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        },
    });

    return (
        <Content
            Page_title="🏷️ Add Coupon"
            button_status={true}
            backbutton_status={true}
        >
            <div className="add-coupon-container">
                <h1>Create Coupon</h1>
                <form onSubmit={formik.handleSubmit} className="form-full-width">
                    <div className="form-group">
                        <label htmlFor="planName">Plan Name</label>
                        <input
                            type="text"
                            id="planName"
                            name="planName"
                            value={formik.values.planName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.planName && formik.errors.planName && (
                            <div className="error-message">{formik.errors.planName}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="couponCode">Coupon Code</label>
                        <input
                            type="text"
                            id="couponCode"
                            name="couponCode"
                            value={formik.values.couponCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.couponCode && formik.errors.couponCode && (
                            <div className="error-message">{formik.errors.couponCode}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="discountPer">Discount (%)</label>
                        <input
                            type="number"
                            id="discountPer"
                            name="discountPer"
                            value={formik.values.discountPer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.discountPer && formik.errors.discountPer && (
                            <div className="error-message">{formik.errors.discountPer}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">User</label>
                        <Select
                            id="user"
                            name="user"
                            options={userOptions}
                            onChange={(selected) => formik.setFieldValue('user', selected.value)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.user && formik.errors.user && (
                            <div className="error-message">{formik.errors.user}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input
                            type="date"
                            id="expiry"
                            name="expiry"
                            value={formik.values.expiry}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.expiry && formik.errors.expiry && (
                            <div className="error-message">{formik.errors.expiry}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </Content>
    );
};

export default AddCoupon;