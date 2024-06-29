import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  return isAdmin;
};

export default useAdminCheck;
