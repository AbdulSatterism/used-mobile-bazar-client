import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const MyOrdersProduct = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: orderItems = [], refetch, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        // enabled: !loading,
        // queryFn: async () => {
        //     const res = await fetch(`https://used-mobile-bazar-server.onrender.com/orders?email=${user?.email}`, {
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }
        //     });
        //     const data = await res.json();
        //     return data;
        // }
        queryFn: async () => {
            const res = await axiosSecure(`/orders?email=${user?.email}`);
            // console.log('res from axios', res)
            return res.data;
        }
    });

    //
    const handleDelete = (order) => {
        fetch(`https://used-mobile-bazar-server.onrender.com/orders/${order._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`Your ${order?.deviceName} is permanently canceled`)
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-2xl text-center text-orange-500 my-4'>My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Device image</th>
                            <th>Device Name</th>
                            <th>Buyer Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems?.length === 0 ? <h1 className='text-2xl text-orange-500'>No orders confirm yet!!!</h1> :
                                orderItems.map((order, i) => <tr
                                    key={order._id}

                                    className="hover"
                                >
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={order?.img} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order?.deviceName}</td>
                                    <td>{order?.buyerName}</td>
                                    <td>${order?.price}</td>

                                    <td>
                                        <Link to="/dashboard/payment" >
                                            <button
                                                className='btn btn-primary btn-sm'>Pay</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(order)} className='btn btn-warning btn-sm'>Cancel</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrdersProduct;