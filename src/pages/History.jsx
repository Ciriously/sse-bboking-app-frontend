import React from 'react';
import UpcomingCard from '../components/History/Upcomingtrips';

const UserHistory = () => {
    // Example data for upcoming trips
    const upcomingTrips = [
        { id: 1, trainName: 'Express 101', date: 'July 5, 2024', departure: 'New Delhi', destination: 'Mumbai' },
        { id: 2, trainName: 'Rajdhani 222', date: 'July 10, 2024', departure: 'Bangalore', destination: 'Chennai' },
        { id: 3, trainName: 'Shatabdi 333', date: 'July 15, 2024', departure: 'Kolkata', destination: 'Delhi' },
    ];

    return (
        <>
            <header className="mb-4 font-poppins text-center">
                <h1 className="text-6xl mb-8 font-bold text-purple-600">Upcoming Trips</h1>
            </header>
            <div className="flex justify-center items-center">
                <div className="bg-gray-100">
                    <UpcomingCard trips={upcomingTrips} />
                </div>
            </div>
        </>
    );
};

export default UserHistory;
