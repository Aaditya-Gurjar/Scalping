// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2'
// import { AddPlan, GetAllStratgy } from '../../CommonAPI/Admin'
// import AddForm from "../../../ExtraComponent/FormData";
// import { useFormik } from "formik";
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
// import { useNavigate } from 'react-router-dom';

// const AddPlanPage = () => {
//     const navigate = useNavigate()
//     const [selecteOptions, setSelectedOptions] = useState([])
//     const [selecteScalping, setSelecteScalping] = useState([])
//     const [selectePattern, setSelectePattern] = useState([])
//     const [scalpingStratgy, setScalpingStratgy] = useState([])
//     const [OptionStratgy, setOptionStratgy] = useState([])
//     const [PatternStratgy, setPatternStratgy] = useState([])

//     useEffect(() => {
//         GetScalpingStratgy()
//     }, [])

//     const GetScalpingStratgy = async () => {
//         await GetAllStratgy()
//             .then((response) => {
//                 if (response.Status) {
//                     setScalpingStratgy(Object.values(response.Scalping))
//                     setPatternStratgy(Object.values(response.Pattern))
//                     setOptionStratgy(Object.values(response.Option))

//                 }
//                 else {
//                     setScalpingStratgy([])
//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in getting the Scalping Stratgy", err)
//             })
//     }

//     const formik = useFormik({
//         initialValues: {
//             NumberofScript: "",
//             payment: "",
//             planname: "",
//             Duration: "",
//         },
//         validate: (values) => {
//             let errors = {};
//             if (!values.NumberofScript) {
//                 errors.NumberofScript = "Please Enter Number of Script"
//             }
//             if (!values.payment) {
//                 errors.payment = "Please Enter Payment"
//             }
//             if (!values.planname) {
//                 errors.planname = "Please Enter Plan Name"
//             }
//             if (!values.Duration) {
//                 errors.Duration = "Please Select Duration"
//             }
//             return errors;
//         },
//         onSubmit: async (values) => {
//             const req = {
//                 NumberofScript: values.NumberofScript,
//                 payment: values.payment,
//                 planname: values.planname,
//                 Duration: values.Duration,
//                 Scalping: selecteScalping,
//                 Option: selecteOptions,
//                 PatternS: selectePattern
//             }
//             await AddPlan(req)
//                 .then((response) => {
//                     if (response.Status) {
//                         Swal.fire({

//                             title: "Success!",
//                             text: response.message,
//                             icon: "success",
//                             timer: 1500,
//                             timerProgressBar: true
//                         });
//                         setTimeout(() => {
//                             navigate('/admin/allplan')
//                         }, 1500)
//                     }
//                     else {
//                         Swal.fire({

//                             title: "Error!",
//                             text: response.message,
//                             icon: "error",
//                             timer: 1500,
//                             timerProgressBar: true
//                         });
//                     }
//                 })
//                 .catch((err) => {
//                     console.log("Error in adding the new user", err)
//                 })
//         },
//     });

//     const fields = [
//         {
//             name: "NumberofScript",
//             label: "Number of Script",
//             type: "text3",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "payment",
//             label: "Payment",
//             type: "text3",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "planname",
//             label: "Plan Name",
//             type: "text",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         }, 
//         {
//             name: "Duration",
//             label: "Duration",
//             type: "select1",
//             options: [
//                 { value: "One_Month", label: "One Month" },
//                 { value: "Quarterly", label: "Quarterly" },
//                 { value: "Half_Yearly", label: "Half Yearly" },
//                 { value: "Yearly", label: "Yearly" },
//             ],
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//     ];

//     return (
//         <>
//             <AddForm
//                 fields={fields.filter(
//                     (field) => !field.showWhen || field.showWhen(formik.values)
//                 )}
//                 page_title="Add Plan"
//                 btn_name="Add"
//                 btn_name1="Cancel"
//                 formik={formik}
//                 btn_name1_route={"/admin/clientservice"}
//                 additional_field={
//                     <>
//                         {scalpingStratgy && scalpingStratgy.length > 0 && (
//                             <div className="col-lg-6 mt-2 ">
//                                 <h6>Scalping</h6>
//                                 <DropdownMultiselect
//                                     options={scalpingStratgy}
//                                     name="groupName"
//                                     handleOnChange={(selected) => {
//                                         setSelecteScalping(selected);
//                                     }}
//                                 />
//                             </div>
//                         )}

//                         {OptionStratgy && OptionStratgy.length > 0 && (
//                             <div className="col-lg-6 mt-2 ">
//                                 <h6>Option</h6>
//                                 <DropdownMultiselect
//                                     options={OptionStratgy}
//                                     name="groupName"
//                                     handleOnChange={(selected) => {
//                                         setSelectedOptions(selected);
//                                     }}
//                                 />
//                             </div>
//                         )}

//                         {PatternStratgy && PatternStratgy.length > 0 && (
//                             <div className="col-lg-6 mt-2  ">
//                                 <h6>Patterm</h6>
//                                 <DropdownMultiselect
//                                     options={PatternStratgy}
//                                     name="groupName"
//                                     handleOnChange={(selected) => {
//                                         setSelectePattern(selected);
//                                     }}
//                                 />
//                             </div>

//                         )}
//                     </>
//                 }
//             />

//         </>
//     );
// };

// export default AddPlanPage;


import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AddPlan, GetAllStratgy } from '../../CommonAPI/Admin';
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// Custom multi-select component
const CustomMultiSelect = ({ label, options, selected, onChange, disabled }) => {
    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: 'black',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };

    return (
        <div className="col-lg-6">
            <h6>{label}</h6>
            <Select
                isMulti
                options={options}
                value={selected}
                onChange={onChange}
                isDisabled={disabled}
                styles={customStyles}
            />
            <div></div>
        </div>
    );
};

const AddPlanPage = () => {
    const navigate = useNavigate();
    const [selecteOptions, setSelecteOptions] = useState([]);
    const [selecteScalping, setSelecteScalping] = useState([]);
    const [selectePattern, setSelectePattern] = useState([]);
    const [selectedCharting, setSelectedCharting] = useState([]);

    const [scalpingStratgy, setScalpingStratgy] = useState([]);
    const [OptionStratgy, setOptionStratgy] = useState([]);
    const [PatternStratgy, setPatternStratgy] = useState([]);

    useEffect(() => {
        GetScalpingStratgy();
    }, []);

    const GetScalpingStratgy = async () => {
        try {
            const response = await GetAllStratgy();
            if (response.Status) {
                setScalpingStratgy(Object.values(response.Scalping));
                setPatternStratgy(Object.values(response.Pattern));
                setOptionStratgy(Object.values(response.Option));
            } else {
                showError("Failed to fetch strategies", response.message);
            }
        } catch (err) {
            showError("Network error occurred");
        }
    };

    const showError = (title, message = "") => {
        Swal.fire({
            background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: title,
            text: message || "An error occurred.",
            icon: "error",
            timer: 1500,
            timerProgressBar: true
        });
    };
    const formik = useFormik({
        initialValues: {
            NumberofScript: "",
            payment: 0,
            planname: "",
            Duration: "One_Month",
            PlanType: "Scalping",
            SOPLiveTrade: 0,
            SOPPaperTrade: 0,
            Charting: [],
            ChartPerMonth: "",
        },
        validate: (values) => {
            const errors = {};
            // if (!values.NumberofScript && formik.values.PlanType == "Scalping")
            //     errors.NumberofScript = "Please enter the number of scripts.";
            // if (!values.payment) errors.payment = "Payment is required.";
            // if (!values.planname) errors.planname = "Please provide a plan name.";

            if (!values.NumberofScript && formik.values.PlanType === "Scalping") {
                errors.NumberofScript = "Please enter the number of scripts.";
            } else if (values.NumberofScript == 0 && formik.values.PlanType === "Scalping") {
                errors.NumberofScript = "Number of scripts cannot be zero.";
            }

            if (!values.payment) {
                errors.payment = "Payment is required.";
            } else if (values.payment == 0) {
                errors.payment = "Payment cannot be zero.";
            }

            if (!values.planname) {
                errors.planname = "Please provide a plan name.";
            } else if (!/^[A-Za-z\s]+$/.test(values.planname.trim())) {
                errors.planname = "Plan name should only contain alphabets (No numbers or special characters).";
            }

            if (values.PlanType === "Charting" && (!values.Charting || values.Charting.length === 0)) {
                errors.Charting = "Please select at least one Segment.";
            }


            if (!values.Duration) errors.Duration = "Please select a plan duration.";




            return errors;

        },
        onSubmit: async (values) => {
            if (formik.values.PlanType == "Scalping" && selecteScalping.length === 0 && selecteOptions.length === 0 && selectePattern.length === 0) {
                showError("Error!", "Please select at least one strategy either Scalping, Option or Pattern.");
                return;
            }
            const req = {
                ...values,
                Scalping: selecteScalping.map((strategy) => strategy.value),
                Option: selecteOptions.map((strategy) => strategy.value),
                PatternS: selectePattern.map((strategy) => strategy.value),
                Charting: selectedCharting.map((chart) => chart.value),
                ...(formik.values.PlanType === "Scalping"
                    ? { SOPPrice: values.SOPPrice, SOPLiveTrade: (values.SOPLiveTrade || 0) }
                    : { ChartPerMonth: values.SOPPrice, SOPPrice: 0, ChartPerTrade: (values.SOPLiveTrade || 0) }
                ),

                SOPPaperTrade: values.SOPPaperTrade || 0.0,


            };
            try {
                const response = await AddPlan(req);
                if (response.Status) {
                    Swal.fire({
                        background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Success!",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        navigate('/admin/allplan');
                    }, 1500);
                } else {
                    showError("Error!", response.message);
                }
            } catch (err) {
                showError("An unexpected error occurred");
            }
        },
    });

    const handleChartingChange = (selected) => {
        setSelectedCharting(selected);
        formik.setFieldValue("Charting", selected);
    };

    useEffect(() => {
        formik.setFieldValue("Charting", selectedCharting);
    }, [selectedCharting])


    const handleSelectChange = (type, selected) => {
        if (type === "scalping") {
            setSelecteScalping(selected);
            setSelectedCharting([]);
        } else if (type === "option") {
            setSelecteOptions(selected);
            setSelectedCharting([]);
        } else if (type === "pattern") {
            setSelectePattern(selected);
            setSelectedCharting([]);
        }
    };

    const fields = [
        {
            name: "PlanType",
            label: "Plan Type",
            type: "select",
            options: [{ value: "Scalping", label: "Scalping" }, { value: "Charting", label: "Charting" }],
            col_size: 6,
        },
        {
            name: "NumberofScript",
            label: "Number of Script",
            type: "text3",
            showWhen: (values) => values.PlanType == "Scalping",
            col_size: 6,
        },
        {
            name: "payment",
            label: "Payment",
            type: "text3",
            col_size: 6,
        },
        {
            name: "planname",
            label: "Plan Name",
            type: "text",
            col_size: 6,
        },
        {
            name: "Duration",
            label: "Duration",
            type: "select",
            options: [
                { value: "One_Month", label: "One Month" },
                { value: "Quarterly", label: "Quarterly" },
                { value: "Half_Yearly", label: "Half Yearly" },
                { value: "Yearly", label: "Yearly" },
            ],
            col_size: 6,
        },
        {
            name: "SOPLiveTrade",
            label: "Live Trade Amount",
            type: "text",
            col_size: 6,
        },
        {
            name: "SOPPaperTrade",
            label: "Paper Trade Amount",
            type: "text",
            showWhen: () => formik.values.PlanType === "Scalping", // Removed unnecessary {}
            col_size: 6,
        },



    ];

    return (

        <Content
            Page_title={" ➕ Add Plan"}
            button_status={false}
            backbutton_status={false}
        >


            <AddForm
                className="admin-add-btn"
                fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}
                btn_name="Add"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/admin/allplan"}
                additional_field={
                    <>
                        {formik.values.PlanType == "Charting" && (
                            <div className="col-lg-5 w" style={{ width: "39vw" }}>
                                <CustomMultiSelect
                                    label={<span className='card-text-Color'>Segment</span>}
                                    options={[
                                        { value: "Cash", label: "Cash" },
                                        { value: "Future", label: "Future" },
                                        { value: "Option", label: "Option" }
                                    ]}
                                    selected={selectedCharting}
                                    onChange={handleChartingChange}
                                />
                                {/* Error message positioned directly below the select */}
                                {formik.errors.Charting && (
                                    <div className="text-danger mt-1 small">
                                        {formik.errors.Charting}
                                    </div>
                                )}
                            </div>
                        )}
                        {formik.values.PlanType == "Scalping" && (
                            <CustomMultiSelect
                                label={<span >Segment</span>}
                                options={[
                                    { value: "Cash", label: "Cash" },
                                    { value: "Future", label: "Future" },
                                    { value: "Option", label: "Option" }
                                ]}
                                selected={selectedCharting}
                                onChange={handleChartingChange}
                            />
                            <div><h6 className="text-danger">{formik.errors.Charting}</h6></div>
                        </>
                    )}

                    {formik.values.PlanType == "Scalping" && (
                        <CustomMultiSelect
                            label={<span >Scalping</span>}
                            options={scalpingStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                            selected={selecteScalping}
                            onChange={(selected) => handleSelectChange("scalping", selected)}
                        />
                    )}

                    {formik.values.PlanType == "Scalping" && (
                        <CustomMultiSelect
                            label={<span >Option</span>}
                            options={OptionStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                            selected={selecteOptions}
                            onChange={(selected) => handleSelectChange("option", selected)}
                        />
                    )}

                    {formik.values.PlanType == "Scalping" && (
                        <CustomMultiSelect
                            label={<span >Pattern</span>}
                            options={PatternStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                            selected={selectePattern}
                            onChange={(selected) => handleSelectChange("pattern", selected)}
                        />
                    )}
                </>
            }
        />
    );
};

export default AddPlanPage;
