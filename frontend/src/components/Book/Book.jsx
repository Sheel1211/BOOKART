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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // console.log(props.book);
  const { _id, id, name, author, category,categoryId, description, price, base64image } =
    props.book;
  const [quantity, setQuantity] = useState(1);

  const [bookId,setBookId]=useState(id);
  const [bookName,setBookName]=useState(name);
  const [bookAuthor,setBookAuthor]=useState(author);
  const [bookCategory,setBookCategory]=useState(categoryId);
  const [bookCategoryName,setBookCategoryName]=useState(category);
  const [bookDescription,setBookDescription]=useState(description);
  const [bookPrice,setBookPrice]=useState(price);
  // const [bookImage,setBookImage]


  const handleAddToCart = () => {
    // console.log("user", user);
    axios
      .post(`https://book-e-sell-node-api.vercel.app/api/cart/`, {
        bookId: id,
        userId: user.id,
        quantity: quantity,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          toast.success("🦄 Item added successfully to the cart", {
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
      })
      .catch((error) => {
        toast.warning("🦄 Item not added to the cart", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id:id,
      name:bookName,
      description:bookDescription,
      price:bookPrice,
      categoryId:bookCategory,
      base64image,      
    };

    try {
      const response = await axios.put(
        "https://book-e-sell-node-api.vercel.app/api/book",
        formData
      );
      console.log(formData);
      // console.log(response.status);  
      if (response.status == 200) {
        toast.success("🦄 Book Updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowModal(false);
        navigate("/book");
      }
    } catch (error) {
      // console.log(error.message);
      toast.warning(error.message, {
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

    
  };

  

  const handleDeleteBook = async (id) => {
    try {
      const response = await axios.delete(
        `https://book-e-sell-node-api.vercel.app/api/book?id=${id}`
      );
      if (response.data.code === 200) {
        toast.success("🦄 Book deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/book");
      }
    } catch (error) {
      toast.warning(error, {
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
  };

  return (
    <>
      <div className="card">
        <img src={base64image} alt={name} />
        <h5 className="text-center font-semibold text-lg mt-2">{name}</h5>
        <div className="text-center mt-2 mb-2">{category}</div>

        <div className="">
          <Typography variant="h6" mt={1} sx={{ textAlign: "center" }}>
            ₹{price}
          </Typography>
        </div>
        {user.userId && user.role === "buyer" && (
          <>
            <div className="flex justify-center">
              <div class="flex items-center border-gray-100">
                <button
                  onClick={() => setQuantity(quantity - 1)}
                  class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  class="h-8 w-8 border bg-white text-center text-xs outline-none"
                  type="number"
                  value={quantity}
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="ml-2  p-1.5 transition ease-in duration-200 rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
              >
                Add to cart
              </button>
            </div>
          </>
        )}
        {user.userId && user.role === "admin" && (
          <>
            <div className="flex justify-center">
              <button
                onClick={(e) => {                  
                  setShowModal(true);
                }}
                className="ml-2  p-1.5 transition ease-in duration-200 rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleDeleteBook(id)}
                className="ml-2  p-1.5 transition ease-in duration-200 rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Edit Book</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                      style={{ color: "black" }}
                    >
                      <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                        style={{ color: "black" }}
                      >
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleSubmit}>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          autoComplete="off"
                          type="text"
                          name="id"
                          id="id"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          onChange={(e) => {
                            setBookId(e.target.value);
                          }}
                          value={bookId}
                          required
                        />
                        <label
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          for="id"
                        >
                          Book Id
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          autoComplete="off"
                          type="text"
                          name="bookName"
                          id="bookName"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={bookName}
                          onChange={(e) => setBookName(e.target.value)}
                          required
                        />
                        <label
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          for="firstName"
                        >
                          Book Name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          autoComplete="off"
                          type="text"
                          name="bookDescription"
                          id="bookDescription"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={bookDescription}
                          onChange={(e) => setBookDescription(e.target.value)}
                          required
                        />
                        <label
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          for="lastName"
                        >
                          Description
                        </label>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                          <div className="flex items-center mb-4">
                            <input
                              autoComplete="off"
                              id="bookPrice"
                              type="Number"
                              value={bookPrice}
                              name="bookPrice"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              onChange={(e) => setBookPrice(e.target.value)}
                            />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              for="bookPrice"
                            >
                              Price
                            </label>
                          </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            autoComplete="off"
                            type="text"
                            name="category"
                            id="category"
                            value={bookCategory}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            onChange={(e) => setBookCategory(e.target.value)}
                            placeholder=" "
                          />
                          <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                            for="category"
                          >
                            Category Id
                          </label>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onSubmit={handleSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/* </div> */}
      </div>
    </>
  );
};

export default Book;
