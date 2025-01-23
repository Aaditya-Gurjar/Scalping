import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import Dashboard from '../components/user/UserDashboard/Userdashboard';
import Addscript from '../components/user/UserScript/Addscript.scalping';
import Profile from '../components/user/UserProfile/Profile';
import AddScriptOption from '../components/user/UserScript/AddScript.Option'
import LastPattern from '../components/user/Patterns/LastPattern';
import Editprofile from '../components/user/UserProfile/Editprofile';
import Discription from '../components/user/Discription/Discription';
import Tradehistory from '../components/user/Tradehistory/Tradehistory';
import Traderesponse from '../components/user/TradeResponse/Traderesponse';
import ProfitAndLoss from '../components/user/ProfitAndLoss/ProfitAndLoss';
import Pannel from '../components/user/TrackPanel/TrackPannel';
import TradeReport from '../components/user/TradeReport/TradeReport'
import AddScriptPattern from '../components/user/UserScript/AddScript.Pattern'

import AddNewScalpingScript from '../components/user/UserScript/AddNewScript.Scalping'

import AddNewScalpingOption from '../components/user/UserScript/AddNewScript.Option'
import AddNewScalpingPattern from '../components/user/UserScript/AddNewScript.Pattern'

import TechnicalPattern from '../components/user/Patterns/TechnicalPattern'
import Transection from '../components/user/Transection/AllTransection'
import AllPlan from '../components/user/Plan/AllPlan'
import NewStrategy from '../components/user/NewStrategy/NewStrategy';

import AddChartingScript from '../components/user/UserScript/AddChartingScript';

const UserRoute = () => {

  return (
    <>
      <div className='wrapper'>
        <Sidebar />
        <div id="content-page" className="content-page">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<Editprofile />} />
            <Route path="/lastpattern" element={<LastPattern />} />
            <Route path="/addscript/scalping" element={<Addscript />} />
            <Route path="/addscript/pattern" element={<AddScriptPattern />} />
            <Route path="/addscript/option" element={<AddScriptOption />} />
            <Route path="/discription" element={<Discription />} />
            <Route path="/tradehistory" element={<Tradehistory />} />
            <Route path="/traderesponse" element={<Traderesponse />} />
            <Route path="/profitandloss" element={<ProfitAndLoss />} />
            <Route path="/pannel" element={<Pannel />} />
            <Route path="/tradereport" element={<TradeReport />} />
            <Route path="/newscript/scalping" element={<AddNewScalpingScript />} />
            <Route path="/newscript/option" element={<AddNewScalpingOption />} />
            <Route path="/newscript/pattern" element={<AddNewScalpingPattern />} />
            <Route path="/technical/pattern" element={<TechnicalPattern />} />
            <Route path="all/transection" element={<Transection />} />
            <Route path="all/plan" element={<AllPlan />} />
            <Route path='/newStrategy' element={<NewStrategy />} />
            <Route path='/newscript/charting' element={<AddChartingScript />} /> 


          </Routes>

        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default UserRoute;
