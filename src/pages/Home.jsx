import React from 'react';
import ReservationCard from '../shared/Searchbar';
import TrainCard from '../components/TrainCard';
import Header from '../components/Header';
import Testimonials from '../components/Testomonials';
import AppInfo from '../components/Appinfo';

const Home = () => {
    return (
        <div className="relative p-4 sm:p-8 md:p-10 mx-auto">

            <Header />

            < AppInfo />

            < Testimonials />

        </div>
    );
}

export default Home;