import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signin } = useAuth();

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                const response = await fetch('https://sse-bookingapp-backend.vercel.app/loginUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    signin(data.token);
                    navigate('/');
                } else {
                    throw new Error(data.error || 'An error occurred during login');
                }
            } catch (error) {
                console.error('Login error:', error.message);
                setErrors({ form: error.message });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <main className="min-h-screen font-poppins flex items-center justify-center p-8 md:p-0">
                <div className="bg-white shadow-lg flex flex-col items-center rounded-xl overflow-hidden lg:flex-row lg:w-2/3 2xl:w-1/2">
                    <div className="p-8 lg:w-1/2 sm:p-8">
                        <h1 className="font-bold text-gray-800 text-3xl md:text-4xl md:mb-16">
                            Welcome to RailYatri Yojana
                        </h1>
                        <h2 className="text-2xl font-semibold mt-8 mb-6 text-gray-700">Sign In</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div id="input-field" className="flex flex-col mb-4 relative">
                                <i className="fi fi-rr-envelope absolute top-11 right-5 text-zinc-400" />
                                <label htmlFor="email" className="mb-2 text-gray-700">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="youremail@gmail.com"
                                    className="px-4 py-2 border-2 border-slate-300 rounded-md max-w-full focus:border-blue-500 focus:outline-none"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-2">{errors.email}</span>
                                )}
                            </div>
                            <div id="input-field" className="flex flex-col relative">
                                <i className="fi fi-rr-lock absolute top-11 right-5 text-zinc-400" />
                                <label htmlFor="password" className="mb-2 text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="your password"
                                    className="px-4 py-2 border-2 border-slate-300 rounded-md max-w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm mt-2">{errors.password}</span>
                                )}
                            </div>
                            <button type="submit" className="my-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-4 py-2 rounded-md">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                            {errors.form && (
                                <span className="text-red-500 text-sm mt-2">{errors.form}</span>
                            )}
                        </form>
                        <p className="text-gray-500">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-500 font-semibold underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                    {/* image */}
                    <div className="w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1582217900003-2b19c0e3a7d0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Train journey"
                            className="h-full lg:block hidden"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Signin;
