import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../../context/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const SellerProduct = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const token = localStorage.getItem('accessToken')
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/productsByUser/${user?.email}`);
            return res.data;
        }
    });


    const handleDelete = product => {
        const agree = window.confirm(`Are you sure want to delete ${product?.deviceName} ?`);
        if (agree) {
            fetch(`http://localhost:5000/products/${product?._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success(`Your ${product?.deviceName} is permanently deleted`)
                        refetch()
                    }
                })
        }
    }

    return (
        <div>
            <h1 className='text-2xl text-center text-orange-500 my-4'>My Added Product</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Device image</th>
                            <th>Device Name</th>
                            <th>Original Price</th>
                            <th>Resale Price</th>
                            <th>Delete Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.length === 0 ? <h1 className='text-2xl text-orange-500'>item doesn't added yet!!!</h1> :
                                products.map((product, i) => <tr
                                    key={product._id}
                                    className="hover"
                                >
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={product?.phoneImg} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product?.deviceName}</td>
                                    <td>{product?.originalPrice}</td>
                                    <td>${product?.resalePrice}</td>
                                    <td>
                                        <button onClick={() => handleDelete(product)} className='btn btn-warning btn-sm'>Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerProduct;