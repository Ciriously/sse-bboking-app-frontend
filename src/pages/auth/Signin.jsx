import React from 'react'

const Signin = () => {
    return (
        <div><main className="bg-slate-100 min-h-screen flex items-center justify-center p-8 md:p-0">
            <div className="bg-white shadow-lg flex flex-col items-center rounded-xl overflow-hidden lg:flex-row lg:w-2/3 2xl:w-1/2">
                <div className="p-8 lg:w-1/2 sm:p-8">
                    <h1 className="font-bold text-gray-800 text-3xl md:text-4xl md:mb-16">
                        Discover talented and creative professionals.
                    </h1>
                    <h2 className="text-2xl font-semibold mt-8 mb-6 text-gray-700">Login</h2>
                    <form action="" className="flex flex-col">
                        <div id="input-field" className="flex flex-col mb-4 relative">
                            <i className="fi fi-rr-envelope absolute top-11 right-5 text-zinc-400" />
                            <label htmlFor="email" className="mb-2 text-gray-700">
                                Your email
                            </label>
                            <input
                                type="email"
                                name=""
                                id="email"
                                placeholder="youremail@gmail.com"
                                className="px-4 py-2 border-2 border-slate-300 rounded-md max-w-full focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div id="input-field" className="flex flex-col relative">
                            <i className="fi fi-rr-lock absolute top-11 right-5 text-zinc-400" />
                            <label htmlFor="Password" className="mb-2 text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name=""
                                id="password"
                                placeholder="your password"
                                className="px-4 py-2 border-2 border-slate-300 rounded-md max-w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button className="my-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-4 py-2 rounded-md">
                            Login
                        </button>
                    </form>
                    <p className="text-gray-500">
                        Don't have an account?{" "}
                        <a href="#" className="text-blue-500 font-semibold underline">
                            Sign up
                        </a>
                    </p>
                </div>
                {/* image */}
                <div className="w-1/2">
                    <img src="https://images.unsplash.com/photo-1582217900003-2b19c0e3a7d0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-f lg:block hidden" />
                </div>
            </div>
        </main>
        </div>
    )
}

export default Signin