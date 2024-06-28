import React from 'react';
import ReservationCard from '../shared/Searchbar';
import TrainCard from '../components/TrainCard';
import Header from '../components/Header';
import Testimonials from '../components/Testomonials';

const Home = () => {
    return (
        // Adjusted padding and margins for different screen sizes
        <div className="relative p-4 sm:p-8 md:p-10 mx-auto">

            {/* Header section remains the same, assuming it's already responsive */}
            <Header />
            < Testimonials />
            {/* TrainCard and ReservationCard components should also be made responsive within their own definitions */}
            {/* <TrainCard /> */}
            {/* <ReservationCard />  */}
        </div>
    );
}

export default Home;