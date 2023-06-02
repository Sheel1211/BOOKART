import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setFirstName, setLastName, setUserEmail, setRole, setUserId } = useContext(UserContext);
    const navigate  = useNavigate();
  useEffect(() => {
    const handleLogout = () => {
      setFirstName(null);
      setLastName(null);
      setUserEmail(null);
      setRole(null);
      setUserId(null);

      toast.success('🦄 Logout successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/");
    };

    handleLogout();
  }, [setFirstName, setLastName, setUserEmail, setRole, setUserId]);

  return (
    <div>
      Loading...
    </div>
  );
};

export default Logout;
