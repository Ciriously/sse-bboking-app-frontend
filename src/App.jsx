import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import useAdminCheck from './hooks/useAdminCheck';

const App = () => {
  const isAdmin = useAdminCheck();

  return (
    <BrowserRouter>
      <div>
        <ToastContainer />

        <DiscountBanner />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/bookinglist" element={<Bookinglist />} />
          <Route path="/summary/:id" element={<Summary />} />
          {isAdmin ? (
            <Route path="/admin" element={<AdminPage />} />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} /> // Redirect to login if not admin, using replace to avoid navigation history stacking
          )}
          <Route path="/history" element={<UserHistory />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;