import React from 'react';
import { useQuery } from 'react-query';
import { } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()

    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // const res = await fetch(`https://used-mobile-bazar-server.onrender.com/users`);
            // const data = await res.json();
            // return data;
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        fetch(`https://used-mobile-bazar-server.onrender.com/users/admin/${user?._id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success(`${user?.name} is admin successfully`);
                    refetch()
                }
            })
    }

    const handleDeleteUser = user => {
        const agree = window.confirm(`are your sure want to delete ${user?.name} who is ${user?.role}`);
        if (agree) {
            fetch(`https://used-mobile-bazar-server.onrender.com/users/${user?._id}`, {
                method: "DELETE",

            })
                .then(res => res.json())
                .then(data => {

                    if (data.acknowledged) {
                        toast.success(`${user?.name} is admin successfully`);
                        refetch()
                    }

                })
        }
    }


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-2'>
            <h1 className='text-2xl font-semibold text-orange-500 my-2'>Total Users:{allUsers.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Emil</th>
                            <th>Admin</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role === 'admin' ? user?.role : <button onClick={() => handleMakeAdmin(user)} className='btn btn-ghost bg-green-500'>make admin</button>}</td>
                                <td>{user?.role !== 'admin' && user?.role}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className='btn btn-ghost bg-red-500'>delete  </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;