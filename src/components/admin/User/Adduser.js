


// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2'
// import { CreateAccount, Get_Broker_Name, GetGroupNames } from '../../CommonAPI/Admin'
// import AddForm from "../../../ExtraComponent/FormData";
// import { useFormik } from "formik";
// import { useNavigate } from 'react-router-dom';
// import Loader from '../../../ExtraComponent/Loader';
// import { Get_All_Plans } from "../../CommonAPI/User";
// import Select from 'react-select';


// const Adduser = () => {
//     const navigate = useNavigate()
//     const [getBroker, setBroker] = useState({ loading: true, data: [] })
//     const [getGroupData, setGroupData] = useState({ loading: true, data: [] })
//     const [selectedOptions, setSelectedOptions] = useState([]);
//     const [optionsArray, setOptionsArray] = useState([]);
//     const [selectedIndex, setSelectedIndex] = useState([]);
//     const [GetAllPlans, setAllPlans] = useState({ LivePlanName: [], DemoPlanName: [], data: [] });
//     const Name_regex = (name) => {
//         const nameRegex = /^[a-zA-Z]+$/;
//         return nameRegex.test(name);
//     };


//     useEffect(() => {
//         getBrokerName()
//         GetAllGroupDetails()
//         GetAllPlansData();
//     }, [])

//     console.log("GetAllPlans", GetAllPlans)
//     const getBrokerName = async () => {
//         await Get_Broker_Name()
//             .then((response) => {
//                 if (response.Status) {
//                     const filterOutBroker = response.Brokernamelist.filter((item) => {
//                         return item.BrokerName != 'DEMO'
//                     })
//                     setBroker({
//                         loading: false,
//                         data: filterOutBroker
//                     })
//                 }
//                 else {
//                     setBroker({
//                         loading: false,
//                         data: []
//                     })
//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in finding the broker", err)
//             })
//     }

//     const GetAllGroupDetails = async () => {
//         try {
//             const response = await GetGroupNames();
//             if (response.Status) {
//                 const options = response.Data.map((item) => ({
//                     label: item.GroupName,
//                     value: item.GroupName,
//                 }));
//                 setOptionsArray(options);
//                 setGroupData({
//                     loading: false,
//                     data: response.Data
//                 })
//             } else {
//                 setOptionsArray([]);
//                 setGroupData({
//                     loading: false,
//                     data: []
//                 })
//             }
//         } catch (err) {
//             console.log("Error fetching group names", err);
//         }
//     };

//     const GetAllPlansData = async () => {
//         await Get_All_Plans()
//             .then((response) => {

//                 if (response.Status) {
//                     const LivePlanName = [
//                         ...response.Admin.filter((item) => item.Planname !== 'One Week Demo' && item.Planname !== 'Two Days Demo'),
//                         ...response.Charting // Charting array ko add kar diya
//                     ];

//                     const DemoPlanName = response.Admin.filter((item) => item.Planname === 'One Week Demo' || item.Planname === 'Two Days Demo');
                  
            
//                     setAllPlans({
//                         DemoPlanName: DemoPlanName,
//                         LivePlanName: LivePlanName,
//                         data: [...response.Admin, ...response.Charting]
//                     });
//                 }
//                 else {
//                     setAllPlans({ DemoPlanName: [], LivePlanName: [], data: [] });
//                 }
//             })
//             .catch((err) => {
//                 console.log("Error in fetching the plans", err)
//             })
//     };

//     const formik = useFormik({
//         initialValues: {
//             username: "",
//             email: "",
//             password: "",
//             cpassword: "",
//             mobile_no: "",
//             Select_License: "",
//             ClientAmmount: 0,
//             planname: "",
//             bname: "",
//             groupName: [],
//         },
//         validate: (values) => {
//             let errors = {};
//             if (!values.username) {
//                 errors.username = "Please Enter Username"
//             }
//             else if (!Name_regex(values.username)) {
//                 errors.username = "Please Enter Valid Username"
//             }
//             if (!values.email) {
//                 errors.email = "Please Enter Email ID";
//             } else {
//                 const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in|in|net|org|edu|gov|uk|us|info|biz|io|co)$/i;

//                 const trimmedEmail = values.email.trim();

//                 if (!emailRegex.test(trimmedEmail)) {
//                     errors.email = "Please Enter a Valid Email ID";
//                 }

//                 else if (/\.\./.test(trimmedEmail)) {
//                     errors.email = "Invalid Email Format";
//                 }

//                 else if (/^[._%+-]|[._%+-]$/.test(trimmedEmail)) {
//                     errors.email = "Email cannot start or end with special characters";
//                 }
//             }
//             if (!values.password) {
//                 errors.password = "Please Enter Password"
//             }
//             if (!values.cpassword) {
//                 errors.cpassword = "Please Enter Confirm Password"
//             }
//             if (!values.mobile_no) {
//                 errors.mobile_no = "Please Enter Mobile Number"
//             }
//             if (!values.Select_License) {
//                 errors.Select_License = "Please Select License"
//             }
//             if (!values.ClientAmmount && formik.values.Select_License == '2') {
//                 errors.ClientAmmount = "Please Enter Amount"
//             }
//             if (!values.planname) {
//                 errors.planname = "Please Select Plan"
//             }

//             if (!values.bname && formik.values.Select_License == '2') {
//                 errors.bname = "Please Select Broker"
//             }
//             console.log("eror", errors)
//             return errors;
//         },
//         onSubmit: async (values) => {
//             const req = {
//                 username: values.username,
//                 email: values.email,
//                 password: values.password,
//                 cpassword: values.cpassword,
//                 mobile_no: values.mobile_no,
//                 bname: formik.values.Select_License == 1 ? "DEMO" : values.bname,
//                 ClientAmmount: formik.values.Select_License == 1 ? 0 : Number(values.ClientAmmount),
//                 planname: values.planname,
//                 group: selectedOptions && selectedOptions.map((item) => item.value),
//             }

//             console.log("req", req)
//             console.log("values.planname", values.planname)

//             const FilterPlanAmount = GetAllPlans.data.filter((item) => (item.PlanName) === values.planname);

//             console.log("req", req)
//             console.log("FilterPlanAmount", FilterPlanAmount)

//             if (FilterPlanAmount[0].payment > values.ClientAmmount && FilterPlanAmount[0].payment !== '') {
//                 Swal.fire({
//                     background: "#1a1e23 ",
//                     backdrop: "#121010ba",
//                     confirmButtonColor: "#1ccc8a",
//                     title: "Invalid Amount",
//                     text: `The plan amount is ${FilterPlanAmount[0].payment}, but you've entered ${values.ClientAmmount}. Please enter an amount greater than the plan amount.`,
//                     icon: "error",
//                     timer: 3000,
//                     timerProgressBar: true
//                 });


//             }

//             console.log("req at last ", req)

//             await CreateAccount(req)
//                 .then((response) => {
//                     if (response.Status) {
//                         Swal.fire({
//                             background: "#1a1e23 ",
//                             backdrop: "#121010ba",
//                             confirmButtonColor: "#1ccc8a",
//                             title: "User Created!",
//                             text: response.message,
//                             icon: "success",
//                             timer: 1500,
//                             timerProgressBar: true
//                         });
//                         setTimeout(() => {
//                             navigate('/admin/clientservice')
//                         }, 1500)
//                     }
//                     else {
//                         Swal.fire({
//                             background: "#1a1e23 ",
//                             backdrop: "#121010ba",
//                             confirmButtonColor: "#1ccc8a",
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
//             name: "username",
//             label: "Username",
//             type: "text",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "email",
//             label: "Email ID",
//             type: "text",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "password",
//             label: "Password",
//             type: "password",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "cpassword",
//             label: "Confirm Password",
//             type: "password",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "mobile_no",
//             label: "Mobile Number",
//             type: "text3",
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {


//             name: "Select_License",
//             label: "License Type",
//             type: "select1",
//             options: [
//                 { label: "Demo", value: "1" },
//                 { label: "Live", value: "2" },

//             ],
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "ClientAmmount",
//             label: "Amount",
//             type: "text3",
//             showWhen: (values) => formik.values.Select_License == '2',
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },

//         {
//             name: "planname",
//             label: "Plan Name",
//             type: "select1",
//             options: formik.values.Select_License === '1'
//                 ? GetAllPlans.DemoPlanName.map((item) => ({
//                     label: (item.PlanName || item.Planname),
//                     value: (item.PlanName || item.Planname),
//                 }))
//                 : formik.values.Select_License === '2'
//                     ? GetAllPlans.LivePlanName.map((item) => ({
//                         label: (item.PlanName || item.Planname),
//                         value: (item.PlanName || item.Planname),
//                     }))
//                     : [],
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },
//         {
//             name: "bname",
//             label: "Broker",
//             type: "select1",
//             options: getBroker.data && getBroker.data.map((item) => ({
//                 label: item.BrokerName,
//                 value: item.BrokerName
//             })),
//             showWhen: (values) => formik.values.Select_License == '2',
//             label_size: 12,
//             hiding: false,
//             col_size: 6,
//             disable: false,
//         },



//     ];

//     useEffect(() => {
//         if (formik.values.Select_License === '1') {
//             formik.setFieldValue('bname', "DEMO");
//             formik.setFieldValue('ClientAmmount', 0);
//             formik.setFieldValue('planname', "");
//         } else if (formik.values.Select_License === '2') {
//             formik.setFieldValue('bname', "");
//             formik.setFieldValue('ClientAmmount', "");
//             formik.setFieldValue('planname', "");
//         }
//     }, [formik.values.Select_License]);


//     return (
//         <>
//             {getGroupData.loading ? <Loader /> :
//                 (
//                     <AddForm
//                         fields={fields.filter(
//                             (field) => !field.showWhen || field.showWhen(formik.values)
//                         )}
//                         page_title="Create Account"
//                         btn_name="Add"
//                         btn_name1="Cancel"
//                         formik={formik}
//                         btn_name1_route={"/admin/clientservice"}


//                         additional_field={
//                             <div className="col-lg-6 dropdownuser">
//                                 <label>Select Group</label>
//                                 <Select
//                                     defaultValue={selectedIndex?.Planname?.map((item) => ({
//                                         value: item,
//                                         label: item,
//                                     }))}
//                                     isMulti
//                                     options={optionsArray}
//                                     onChange={(selected) => {
//                                         setSelectedOptions(selected);
//                                         formik.setFieldValue('groupName', selected.map((option) => option.value));
//                                     }}
//                                     className="basic-multi-select"
//                                     classNamePrefix="select"
//                                 />
//                             </div>

//                         }
//                     />
//                 )}
//         </>
//     );
// };

// export default Adduser;






import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { CreateAccount, Get_Broker_Name, GetGroupNames } from '../../CommonAPI/Admin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../ExtraComponent/Loader';
import { Get_All_Plans } from "../../CommonAPI/User";
import Select from 'react-select';


const Adduser = () => {
    const navigate = useNavigate()
    const [getBroker, setBroker] = useState({ loading: true, data: [] })
    const [getGroupData, setGroupData] = useState({ loading: true, data: [] })
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [optionsArray, setOptionsArray] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [GetAllPlans, setAllPlans] = useState({ LivePlanName: [], DemoPlanName: [], data: [] });
    const Name_regex = (name) => {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    };


    useEffect(() => {
        getBrokerName()
        GetAllGroupDetails()
        GetAllPlansData();
    }, [])

    const getBrokerName = async () => {
        await Get_Broker_Name()
            .then((response) => {
                if (response.Status) {
                    const filterOutBroker = response.Brokernamelist.filter((item) => {
                        return item.BrokerName != 'DEMO'
                    })
                    setBroker({
                        loading: false,
                        data: filterOutBroker
                    })
                }
                else {
                    setBroker({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the broker", err)
            })
    }

    const GetAllGroupDetails = async () => {
        try {
            const response = await GetGroupNames();
            if (response.Status) {
                const options = response.Data.map((item) => ({
                    label: item.GroupName,
                    value: item.GroupName,
                }));
                setOptionsArray(options);
                setGroupData({
                    loading: false,
                    data: response.Data
                })
            } else {
                setOptionsArray([]);
                setGroupData({
                    loading: false,
                    data: []
                })
            }
        } catch (err) {
            console.log("Error fetching group names", err);
        }
    };

    const GetAllPlansData = async () => {
        await Get_All_Plans()
            .then((response) => {

                if (response.Status) {
                    const LivePlanName = [
                        ...response.Admin.filter((item) => item.Planname !== 'One Week Demo' && item.Planname !== 'Two Days Demo'),
                        ...response.Charting // Charting array ko add kar diya
                    ];

                    const DemoPlanName = response.Admin.filter((item) => item.Planname === 'One Week Demo' || item.Planname === 'Two Days Demo');

                    setAllPlans({
                        DemoPlanName: DemoPlanName,
                        LivePlanName: LivePlanName,
                        data: response.Admin
                    });
                }
                else {
                    setAllPlans({ DemoPlanName: [], LivePlanName: [], data: [] });
                }
            })
            .catch((err) => {
                console.log("Error in fetching the plans", err)
            })
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
            mobile_no: "",
            Select_License: "",
            ClientAmmount: 0,
            planname: "",
            bname: "",
            groupName: [],
        },
        validate: (values) => {
            let errors = {};
            if (!values.username) {
                errors.username = "Please Enter Username"
            }
            else if (!Name_regex(values.username)) {
                errors.username = "Please Enter Valid Username"
            }
            if (!values.email) {
                errors.email = "Please Enter Email ID";
            } else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in|in|net|org|edu|gov|uk|us|info|biz|io|co)$/i;

                const trimmedEmail = values.email.trim();

                if (!emailRegex.test(trimmedEmail)) {
                    errors.email = "Please Enter a Valid Email ID";
                }

                else if (/\.\./.test(trimmedEmail)) {
                    errors.email = "Invalid Email Format";
                }

                else if (/^[._%+-]|[._%+-]$/.test(trimmedEmail)) {
                    errors.email = "Email cannot start or end with special characters";
                }
            }
            if (!values.password) {
                errors.password = "Please Enter Password"
            }
            if (!values.cpassword) {
                errors.cpassword = "Please Enter Confirm Password"
            }
            if (!values.mobile_no) {
                errors.mobile_no = "Please Enter Mobile Number"
            }
            if (!values.Select_License) {
                errors.Select_License = "Please Select License"
            }
            if (!values.ClientAmmount && formik.values.Select_License == '2') {
                errors.ClientAmmount = "Please Enter Amount"
            }
            if (!values.planname) {
                errors.planname = "Please Select Plan"
            }

            if (!values.bname && formik.values.Select_License == '2') {
                errors.bname = "Please Select Broker"
            }
            console.log("eror", errors)
            return errors;
        },
        onSubmit: async (values) => {

            const req = {
                username: values.username,
                email: values.email,
                password: values.password,
                cpassword: values.cpassword,
                mobile_no: values.mobile_no,
                bname: formik.values.Select_License == 1 ? "DEMO" : values.bname,
                ClientAmmount: formik.values.Select_License == 1 ? 0 : Number(values.ClientAmmount),
                planname: values.planname,
                group: selectedOptions && selectedOptions.map((item) => item.value),
            }

            console.log("req")
          console.log("getallplans", GetAllPlans)

            const FilterPlanAmount = GetAllPlans.data.filter((item) => 
                (item.Planname || item.PlanName) === values.planname
            );

             

            if (FilterPlanAmount.length > 0 && FilterPlanAmount[0].SOPPrice > values.ClientAmmount) {
                Swal.fire({
                    background: "#1a1e23 ",
                    backdrop: "#121010ba",
                    confirmButtonColor: "#1ccc8a",
                    title: "Invalid Amount",
                    text: `The plan amount is ${FilterPlanAmount[0].SOPPrice}, but you've entered ${values.ClientAmmount}. Please enter an amount greater than or equal to the plan amount.`,
                    icon: "error",
                    timer: 3000,
                    timerProgressBar: true
                });
            }      
            await CreateAccount(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "User Created!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/clientservice')
                        }, 1500)
                    }
                    else {
                        Swal.fire({
                            background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in adding the new user", err)
                })
        },
    });

    const fields = [
        {
            name: "username",
            label: "Username",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "email",
            label: "Email ID",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "cpassword",
            label: "Confirm Password",
            type: "password",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "mobile_no",
            label: "Mobile Number",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {


            name: "Select_License",
            label: "License Type",
            type: "select1",
            options: [
                { label: "Demo", value: "1" },
                { label: "Live", value: "2" },

            ],
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "ClientAmmount",
            label: "Amount",
            type: "text3",
            showWhen: (values) => formik.values.Select_License == '2',
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },

        {
            name: "planname",
            label: "Plan Name",
            type: "select1",
            options: formik.values.Select_License === '1'
                ? GetAllPlans.DemoPlanName.map((item) => ({
                    label: (item.PlanName || item.Planname),
                    value: (item.PlanName || item.Planname),
                }))
                : formik.values.Select_License === '2'
                    ? GetAllPlans.LivePlanName.map((item) => ({
                        label: (item.PlanName || item.Planname),
                        value: (item.PlanName || item.Planname),
                    }))
                    : [],
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "bname",
            label: "Broker",
            type: "select1",
            options: getBroker.data && getBroker.data.map((item) => ({
                label: item.BrokerName,
                value: item.BrokerName
            })),
            showWhen: (values) => formik.values.Select_License == '2',
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },



    ];

    useEffect(() => {
        if (formik.values.Select_License === '1') {
            formik.setFieldValue('bname', "DEMO");
            formik.setFieldValue('ClientAmmount', 0);
            formik.setFieldValue('planname', "");
        } else if (formik.values.Select_License === '2') {
            formik.setFieldValue('bname', "");
            formik.setFieldValue('ClientAmmount', "");
            formik.setFieldValue('planname', "");
        }
    }, [formik.values.Select_License]);


    return (
        <>
            {getGroupData.loading ? <Loader /> :
                (
                    <AddForm
                        fields={fields.filter(
                            (field) => !field.showWhen || field.showWhen(formik.values)
                        )}
                        page_title="Create Account"
                        btn_name="Add"
                        btn_name1="Cancel"
                        formik={formik}
                        btn_name1_route={"/admin/clientservice"}


                        additional_field={
                            <div className="col-lg-6 dropdownuser">
                                <label>Select Group</label>
                                <Select
                                    defaultValue={selectedIndex?.Planname?.map((item) => ({
                                        value: item,
                                        label: item,
                                    }))}
                                    isMulti
                                    options={optionsArray}
                                    onChange={(selected) => {
                                        setSelectedOptions(selected);
                                        formik.setFieldValue('groupName', selected.map((option) => option.value));
                                    }}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>

                        }
                    />
                )}
        </>
    );
};

export default Adduser;