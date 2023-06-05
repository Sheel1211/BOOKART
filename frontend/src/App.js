import "./App.css";
import Header from "./components/Header/Header.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Book from "./pages/Book";
import PageNotFound from "./pages/PageNotFound";
import AddBook from "./pages/AddBook";
import { UserContext } from "./UserContext";
import { useState } from "react";
import { ProductContext } from "./ProductContext";
import Footer from "./pages/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin.js";
import Users from "./pages/Users.js";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // buyer or seller
  const [id,setId] = useState(null);
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  console.log("role", role);
  const [allBooks, setAllBooks] = useState(null);
  const [searchedBooks, setSearchedBooks] = useState(null);

  return (
    <>
      <div className="w-full  min-h-screen text-gray-900 bg-gradient-to-br from-transparent to-yellow-100">
        <UserContext.Provider
          value={{
            firstName,
            setFirstName,
            lastName,
            setLastName,
            userEmail,
            setUserEmail,
            role,
            setRole,
            userId,
            setUserId,
            id,
            setId
          }}
        >
          <ProductContext.Provider
            value={{ allBooks, setAllBooks, searchedBooks, setSearchedBooks }}
          >
            <Router>
              <Header />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={!userId?<Login />:<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/book" element={!userId?<Login />:<Book />} />
                <Route exact path="/addBook" element={!userId?<Login />:<AddBook />} />
                <Route exact path="/profile" element={!userId?<Login />:<Profile />} />
                <Route exact path="/mycart" element={!userId?<Login />:<Cart />} />
                <Route exact path="*" element={<PageNotFound />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/users" element={<Users />} />
              </Routes>
              <Footer />
            </Router>
          </ProductContext.Provider>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
