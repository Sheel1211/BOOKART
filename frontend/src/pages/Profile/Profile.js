import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {

    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userId) {
            navigate("/login");
            toast.success("You need to login first to access Profile page", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [])


    return (
        <>
            Profile
        </>
    )
}

export default Profile