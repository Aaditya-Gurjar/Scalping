import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboards from '../components/superAdmin/dashboard/Dashboard';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import AdminDetails from '../components/superAdmin/adminDetails/Admindetails';
import CreateAdmin from '../components/superAdmin/accountCreate/CreateAccount';
import AmountDetails from '../components/superAdmin/amountdetails/AmmountDetails';
import AdminActivity from '../components/superAdmin/adminActivity/adminActivity';
import ClientThreadReport from '../components/superAdmin/clientThreadReport/clientThreadReport';
import ClientThreadResponse from '../components/superAdmin/clientThreadResponse/ClientThreadResponse';
import UpdateClientDetails from '../components/superAdmin/updateClientDetails/UpdateClientDetails';
import ApiCreateInfo from '../components/superAdmin/apiCreateInfo/ApiCreateInfo';
import NewUpdate from '../components/superAdmin/newUpdate/NewUpdate';



const SuperAdminRoute = () => {
  return (
    <>
      <div className='wrapper'>
        <Sidebar />
        <div id="content-page" className="content-page">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/admin-details" element={<AdminDetails />} />
            <Route path="/create-admin" element={<CreateAdmin />} />

            <Route path="/amount-details" element={<AmountDetails />} />
            <Route path="/admin-activity" element={<AdminActivity />} />
            <Route path="/client-thread-report" element={<ClientThreadReport />} />
            <Route path="/client-trade-response" element={<ClientThreadResponse />} />
            <Route path="/update-client-details" element={<UpdateClientDetails />} />
            <Route path="/api-create-info" element={<ApiCreateInfo />} />
            <Route path='/new-update' element={<NewUpdate />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default SuperAdminRoute;
