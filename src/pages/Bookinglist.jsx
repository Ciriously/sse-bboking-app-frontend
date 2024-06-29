import React, { useState } from 'react';
import TrainCard from '../components/TrainCard';
import Searchbar from '../shared/Searchbar';
import FilterCatalog from '../components/FilterCatalog';

import { trainData } from '../components/traindata';
const Bookinglist = () => {
    const [filteredTrains, setFilteredTrains] = useState(trainData);

    return (
        <div className=''>
            <Searchbar />
            <FilterCatalog setFilteredTrains={setFilteredTrains} />
            <TrainCard trainData={filteredTrains} />
        </div>
    );
};

export default Bookinglist;
