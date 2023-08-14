import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import useBuyer from '../hooks/useBuyer';

const DashboardLayout = () => {

    //TODO: admin role
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    // const isSeller = false;
    const [isSeller] = useSeller()
    // // const isBuyer = false;
    const [isBuyer] = useBuyer()

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
                    <ul className="menu p-4 w-80 h-full bg-slate-500 text-base-content text-white">

                        {
                            isAdmin &&
                            <><li className='font-semibold'><Link to='/dashboard'>Admin pannel</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/addproduct'>Add Product</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/allusers'>All Users</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/allorders'>All Orders</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/myorders'>My Orders</Link></li>
                            </>

                        }

                        {
                            isBuyer &&
                            <>
                                <li className='font-semibold'><Link to='/dashboard'>Buyer</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/myorders'>My Orders</Link></li>
                            </>
                        }

                        {
                            isSeller &&
                            <>
                                <li className='font-semibold'><Link to='/dashboard'>Seller</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/addproduct'>Add Product</Link></li>
                                <li className='font-semibold'><Link to='/dashboard/sellerproduct'>my product</Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;