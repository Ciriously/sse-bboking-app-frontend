import React from 'react';

const Header = () => {
    return (
        <div
            className="relative rounded-3xl h-[40rem] sm:h-[35rem] md:h-[45rem] lg:h-[50rem] xl:h-[55rem] font-poppins mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-12 lg:pt-44"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1644410578664-27713c1a227f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <header className="mx-auto max-w-6xl text-center">
                <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex flex-wrap justify-center gap-8 text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                    <span style={{ color: '#FF9933' }}>Safety</span>
                    <span>|</span>
                    <span style={{ color: '#FFFFFF' }}>Security</span>
                    <span>|</span>
                    <span style={{ color: '#138808' }}>Punctuality</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                    Welcome to <span className='bg-gradient-to-r from-yellow-500 via-slate-100 to-emerald-800 bg-clip-text text-transparent'>Indian</span> Railways
                </h1>

                <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
                    <a href='/Bookinglist' className="bg-gradient-to-r from-red-500 via-pink-500 to-red-700 text-white py-3 px-8 rounded-2xl text-lg font-semibold hover:from-red-600 hover:via-pink-600 hover:to-red-800 transition duration-300">
                        Book a Ticket
                    </a>
                </div>
            </header>
        </div>
    );
}

export default Header;
