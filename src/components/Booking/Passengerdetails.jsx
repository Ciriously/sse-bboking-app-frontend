import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PassengerDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        seatType: '3A',
        gender: 'Male',
        foodPreference: 'Veg'
    });
    const [passengers, setPassengers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle specific validations
        if (name === 'age' && parseInt(value) < 0) {
            toast.error('Age cannot be negative');
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate age for children under 4 years
        if (parseInt(formData.age) < 0) {
            toast.error('Age cannot be negative');
            return;
        }

        if (parseInt(formData.age) < 4) {
            // Handle free travel for children under 4
            toast.warning('Children under 4 travel free and won\'t be allocated a seat');
        }

        if (passengers.length < 6) {
            setPassengers([...passengers, formData]);
            setFormData({
                name: '',
                age: '',
                seatType: '3A',
                gender: 'Male',
                foodPreference: 'Veg'
            });
            toast.success('Passenger added successfully!');
        } else {
            toast.error('You can only add up to 6 passengers');
        }
    };

    return (
        <div className="max-w-3xl font-poppins mx-auto p-4">
            <form className="bg-white  p-2 mb-6" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4">Add Passenger</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Seat Type</label>
                        <select
                            name="seatType"
                            value={formData.seatType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="3A">3A</option>
                            <option value="2A">2A</option>
                            <option value="1A">1A</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Food Preference</label>
                        <select
                            name="foodPreference"
                            value={formData.foodPreference}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Passenger
                </button>
            </form>
            <div className="bg-white p-2">
                <h2 className="text-2xl font-semibold mb-4">Passengers List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4  text-left text-gray-700">Name</th>
                                <th className="py-2 px-4  text-left text-gray-700">Age</th>
                                <th className="py-2 px-4  text-left text-gray-700">Seat Type</th>
                                <th className="py-2 px-4  text-left text-gray-700">Gender</th>
                                <th className="py-2 px-4  text-left text-gray-700">Food Preference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passengers.map((passenger, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2 px-4">{passenger.name}</td>
                                    <td className="py-2 px-4">{passenger.age}</td>
                                    <td className="py-2 px-4">{passenger.seatType}</td>
                                    <td className="py-2 px-4">{passenger.gender}</td>
                                    <td className="py-2 px-4">{passenger.foodPreference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PassengerDetails;
