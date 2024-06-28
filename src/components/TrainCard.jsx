import React from 'react';
import { useNavigate } from 'react-router-dom';

const trainData = [
    {
        name: 'Express 1',
        timings: '10:00 AM - 10:00 PM',
        classes: [
            { type: '3A', seats: 50, price: '₹1500' },
            { type: '2A', seats: 30, price: '₹1000' },
            { type: '1A', seats: 20, price: '₹2000' },
        ],
        availability: 'High Availability'
    },
    {
        name: 'Express 2',
        timings: '08:00 AM - 08:00 PM',
        classes: [
            { type: '3A', seats: 40, price: '₹1400' },
            { type: '2A', seats: 25, price: '₹900' },
            { type: '1A', seats: 15, price: '₹1800' },
        ],
        availability: 'Limited Availability'
    },
    {
        name: 'Express 3',
        timings: '09:00 AM - 09:00 PM',
        classes: [
            { type: '3A', seats: 45, price: '₹1600' },
            { type: '2A', seats: 28, price: '₹1100' },
            { type: '1A', seats: 18, price: '₹2100' },
        ],
        availability: 'High Availability'
    },
];

const TrainCard = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="max-w-3xl mx-auto font-poppins rounded-lg overflow-hidden">
            {trainData.map((train, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-2xl text-gray-800">{train.name}</h2>
                        <span className="text-lg text-gray-600">{train.timings}</span>
                    </div>
                    <div className="mt-2">
                        <p className={`text-lg ${train.availability.includes('High') ? 'text-green-500' : 'text-yellow-500'}`}>
                            {train.availability}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {train.classes.map((cls, idx) => (
                            <div key={idx} className={`text-center border-2 rounded-lg p-4 ${cls.type === '3A' ? 'border-blue-500' : (cls.type === '2A' ? 'border-yellow-500' : 'border-green-500')}`}>
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
