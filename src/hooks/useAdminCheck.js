import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useAuth } from "../context/AuthContext";

const useAdminCheck = () => {
  const { isTokenUpdated } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Log the decoded token
        if (decoded.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      console.log("Admin status set to:", isAdmin); // Log admin status
    };

    checkAdminStatus();
  }, [isTokenUpdated]);

  return isAdmin;
};

export default useAdminCheck;
