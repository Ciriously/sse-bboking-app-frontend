import React, { useState } from 'react';

const CancelTrip = ({ trips }) => {
    // State to manage cancelled trips
    const [cancelledTrips, setCancelledTrips] = useState(trips.filter(trip => trip.status === 'cancelled'));

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cancelledTrips.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Cancelled Trips</h2>
                    <p className="text-md text-gray-700">You haven't cancelled any trips yet.</p>
                </div>
            ) : (
                cancelledTrips.map((trip) => (
                    <div key={trip.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{trip.trainName}</h2>
                        <p className="text-md text-gray-700">{trip.date}</p>
                        <p className="text-md text-gray-700 mb-4">{trip.departure} - {trip.destination}</p>
                        <p className="text-sm text-gray-600">Status: {trip.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CancelTrip;
