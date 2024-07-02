import { useState, useEffect } from "react";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check the current authentication status
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Call checkAuthStatus on mount to set initial state
    checkAuthStatus();

    // Add event listener for storage changes
    window.addEventListener("storage", checkAuthStatus);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  return isLoggedIn;
};

export default useAuthStatus;
