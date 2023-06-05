import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";





const AddBook = () => {

  const { userId } = useContext(UserContext);


  const [name, setName] = useState("");
  // const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0);
  // const [available, setAvailable] = useState(false);
  // const [stock, setStock] = useState(0);
  const [imageURL, setImageURL] = useState("")
  // const [category, setCategory] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      toast.success("You need to login first to access addBook page", {
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
    // console.log(userId)
  }, [])


  const addProduct = (e) => {
    e.preventDefault();
    const data = { name, description, price, categoryId: 4, base64image: imageURL, }

    console.log("HI");
    axios.post("https://book-e-sell-node-api.vercel.app/api/book", data).then((res) => {
      console.log(res);
    })

  }



  return (
    <form onSubmit={(e) => addProduct(e)}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
        {/* <FormLabel>Author</FormLabel>
        <TextField
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        /> */}
        <FormLabel>Description</FormLabel>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Price</FormLabel>
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
        <FormLabel>Image</FormLabel>
        <TextField
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        />
        {/* <FormLabel>Stock</FormLabel>
        <TextField
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="stock"
        /> */}
        {/* <FormLabel>Category</FormLabel>
        <TextField
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
          name="category"
        /> */}
        {/* <FormControlLabel
          control={
            <Checkbox checked={available} onChange={() => setAvailable(!available)} />
          }
          label="Available"
        /> */}

        <Button variant="contained" type="submit">
          Add Book
        </Button>
      </Box>
    </form>
  );
};

export default AddBook;
