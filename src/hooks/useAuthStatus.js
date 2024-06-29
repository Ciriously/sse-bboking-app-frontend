// src/hooks/useAuthStatus.js
import { useState, useEffect } from "react";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
};

export default useAuthStatus;
