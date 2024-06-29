import React, { useState, useEffect } from 'react';

const Searchbar = () => {
    const [trains, setTrains] = useState([]); // State to store all trains
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const [filteredTrains, setFilteredTrains] = useState([]); // State to store the filtered trains

    // Fetch all trains when the component mounts
    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/getAllTrains');
                if (!response.ok) {
                    throw new Error('Failed to fetch trains');
                }
                const trainsData = await response.json();
                setTrains(trainsData);
            } catch (error) {
                console.error('Error fetching trains:', error.message);
                // Handle error (e.g., show error message, retry logic)
            }
        };

        fetchTrains();
    }, []);

    // Update filtered trains based on search query
    useEffect(() => {
        if (searchQuery) {
            const filtered = trains.filter(train => train.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredTrains(filtered);
        } else {
            setFilteredTrains([]);
        }
    }, [searchQuery, trains]);

    return (
        <div className="mx-auto font-poppins max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm">
                <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Search for Your Trains Ends here...
                </p>
                <form action="/search" onSubmit={(e) => e.preventDefault()}>
                    <label
                        className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                        htmlFor="search-bar"
                    >
                        <input
                            id="search-bar"
                            placeholder="your keyword here"
                            name="q"
                            className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                            required=""
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                        >
                            <div className="flex items-center transition-all opacity-1">
                                <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                                    Search
                                </span>
                            </div>
                        </button>
                    </label>
                </form>
                {/* Display search results */}
                <div>
                    {filteredTrains.map(train => (
                        <div key={train._id} className="mt-4">
                            <p>{train.name} - {train.source} to {train.destination}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Searchbar;