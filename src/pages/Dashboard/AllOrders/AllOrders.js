import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AllOrders = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: allOrders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/allorders`);
            return res.data;
        }
    });
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-2xl text-center text-orange-500 my-4'>All Orders</h1>
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOrders?.length === 0 ? <h1 className='text-2xl text-orange-500'>No orders confirm yet!!!</h1> :
                                allOrders.map((order, i) => <tr
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
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;