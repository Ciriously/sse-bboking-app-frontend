import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Home from './pages/Home';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Footer from './shared/Footer';
import Booking from './pages/Booking';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          < Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;