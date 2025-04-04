import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Content from '../../../ExtraComponent/Content';
import './MasterAccount.css';
import { GetAccountsApi, MasterAccountApi } from '../../CommonAPI/Admin';
import Swal from 'sweetalert2';

const MasterAccount = () => {
  const [accountsData, setAccountsData] = useState([]);
  const [selectedMasterAccount, setSelectedMasterAccount] = useState(null);
  const [selectedChildAccounts, setSelectedChildAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const res = await GetAccountsApi();
      const formattedData = res?.Data?.map(account => ({
        MainUser: { label: account.MainUser, value: account.MainUser },
        ChildUser: account.ChildUser.map(user => ({ label: user, value: user }))
      })) || [];
      setAccountsData(formattedData);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleMasterAccountChange = (selected) => {
    setSelectedMasterAccount(selected);
    setSelectedChildAccounts([]);
  };

  const handleChildAccountChange = (selected) => {
    setSelectedChildAccounts(selected || []);
  };

  const handleSubmit = async () => {
    const req = {
      MainUser: selectedMasterAccount?.value,
      ChildUser: selectedChildAccounts.map(account => account.value)
    };
    console.log("Request Payload:", req);
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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const getChildUserOptions = () => {
    const selectedAccount = accountsData.find(
      account => account.MainUser.value === selectedMasterAccount?.value
    );
    return selectedAccount?.ChildUser || [];
  };

  return (
    <Content
      Page_title={"💼 Master Account"}
      button_status={false}
      backbutton_status={true}
    >
      <div className="dropdown-row">
        <div className="dropdown-column">
          <label htmlFor="masterAccount">Master Account</label>
          <Select
            id="masterAccount"
            options={accountsData.map(account => account.MainUser)}
            placeholder="Select Master Account"
            isClearable
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
      <button className="submit-button styled-submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </Content>
  );
};

export default MasterAccount;
