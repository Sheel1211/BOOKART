import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext'


const Home = () => {

  const { firstName, lastName ,role} = useContext(UserContext);
  

  return (
    <>
      {firstName && lastName &&
        <div className='text-center text-2xl'>
          {/* Welcome Jay Patel */}
          {`Welcome ${firstName} ${lastName} as ${role}`}
        </div>
      }

<>
  {/* Container for demo purpose */}
  <div className="container w-100 h-100 px-6 mx-auto">
    {/* Section: Design Block */}
    {/* <section className="mb-32"> */}
      <div
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={{
          backgroundPosition: "50%",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60")',
          height: 700
        }}
      >
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h2 className="text-5xl font-bold tracking-tight leading-tight mb-12">
                Welcome to the Ocean🌊 <br />
                <span>of Books !</span>
              </h2>
              <Link to="/book">

              <button
                type="button"
                className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >
                Get started
              </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    {/* </section> */}
    {/* Section: Design Block */}
  </div>
  {/* Container for demo purpose */}
</>

      
    </>
  )
}

export default Home
