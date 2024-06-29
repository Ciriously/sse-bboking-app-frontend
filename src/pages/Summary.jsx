import React, { useState, useEffect } from 'react';
import PaymentSuccessful from '../animations/PaymentSuccessful';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Summary = () => {
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainDetails, setTrainDetails] = useState(null);
    const location = useLocation();
    const { price } = location.state || {}; // Default to an empty object if state is undefined

    useEffect(() => {
        fetchTrainDetails();
    }, [id]); // Dependency array with `id` to refetch if `id` changes

    const handleCheckout = () => {
        setShowPaymentSuccess(true);
        // Navigate to another route or perform additional actions after showing payment success
    };

    const fetchTrainDetails = async () => {
        try {
            const response = await fetch(`http://localhost:4000/admin/getTrainById/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to fetch train details');

            const data = await response.json();
            setTrainDetails(data);
        } catch (error) {
            console.error('Error fetching train details:', error);
            toast.error('Failed to fetch train details');
        }
    };

    return (
        <div className="bg-gray-100 font-poppins min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-semibold mb-8 text-center">Confirm Booking</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                            {trainDetails ? (
                                <div>
                                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Train Name: {trainDetails.name}</h2>
                                            <p className="text-lg text-gray-600">Train Time: {trainDetails.time}</p>
                                            <p className="text-lg text-gray-600">Source: {trainDetails.source}</p>
                                            <p className="text-lg text-gray-600">Destination: {trainDetails.destination}</p>
                                        </div>
                                    </div>
                                    {/* Additional content like passenger details */}
                                </div>
                            ) : (
                                <p>Loading train details...</p>
                            )}
                        </div>
                    </div>
                    {/* Payment summary and confirmation button */}
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
                            <div className="flex justify-between mb-2 text-lg">
                                <span>Subtotal</span>
                                <span>₹{price}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-lg">
                                <span>Taxes</span>
                                <span>₹10.00</span>
                            </div>
                            <div className="flex justify-between mb-2 text-lg">
                                <span>Convenience Fee</span>
                                <span>₹25.00</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2 text-xl font-semibold">
                                <span>Total</span>
                                <span>₹{Number(price) + 10.00 + 25.00}</span>
                            </div>
                            <button
                                className="bg-red-500 text-white py-3 px-4 rounded-lg mt-4 w-full hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                onClick={handleCheckout}
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPaymentSuccess && (
                <PaymentSuccessful title="Payment Successful" />
            )}
        </div>
    );
};

export default Summary;
