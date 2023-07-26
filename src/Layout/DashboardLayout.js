import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li className='font-semibold'><Link to='/dashboard'>Home</Link></li>
                        <li className='font-semibold'><Link to='/dashboard/addproduct'>Add Product</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;