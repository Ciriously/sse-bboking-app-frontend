import React, { useState } from 'react';

const DiscountBanner = () => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="flex font-poppins justify-between items-center  p-4 shadow-md bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">
            <div>
                <p className="text-lg text-center font-semibold">Use code: <span className="text-red-500 font-bold">Welcome100</span> for your first booking!</p>
            </div>
            <button onClick={handleClose} className="text-red-500 font-bold">
                &times;
            </button>
        </div>
    );
};

export default DiscountBanner;
