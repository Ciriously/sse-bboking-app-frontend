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
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            {trainDetails ? (
                                <div>
                                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                                        <div>
                                            <h2 className="text-lg font-semibold">Train Name: {trainDetails.name}</h2>
                                            <p className="text-gray-600">Train Time: {trainDetails.time}</p>
                                            <p className="text-gray-600">Selected Source: {trainDetails.source}</p>
                                            <p className="text-gray-600">Selected Destination: {trainDetails.destination}</p>

                                        </div>
                                        <div className="flex items-center">
                                            {/* <img
                                                className="h-12 w-12 rounded-full object-cover"
                                                src={trainDetails.imageUrl || "https://via.placeholder.com/150"}
                                                alt="Train"
                                            /> */}
                                            <span className="ml-4">Train Image</span>
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
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{price}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$10.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Convenience Fee</span>
                                <span>$25.00</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">{Number(price) + 10.00 + 25.00}</span>                            </div>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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