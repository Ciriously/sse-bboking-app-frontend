import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Use useNavigate hook

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

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit form logic here
            console.log('Form submitted', { email, password });
        }
    };
    const handleRegister = async () => {
        const userData = { email, password, role: 'user' }; // Default role is 'user'
        try {
            const response = await fetch('http://localhost:4000/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            const user = await response.json();
            console.log('User created successfully', user);
            navigate('/')
            // Handle success (e.g., redirect to login or dashboard)
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (e.g., show error message)
        }
    };
    return (
        <div>
            <main className="min-h-screen font-poppins flex items-center justify-center p-8 md:p-0">
                <div className="bg-white shadow-lg flex flex-col items-center rounded-xl overflow-hidden lg:flex-row lg:w-2/3 2xl:w-2/4">
                    <div className="p-8 lg:w-1/2 sm:p-8">
                        <h1 className="font-bold text-gray-800 text-3xl md:text-4xl md:mb-16">
                            Join RailYatri Yojana
                        </h1>
                        <h2 className="text-2xl font-semibold mt-8 mb-6 text-gray-700">Sign Up</h2>
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
                            <div id="input-field" className="flex flex-col mb-4 relative">
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
                            <div id="input-field" className="flex flex-col mb-4 relative">
                                <i className="fi fi-rr-lock absolute top-11 right-5 text-zinc-400" />
                                <label htmlFor="confirmPassword" className="mb-2 text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="confirm your password"
                                    className="px-4 py-2 border-2 border-slate-300 rounded-md max-w-full focus:outline-none focus:border-blue-500"
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-sm mt-2">{errors.confirmPassword}</span>
                                )}
                            </div>
                            <button onClick={handleRegister} className="my-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-4 py-2 rounded-md">
                                Sign Up
                            </button>
                        </form>
                        <p className="text-gray-500">
                            Already have an account?{" "}
                            <a href="/signin" className="text-blue-500 font-semibold underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                    {/* image */}
                    <div className="w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1566042349952-5919eb5d7f88?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Train journey"
                            className="h-full lg:block hidden"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Signup;
