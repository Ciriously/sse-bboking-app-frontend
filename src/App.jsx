import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './shared/Navbar';
import Home from './pages/Home';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Footer from './shared/Footer';
import Booking from './pages/Booking';
import Bookinglist from './pages/Bookinglist';
import Summary from './pages/Summary';
import AdminPage from './pages/admin/Admin';
import DiscountBanner from './animations/Banner';
import UserHistory from './pages/History';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        < DiscountBanner />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking" element={<Booking />} />
          < Route path="/Bookinglist" element={<Bookinglist />} />
          < Route path="/Summary" element={<Summary />} />
          < Route path="/Admin" element={<AdminPage />} />
          < Route path="/history" element={<UserHistory />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
