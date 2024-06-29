import React, { useState } from 'react';
import PassengerDetails from '../components/Booking/Passengerdetails';
import CouponComponent from '../components/Booking/Coupon';

const Booking = () => {
    const [accountDetail, setAccountDetail] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setAccountDetail(e.target.value);
        if (e.target.value.length >= 8) {
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (accountDetail.length < 8) {
            setError('Account detail must be at least 8 characters long.');
        } else {
            // Handle form submission
            console.log('Account detail submitted:', accountDetail);
        }
    };

    return (
        <div className="px-6 bg-slate-100 min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md w-full">
                <PassengerDetails />
            </div>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md w-full">
                <CouponComponent />
            </div>

            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md w-full">

                <h2 className="text-2xl font-bold mb-4">IRCTC Account Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="accountDetail"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Enter account detail
                        </label>
                        <input
                            type="text"
                            id="accountDetail"
                            value={accountDetail}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent mb-10 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>

            </div>

        </div>
    );
};

export default Booking;
