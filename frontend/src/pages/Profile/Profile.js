import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {

<<<<<<< Updated upstream
    const { userId } = useContext(UserContext);
=======
    const { userId, firstName, lastName } = useContext(UserContext);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            Profile
=======
            <div className='text-3xl text-gray-500 flex justify-center items-center h-[500px]'>
                {firstName} {lastName} profile
            </div>
>>>>>>> Stashed changes
        </>
    )
}

export default Profile