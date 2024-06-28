import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OfferDiscountComponent = () => {
    const [discountCode, setDiscountCode] = useState('');
    const [appliedCode, setAppliedCode] = useState('');

    const handleApplyDiscount = () => {
        if (discountCode.trim() === '') {
            toast.error('Please enter a coupon code.');
            return;
        }

        // Check if the entered code matches the special code
        if (discountCode.trim().toUpperCase() === 'WELCOME100') {
            setAppliedCode('Welcome 100');
            toast.success('Welcome 100 applied successfully!');
        } else {
            toast.error('Invalid coupon code. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-4 ">
            <div className="flex items-center mb-2">
                <input
                    type="text"
                    className="flex-1 px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
                    onClick={handleApplyDiscount}
                >
                    Apply
                </button>
            </div>
            {/* {appliedCode && (
                <p className="text-gray-700">
                    Use {appliedCode === 'Welcome 100' ? 'Welcome 100 to get ₹100 off your first booking.' : ''}
                </p>
            )} */}
        </div>
    );
};

export default OfferDiscountComponent;
