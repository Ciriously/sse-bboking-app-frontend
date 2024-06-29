import React, { useState } from 'react';
import UpcomingCard from '../components/History/Upcomingtrips';
import CancelTrip from '../components/History/Canceltrips';

const UserHistory = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Example data for upcoming and cancelled trips
    const upcomingTrips = [
        { id: 1, trainName: 'Express 101', date: 'July 5, 2024', departure: 'New Delhi', destination: 'Mumbai' },
        { id: 2, trainName: 'Rajdhani 222', date: 'July 10, 2024', departure: 'Bangalore', destination: 'Chennai' },
        { id: 3, trainName: 'Shatabdi 333', date: 'July 15, 2024', departure: 'Kolkata', destination: 'Delhi' },
    ];

    const cancelledTrips = [];

    return (
        <>
            <div className="mb-4 border-b font-poppins border-gray-200">
                <ul
                    className="flex flex-wrap -mb-px text-xl font-medium text-center"
                    role="tablist"
                >
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 font-bold rounded-t-lg ${activeTab === 'upcoming' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'upcoming'}
                            onClick={() => handleTabChange('upcoming')}
                        >
                            Upcoming Trips
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 font-bold rounded-t-lg ${activeTab === 'cancelled' ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'cancelled'}
                            onClick={() => handleTabChange('cancelled')}
                        >
                            Cancelled Trips
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-styled-tab-content">
                <div
                    className={`p-4 rounded-lg bg-gray-50 ${activeTab === 'upcoming' ? '' : 'hidden'}`}
                    role="tabpanel"
                    aria-labelledby="upcoming-tab"
                >
                    <div className=" bg-gray-100 flex items-center">
                        <UpcomingCard trips={upcomingTrips} />
                    </div>
                </div>
                <div
                    className={`p-4 rounded-lg bg-gray-50 ${activeTab === 'cancelled' ? '' : 'hidden'}`}
                    role="tabpanel"
                    aria-labelledby="cancelled-tab"
                >
                    <div className=" bg-gray-100 flex items-center">
                        < CancelTrip trips={cancelledTrips} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserHistory;
