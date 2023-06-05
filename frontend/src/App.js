import './App.css';
import Header from './components/Header/Header.jsx';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
<<<<<<< Updated upstream
import Home from './pages/Home/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Book from './pages/Book';
import PageNotFound from './pages/PageNotFound';
import AddBook from './pages/AddBook';
import { UserContext } from './UserContext';
import { useState } from 'react';
import { ProductContext } from './ProductContext';
import Footer from './pages/Footer/Footer';
import Profile from './pages/Profile/Profile';
=======
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Book from "./pages/Book";
import PageNotFound from "./pages/PageNotFound";
import AddBook from "./pages/AddBook";
import { UserContext } from "./UserContext";
import { useEffect, useId, useState } from "react";
import { ProductContext } from "./ProductContext";
import Footer from "./pages/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import About from './pages/About/About.jsx';
>>>>>>> Stashed changes

function App() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // buyer or seller
<<<<<<< Updated upstream
=======
  const [id, setId] = useState(null);
>>>>>>> Stashed changes
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [allBooks, setAllBooks] = useState(null);
  const [searchedBooks, setSearchedBooks] = useState(null)



  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    setRole(localStorage.getItem("role"));
    setUserEmail(localStorage.getItem("email"));
    setId(localStorage.getItem("Id"));
  }, [useId])

  return (
    <>
      <div className="w-full  min-h-screen text-gray-900 bg-gradient-to-br from-transparent to-yellow-100">
        <UserContext.Provider value={{ firstName, setFirstName, lastName, setLastName, userEmail, setUserEmail, role, setRole, userId, setUserId }}>
          <ProductContext.Provider value={{ allBooks, setAllBooks, searchedBooks, setSearchedBooks }} >
            <Router>
              <Header />
              <Routes>
<<<<<<< Updated upstream
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/book" element={<Book />} />
                <Route exact path="/addBook" element={<AddBook />} />
                <Route exact path="/profile" element={<Profile />} />
=======
                <Route exact path="/" element={role === "seller" ? <Profile /> : <Home />} />
                <Route exact path="/about" element={!userId ? <Login /> : <About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/addBook" element={!userId ? <Login /> : <AddBook />} />
                <Route exact path="/mycart" element={!userId ? <Login /> : <Cart />} />
>>>>>>> Stashed changes
                <Route exact path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </ProductContext.Provider>
        </UserContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export default App;
