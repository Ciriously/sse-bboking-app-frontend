import React from 'react';
import Lottie from 'react-lottie';
import animationData from './register.json';

const PaymentSuccessful = ({ title }) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col font-poppins items-center justify-center ">
            <Lottie options={defaultOptions} height={200} width={200} />
            <h1 className="text-2xl font-bold text-black text-center mt-4">{title}</h1>
            <p className="text-lg text-[#575757] text-center mt-2">
                <a href='/' className='text-md text-black  underline'>Please return to the Home screen</a></p>

        </div>
    );
};

export default PaymentSuccessful;