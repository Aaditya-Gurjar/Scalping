import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../ExtraComponent/Loader';

import Sidebar from '../components/layouts/Sidebar';
import SidebarRight from '../components/layouts/SidebarRight';
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

// const Sidebar = lazy(()=> import ('../components/layouts/Sidebar'));
// const SidebarRight =lazy (()=>import  ('../components/layouts/SidebarRight'));
// const Header = lazy(()=> import ('../components/layouts/Header'));
// const Dashboard = lazy(() => import('../components/user/UserDashboard/Userdashboard'));


// const Addscript = lazy(()=>import ('../components/user/UserScript/Addscript.scalping'))
// const Profile = lazy(() => import('../components/user/UserProfile/Profile'));
// const AddScriptOption = lazy(() => import('../components/user/UserScript/AddScript.Option'));
// const LastPattern = lazy(() => import('../components/user/Patterns/LastPattern'));
// const Editprofile = lazy(() => import('../components/user/UserProfile/Editprofile'));
// const Discription = lazy(() => import('../components/user/Discription/Discription'));
// const Tradehistory = lazy(() => import('../components/user/Tradehistory/Tradehistory'));
// const Traderesponse = lazy(() => import('../components/user/TradeResponse/Traderesponse'));
// const ProfitAndLoss = lazy(() => import('../components/user/ProfitAndLoss/ProfitAndLoss'));
// const Pannel = lazy(() => import('../components/user/TrackPanel/TrackPannel'));
// const TradeReport = lazy(() => import('../components/user/TradeReport/TradeReport'));
// const AddScriptPattern = lazy(() => import('../components/user/UserScript/AddScript.Pattern'));

// const AddNewScalpingScript = lazy(() => import('../components/user/UserScript/AddNewScript.Scalping'));
// const AddNewScalpingOption = lazy(() => import('../components/user/UserScript/AddNewScript.Option'));
// const AddNewScalpingPattern = lazy(() => import('../components/user/UserScript/AddNewScript.Pattern'));
// const TechnicalPattern = lazy(() => import('../components/user/Patterns/TechnicalPattern'));
// const Transection = lazy(() => import('../components/user/Transection/AllTransection'));
// const AllPlan = lazy(() => import('../components/user/Plan/AllPlan'));
// const NewStrategy = lazy(() => import('../components/user/NewStrategy/NewStrategy'));
// const AddChartingScript = lazy(() => import('../components/user/UserScript/AddChartingScript'));


const UserRoute = () => {

  return (
    <>
      <div className='wrapper'>
        <Sidebar />

        <div id="content-page" className="content-page">
          <Header />
          {/* <Suspense fallback={<Loader/>}> */}
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
          {/* </Suspense> */}

        </div>

        <SidebarRight />
      </div>
    </>
  );
}

export default UserRoute;
