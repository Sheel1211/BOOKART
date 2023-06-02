import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, colors } from "@mui/material";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

const Book = (props) => {
  const history = useNavigate();
  const { userId ,role } = useContext(UserContext);
  const { _id, name, author, category, description, price, base64image } =
    props.book;

  return (
    <>
      <div className="card">
        <img src={base64image} alt={name} />
        <h5 className="text-center font-semibold text-lg mt-2">{name}</h5>
        <div className="text-center mt-2 mb-2">{category}</div>
        <div className="flex justify-center">
      <div className="mr-2">       
         <Typography variant="h6" mt={1} sx={{ textAlign: "center" }} >
          ₹{price}
        </Typography>
        </div>
        {userId && role ==="buyer" &&(<button
                  className="ml-2 px-2 py-1.5 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to cart</button>)}
        </div>
       
        {/* </div> */}
      </div>
    </>
  );
};

export default Book;
