import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

// Main Layout
const Main = () => {
    const location = useLocation();
    const noNavFooter = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div className='font-poppins'>
            {noNavFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noNavFooter||  <Footer></Footer>}
        </div>
    );
};

export default Main;