import React, { useState, useEffect } from 'react';
import TrainModal from './TrainModal'; // Import TrainModal component
import EditModal from './EditModal'; // Import EditModal component

const AdminPage = () => {
    const [trains, setTrains] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalFormData, setModalFormData] = useState({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [trainsPerPage] = useState(5); // Number of trains to display per page
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTrains, setFilteredTrains] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTrainForEdit, setSelectedTrainForEdit] = useState(null);

    const toggleModal = () => setShowModal(!showModal);
    const openEditModal = (train) => {
        setSelectedTrainForEdit(train);

        setIsEditModalOpen(true);
    };

    // Function to close the modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    useEffect(() => {
        fetchTrains();
    }, [searchTerm]); // Trigger fetchTrains when searchTerm changes
    useEffect(() => {
        fetchTrains();
    }, [trains]); // Trigger fetchTrains only once on component mount
    const fetchTrains = async () => {
        try {
            console.log('Fetching trains with search term:', searchTerm);
            const url = searchTerm
                ? `https://sse-bookingapp-backend.vercel.app/admin/getAllTrains?name=${encodeURIComponent(searchTerm)}`
                : 'https://sse-bookingapp-backend.vercel.app/admin/getAllTrains';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch trains');
            }
            const data = await response.json();
            console.log('Fetched trains:', data); // Log the fetched data

            if (searchTerm) {
                setFilteredTrains(data); // Update filtered trains if searchTerm is not empty
            } else {
                setTrains(data); // Update all trains if searchTerm is empty
            }
        } catch (error) {
            console.error('Failed to fetch trains:', error.message);
        }
    };

    const handleChangeSearch = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    function handleChangeModal(event) {
        const { name, value } = event.target;
        if (name.includes('.')) {
            // Handle nested properties
            const keys = name.split('.');
            const lastKey = keys.pop();
            const nestedObject = keys.reduce((acc, key) => {
                if (!acc[key]) acc[key] = {};
                return acc[key];
            }, modalFormData);

            nestedObject[lastKey] = value;

            setModalFormData({ ...modalFormData }); // Spread to trigger state update
        } else {
            setModalFormData({ ...modalFormData, [name]: value });
        }
    }

    const handleAddTrain = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No admin token found');
            return;
        }

        try {
            const response = await fetch('https://sse-bookingapp-backend.vercel.app/admin/createTrain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(modalFormData),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Response error body:', errorBody);
                throw new Error('Network response was not ok');
            }

            const newTrain = await response.json();
            setTrains([...trains, newTrain]);
            toggleModal(); // Close the modal after adding train, not resetting form data here
        } catch (error) {
            console.error('Failed to add train:', error.message);
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

            const response = await fetch(`https://sse-bookingapp-backend.vercel.app/admin/deleteTrainById/${id}`, {
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



    // Pagination logic
    const indexOfLastTrain = currentPage * trainsPerPage;
    const indexOfFirstTrain = indexOfLastTrain - trainsPerPage;
    const currentTrains = searchTerm ? filteredTrains.slice(indexOfFirstTrain, indexOfLastTrain) : trains.slice(indexOfFirstTrain, indexOfLastTrain);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container font-poppins mx-auto px-4 py-8">
            <h1 className="text-5xl font-semibold mb-4">Admin Dashboard - Manage Trains</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    className="border border-gray-300 p-2 mr-2"
                    placeholder="Search by train name..."
                    value={searchTerm}
                    onChange={handleChangeSearch}
                />
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    onClick={handleClearSearch}
                >
                    Clear
                </button>
            </div>

            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700"
                onClick={() => {
                    setModalFormData({ id: '', name: '', seats: { '3ac': { price: '', count: '' }, '2ac': { price: '', count: '' }, '1ac': { price: '', count: '' } }, source: '', destination: '', date: '' });
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
                        {currentTrains.map((train) => (
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

                                    {isEditModalOpen && selectedTrainForEdit && (
                                        <EditModal trainData={selectedTrainForEdit} closeModal={closeEditModal} />
                                    )}
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
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <div className="flex">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`bg-gray-200 text-gray-700 py-1 px-4 rounded-l-lg ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'}`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={searchTerm ? indexOfLastTrain >= filteredTrains.length : indexOfLastTrain >= trains.length}
                        className={`bg-gray-200 text-gray-700 py-1 px-4 rounded-r-lg ml-1 ${searchTerm ? (indexOfLastTrain >= filteredTrains.length ? 'cursor-not-allowed' : 'hover:bg-gray-300') : (indexOfLastTrain >= trains.length ? 'cursor-not-allowed' : 'hover:bg-gray-300')}`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <TrainModal
                showModal={showModal}
                toggleModal={toggleModal}
                formData={modalFormData}
                handleChangeModal={handleChangeModal}
                handleAddTrain={handleAddTrain}
            // updateTrain={updateTrain}
            />
        </div>
    );
};

export default AdminPage;
