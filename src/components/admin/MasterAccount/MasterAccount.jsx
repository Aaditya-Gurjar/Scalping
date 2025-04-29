import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Content from '../../../ExtraComponent/Content';
import './MasterAccount.css';
import { GetAccountsApi, GetClientService, MasterAccountApi, UpdateMasterAccount } from '../../CommonAPI/Admin';
import Swal from 'sweetalert2';
import FullDataTable from '../../../ExtraComponent/CommanDataTable.jsx';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Import MUI components

const MasterAccount = () => {
  const [accountsData, setAccountsData] = useState([]);
  const [selectedMasterAccount, setSelectedMasterAccount] = useState(null);
  const [selectedChildAccounts, setSelectedChildAccounts] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [updatedChildAccounts, setUpdatedChildAccounts] = useState([]); // State for updated child accounts

  const fetchAccounts = async () => {
    try {
      const res = await GetClientService();
      const users = res?.Data?.map(user =>  user.Username) || [];
      
      setAccountsData(users);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  const columns = [
    { name: "MainUser", label: "Master Account", selector: row => row.MainUser, sortable: true },
     
    {
      name: "ChildUser",
      label: "Child Accounts",
      options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
              if (!value || (Array.isArray(value) && value.length === 0)) {
                  return "-";
              }
              if (Array.isArray(value)) {
                  return (
                      <span>
                          {value.map((day, index) => (
                              <>
                                  {index > 0 && index % 5 === 0 ? <br /> : ""}
                                  {typeof day === "object" && day.label ? day.label : day}
                                  {index % 3 !== 2 && index !== value.length - 1 ? ", " : ""}
                              </>
                          ))}
                      </span>
                  );
              }
              return value;
          },
      },
  },
  ];

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleMasterAccountChange = (selected) => {
    setSelectedMasterAccount(selected);
    setSelectedChildAccounts([]);
  };

  const getData = async () => {
    try {
      const res = await GetAccountsApi();
      console.log("res.data", res?.Data)
      setData(res?.Data[0])
    }catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [isModalOpen]);


  const handleChildAccountChange = (selected) => {
    setSelectedChildAccounts(selected || []);
  };

  const handleSubmit = async () => {
    const req = {
      MainUser: selectedMasterAccount?.value,
      ChildUser: selectedChildAccounts.map(account => account.value)
    };
     
    if (!selectedMasterAccount?.value || selectedChildAccounts.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select Master Account and Child Account(s)',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
            customClass: {
                popup: 'swal-custom-popup'
            }
        });
        return;
    }

    try {
      const res = await MasterAccountApi(req);
      console.log("API Response:", res);

      if (res?.Status) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Master account created successfully!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'swal-custom-popup'
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create master account!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'swal-custom-popup'
          }
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
    }
  };

  const getChildUserOptions = () => {
    return accountsData
      .filter(account => account !== selectedMasterAccount?.value)
      .map(account => ({ value: account, label: account }));
  };

  const handleEditClick = () => {
    setUpdatedChildAccounts(data?.ChildUser?.map(child => ({ value: child, label: child })) || []);
    setIsModalOpen(true); // Ensure this sets the modal state to open
  };

  const handleModalChildAccountChange = (selected) => {
    setUpdatedChildAccounts(selected || []);
  };

  const handleModalSubmit = async() => {
    const updatedData = {
      MainUser: data?.MainUser,
      ChildUser: updatedChildAccounts.map(account => account.value),
    };

    const res = await UpdateMasterAccount(updatedData);
    if (res?.Status) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Childs updated successfully!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in updating Childs!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
    }
    
    setIsModalOpen(false); 
  };

  return (
    <Content
      Page_title={"💼 Master Account"}
      button_status={false}
      backbutton_status={true}
    >
      {!data?.MainUser && ( // Hide fields and button if master account data exists
        <div className="dropdown-row">
          <div className="dropdown-column">
            <label htmlFor="masterAccount">Master Account</label>
            <Select
              id="masterAccount"
              options={accountsData.map((account) => ({
                value: account,
                label: account,
              }))}
              placeholder="Select Master Account"
              isClearable
              value={selectedMasterAccount}
              onChange={handleMasterAccountChange}
            />
          </div>
          <div className="dropdown-column">
            <label htmlFor="childAccount">Child Account</label>
            <Select
              id="childAccount"
              options={getChildUserOptions()}
              placeholder="Select Child Account(s)"
              isMulti
              value={selectedChildAccounts}
              onChange={handleChildAccountChange}
            />
          </div>
        </div>
      )}
      {!data?.MainUser && ( // Hide submit button if master account data exists
        <button className="addbtn submit-button styled-submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}

      {/* Single card display for Master and Child Accounts */}
      {data?.MainUser && (
        <div className="account-card-single">
          <h4 className="account-title-single">Master Account</h4>
          <p className="account-value-single">{data.MainUser}</p>
          <hr className="account-divider" />
          <h4 className="account-title-single">Child Accounts</h4>
          <div className="account-grid-single">
            {data.ChildUser?.map((child, index) => (
              <div key={index} className="account-grid-item-single">
                {child}
              </div>
            ))}
          </div>
          <button className="addbtn m-3" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}

      {/* Modal for editing child accounts */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md" // Set a maximum width for the modal
        PaperProps={{
          style: {
            width: '600px', // Fixed width
            height: '400px', // Fixed height
          },
        }}
      >
        <DialogTitle>Edit Child Accounts</DialogTitle>
        <DialogContent style={{ overflowY: 'auto' }}> {/* Enable scrolling if content overflows */}
          <div className="modal-dropdown">
            <label htmlFor="modalMasterAccount">Master Account</label>
            <Select
              id="modalMasterAccount"
              value={{ value: data?.MainUser, label: data?.MainUser }}
              isDisabled
            />
          </div>
          <div className="modal-dropdown">
            <label htmlFor="modalChildAccount">Child Accounts</label>
            <Select
              id="modalChildAccount"
              options={accountsData
                .filter(account => account !== data?.MainUser)
                .map(account => ({ value: account, label: account }))}
              isMulti
              value={updatedChildAccounts}
              onChange={handleModalChildAccountChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleModalSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Content>
  );
};

export default MasterAccount;
