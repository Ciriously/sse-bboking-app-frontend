import React from 'react';
import Header from '../components/Header';
import Testimonials from '../components/Testomonials';
import AppInfo from '../components/Appinfo';


const Home = () => {
    return (
        <div className="relative p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 mx-auto">
            <Header />
            <AppInfo />
            <Testimonials />
        </div>
    );
}

export default Home;