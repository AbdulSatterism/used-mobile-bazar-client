import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryCollection from '../CategoryCollection/CategoryCollection';
import BookingModal from '../BookingModal/BookingModal';

const Products = () => {
    const categoryProducts = useLoaderData();
    const [categoryProduct, setCategoryProduct] = useState(null);

    return (
        <div >
            <h1 className='text-center text-3xl font-bold text-orange-500 mt-10'>Category Wise Collection</h1>
            <div className='grid container mx-auto grid-cols-1  lg:grid-cols-2 my-10'>

                {
                    categoryProducts.map(product => <CategoryCollection
                        key={product._id}
                        product={product}
                        setCategoryProduct={setCategoryProduct}
                    >

                    </CategoryCollection>)
                }
            </div>
            {
                categoryProduct &&
                <BookingModal
                    categoryProduct={categoryProduct}
                    setCategoryProduct={setCategoryProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default Products;