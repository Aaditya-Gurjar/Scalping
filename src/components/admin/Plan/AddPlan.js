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
        <div className="col-lg-6 mt-2">
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
            payment: "",
            planname: "",
            Duration: "",
            PlanType: "Scalping",
        },
        validate: (values) => {
            const errors = {};
            if (!values.NumberofScript && formik.values.PlanType == "Scalping")
                errors.NumberofScript = "Please enter the number of scripts.";
            if (!values.payment) errors.payment = "Payment is required.";
            if (!values.planname) errors.planname = "Please provide a plan name.";
            if (!values.Duration) errors.Duration = "Please select a plan duration.";
            if (formik.values.PlanType == "Charting" && selectedCharting.length == 0)
                errors.Charting = "Please select at least one charting type.";

            return errors;
        },
        onSubmit: async (values) => {
            if (formik.values.PlanType == "Scalping" && selecteScalping.length === 0 && selecteOptions.length === 0 && selectePattern.length === 0) {
                showError("Error!", "Please select at least one strategy Either Scalping , Option , Pattern.");
                return;
            }
            const req = {
                ...values,
                Scalping: selecteScalping.map((strategy) => strategy.value),
                Option: selecteOptions.map((strategy) => strategy.value),
                PatternS: selectePattern.map((strategy) => strategy.value),
                Charting: selectedCharting.map((chart) => chart.value),
                NumberofScript: formik.values.PlanType == "Scalping" ? values.NumberofScript : 0,
            };
            try {
                const response = await AddPlan(req);
                if (response.Status) {
                    Swal.fire({
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
        setSelecteOptions([]);
        setSelecteScalping([]);
        setSelectePattern([]);
    };

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
    ];

    return (

        <AddForm
            fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}
            page_title="Add Plan"
            btn_name="Add"
            btn_name1="Cancel"
            formik={formik}
            btn_name1_route={"/admin/clientservice"}
            additional_field={
                <>
                    {formik.values.PlanType == "Charting" && (
                        <>
                            <CustomMultiSelect
                                label="Charting"
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
                            label="Scalping"
                            options={scalpingStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                            selected={selecteScalping}
                            onChange={(selected) => handleSelectChange("scalping", selected)}
                        />
                    )}

                    {formik.values.PlanType == "Scalping" && (
                        <CustomMultiSelect
                            label="Option"
                            options={OptionStratgy.map(strategy => ({ value: strategy, label: strategy }))}
                            selected={selecteOptions}
                            onChange={(selected) => handleSelectChange("option", selected)}
                        />
                    )}

                    {formik.values.PlanType == "Scalping" && (
                        <CustomMultiSelect
                            label="Pattern"
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
