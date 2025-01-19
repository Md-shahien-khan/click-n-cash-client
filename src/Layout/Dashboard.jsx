import { BiPurchaseTag } from "react-icons/bi";
import { FaDatabase, FaHome, FaMoneyBill, FaTasks, FaUser } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { IoIosAdd } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logo/logo.png'

const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-teal-200">
                <ul className="menu p-4 flex flex-col gap-4">
                    <div className="">
                        <img src={logo} className="w-32" alt="" />
                    </div>
                    <h2 className="text-xl font-semibold text-teal-900">Dash Board</h2>
                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/addNewTasks"><IoIosAdd></IoIosAdd> Add New Task</NavLink></li>
                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/manageTask"><FcManager></FcManager> Manage Task</NavLink></li>

                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/manageUsers"><FaUser></FaUser> Manage Users</NavLink></li>

                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/mySubmissions"><FaDatabase></FaDatabase> My Submissions</NavLink></li>

                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/myTasks"><FaTasks></FaTasks> My Tasks</NavLink></li>

                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/purchaseCoin"><BiPurchaseTag></BiPurchaseTag> Purchase Coin</NavLink></li>

                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/taskList"><FaTasks></FaTasks> Task List</NavLink></li>

                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/withdrawals"><FaMoneyBill></FaMoneyBill> Withdrawal</NavLink></li>
                    <div className="divider"></div>
                    <li className="bg-teal-950 rounded-md text-white"><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                </ul>
            </div>
            {/* content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;