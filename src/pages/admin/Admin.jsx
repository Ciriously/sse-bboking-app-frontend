import React, { useState } from 'react';

const initialTrainData = [
    { id: 1, name: 'Train A', price: 100, source: 'City A', destination: 'City B', date: '2024-07-01' },
    { id: 2, name: 'Train B', price: 120, source: 'City B', destination: 'City C', date: '2024-07-02' },
    { id: 3, name: 'Train C', price: 150, source: 'City C', destination: 'City D', date: '2024-07-03' },
];

const AdminPage = () => {
    const [trains, setTrains] = useState(initialTrainData);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', price: '', source: '', destination: '', date: '' });

    const toggleModal = () => setShowModal(!showModal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddTrain = () => {
        const newTrain = { id: Date.now(), ...formData };
        setTrains([...trains, newTrain]);
        setFormData({ id: '', name: '', price: '', source: '', destination: '', date: '' });
        toggleModal();
    };

    const handleEditTrain = () => {
        const updatedTrains = trains.map(train =>
            train.id === formData.id ? { ...train, ...formData } : train
        );
        setTrains(updatedTrains);
        setFormData({ id: '', name: '', price: '', source: '', destination: '', date: '' });
        toggleModal();
    };

    const handleDeleteTrain = (id) => {
        const updatedTrains = trains.filter(train => train.id !== id);
        setTrains(updatedTrains);
    };

    const openEditModal = (train) => {
        setFormData(train);
        toggleModal();
    };

    return (
        <div className="container font-poppins mx-auto px-4 py-8">
            <h1 className="text-4xl font-semibold mb-4">Admin Dashboard - Manage Trains</h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700"
                onClick={() => {
                    setFormData({ id: '', name: '', price: '', source: '', destination: '', date: '' });
                    toggleModal();
                }}
            >
                Add Train
            </button>

            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-left text-gray-700">Train Name</th>
                        <th className="py-2 px-4 text-left text-gray-700">Price</th>
                        <th className="py-2 px-4 text-left text-gray-700">Source</th>
                        <th className="py-2 px-4 text-left text-gray-700">Destination</th>
                        <th className="py-2 px-4 text-left text-gray-700">Date</th>
                        <th className="py-2 px-4 text-left text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map((train) => (
                        <tr key={train.id}>
                            <td className="py-2 px-4">{train.name}</td>
                            <td className="py-2 px-4">{train.price}</td>
                            <td className="py-2 px-4">{train.source}</td>
                            <td className="py-2 px-4">{train.destination}</td>
                            <td className="py-2 px-4">{train.date}</td>
                            <td className="py-2 px-4 flex">
                                <button
                                    className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-yellow-700"
                                    onClick={() => openEditModal(train)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-700"
                                    onClick={() => handleDeleteTrain(train.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            {formData.id ? 'Edit Train' : 'Add New Train'}
                        </h2>
                        <label className="block text-gray-700 mb-2">Train Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label className="block text-gray-700 mb-2">Source</label>
                        <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label className="block text-gray-700 mb-2">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <label className="block text-gray-700 mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-700"
                                onClick={formData.id ? handleEditTrain : handleAddTrain}
                            >
                                {formData.id ? 'Update' : 'Add'}
                            </button>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
