import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStatus from '../hooks/useAuthStatus';

const TrainCard = ({ filteredTrains }) => {
    const navigate = useNavigate();
    const [trains, setTrains] = useState([]);
    const isLoggedIn = useAuthStatus();

    useEffect(() => {
        if (!filteredTrains) {
            const fetchTrains = async () => {
                try {
                    const response = await fetch('http://localhost:4000/admin/getAllTrains');
                    if (!response.ok) {
                        throw new Error('Failed to fetch trains');
                    }
                    const trainsData = await response.json();
                    setTrains(trainsData);
                } catch (error) {
                    console.error('Error fetching trains:', error.message);
                }
            };

            fetchTrains();
        }
    }, [filteredTrains]);

    const determineBackgroundColor = (seats) => {
        if (seats > 80) {
            return 'bg-green-500 bg-opacity-30'; // Green background with opacity
        } else if (seats > 50) {
            return 'bg-yellow-500 bg-opacity-30'; // Yellow background with opacity
        } else {
            return 'bg-red-500 bg-opacity-30'; // Red background with opacity
        }
    };

    const handleClick = (trainId) => {
        if (!isLoggedIn) {
            toast.error('Please log in to book a ticket');
        } else {
            navigate(`/booking/${trainId}`);
        }
    };

    const displayTrains = filteredTrains && filteredTrains.length > 0 ? filteredTrains : trains;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <ToastContainer />
            {displayTrains.map((train, index) => (
                <div key={index} className="mb-4 p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-2xl text-gray-800">{train.name}</h2>
                        <span className="text-lg text-gray-600">{train.timings}</span>
                    </div>
                    <div className="mt-2">
                        <p className="text-md font-poppins text-gray-600">From: {train.source} - To: {train.destination}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {Object.entries(train.seats || {}).map(([classType, { price, count }], idx) => (
                            <div key={idx} className={`rounded-lg p-4 border border-gray-200 ${determineBackgroundColor(count)}`}>
                                <p className="text-lg font-bold text-gray-800">{classType.toUpperCase()}</p>
                                <p className="text-sm text-gray-600">Seats: {count}</p>
                                <p className="text-sm text-gray-600">Price: {price}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                        onClick={() => handleClick(train._id)}
                    >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TrainCard;
