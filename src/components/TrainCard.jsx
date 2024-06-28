import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const trainData = [
    {
        name: 'Express 1',
        timings: '10:00 AM - 10:00 PM',
        classes: [
            { type: '3A', seats: 100, price: '₹1500' },
            { type: '2A', seats: 80, price: '₹1000' },
            { type: '1A', seats: 20, price: '₹2000' },
        ],
        availability: 'High Availability'
    },
    {
        name: 'Express 2',
        timings: '08:00 AM - 08:00 PM',
        classes: [
            { type: '3A', seats: 80, price: '₹1400' },
            { type: '2A', seats: 25, price: '₹900' },
            { type: '1A', seats: 120, price: '₹1800' },
        ],
        availability: 'Limited Availability'
    },
    {
        name: 'Express 3',
        timings: '09:00 AM - 09:00 PM',
        classes: [
            { type: '3A', seats: 45, price: '₹1600' },
            { type: '2A', seats: 120, price: '₹1100' },
            { type: '1A', seats: 18, price: '₹2100' },
        ],
        availability: 'High Availability'
    },
];

const TrainCard = () => {
    const navigate = useNavigate();

    const determineBackgroundColor = (seats) => {
        if (seats > 80) {
            return 'bg-green-500 bg-opacity-30'; // Green background with opacity
        } else if (seats > 50) {
            return 'bg-yellow-500 bg-opacity-30'; // Yellow background with opacity
        } else {
            return 'bg-red-500 bg-opacity-30'; // Red background with opacity
        }
    };

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            {trainData.map((train, index) => (
                <div key={index} className="mb-4 p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-2xl text-gray-800">{train.name}</h2>
                        <span className="text-lg text-gray-600">{train.timings}</span>
                    </div>
                    <div className="mt-2">
                        <p className={`text-lg ${train.availability.includes('High') ? 'text-green-500' : 'text-yellow-500'}`}>
                            {train.availability}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {train.classes.map((cls, idx) => (
                            <div key={idx} className={`rounded-lg p-4 border border-gray-200 ${determineBackgroundColor(cls.seats)}`}>
                                <p className="text-lg font-bold text-gray-800">{cls.type}</p>
                                <p className="text-sm text-gray-600">Seats: {cls.seats}</p>
                                <p className="text-sm text-gray-600">Price: {cls.price}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                        onClick={() => handleClick('/booking')}
                    >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TrainCard;