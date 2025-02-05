
// import React, { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Loader from "../ExtraComponent/Loader";
// import Sidebar from "../components/layouts/Sidebar";
// import Header from "../components/layouts/Header";
// // import Dashboard from "../components/subAdmin/subadminDashboard/Dashboard";
// import Dashboard from "../components/subadmin/subadminDashboard/Dashboard";

// // import AddClient from "../components/subAdmin/Client/AddClient";
// import AddClient from "../components/subadmin/Client/AddClient";

// // import AllClient from "../components/subAdmin/Client/Allclient";
// import AllClient from "../components/subadmin/Client/Allclient";

// // import SubAdminGroups from "../components/subAdmin/Groups/StrategyGroup";
// import SubAdminGroups from "../components/subadmin/Groups/StrategyGroup";

// // import TradeHistory from "../components/subAdmin/TradeHistory/Tradehistory";
// import TradeHistory from "../components/subadmin/TradeHistory/Tradehistory";

// // import Signals from "../components/subAdmin/Signals/TradeReport";
// import Signals from "../components/subadmin/Signals/TradeReport";

// // import AddscriptScalping from "../components/subAdmin/SubAdminScript/Addscript.Scalping";
// import AddscriptScalping from "../components/subadmin/SubAdminScript/Addscript.Scalping";

// // import PatternScript from "../components/subAdmin/SubAdminScript/AddScript.Pattern";
// import PatternScript from "../components/subadmin/SubAdminScript/AddScript.Pattern";

// // import AddScriptOption from "../components/subAdmin/SubAdminScript/AddScript.Option";
// import AddScriptOption from "../components/subadmin/SubAdminScript/AddScript.Option";

// // import AllScript from "../components/subAdmin/SubAdminScript/AllScript";
// import AllScript from "../components/subadmin/SubAdminScript/AllScript";

// // import ChangePassword from "../components/subAdmin/Password/ChangePassword";
// import ChangePassword from "../components/subadmin/Password/ChangePassword";

// const Sidebar = lazy(() => import('../components/layouts/Sidebar'));
// const Header = lazy(() => import('../components/layouts/Header'));
// const Dashboard = lazy(() => import('../components/subadmin/subadminDashboard/Dashboard'));
// const AddClient = lazy(() => import('../components/subadmin/Client/AddClient'));
// const AllClient = lazy(() => import('../components/subadmin/Client/Allclient'));
// const SubAdminGroups = lazy(() => import('../components/subadmin/Groups/StrategyGroup'));
// const TradeHistory = lazy(() => import('../components/subadmin/TradeHistory/Tradehistory'));
// const Signals = lazy(() => import('../components/subadmin/Signals/TradeReport'));
// const AddscriptScalping = lazy(() => import('../components/subadmin/SubAdminScript/Addscript.Scalping'));
// const PatternScript = lazy(() => import('../components/subadmin/SubAdminScript/AddScript.Pattern'));
// const AddScriptOption = lazy(() => import('../components/subadmin/SubAdminScript/AddScript.Option'));
// const AllScript = lazy(() => import('../components/subadmin/SubAdminScript/AllScript'));
// const ChangePassword = lazy(() => import('../components/subadmin/Password/ChangePassword'));

// const SubAdminRoutes = () => {

// import React,{lazy,Suspense} from 'react'
// import { Route, Routes } from 'react-router-dom';
// import Loader from '../ExtraComponent/Loader';
// // import Sidebar from '../components/layouts/Sidebar';
// // import Header from '../components/layouts/Header';
// // import Dashboard from '../components/subAdmin/subadminDashboard/Dashboard';
// // import Dashboard from '../components/subadmin/subadminDashboard/Dashboard';

// // import AddClient from '../components/subAdmin/Client/AddClient';
// // import AddClient from '../components/subadmin/Client/AddClient';

// // import AllClient from '../components/subAdmin/Client/Allclient';
// // import AllClient from '../components/subadmin/Client/Allclient';

// // import SubAdminGroups from '../components/subAdmin/Groups/StrategyGroup';
// // import SubAdminGroups from '../components/subadmin/Groups/StrategyGroup';

// // import TradeHistory from '../components/subAdmin/TradeHistory/Tradehistory';
// // import TradeHistory from '../components/subadmin/TradeHistory/Tradehistory';

// // import Signals from '../components/subAdmin/Signals/TradeReport';
// // import Signals from '../components/subadmin/Signals/TradeReport';

// // import AddscriptScalping from '../components/subAdmin/SubAdminScript/Addscript.Scalping';
// // import AddscriptScalping from '../components/subadmin/SubAdminScript/Addscript.Scalping';

// // import PatternScript from '../components/subAdmin/SubAdminScript/AddScript.Pattern';
// // import PatternScript from '../components/subadmin/SubAdminScript/AddScript.Pattern';

// // import AddScriptOption from '../components/subAdmin/SubAdminScript/AddScript.Option';
// // import AddScriptOption from '../components/subadmin/SubAdminScript/AddScript.Option';

// // import AllScript from '../components/subAdmin/SubAdminScript/AllScript';
// // import AllScript from '../components/subadmin/SubAdminScript/AllScript';
 

// // import ChangePassword from '../components/subAdmin/Password/ChangePassword';
// // import ChangePassword from '../components/subadmin/Password/ChangePassword';

const Sidebar = lazy(() => import('../components/layouts/Sidebar'));
const SidebarRight = lazy(() => import('../components/layouts/SidebarRight'));
const Header = lazy(() => import('../components/layouts/Header'));
const Dashboard = lazy(() => import('../components/subadmin/subadminDashboard/Dashboard'));
const AddClient = lazy(() => import('../components/subadmin/Client/AddClient'));
const AllClient = lazy(() => import('../components/subadmin/Client/Allclient'));
const SubAdminGroups = lazy(() => import('../components/subadmin/Groups/StrategyGroup'));
const TradeHistory = lazy(() => import('../components/subadmin/TradeHistory/Tradehistory'));
const Signals = lazy(() => import('../components/subadmin/Signals/TradeReport'));
const AddscriptScalping = lazy(() => import('../components/subadmin/SubAdminScript/Addscript.Scalping'));
const PatternScript = lazy(() => import('../components/subadmin/SubAdminScript/AddScript.Pattern'));
const AddScriptOption = lazy(() => import('../components/subadmin/SubAdminScript/AddScript.Option'));
const AllScript = lazy(() => import('../components/subadmin/SubAdminScript/AllScript'));
const ChangePassword = lazy(() => import('../components/subadmin/Password/ChangePassword'));


// const SubAdminRoutes = () => {
  
//   return (
//     <div className="wrapper">
//       <Sidebar />
//       <div id="content-page" className="content-page">
//         <Header />
//         <Suspense fallback={<Loader/>}></Suspense>
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/addclient" element={<AddClient />} />
//           <Route path="/allclient" element={<AllClient />} />
//           <Route path="/groups" element={<SubAdminGroups />} />
//           <Route path="/trade-history" element={<TradeHistory />} />
//           <Route path="/signals" element={<Signals />} />
//           <Route path="/addscript/scalping" element={<AddscriptScalping />} />
//           <Route path="/addscript/pattern" element={<PatternScript />} />
//           <Route path="/addscript/option" element={<AddScriptOption />} />
//           <Route path="/all-script" element={<AllScript />} />
//           <Route path="/change-password" element={<ChangePassword />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default SubAdminRoutes;


// import React, { lazy, Suspense, startTransition } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Loader from '../ExtraComponent/Loader';

// Lazy load components
// const Sidebar = lazy(() => import('../components/layouts/Sidebar'));
// const Header = lazy(() => import('../components/layouts/Header'));
// const Dashboard = lazy(() => import('../components/subadmin/subadminDashboard/Dashboard'));
// const AddClient = lazy(() => import('../components/subadmin/Client/AddClient'));
// const AllClient = lazy(() => import('../components/subadmin/Client/Allclient'));
// const SubAdminGroups = lazy(() => import('../components/subadmin/Groups/StrategyGroup'));
// const TradeHistory = lazy(() => import('../components/subadmin/TradeHistory/Tradehistory'));
// const Signals = lazy(() => import('../components/subadmin/Signals/TradeReport'));
// const AddscriptScalping = lazy(() => import('../components/subadmin/SubAdminScript/Addscript.Scalping'));
// const PatternScript = lazy(() => import('../components/subadmin/SubAdminScript/AddScript.Pattern'));
// const AddScriptOption = lazy(() => import('../components/subadmin/SubAdminScript/AddScript.Option'));
// const AllScript = lazy(() => import('../components/subadmin/SubAdminScript/AllScript'));
// const ChangePassword = lazy(() => import('../components/subadmin/Password/ChangePassword'));

const SubAdminRoutes = () => {

  return (
    <div className="wrapper">
      <Sidebar />
      <div id="content-page" className="content-page">
        <Header />
        
        {/* Suspense wrapper for lazy-loaded components */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addclient" element={<AddClient />} />
            <Route path="/allclient" element={<AllClient />} />
            <Route path="/groups" element={<SubAdminGroups />} />
            <Route path="/trade-history" element={<TradeHistory />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/addscript/scalping" element={<AddscriptScalping />} />
            <Route path="/addscript/pattern" element={<PatternScript />} />
            <Route path="/addscript/option" element={<AddScriptOption />} />
            <Route path="/all-script" element={<AllScript />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </Suspense>
      </div>
      <SidebarRight />
    </div>
  );
};

export default SubAdminRoutes;


