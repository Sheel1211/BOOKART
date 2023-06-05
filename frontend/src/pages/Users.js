import { Pagination } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [roleId, setRoleId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `https://book-e-sell-node-api.vercel.app/api/user?pageSize=8&pageIndex=${pageIndex}`
      );
      setTotalPage(response.data.result.totalPages);
      setUsers(response.data.result.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [pageIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id,
      firstName,
      lastName,
      email,
      roleId,
      password,
      role,
    };

    try {
      const response = await axios.put(
        "https://book-e-sell-node-api.vercel.app/api/user",
        formData
      );
      console.log(formData);
      // console.log(response.status);  
      if (response.status == 200) {
        toast.success("🦄 User Updated successfully", {
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
        Navigate("/admin/users");
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

    getAllUsers();
  };

  const handlePageChange = (e, page) => {
    setPageIndex(page);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `https://book-e-sell-node-api.vercel.app/api/user?id=${id}`
      );
      if (response.data.code === 200) {
        toast.success("🦄 User deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        Navigate("/admin/users");
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

    getAllUsers();
  };

  const handleEdit = (user) => {
    setId(user.id);
    setRoleId(user.roleId);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Password
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.isArray(users)
                    ? users.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.firstName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.lastName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.password}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {item.role}
                          </td>
                          <td
                            className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap text-green-500 hover:text-green-700"
                            onClick={async () => {
                              setShowModal(true);
                              handleEdit(item);
                              
                            }}
                            style={{cursor:"pointer"}}
                          >
                            Edit
                          </td>
                          {showModal ? (
                            <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                  {/*content*/}
                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                      <h3 className="text-3xl font-semibold">
                                        Edit Details
                                      </h3>
                                      <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                        style={{color:"black"}}
                                      >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none" style={{color:"black"}}>
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
                                              setId(e.target.value);
                                              setRoleId(item.roleId);
                                              setRole(e.target.role);
                                            }}
                                            value={item.id}
                                            required
                                          />
                                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          for="id">
                                            User Id
                                          </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                          <input
                                            autoComplete="off"
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            value={firstName}
                                            onChange={(e) =>
                                              setFirstName(e.target.value)
                                            }
                                            required
                                          />
                                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                          for="firstName">
                                            First Name
                                          </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                          <input
                                            autoComplete="off"
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            value={lastName}
                                            onChange={(e) =>
                                              setLastName(e.target.value)
                                            }
                                            required
                                          />
                                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
                                          for="lastName">
                                            Last Name
                                          </label>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                          <div className="relative z-0 w-full mb-6 group">
                                            <div className="flex items-center mb-4">
                                              <input
                                                autoComplete="off"
                                                id="email"
                                                type="email"
                                                value={email}
                                                name="email"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                onChange={(e) =>
                                                  setEmail(e.target.value)
                                                }
                                              />
                                              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" for="email">
                                                Email
                                              </label>
                                            </div>
                                          </div>
                                          <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                autoComplete="off"
                                              type="text"
                                              name="password"
                                              id="password"
                                              value={password}
                                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                              onChange={(e) =>
                                                setPassword(e.target.value)
                                              }
                                              placeholder=" "
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 " for="password">
                                              Password
                                            </label>
                                          </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                          <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                autoComplete="off"
                                              type="text"
                                              name="role"
                                              id="role"
                                              value={item.role}
                                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                              placeholder=" "
                                              onChange={(e) =>
                                                setRole(e.target.value)
                                              }
                                              required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" for="role">
                                              Role
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

                          <td
                            className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap text-red-500 hover:text-red-700"
                            onClick={() => deleteHandler(item.id)}
                            style={{cursor:"pointer"}}
                          >
                            Delete
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            {!isLoading && (
            <div className="flex justify-center mt-10">
              <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
