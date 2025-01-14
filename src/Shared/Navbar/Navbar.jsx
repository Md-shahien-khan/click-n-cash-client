import { Link } from "react-router-dom";

const Navbar = () => {
    const navOptions = <>
        <li><Link to='/' className="text-xl text-teal-200 font-semibold hover:text-teal-400 transition duration-200">Home</Link></li>
        <li><Link to='/about' className="text-xl font-semibold text-teal-200 hover:text-teal-400 transition duration-200">Login</Link></li>
        <li><Link to='/services' className="text-xl font-semibold text-teal-200 hover:text-teal-400 transition duration-200">Register</Link></li>
        <li><Link to='/' className="text-xl font-semibold text-teal-200 hover:text-teal-400 transition duration-200">Join as Developer</Link></li>
    </>;

    return (
        <div>
            <div className="navbar bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 shadow-xl fixed z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-teal-100 font-bold">Click & Cash</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-6">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn text-white bg-teal-500 hover:bg-teal-700 transition duration-200">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
