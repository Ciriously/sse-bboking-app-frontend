import React, { useState } from 'react';
import PaymentSuccessful from '../animations/PaymentSuccessful';

const Summary = () => {
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

    const handleCheckout = () => {
        // Perform payment processing or API calls here

        // Assuming successful checkout, show payment success animation
        setShowPaymentSuccess(true);
    };

    return (
        <div className="bg-gray-100 font-poppins min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-semibold mb-8 text-center">Confirm Booking</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            {/* Train details and other content */}
                            <div className="flex items-center justify-between border-b pb-4 mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Train Name: Train Name</h2>
                                    <p className="text-gray-600">Train Time: 10:00 AM</p>
                                    <p className="text-gray-600">Selected Class: Class A</p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover"
                                        src="https://via.placeholder.com/150"
                                        alt="Train"
                                    />
                                    <span className="ml-4">Train Image</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Passenger Details</h2>
                                <ul className="divide-y divide-gray-200">
                                    <li className="py-2">
                                        <span className="font-semibold">Passenger 1:</span> John Doe
                                    </li>
                                    {/* Additional passenger details */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$444.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Convenience Fee</span>
                                <span>$0.00</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">$444.00</span>
                            </div>
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
            {/* Conditional rendering of PaymentSuccessful component */}
            {showPaymentSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <PaymentSuccessful title="Payment Successful" />
                </div>
            )}
        </div>
    );
};

export default Summary;
