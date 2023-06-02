import React, { useContext } from 'react'
import { UserContext } from '../UserContext';

const Cart = () => {
    
  const {
    firstName,
    lastName,
    setUserName,
    userEmail,
    setUserEmail,
    type,
    setType,
    userId,
    setUserId,
    role
  } = useContext(UserContext);
  return (
    <div className='text-center mt-16 text-3xl'>
     {firstName} {lastName} cart 
  </div>
  )
}

export default Cart
