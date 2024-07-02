import React, { useState, useEffect } from 'react';

const EditTrainModal = ({ trainData, closeModal }) => {
    console.log(trainData)
    const [modalFormData, setModalFormData] = useState({
        id: trainData.id || '',
        name: trainData.name || '',
        seats: {
            '3ac': { price: trainData.seats['3ac'].price || '', count: trainData.seats['3ac'].count || '' },
            '2ac': { price: trainData.seats['2ac'].price || '', count: trainData.seats['2ac'].count || '' },
            '1ac': { price: trainData.seats['1ac'].price || '', count: trainData.seats['1ac'].count || '' }
        },
        source: trainData.source || '',
        destination: trainData.destination || '',
        date: trainData.date || ''
    });

    const updateTrain = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No admin token found');
                return;
            }
            const response = await fetch(`https://sse-bookingapp-backend.vercel.app/admin/updateTrainById/${trainData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(modalFormData),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Response error body:', errorBody);
                throw new Error('Failed to update train');
            }

            const updatedTrain = await response.json();

            setModalFormData(updatedTrain);

            closeModal();

            alert('Train updated successfully');
        } catch (error) {
            console.error('Failed to update train:', error.message);
            alert('Failed to update train. Please try again.');
        }
    };



    function handleChangeModal(event) {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const keys = name.split('.');
            const lastKey = keys.pop();
            setModalFormData(prevFormData => {
                const formDataCopy = JSON.parse(JSON.stringify(prevFormData));

                let nestedObject = formDataCopy;
                for (const key of keys) {
                    if (!nestedObject[key]) nestedObject[key] = {};
                    nestedObject = nestedObject[key];
                }

                nestedObject[lastKey] = value;

                return formDataCopy;
            });
        } else {
            setModalFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    }
    useEffect(() => {
        setModalFormData({
            id: trainData.id || '',
            name: trainData.name || '',
            seats: {
                '3ac': { price: trainData.seats['3ac'].price || '', count: trainData.seats['3ac'].count || '' },
                '2ac': { price: trainData.seats['2ac'].price || '', count: trainData.seats['2ac'].count || '' },
                '1ac': { price: trainData.seats['1ac'].price || '', count: trainData.seats['1ac'].count || '' }
            },
            source: trainData.source || '',
            destination: trainData.destination || '',
            date: trainData.date || ''
        });
    }, [trainData]);

    return (
        <>
            {modalFormData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-lg">
                        <div className="col-span-2">
                            <label className="block text-gray-700 mb-2">Train Name</label>
                            <input
                                type="text"
                                name="name"
                                value={modalFormData.name}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Price 3AC</label>
                            <input
                                type="number"
                                name="seats.3ac.price"
                                value={modalFormData.seats['3ac'].price}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Seats 3AC</label>
                            <input
                                type="number"
                                name="seats.3ac.count"
                                value={modalFormData.seats['3ac'].count}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Price 2AC</label>
                            <input
                                type="number"
                                name="seats.2ac.price"
                                value={modalFormData.seats['2ac'].price}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Seats 2AC</label>
                            <input
                                type="number"
                                name="seats.2ac.count"
                                value={modalFormData.seats['2ac'].count}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Price 1AC</label>
                            <input
                                type="number"
                                name="seats.1ac.price"
                                value={modalFormData.seats['1ac'].price}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Seats 1AC</label>
                            <input
                                type="number"
                                name="seats.1ac.count"
                                value={modalFormData.seats['1ac'].count}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 mb-2">Source</label>
                            <input
                                type="text"
                                name="source"
                                value={modalFormData.source}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 mb-2">Destination</label>
                            <input
                                type="text"
                                name="destination"
                                value={modalFormData.destination}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={modalFormData.date}
                                onChange={handleChangeModal}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className=" justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2"
                                onClick={() => updateTrain()}
                                disabled={!modalFormData.name || !modalFormData.source || !modalFormData.destination || !modalFormData.date}
                            >
                                Update
                            </button>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default EditTrainModal;