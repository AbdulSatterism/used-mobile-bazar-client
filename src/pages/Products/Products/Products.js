import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryCollection from '../CategoryCollection/CategoryCollection';

const Products = () => {
    const categoryProducts = useLoaderData();

    return (
        <div >
            <h1 className='text-center text-3xl font-bold text-orange-500 mt-10'>Category Wise Collection</h1>
            <div className='grid container mx-auto grid-cols-1  lg:grid-cols-2 my-10'>

                {
                    categoryProducts.map(product => <CategoryCollection
                        key={product._id}
                        product={product}
                    >

                    </CategoryCollection>)
                }
            </div>
        </div>
    );
};

export default Products;