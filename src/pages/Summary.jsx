import React, { useState } from 'react';
import PaymentSuccessful from '../animations/PaymentSuccessful';

const Summary = () => {
    const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

    const handleCheckout = () => {
        // Your checkout logic here
        // For example: perform payment processing, API calls, etc.

        // Assuming successful checkout, show registration success animation
        setShowRegistrationSuccess(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            {/* Train details and other content */}
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            {/* Summary details */}
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Conditional rendering of RegistrationSuccess component */}
            {showRegistrationSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <PaymentSuccessful title="Payment Successful" />
                </div>
            )}
        </div>
    );
};

export default Summary;
