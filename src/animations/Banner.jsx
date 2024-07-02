import React, { useState } from 'react';

const DiscountBanner = () => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="flex font-poppins justify-between items-center p-4 shadow-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
            <div className="text-container flex-1 min-w-0">
                <div className="rotate-text">
                    <p className="text-lg text-center font-semibold text-gray-800">Exciting Offer: <span className="text-gray-600 font-bold">WELCOME100</span> - Save 20% on your first booking!</p>
                </div>
            </div>
            <button onClick={handleClose} className="text-gray-800 font-bold ml-4">
                &times;
            </button>
        </div>
    );
};

export default DiscountBanner;