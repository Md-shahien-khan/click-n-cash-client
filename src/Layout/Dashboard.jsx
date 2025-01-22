import { BiPurchaseTag } from "react-icons/bi";
import { FaDatabase, FaHome, FaMoneyBill, FaTasks, FaUser } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { IoIosAdd } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logo/logo.png';
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import useCoins from "../hooks/useCoins";


const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [role, isAdminLoading] = useAdmin();  
    const {coins} = useCoins();
    // const isBuyer = true; 
    // const isWorker = true; 
    if(isAdminLoading){
        return <h2>loading.................</h2>
    }

    return (
        <>
        <div className="flex flex-col md:flex-row">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-teal-200">
                <ul className="menu p-4 flex flex-col gap-4">
                    <div className="">
                        <img src={logo} className="w-32" alt="Logo" />
                    </div>

                    {/* Admin navigation */}
                    {role == 'admin' && (
                        <>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/manageUsers">
                                    <FaUser /> Manage Users
                                </NavLink>
                            </li>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/manageTask">
                                    <FcManager /> Manage Task
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Buyer navigation */}
                    {role == 'buyer' && (
                        <>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/addNewTasks">
                                    <IoIosAdd /> Add New Task
                                </NavLink>
                            </li>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/myTasks">
                                    <FaTasks /> My Tasks
                                </NavLink>
                            </li>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/purchaseCoin">
                                    <BiPurchaseTag /> Purchase Coin
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Worker navigation */}
                    {role == 'worker' && (
                        <>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/taskList">
                                    <FaTasks /> Task List
                                </NavLink>
                            </li>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/mySubmissions">
                                    <FaDatabase /> My Submissions
                                </NavLink>
                            </li>
                            <li className="bg-teal-950 rounded-md text-white">
                                <NavLink to="/dashboard/withdrawals">
                                    <FaMoneyBill /> Withdrawal
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Shared navigation (Home link) */}
                    <div className="divider"></div>
                    <li className="bg-teal-950 rounded-md text-white">
                        <NavLink to="/">
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
                </div>
            <div className="divider"></div>
                <Outlet />
            </div>
        </div>
        </>
    );
};

export default Dashboard;
















// chat gpt
// import { BiPurchaseTag } from "react-icons/bi";
// import { FaDatabase, FaHome, FaMoneyBill, FaTasks, FaUser } from "react-icons/fa";
// import { FcManager } from "react-icons/fc";
// import { IoIosAdd } from "react-icons/io";
// import { NavLink, Outlet } from "react-router-dom";
// import logo from '../assets/images/logo/logo.png';
// import { AuthContext } from "../Providers/AuthProvider";
// import { useContext } from "react";
// import useAdmin from "../hooks/useAdmin";
// import useRole from "../hooks/useRole";

// const Dashboard = () => {
//     // Getting the user data from AuthContext
//     const { user } = useContext(AuthContext);
//     // const [role, isLoading] = useRole()

//     // Assuming the role is stored in user.role, adjust accordingly if needed
//     const userRole = user?.role || '';

//     // Using helper hook for admin status, if necessary
//     const [isAdmin] = useAdmin();

//     // Dynamically determining if the user is a buyer or worker
//     const isBuyer = userRole === 'buyer';
//     const isWorker = userRole === 'worker';

//     return (
//         <div className="flex">
//             {/* dashboard side bar */}
//             <div className="w-64 min-h-screen bg-teal-200">
//                 <ul className="menu p-4 flex flex-col gap-4">
//                     <div className="">
//                         <img src={logo} className="w-32" alt="Logo" />
//                     </div>

//                     {/* Admin navigation */}
//                     {isAdmin && (
//                         <>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/manageUsers">
//                                     <FaUser /> Manage Users
//                                 </NavLink>
//                             </li>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/manageTask">
//                                     <FcManager /> Manage Task
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}

//                     {/* Buyer navigation */}
//                     {isBuyer && (
//                         <>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/addNewTasks">
//                                     <IoIosAdd /> Add New Task
//                                 </NavLink>
//                             </li>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/myTasks">
//                                     <FaTasks /> My Tasks
//                                 </NavLink>
//                             </li>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/purchaseCoin">
//                                     <BiPurchaseTag /> Purchase Coin
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}

//                     {/* Worker navigation */}
//                     {isWorker && (
//                         <>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/taskList">
//                                     <FaTasks /> Task List
//                                 </NavLink>
//                             </li>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/mySubmissions">
//                                     <FaDatabase /> My Submissions
//                                 </NavLink>
//                             </li>
//                             <li className="bg-teal-950 rounded-md text-white">
//                                 <NavLink to="/dashboard/withdrawals">
//                                     <FaMoneyBill /> Withdrawal
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}

//                     {/* Shared navigation (Home link) */}
//                     <div className="divider"></div>
//                     <li className="bg-teal-950 rounded-md text-white">
//                         <NavLink to="/">
//                             <FaHome /> Home
//                         </NavLink>
//                     </li>
//                 </ul>
//             </div>

//             {/* Content area */}
//             <div className="flex-1">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };
// export default Dashboard;



// // chatgpt 2
// import { BiPurchaseTag } from "react-icons/bi";
// import { FaDatabase, FaHome, FaMoneyBill, FaTasks, FaUser } from "react-icons/fa";
// import { FcManager } from "react-icons/fc";
// import { IoIosAdd } from "react-icons/io";
// import { NavLink, Outlet } from "react-router-dom";
// import logo from '../assets/images/logo/logo.png';
// import { AuthContext } from "../Providers/AuthProvider";
// import { useContext } from "react";
// import useAdmin from "../hooks/useAdmin";
// import useRole from "../hooks/useRole";

// const Dashboard = () => {
//     // Getting the user data from AuthContext
//     const { user, loading } = useContext(AuthContext);
//     const [role, isRoleLoading, error] = useRole();  // Fetching the role using useRole hook

//     // Ensure we only proceed when the role has been fetched
//     if (loading || isRoleLoading) {
//         return <div>Loading...</div>;
//     }

//     // Handle error case
//     if (error) {
//         return <div>Error loading role data: {error.message}</div>;
//     }

//     // Determine the role
//     let userRole = role || user?.role || '';

//     // Using helper hook for admin status, if necessary
//     const [isAdmin] = useAdmin();

//     // Conditionally render the lists based on user role
//     let dashboardLinks = [];

//     // Admin navigation
//     if (isAdmin) {
//         dashboardLinks = [
//             { path: '/dashboard/manageUsers', icon: <FaUser />, label: 'Manage Users' },
//             { path: '/dashboard/manageTask', icon: <FcManager />, label: 'Manage Task' },
//         ];
//     }
//     // Buyer navigation
//     else if (userRole === 'buyer') {
//         dashboardLinks = [
//             { path: '/dashboard/addNewTasks', icon: <IoIosAdd />, label: 'Add New Task' },
//             { path: '/dashboard/myTasks', icon: <FaTasks />, label: 'My Tasks' },
//             { path: '/dashboard/purchaseCoin', icon: <BiPurchaseTag />, label: 'Purchase Coin' },
//         ];
//     }
//     // Worker navigation
//     else if (userRole === 'worker') {
//         dashboardLinks = [
//             { path: '/dashboard/taskList', icon: <FaTasks />, label: 'Task List' },
//             { path: '/dashboard/mySubmissions', icon: <FaDatabase />, label: 'My Submissions' },
//             { path: '/dashboard/withdrawals', icon: <FaMoneyBill />, label: 'Withdrawal' },
//         ];
//     }

//     return (
//         <div className="flex">
//             {/* dashboard side bar */}
//             <div className="w-64 min-h-screen bg-teal-200">
//                 <ul className="menu p-4 flex flex-col gap-4">
//                     <div className="">
//                         <img src={logo} className="w-32" alt="Logo" />
//                     </div>

//                     {/* Dynamically render links based on the role */}
//                     {dashboardLinks.map((link) => (
//                         <li key={link.path} className="bg-teal-950 rounded-md text-white">
//                             <NavLink to={link.path}>
//                                 {link.icon} {link.label}
//                             </NavLink>
//                         </li>
//                     ))}

//                     {/* Shared navigation (Home link) */}
//                     <div className="divider"></div>
//                     <li className="bg-teal-950 rounded-md text-white">
//                         <NavLink to="/">
//                             <FaHome /> Home
//                         </NavLink>
//                     </li>
//                 </ul>
//             </div>

//             {/* Content area */}
//             <div className="flex-1">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


































































// import { BiPurchaseTag } from "react-icons/bi";
// import { FaDatabase, FaHome, FaMoneyBill, FaTasks, FaUser } from "react-icons/fa";
// import { FcManager } from "react-icons/fc";
// import { IoIosAdd } from "react-icons/io";
// import { NavLink, Outlet } from "react-router-dom";
// import logo from '../assets/images/logo/logo.png'

// const Dashboard = () => {
//     const isAdmin = true;
//     const isBuyer  = true
//     return (
//         <div className="flex">
//             {/* dashboard side bar */}
//             <div className="w-64 min-h-screen bg-teal-200">
//                 <ul className="menu p-4 flex flex-col gap-4">
//                     <div className="">
//                         <img src={logo} className="w-32" alt="" />
//                     </div>
//                     {
//                         isAdmin ? <>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/manageUsers"><FaUser></FaUser> Manage Users</NavLink></li>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/myTasks"><FaTasks></FaTasks> My Tasks</NavLink></li>
//                         </>
//                         :
//                         <>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/addNewTasks"><IoIosAdd></IoIosAdd> Add New Task</NavLink></li>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/manageTask"><FcManager></FcManager> Manage Task</NavLink></li>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/mySubmissions"><FaDatabase></FaDatabase> My Submissions</NavLink></li>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/purchaseCoin"><BiPurchaseTag></BiPurchaseTag> Purchase Coin</NavLink></li>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/taskList"><FaTasks></FaTasks> Task List</NavLink></li>
//                             <li className="bg-teal-950 rounded-md text-white"><NavLink to="/dashboard/withdrawals"><FaMoneyBill></FaMoneyBill> Withdrawal</NavLink></li>
//                         </>
//                     }


//                     {/* shared navLinks */}
//                     <div className="divider"></div>
//                     <li className="bg-teal-950 rounded-md text-white"><NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
//                 </ul>
//             </div>
//             {/* content */}
//             <div className="flex-1">
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;