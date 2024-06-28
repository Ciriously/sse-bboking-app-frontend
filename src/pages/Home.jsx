import React from 'react'
import ReservationCard from '../shared/Searchbar'
import TrainCard from '../components/TrainCard'

const Home = () => {
    return (
        <div className="relative ">

            {/*  Header section */}

            <div className="relative font-poppins mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-12 lg:pt-24">
                <header className="mx-auto max-w-6xl text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                        Welcome to Indian Railways
                    </h1>
                    <p className="mt-2 text-xl font-semibold text-gray-400">
                        Plan and books your perfect trip with expert advice, travel tips destination information from us.
                    </p>
                </header>
            </div>
            < TrainCard />
            {/* <ReservationCard /> */}
        </div>
    )
}

export default Home