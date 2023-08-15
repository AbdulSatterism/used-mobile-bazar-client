import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../../Categories/Categories/Categories';
import ContactForm from '../ContactForm/ContactForm';
import OurPolicy from '../OurPolicy/OurPolicy';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <OurPolicy></OurPolicy>
            <ContactForm></ContactForm>

        </div>
    );
};

export default Home;