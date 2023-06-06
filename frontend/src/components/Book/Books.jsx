import React, { useContext, useEffect, useState } from "react";
import "./Book.css";
import axios from "axios";
import Book from "./Book";
import { toast } from "react-toastify";
import { ProductContext } from "../../ProductContext";
import { UserContext } from "../../UserContext";
import ReactLoading from "react-loading";
import { Pagination } from "@mui/material";

const Books = ({ sortType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [defaultBooks, setDefaultBooks] = useState(null);
  const { searchedBooks, setSearchedBooks, allBooks, setAllBooks } =
    useContext(ProductContext);

  useEffect(() => {
    // console.log(sortType);
    if (sortType === "a-z") {
      const Ascending = [...allBooks].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      // console.log(Ascending);
      setAllBooks(Ascending);
    } else if (sortType === "z-a") {
      const Descending = [...allBooks].sort((a, b) =>
        a.name > b.name ? -1 : 1
      );
      // console.log(Descending);
      setAllBooks(Descending);
    } else if (sortType === "none") {
      setAllBooks(defaultBooks);
    }
  }, [sortType]);

  const { userId ,role } = useContext(UserContext);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(" https://book-e-sell-node-api.vercel.app/api/book/all")
  //     .then((res) => {
  //       // console.log(res);
  //       setIsLoading(false);
  //       if (res.data.key === "SUCCESS") {
  //         // setAllBooks(res.data.result);
  //       } else {
  //         toast.error("🦄Something went wrong while fetching products!", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //     });
  // }, []);

  // console.log(searchedBooks);
  // console.log(userId);
  useEffect(() => {
    axios
      .get(
        "https://book-e-sell-node-api.vercel.app/api/book?pageSize=8&pageIndex=" +
          pageIndex
      )
      .then((res) => {
        // console.log(res);
        setTotalPage(res.data.result.totalPages);
        setAllBooks(res.data.result.items);
        setDefaultBooks(res.data.result.items);
      });
  }, []);

  const handlePageChage = (e, page) => {
    setPageIndex(page);
    axios
      .get(
        "https://book-e-sell-node-api.vercel.app/api/book?pageSize=8&pageIndex=" +
          page
      )
      .then((res) => {
        // console.log(res);
        setAllBooks(res.data.result.items);
        setDefaultBooks(res.data.result.items);
      });
  };

  // console.log(allBooks);

  return (
    <>
      {/* {isLoading && (
        <>
          <div className="flex justify-center items-center mt-20">
            <ReactLoading
              type="spin"
              color="#d9c700"
              height={200}
              width={200}
            />
          </div>
        </>
      )} */}
      <div className="bg-white">
        <div className="mx-auto min-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-3 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {searchedBooks ? (
              <>
                {searchedBooks &&
                  searchedBooks.map((book, index) => {
                    return <Book book={book} key={index} />;
                  })}
              </>
            ) : (
              <>
                {allBooks &&
                  allBooks.map((book, index) => {
                    
                    return <Book book={book} key={index} />;
                  })}
              </>
            )}
          </div>
          {!isLoading && (
            <div className="flex justify-center mt-10">
              <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Books;
