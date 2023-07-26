import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { AuthContext } from '../../../context/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(() => { })
    }

    const navItems = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        <li className='font-semibold'><Link to='/about'>About Us</Link></li>
        <li className='font-semibold'><Link to='/dashboard'>Dashboard</Link></li>

        {
            user?.uid ?
                <>
                    <li onClick={handleLogOut} className='font-semibold'><Link to='/'>Log out</Link></li>
                    <li className='font-semibold'><Link to='/'>{user?.displayName}</Link></li>
                </>
                :
                <>
                    <li className='font-semibold'><Link to='/login'>Login</Link></li>
                </>
        }

    </>
    return (
        <div className="navbar bg-violet-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={1} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={2} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl">daisyUI</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            {/* <div className="navbar-end">
                <Link>Button</Link>
            </div> */}
            <label htmlFor="dashboard-drawer" tabIndex={3} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;