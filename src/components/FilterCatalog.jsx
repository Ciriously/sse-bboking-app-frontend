import React, { useState } from 'react';
import { trainData } from './traindata';

const FilterCatalog = ({ setFilteredTrains }) => {
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [trains, setTrains] = useState([]);

    const handleSourceFilter = (source) => {
        setSelectedSource(source);
    };

    const handleDestinationFilter = (destination) => {
        setSelectedDestination(destination);
    };

    const handleDateFilter = (date) => {
        setSelectedDate(date);
    };

    // !! Yet to implement this method use context later 

    const ApplyFilter = async () => {
        try {
            const response = await fetch('https://sse-bookingapp-backend.vercel.app/admin/getTrainByFilter?' + new URLSearchParams({
                source: selectedSource,
                destination: selectedDestination,
                date: selectedDate
            }));
            if (response) {
                console.log('response:', response);
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrains(data);
            setFilteredTrains(data); // Update the Bookinglist's state with the filtered trains

            console.log('Filtered trains:', data);
        } catch (error) {
            console.error('Error fetching filtered trains:', error);
        }
    };

    const clearFilters = () => {
        setSelectedSource('');
        setSelectedDestination('');
        setSelectedDate('');
        setFilteredTrains(trainData);
    };


    return (
        <div className="max-w-4xl mx-auto font-poppins bg-white rounded-lg overflow-hidden shadow-lg p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Catalog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Source:</label>
                    <select
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedSource}
                        onChange={(e) => handleSourceFilter(e.target.value)}
                    >
                        <option value="">All Locations</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Kolkata">Kolkata</option>

                    </select>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination:</label>
                    <select
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedDestination}
                        onChange={(e) => handleDestinationFilter(e.target.value)}
                    >
                        <option value="">All Locations</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Kolkata">Kolkata</option>

                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date:</label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedDate}
                        onChange={(e) => handleDateFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex mt-4 justify-between">
                <button
                    className="px-3 py-1 bg-white text-black font-bold text-base rounded border-2 border-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
                <button
                    className="px-3 py-1 bg-black text-white font-bold text-base rounded border-2 border-black transition duration-100 hover:bg-gray-900 hover:text-yellow-500"
                    onClick={ApplyFilter}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterCatalog;

