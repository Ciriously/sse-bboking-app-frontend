import React, { useState } from 'react';

const UpcomingCard = ({ trips }) => {
    const [showModal, setShowModal] = useState(false);
    const [tripIdToCancel, setTripIdToCancel] = useState(null);

    const handleCancel = (id) => {
        setTripIdToCancel(id);
        setShowModal(true);
    };

    const confirmCancel = () => {
        // Implement cancellation logic here (e.g., API call, state update)
        console.log(`Cancel trip with ID ${tripIdToCancel}`);
        setShowModal(false); //* Close modal after cancellation
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="grid grid-cols-1 font-poppins gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1">
            {trips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-lg w-[30rem] shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{trip.trainName}</h2>
                    <p className="text-md text-gray-700">{trip.date}</p>
                    <p className="text-md text-gray-700 mb-4">{trip.departure} - {trip.destination}</p>
                    <div className="flex justify-end">
                        <button
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 ease-in-out"
                            onClick={() => handleCancel(trip.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ))}

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                        <p className="text-sm text-gray-700 mb-4">Are you sure you want to cancel this trip?</p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={confirmCancel}
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpcomingCard;
