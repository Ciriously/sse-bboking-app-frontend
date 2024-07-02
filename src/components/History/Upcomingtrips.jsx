import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const UpcomingCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [tripIdToCancel, setTripIdToCancel] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [trainDetails, setTrainDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUser = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`https://sse-bookingapp-backend.vercel.app/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user details');
            const data = await response.json();
            setUserDetails(data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    const fetchTrainDetails = async (trainIds) => {
        setLoading(true);
        try {
            const promises = trainIds.map(id =>
                fetch(`https://sse-bookingapp-backend.vercel.app/admin/getTrainById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    if (!response.ok) throw new Error('Failed to fetch train details');
                    return response.json();
                })
            );
            const results = await Promise.all(promises);
            setTrainDetails(results);
        } catch (error) {
            console.error('Error fetching train details:', error);
            toast.error('Failed to fetch train details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (userDetails.tickets && userDetails.tickets.length > 0) {
            const trainIds = userDetails.tickets.map(ticket => ticket.trainId);
            fetchTrainDetails(trainIds);
        }
    }, [userDetails]);

    const handleCancel = (id) => {
        setTripIdToCancel(id);
        setShowModal(true);
    };

    const confirmCancel = async () => {
        try {
            const updatedTickets = []; // Empty array for tickets
            const response = await fetch(`https://sse-bookingapp-backend.vercel.app/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tickets: updatedTickets }),
            });
            if (!response.ok) throw new Error('Failed to update user tickets');
            const updatedUserDetails = await response.json();
            setUserDetails(updatedUserDetails);
            setTrainDetails([]); // Empty train details state
            toast.success('All trips cancelled successfully');
        } catch (error) {
            console.error('Error cancelling trips:', error);
            toast.error('Failed to cancel trips');
        }
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-center  font-poppins p-6">
            {loading ? (
                <div className="flex justify-center items-center w-full h-24">
                    <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-black rounded-full" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            ) : trainDetails.length > 0 ? (
                trainDetails.map((train) => (
                    <div key={train.id} className="bg-white rounded-lg w-[30rem] shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{train.name}</h2>
                        <p className="text-md text-gray-700">{train.date}</p>
                        <p className="text-md text-gray-700 mb-4">{train.source} - {train.destination}</p>
                        <div className="flex justify-end">
                            <button
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300 ease-in-out"
                                onClick={() => handleCancel(train.id)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No upcoming trips found.</p>
            )}

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
                        <p className="text-sm text-gray-700 mb-4">Are you sure you want to cancel all trips?</p>
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
