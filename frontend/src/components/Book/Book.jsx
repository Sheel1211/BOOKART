import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, colors } from "@mui/material";

const Book = (props) => {
  const history = useNavigate();

  const { _id, name, author, category, description, price, base64image } =
    props.book;

  return (
    <>
      <div className="card">
        <img src={base64image} alt={name} />
        <h5 className="text-center font-semibold text-lg mt-2">{name}</h5>
        <div className="text-center mt-2">{category}</div>
        <Typography variant="h6" mt={1} sx={{ textAlign: "center" }}>
          ₹{price}
        </Typography>
        {/* </div> */}
      </div>
    </>
  );
};

export default Book;
