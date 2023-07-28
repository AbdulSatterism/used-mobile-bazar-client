import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const MyOrdersProduct = () => {
    const { user } = useContext(AuthContext);

    const { data: orderItems = [], refetch, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/orders?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    //
    const handleDelete = (order) => {
        fetch(`http://localhost:5000/orders/${order._id}`, {
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
                                    <button className='btn btn-primary btn-sm'>Pay</button>
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