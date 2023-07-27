import React from 'react';
import { FaShoppingBasket } from "react-icons/fa";
import { useQuery } from 'react-query';

const CategoryCollection = ({ product, setCategoryProduct }) => {
    const { deviceName, sellerName, phoneImg, date, originalPrice, resalePrice, useTime, salePlace, _id } = product;

    const handleClick = (product) => {
        setCategoryProduct(product);
        window.my_modal_5.showModal();
    }

    const { data: orderItem = [], refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/orders');
            const data = await res.json();
            return data;
        }
    });
    console.log(orderItem)

    return (
        <div className="card w-3/2 m-6 bg-yellow-600 shadow-xl">
            <figure className='bg-white m-4'><img className='h-48' src={phoneImg} alt="Shoes" /></figure>
            <div className="card-body text-black my-0">
                <h2 className="card-title mt-0">Device: {deviceName} </h2>
                <h3 className='text-xl'>Seller: {sellerName}</h3>
                <p>Sale Date: {date}</p>
                <p>Original Price: ${originalPrice}</p>
                <p>Resale Price: ${resalePrice}</p>
                <p>Uses: {useTime}</p>
                <p>Location: {salePlace}</p>

                <div className="card-actions mb-0 justify-end">
                    {
                        orderItem.map(item => item.productId === _id ?
                            <button className='btn btn-accent text-white'>Sold Out</button>
                            : <button
                                onClick={() => handleClick(product)}
                                className='btn btn-accent'
                            >Order <FaShoppingBasket></FaShoppingBasket>
                            </button>)
                    }

                </div>
            </div>

        </div >
    );
};

export default CategoryCollection;