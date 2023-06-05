import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
    const[cart,setCart] = useState([]);
    const [modal,setModal] = useState(false);
    const [quantity,setQuantity] = useState(null);
    const [bookName,setBookName] = useState();
    const [bookCategory,setBookCategory] = useState();
    const[Id,setId] = useState();
    const [bookId,setBookId] = useState();
    const [userId,setUserId] = useState();

    
    let total=0;
  const {
    firstName,
    lastName,
    id
  } = useContext(UserContext);

  const fetchCartData =()=>{
    // console.log("user",id);
    axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${id}`)
    .then(res => { 
      if (res.data.code === 200) {
        // console.log("res",res.data.result)
        setCart(res.data.result);
     
      }
    }).catch(error => {
      toast.warning('🦄 something went wrong', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  const handleDelete = (id)=>{
    axios.delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${id}`)
    .then(res => { 
      if (res.data.code === 200) {
        toast.success('🦄 Item deleted successfully', {
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
    }).catch(error => {
      toast.warning('🦄 something went wrong', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  const updateCart = (Id,bookId,userId,quantity)=>{

    axios.put(`https://book-e-sell-node-api.vercel.app/api/cart/`, {id:Id,bookId:bookId,userId:userId,quantity:quantity})
    .then(res => {
    
      if (res.data.code === 200) {
        toast.success('🦄 Upadated', {
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
    }).catch(error => {
      toast.warning('🦄 Not Upadated', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }
  useEffect(()=>{
    fetchCartData();
  },[cart])

  if(modal){
    return(<>
    <div class="relative ml-16 mr-16 py-8 px-5  md:px-10 bg-white shadow-md rounded border border-gray-400">
                        
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Update cart details</h1>
                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Quantity</label>
                        <input id="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"/>
                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Book Name</label>
                        <input id="text" value={bookName} class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"/>
                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Book category</label>
                        <input id="text" value={bookCategory} class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"/>
                        
                        <div class="flex items-center justify-start w-full">
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={()=>updateCart(Id,bookId,userId,quantity)}>Update</button>
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={()=>setModal(!modal)}>Cancel</button>
                        </div>
                        <button class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={()=>setModal(!modal)} aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        </div>
    </>)
  }else 
  return (  
           <>
<div className='text-center mt-16 text-3xl'>
     {firstName} {lastName} cart 
     <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4" x-data="app">
    <div class="flex flex-col justify-center h-full">
        {/* <!-- Table --> */}
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Manage Carts</div>
            </header>

            <div class="overflow-x-auto p-3">
                <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th class="p-2">
                                <div class="font-semibold text-left">Name</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Category</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Quantity</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Price</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-center">Edit</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-center">Delete</div>
                            </th>
                        </tr>
                    </thead>

                    <tbody class="text-sm divide-y divide-gray-100">
                       {
                        cart.map(c=>{
                            total = total + (c.book.price*c.quantity);
                                return(<>
                                   <tr>
                            <td class="p-2">
                                    <div class="font-semibold text-left">{c.book.name}</div>
                                </td>
                                <td class="p-2">
                                    <div class="font-semibold text-left">{c.book.category}</div>
                                </td>
                                <td class="p-2">
                                    <div class="font-semibold text-left">{c.quantity}</div>
                                </td>
                                <td class="p-2">
                                    <div class="font-semibold text-left">{c.book.price*c.quantity}</div>
                                </td>
                                <td class="p-2">
                        
                                    <div class="font-semibold text-left cursor-pointer" onClick={()=>{setModal(!modal);setBookCategory(c.book.category);setBookName(c.book.name);setQuantity(c.quantity);setBookId(c.bookId);setId(c.id);setUserId(c.userId);}}>

                                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M4 20H8L14 14L10 10L4 16V20Z" fill="#3688FF"></path> <path d="M10 10L4 16V20H8L14 14M10 10L13 7L17 11L14 14M10 10L14 14M14 20H20V4H4V10" stroke="#3688FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </div>
                                </td>
                                <td class="p-2">
                                    <div class="font-semibold text-left cursor-pointer" onClick={()=>handleDelete(c.id)}>

                                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M779.5 1002.7h-535c-64.3 0-116.5-52.3-116.5-116.5V170.7h768v715.5c0 64.2-52.3 116.5-116.5 116.5zM213.3 256v630.1c0 17.2 14 31.2 31.2 31.2h534.9c17.2 0 31.2-14 31.2-31.2V256H213.3z" fill="#3688FF"></path><path d="M917.3 256H106.7C83.1 256 64 236.9 64 213.3s19.1-42.7 42.7-42.7h810.7c23.6 0 42.7 19.1 42.7 42.7S940.9 256 917.3 256zM618.7 128H405.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h213.3c23.6 0 42.7 19.1 42.7 42.7S642.2 128 618.7 128zM405.3 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7S448 403 448 426.6v256c0 23.6-19.1 42.7-42.7 42.7zM618.7 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v256c-0.1 23.6-19.2 42.7-42.7 42.7z" fill="#5F6379"></path></g></svg>


                                    </div>
                                </td>
                            </tr>
                                </>)
                         
                        })
                       }
                       

                    </tbody>
                </table>
            </div>

            {/* <!-- total amount --> */}
            <div class="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                <div>Total</div>
                <div class="text-blue-600">{total} <span x-text="total.toFixed(2)"></span></div>
            </div>

            <div class="flex justify-end">
                {/* <!-- send this data to backend (note: use class 'hidden' to hide this input) --> */}
                <input type="hidden" class="border border-black bg-gray-50" x-model="selected" />
            </div>
        </div>
    </div>
</section>
  </div>
  </>
  )
}

export default Cart
