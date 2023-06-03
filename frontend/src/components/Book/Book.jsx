import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, colors } from "@mui/material";
import { UserContext } from "../../UserContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const Book = (props) => {
  const history = useNavigate();
  const user = useContext(UserContext);
  
  const { _id,id, name, author, category, description, price, base64image } =
    props.book;
  const [quantity,setQuantity] = useState(1);
  

  const hadleAddToCart =()=>{
    console.log("user",user);
    axios.post(`https://book-e-sell-node-api.vercel.app/api/cart/`, {bookId:id,userId:user.id,quantity:quantity})
    .then(res => {
      console.log(res)
      if (res.data.code === 200) {
        toast.success('🦄 Item added successfully to the cart', {
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
      toast.warning('🦄 Item not added to the cart', {
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
  


  return (
    <>
      <div className="card">
        <img src={base64image} alt={name} />
        <h5 className="text-center font-semibold text-lg mt-2">{name}</h5>
        <div className="text-center mt-2 mb-2">{category}</div>
        
      <div className="">       
         <Typography variant="h6" mt={1} sx={{ textAlign: "center" }} >
          ₹{price}
        </Typography>
        </div>
        {user.userId && user.role ==="buyer" &&(
        <>
        <div className="flex justify-center">
        <div class="flex items-center border-gray-100">
                <button onClick={()=>setQuantity(quantity-1)} class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={quantity} min="1"/>
                <button  onClick={()=>setQuantity(quantity+1)} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
              </div>
        <button onClick={hadleAddToCart} className="ml-2  p-1.5 transition ease-in duration-200 rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart
            </button>
            </div>
        </>
            )}
        
       
        {/* </div> */}
      </div>
    </>
  );
};

export default Book;
