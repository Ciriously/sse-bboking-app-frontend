import React from 'react';

const AppInfo = () => {
    return (
        <div className="flex flex-col font-poppins md:flex-row items-center justify-center min-h-screen p-4  ">
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] mb-8 md:mb-0">
                <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />
                <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px]  bg-white">
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png"
                        className="w-[272px] shadow-xl h-[572px]"
                        alt="RailYatra Mockup"
                    />
                </div>
            </div>
            <div className="max-w-xl text-center md:text-left px-4 md:px-8">
                <h1 className="text-4xl font-medium mb-4">Welcome to <span className='text-red-500 font-extrabold'>RailYatra</span></h1>
                <p className="text-lg mb-4">
                    RailYatra is your one-stop solution for seamless train travel booking and information. With our user-friendly app, you can easily search for trains, check availability, book tickets, and more. Experience the convenience of managing your train journeys with just a few clicks.
                </p>
                <p className="text-lg">
                    Whether you are planning a business trip or a vacation, RailYatra offers a reliable and efficient way to ensure a hassle-free travel experience. Join the millions of users who trust RailYatra for their train travel needs.
                </p>
            </div>
        </div>
    );
};

export default AppInfo;