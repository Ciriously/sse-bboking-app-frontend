// // TrainModal.js
// import React, { useState, useEffect } from 'react';

// const TrainModal = ({ isOpen, toggleModal, initialFormData, handleAddTrain, handleEditTrain }) => {
//     const [formData, setFormData] = useState(initialFormData);

//     useEffect(() => {
//         setFormData(initialFormData);
//     }, [isOpen, initialFormData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.includes('.')) {
//             const [seatClass, key] = name.split('.');
//             setFormData({ ...formData, seats: { ...formData.seats, [seatClass]: { ...formData.seats[seatClass], [key]: value } } });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = () => {
//         if (formData.id) {
//             handleEditTrain(formData);
//         } else {
//             handleAddTrain(formData);
//         }
//         toggleModal();
//     };

//     return (
//         <>
//             {isOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//                         <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Edit Train' : 'Add New Train'}</h2>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="col-span-2">
//                                     <label className="block text-gray-700 mb-2">Train Name</label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Price 3AC</label>
//                                     <input
//                                         type="number"
//                                         name="3ac.price"
//                                         value={formData.seats['3ac'].price}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Seats 3AC</label>
//                                     <input
//                                         type="number"
//                                         name="3ac.count"
//                                         value={formData.seats['3ac'].count}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Price 2AC</label>
//                                     <input
//                                         type="number"
//                                         name="2ac.price"
//                                         value={formData.seats['2ac'].price}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Seats 2AC</label>
//                                     <input
//                                         type="number"
//                                         name="2ac.count"
//                                         value={formData.seats['2ac'].count}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Price 1AC</label>
//                                     <input
//                                         type="number"
//                                         name="1ac.price"
//                                         value={formData.seats['1ac'].price}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Seats 1AC</label>
//                                     <input
//                                         type="number"
//                                         name="1ac.count"
//                                         value={formData.seats['1ac'].count}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-span-2">
//                                     <label className="block text-gray-700 mb-2">Source</label>
//                                     <input
//                                         type="text"
//                                         name="source"
//                                         value={formData.source}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-span-2">
//                                     <label className="block text-gray-700 mb-2">Destination</label>
//                                     <input
//                                         type="text"
//                                         name="destination"
//                                         value={formData.destination}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-span-2">
//                                     <label className="block text-gray-700 mb-2">Date</label>
//                                     <input
//                                         type="date"
//                                         name="date"
//                                         value={formData.date}
//                                         onChange={handleChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex justify-end">
//                             <button
//                                 className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-2"
//                                 onClick={handleSubmit}
//                             >
//                                 {formData.id ? 'Update' : 'Add'}
//                             </button>
//                             <button
//                                 className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
//                                 onClick={toggleModal}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default TrainModal;
