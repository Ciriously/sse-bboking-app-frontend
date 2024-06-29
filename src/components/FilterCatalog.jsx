import React, { useState } from 'react';
import { trainData } from './traindata';

const FilterCatalog = ({ setFilteredTrains }) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleLocationFilter = (location) => {
        setSelectedLocation(location);
        filterTrains(location, selectedDate);
    };

    const handleDateFilter = (date) => {
        setSelectedDate(date);
        filterTrains(selectedLocation, date);
    };

    const filterTrains = (location, date) => {
        let filteredTrains = trainData;

        if (location) {
            filteredTrains = filteredTrains.filter(train => train.to === location);
        }

        if (date) {
            filteredTrains = filteredTrains.filter(train => train.availableDate === date);
        }

        setFilteredTrains(filteredTrains);
    };

    const clearFilters = () => {
        setSelectedLocation('');
        setSelectedDate('');
        setFilteredTrains(trainData);
    };

    return (
        <div className="max-w-4xl mx-auto font-poppins bg-white rounded-lg overflow-hidden shadow-lg p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Catalog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Location:</label>
                    <select
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedLocation}
                        onChange={(e) => handleLocationFilter(e.target.value)}
                    >
                        <option value="">All Locations</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
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
            <button
                className="block w-full sm:w-auto mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                onClick={clearFilters}
            >
                Clear Filters
            </button>
        </div>
    );
};

export default FilterCatalog;
