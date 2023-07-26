import React from 'react';
import { useQuery } from 'react-query'
import Category from './Category';
import Loading from '../../Shared/Loading/Loading';

const Categories = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5000/categories')
            .then(res => res.json())
    });

    if (isLoading) {
        <Loading></Loading>
    }
    return (
        <div >
            <h1 className='text-center text-3xl font-bold text-orange-500 mt-10'>Our Collections</h1>
            <hr />
            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16'>

                {
                    categories.map(category => <Category
                        key={category.categoryId}
                        category={category}
                    >

                    </Category>)
                }
            </div>
        </div>
    );
};

export default Categories;