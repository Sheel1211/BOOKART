import './App.css';
import Header from './components/Header.jsx';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Book from './pages/Book';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
    <div className="w-full  min-h-screen text-gray-900 bg-gradient-to-br from-transparent to-yellow-100">
    <Router>
    <Header/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/book" element={<Book />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        </div>
    </>
  );
}

export default App;
