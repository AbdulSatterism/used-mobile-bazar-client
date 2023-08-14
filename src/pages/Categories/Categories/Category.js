import React from 'react';
import { Link } from 'react-router-dom';


const Category = ({ category }) => {
    const { categoryId, categoryName, categoryImg } = category;



    return (
        <div className="card  mx-auto w-96 my-4 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10 bg-violet-200">
                <img src={categoryImg} alt="Shoes" className="rounded-xl h-64" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-orange-500">{categoryName}</h2>
            </div>
            <Link to={`/products/${categoryId}`}>
                <button className="btn btn-accent w-full ">Explore  </button>
            </Link>
        </div>
    );
};

export default Category;