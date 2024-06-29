import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainData } from './traindata';


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
                        <p className="text-md font-poppins text-gray-600">From: {train.from} - To: {train.to}</p>
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
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                        onClick={() => handleClick(train.id)} // Adjust this function as per your booking logic
                    >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TrainCard;