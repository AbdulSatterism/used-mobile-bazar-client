import React from 'react';
import { FaShoppingBasket } from "react-icons/fa";

const CategoryCollection = ({ product, setCategoryProduct }) => {
    const { deviceName, sellerName, phoneImg, date, originalPrice, resalePrice, useTime, salePlace, _id } = product;

    const handleClick = (product) => {
        setCategoryProduct(product);
        window.my_modal_5.showModal();
    }


    return (
        <div className="card w-3/2 m-6 bg-slate-500 shadow-xl">
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

                    <button
                        onClick={() => handleClick(product)}
                        className='btn btn-accent'
                    >Order<FaShoppingBasket></FaShoppingBasket>
                    </button>

                </div>
            </div>

        </div >
    );
};

export default CategoryCollection;