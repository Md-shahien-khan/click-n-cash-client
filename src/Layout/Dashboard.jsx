import React, { useState, useContext } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import { FaDatabase, FaHome, FaMoneyBill, FaTasks, FaUser, FaBell } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { IoIosAdd } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logo/logo.png';
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useCoins from "../hooks/useCoins";
import Notification from "../Pages/Dashboard/Notification";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, isAdminLoading] = useAdmin();
  const { coins } = useCoins();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isAdminLoading) {
    return loading;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Toggle Button for Small and Medium Screens */}
        <div className="lg:hidden flex justify-start p-4 bg-teal-200">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            ☰
          </button>
        </div>

        {/* Dashboard Sidebar */}
        <div
          className={`w-full lg:w-64 lg:min-h-screen bg-teal-200 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-200 ease-in-out fixed lg:relative z-10`}
        >
          <ul className="menu p-4 flex flex-col gap-4">
            <div className="">
              <img src={logo} className="w-32" alt="Logo" />
            </div>

            {/* Admin navigation */}
            {role === 'admin' && (
              <>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/manageUsers" onClick={() => setIsSidebarOpen(false)}>
                    <FaUser /> Manage Users
                  </NavLink>
                </li>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/manageTask" onClick={() => setIsSidebarOpen(false)}>
                    <FcManager /> Manage Task
                  </NavLink>
                </li>
              </>
            )}

            {/* Buyer navigation */}
            {role === 'buyer' && (
              <>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/buyerHome" onClick={() => setIsSidebarOpen(false)}>
                    <IoIosAdd /> Buyer Home
                  </NavLink>
                </li>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/addNewTasks" onClick={() => setIsSidebarOpen(false)}>
                    <IoIosAdd /> Add New Task
                  </NavLink>
                </li>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/myTasks" onClick={() => setIsSidebarOpen(false)}>
                    <FaTasks /> My Tasks
                  </NavLink>
                </li>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/purchaseCoin" onClick={() => setIsSidebarOpen(false)}>
                    <BiPurchaseTag /> Purchase Coin
                  </NavLink>
                </li>
              </>
            )}

            {/* Worker navigation */}
            {role === 'worker' && (
              <>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/workerHome" onClick={() => setIsSidebarOpen(false)}>
                    <FaTasks /> Worker Home
                  </NavLink>
                </li>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/taskList" onClick={() => setIsSidebarOpen(false)}>
                    <FaTasks /> Task List
                  </NavLink>
                </li>
                <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/mySubmissions" onClick={() => setIsSidebarOpen(false)}>
                    <FaDatabase /> My Submissions
                  </NavLink>
                </li>
                {/* <li className="bg-teal-950 rounded-md text-white">
                  <NavLink to="/dashboard/withdrawals" onClick={() => setIsSidebarOpen(false)}>
                    <FaMoneyBill /> Withdrawal
                  </NavLink>
                </li> */}
              </>
            )}

            {/* Shared navigation (Home link) */}
            <div className="divider"></div>
            <li className="bg-teal-950 rounded-md text-white">
              <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Content area */}
        <div className="flex-1">
          <div className="divider"></div>
          <div className="flex justify-center items-center gap-4">
            <img className="w-24" src={user.photoURL} alt="" />
            <div className="text-xl text-teal-700">
              <h2>{user.email}</h2>
              <p>Available Coins : {coins}</p>
              <p>Role : {role}</p>
            </div>
            {/* Notification Button */}
            <Notification userEmail={user.email} />
          </div>
          <div className="divider"></div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;