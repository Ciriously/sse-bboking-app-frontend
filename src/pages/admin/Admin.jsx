import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [trains, setTrains] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });

    const toggleModal = () => setShowModal(!showModal);

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = async () => {
        try {
            const response = await fetch('http://localhost:4000/admin/getAllTrains');
            if (!response.ok) {
                throw new Error('Failed to fetch trains');
            }
            const data = await response.json();
            setTrains(data);
        } catch (error) {
            console.error('Failed to fetch trains:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [seatClass, key] = name.split('.');
            setFormData({ ...formData, seats: { ...formData.seats, [seatClass]: { ...formData.seats[seatClass], [key]: value } } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddTrain = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No admin token found');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/admin/createTrain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Response error body:', errorBody);
                throw new Error('Network response was not ok');
            }

            const newTrain = await response.json();
            setTrains([...trains, newTrain]);
            setFormData({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });
            toggleModal();
        } catch (error) {
            console.error('Failed to add train:', error.message);
        }
    };

    const updateTrain = async (trainData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No admin token found');
                return;
            }

            const response = await fetch(`http://localhost:4000/admin/updateTrainById/${trainData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(trainData),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Response error body:', errorBody);
                throw new Error('Network response was not ok');
            }

            const updatedTrain = await response.json();
            const updatedTrains = trains.map(train =>
                train.id === trainData.id ? updatedTrain : train
            );
            setTrains(updatedTrains);
            setFormData({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });
            toggleModal();
        } catch (error) {
            console.error('Failed to update train:', error.message);
        }
    };

    const handleEditTrain = async () => {
        try {
            const updatedTrain = await updateTrain(formData);
            const updatedTrains = trains.map(train =>
                train.id === formData.id ? updatedTrain : train
            );
            setTrains(updatedTrains);
            setFormData({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });
            toggleModal();
        } catch (error) {
            console.error('Failed to edit train:', error.message);
        }
    };


    const handleDeleteTrain = async (id) => {
        try {
            console.log("Deleting train with id:", id); // Before deletion
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No admin token found');
                return;
            }

            const response = await fetch(`http://localhost:4000/admin/deleteTrainById/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Delete response status:", response.status); // After fetching response

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Failed to delete train:', errorBody);
                throw new Error('Network response was not ok');
            }

            const updatedTrains = trains.filter(train => train.id !== id);
            console.log("Trains list after deletion:", updatedTrains); // After filtering out the deleted train

            setTrains(updatedTrains);
        } catch (error) {
            console.error('Failed to delete train:', error.message);
        }
    };

    const openEditModal = (train) => {
        console.log("Opening edit modal for train:", train); // Before opening edit modal
        setFormData(train);
        toggleModal();
    };

    return (
        <div className="container font-poppins mx-auto px-4 py-8">
            <h1 className="text-4xl font-semibold mb-4">Admin Dashboard - Manage Trains</h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700"
                onClick={() => {
                    setFormData({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });
                    toggleModal();
                }}
            >
                Add Train
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-700">Train Name</th>
                            <th className="py-2 px-4 text-left text-gray-700">Seats</th>
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
                                <td className="py-2 px-4">
                                    <div>
                                        <span className="block">3AC: {train.seats['3ac'].count} seats</span>
                                        <span className="block">2AC: {train.seats['2ac'].count} seats</span>
                                        <span className="block">1AC: {train.seats['1ac'].count} seats</span>
                                    </div>
                                </td>
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
                                        onClick={() => handleDeleteTrain(train._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            {formData.id ? 'Edit Train' : 'Add New Train'}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-gray-700 mb-2">Train Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Price 3AC</label>
                                <input
                                    type="number"
                                    name="3ac.price"
                                    value={formData.seats['3ac'].price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Seats 3AC</label>
                                <input
                                    type="number"
                                    name="3ac.count"
                                    value={formData.seats['3ac'].count}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Price 2AC</label>
                                <input
                                    type="number"
                                    name="2ac.price"
                                    value={formData.seats['2ac'].price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Seats 2AC</label>
                                <input
                                    type="number"
                                    name="2ac.count"
                                    value={formData.seats['2ac'].count}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Price 1AC</label>
                                <input
                                    type="number"
                                    name="1ac.price"
                                    value={formData.seats['1ac'].price}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Seats 1AC</label>
                                <input
                                    type="number"
                                    name="1ac.count"
                                    value={formData.seats['1ac'].count}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 mb-2">Source</label>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 mb-2">Destination</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2"
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
